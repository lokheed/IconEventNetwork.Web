import { Component, Host, h, Prop, State } from '@stencil/core';
import { DataResponse } from '../../components';
import { PersonAtCompanyInfo } from '../../services/clients/client-base';
import { PersonAtCompanyClient } from '../../services/clients/person-at-company-client';
import { GetRequestingPersonResponse } from '../../services/clients/person-client';
import { localStorageKeyService } from '../../services/local-storage-key-service';

@Component({
  tag: 'app-profile-left-nav',
  styleUrl: 'app-profile-left-nav.scss',
  shadow: false,
  scoped: true,
})
export class AppProfileLeftNav {
  
  @Prop() me!: GetRequestingPersonResponse; 
  @Prop() appliesTo!: 'person' | 'personAtCompany' | 'company';
  @Prop() selectedItemId: string;
  @State() pacs: DataResponse<PersonAtCompanyInfo>[];
  @State() companyProfilesExpanded: boolean = false;
  @State() companiesExpanded: boolean = false;

  private personAtCompanyClient : PersonAtCompanyClient;
  private companyProfiles: HTMLDivElement;
  private companies: HTMLDivElement;

  componentWillLoad() {
    this.personAtCompanyClient = new PersonAtCompanyClient();
    this.getPacs();
    switch (this.appliesTo) {
      case 'company':
        this.companiesExpanded = true;
        break;
      case 'personAtCompany':
        this.companyProfilesExpanded = true;
        break;
    }
  }

  componentDidLoad() {
    switch (this.appliesTo) {
      case 'company':
        this.setCompaniesStyleHeight();
        break;
      case 'personAtCompany':
        this.setWorkProfilesStyleHeight();
    }
  }

  private getPacs() {
    var storedPacs = sessionStorage.getItem(localStorageKeyService.ProfileNav);
    if (storedPacs) {
      this.pacs = JSON.parse(storedPacs);
      return;
    }
    this.personAtCompanyClient.getPersonsAtCompanies({
      fields: ['JobTitle'],
      populate: {
        Company: {
          fields: ['Name'],
        },
      },
      filters: {
        IsActive: {
          $eq: 1,
        },
        Person: {
          id: {
            $eq: this.me.id,
          },
          IsActive: {
            $eq: 1,
          }
        },
        Company: {
          IsActive: {
            $eq: 1
          },
        }
      }
    })
    .then((response) => {
      this.pacs = response.data;
      sessionStorage.setItem(localStorageKeyService.ProfileNav, JSON.stringify(this.pacs));
    })
    .catch(reason => console.error(reason)); 
  }
  
  private handleWorkProfilesExpandClick(e: MouseEvent) {
    e.preventDefault();
    this.toggleWorkProfilesSection();
  }

  private handleCompaniesExpandClick(e: MouseEvent) {
    e.preventDefault();
    this.toggleCompaniesSection();
  }

  private setCompaniesStyleHeight() {
    if (this.companiesExpanded) {
      this.companies.style.height = this.companies.scrollHeight + "px";
      return;
    }
    this.companies.style.height = "0px";
  }

  private setWorkProfilesStyleHeight() {
    if (this.companyProfilesExpanded) {
      this.companyProfiles.style.height = this.companyProfiles.scrollHeight + "px";
      return;
    }
    this.companyProfiles.style.height = "0px";
  }
  
  private toggleWorkProfilesSection() {
    this.companyProfilesExpanded = !this.companyProfilesExpanded;
    this.setWorkProfilesStyleHeight();
  }

  private toggleCompaniesSection() {
    this.companiesExpanded = !this.companiesExpanded;
    this.setCompaniesStyleHeight();
  }

  render() {
    return (
      <Host>
        <div class="profile-left-container">
          <div class="user-info">
            <strong>{this.me?.FirstName} {this.me?.LastName}</strong>
            <span>{this.me?.Users[0].username}</span>
          </div>
          <div class="links">
            <a href="/profile-person">My Personal Profile</a>
            <div class={this.companyProfilesExpanded ? "expanded" : ""}>
              <a href="/profile-pacs">My Work Profiles</a>
              <button onClick={(e) => this.handleWorkProfilesExpandClick(e)} >
                {this.companyProfilesExpanded ? "-" : "+"}
              </button>
            </div>
            <div ref={el => this.companyProfiles = el} class="company-profiles">
              {this.pacs?.sort((a,b) => {
                var textA = a.attributes.Company.data.attributes.Name.toUpperCase();
                var textB = b.attributes.Company.data.attributes.Name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
              }).map(pac => (
                <a
                  href={`/profile-pac/${pac.id}`}
                  class={pac.id.toString() == this.selectedItemId ? 'company selected' : 'company'}>
                    {pac.attributes.Company.data.attributes.Name}
                </a>
              ))}
            </div>

            <div class={this.companiesExpanded ? "expanded" : ""}>
              <a href="/profile-pacs">My Companies</a>
              <button
                onClick={(e) => this.handleCompaniesExpandClick(e)} >
                {this.companiesExpanded ? "-" : "+"}
              </button>
            </div>
            <div ref={el => this.companies = el} class="company-profiles">
              {this.pacs?.sort((a,b) => {
                var textA = a.attributes.Company.data.attributes.Name.toUpperCase();
                var textB = b.attributes.Company.data.attributes.Name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
              }).map(pac => (
                <a
                  href={`/profile-company/${pac.attributes.Company.data.id}`}
                  class={pac.attributes.Company.data.id.toString() == this.selectedItemId ? 'company selected' : 'company'}>
                    {pac.attributes.Company.data.attributes.Name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Host>
    );
  }

}
