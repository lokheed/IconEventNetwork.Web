import { Component, State, h } from '@stencil/core';
import { DataResponse, PersonInfo, PersonAtCompanyInfo } from '../../../services/clients/client-base';
import { GetRequestingPersonResponse, PersonClient } from '../../../services/clients/person-client';
import { PersonAtCompanyClient } from '../../../services/clients/person-at-company-client';
import { localStorageKeyService } from '../../../services/local-storage-key-service';
import { WelcomePersonName } from '../../functionalComponents/WelcomePersonName';
import { CompanyBox } from '../../functionalComponents/CompanyBox';

@Component({
  tag: 'page-profile-person-at-companies',
  styleUrl: 'page-profile-person-at-companies.scss',
  shadow: false,
})
export class PageProfilePersonAtCompanies {
    private readonly personClient: PersonClient;
    private readonly personAtCompanyClient: PersonAtCompanyClient;
    constructor(){
      this.personClient = new PersonClient();
      this.personAtCompanyClient = new PersonAtCompanyClient();
    }  
    @State() me: GetRequestingPersonResponse;
    @State() person: DataResponse<PersonInfo>;
    @State() pacs: DataResponse<PersonAtCompanyInfo>[];
    @State() activePacs: DataResponse<PersonAtCompanyInfo>[];
    @State() inactivePacs: DataResponse<PersonAtCompanyInfo>[];
    @State() inactivePacsAreVisible: boolean = false;
    private getMe() {
        var storedMe = sessionStorage.getItem(localStorageKeyService.Me);
        if (storedMe) {
          this.me = JSON.parse(storedMe);
          this.getPacs(this.me.id);
          return;
        }
        this.personClient.getRequestingPerson()
        .then((response) => {
          this.me = response;
          sessionStorage.setItem(localStorageKeyService.Me, JSON.stringify(this.me));
          this.getPacs(this.me.id);
        })
        .catch(reason => console.error(reason));
    } 
    private getPacs(personId) {
        this.personAtCompanyClient.getPersonsAtCompanies({
            fields: ['IsActive', 'CanManageCompanyDetails', 'CanManageCompanyStaff'],
            populate: {
                Company: {
                    fields: ['Name', 'IsActive'],
                    populate: ['CompanyStatus', 'PrimaryContact', 'LogoImage'],
                },
            },
            filters: {
                Person: {
                    id: {
                        $eq: personId,
                    },
                },
            }
        })
        .then((response) => {
            this.pacs = response.data;
            this.activePacs = this.pacs.filter(pac => pac.attributes.IsActive && pac.attributes.Company);
            this.inactivePacs = this.pacs.filter(pac => !pac.attributes.IsActive && pac.attributes.Company);
        })
        .catch(reason => console.error(reason));  
    }
    private comparePacs( a, b ) {
        if (a.attributes.Company.data.attributes.Name < b.attributes.Company.data.attributes.Name ) {
            return -1;
        }
        if (a.attributes.Company.data.attributes.Name > b.attributes.Company.data.attributes.Name ) {
            return 1;
        }
        return 0;
    }
    componentWillLoad() {
        this.getMe();
    }        

    toggleInactiveCompaniesClick(e: MouseEvent) {
        e.preventDefault();
        this.inactivePacsAreVisible = !this.inactivePacsAreVisible;
    }
    
    render() {
        return (
            <div class='profile-page'>
                <aside>
                    <app-profile-left-nav me={this.me} />
                </aside>
                <main>
                    <WelcomePersonName me={this.me} />
                    <h2>My Company Profiles</h2>
                    <p>
                        Below are the companies your personal profile is currently associated with. To view your details 
                        at a company, select <b>View my work profile</b>. To view a company's details, select <b>View company profile</b>.
                    </p>
                    <div class='companies-grid'>
                    { 
                        this.activePacs && this.activePacs.length > 0 ? 
                            this.activePacs.sort(this.comparePacs).map(pac => 
                                <CompanyBox company={pac.attributes.Company} pacId={pac.id} />
                            ) : 
                            <h3>You do not have any current companies</h3>
                    }
                    </div>
                    {
                        this.inactivePacs && this.inactivePacs.length > 0 ?
                            this.inactivePacsAreVisible ?
                                <div>
                                    <div class='companies-list box-container'>
                                        { this.inactivePacs.sort(this.comparePacs).map(pac => 
                                            <div class={pac.attributes.Company.data.attributes.IsActive ? 'company-item' : 'company-item disabled'}>
                                                <div class='label'>
                                                    {pac.attributes.Company.data.attributes.Name}
                                                </div>
                                                <div class='status'>
                                                    Company Status: {pac.attributes.Company.data.attributes.CompanyStatus?.data?.attributes?.DisplayName??'Unknown'}
                                                </div>
                                                <div class='contact'>
                                                    <span class='action-link'>Contact admin</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>                                    
                                    <div class='collapse-container'>
                                        <span class='action-link' onClick={e => this.toggleInactiveCompaniesClick(e)}>Collapse</span>
                                    </div>                                 
                                </div> 
                                :
                                <div class='expand-container'>
                                    <span class='action-link' onClick={e => this.toggleInactiveCompaniesClick(e)}>View my former companies</span>
                                </div>
                            :
                            ''
                    }
          
                </main>
            </div>
        );
    }
}