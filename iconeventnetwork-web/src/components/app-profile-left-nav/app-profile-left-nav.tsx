import { Component, Host, h, Prop, State } from '@stencil/core';
import { DataResponse } from '../../components';
import { PersonAtCompanyInfo } from '../../services/clients/client-base';
import { PersonAtCompanyClient } from '../../services/clients/person-at-company-client';
import { GetRequestingPersonResponse } from '../../services/clients/person-client';

@Component({
  tag: 'app-profile-left-nav',
  styleUrl: 'app-profile-left-nav.scss',
  shadow: false,
  scoped: true,
})
export class AppProfileLeftNav {
  
  @Prop() me!: GetRequestingPersonResponse; 

  @State() pacs: DataResponse<PersonAtCompanyInfo>[];
  @State() companyProfilesExpanded: boolean = false;

  private personAtCompanyClient : PersonAtCompanyClient;
  private companyProfiles: HTMLDivElement;
  private companiesExpanded: boolean = false;
  private companies: HTMLDivElement;

  componentWillLoad() {
    this.personAtCompanyClient = new PersonAtCompanyClient();
    this.getPacs();
  }

  private getPacs() {
    this.personAtCompanyClient.getPersonsAtCompanies({
      fields: ['JobTitle'],
      populate: {
        Company: {
          fields: ['Name'],
        },
      },
      filters: {
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
    })
    .catch(reason => console.error(reason)); 
  }

  render() {
    return (
      <Host>
        <div class="profile-left-container">
          <div class="user-info">
            <strong>{this.me?.FirstName} {this.me?.LastName}</strong>
            <span>{this.me.Users[0].email}</span>
          </div>
          <div class="links">
            <a href="/profile-person">My Personal Profile</a>
            <div class={this.companyProfilesExpanded ? "expanded" : ""}>
              <a href="/profile-pacs">My Work Profiles</a>
              <button
                onClick={() => {
                  this.companyProfilesExpanded = !this.companyProfilesExpanded;
                  if (this.companyProfilesExpanded) {
                    this.companyProfiles.style.height = this.companyProfiles.scrollHeight + "px";
                    return;
                  }
                  this.companyProfiles.style.height = "0px";
                }}
              >
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
                  href={`/profile-pac/${pac.attributes.Company.data.id}`}>
                    {pac.attributes.Company.data.attributes.Name}
                </a>
              ))}
            </div>

            <div class={this.companiesExpanded ? "expanded" : ""}>
              <a href="/profile-company">My Companies</a>
              <button
                onClick={() => {
                  this.companiesExpanded = !this.companiesExpanded;
                  if (this.companiesExpanded) {
                    this.companies.style.height = this.companyProfiles.scrollHeight + "px";
                    return;
                  }
                  this.companies.style.height = "0px";
                }}
              >
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
                  href={`/profile-company/${pac.attributes.Company.data.id}`}>
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
