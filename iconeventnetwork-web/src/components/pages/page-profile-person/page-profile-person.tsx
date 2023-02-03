import { Component, State, h } from '@stencil/core';
import { DataResponse } from '../../../services/clients/client-base';
import { GetPersonResponse, GetRequestingPersonResponse, PersonClient } from '../../../services/clients/person-client';
import { GetPersonsAtCompaniesResponse, PersonAtCompanyClient } from '../../../services/clients/person-at-company-client'; // this will be removed
import { localStorageKeyService } from '../../../services/local-storage-key-service';
import { WelcomePersonName } from '../../functionalComponents/WelcomePersonName';
import { PersonNameAndPronouns } from '../../functionalComponents/PersonNameAndPronouns';
import { ProfileEmailAddressItem } from '../../functionalComponents/ProfileEmailAddressItem';
import { ProfilePhoneNumberItem } from '../../functionalComponents/ProfilePhoneNumberItem';
import { ProfileAddressItem } from '../../functionalComponents/ProfileAddressItem';
import { LastUpdated } from '../../functionalComponents/LastUpdated';

@Component({
  tag: 'page-profile-person',
  styleUrl: 'page-profile-person.scss',
  shadow: false,
})
export class PageProfilePerson {
    // lines 16 - 75 are an example for David and Daneil on how to get the logged-in user's info for the profile menu and the profile left navigation
    private readonly personClient: PersonClient;
    private readonly personAtCompanyClient: PersonAtCompanyClient; // this will be removed
    constructor(){
      this.personClient = new PersonClient();
      this.personAtCompanyClient = new PersonAtCompanyClient(); // this will be removed
    }  
    @State() me: DataResponse<GetRequestingPersonResponse>; 
    @State() person: DataResponse<GetPersonResponse>;
    @State() pacs: DataResponse<GetPersonsAtCompaniesResponse>; // this will be removed
    private getMe() {
        var storedMe = sessionStorage.getItem(localStorageKeyService.Me);
        if (storedMe) {
          this.me = JSON.parse(storedMe);
          this.getPerson(this.me.id);
          this.getPacs(this.me.id); // this will be removed
          return;
        }
        this.personClient.getRequestingPerson()
        .then((response) => {
          this.me = response.data;
          sessionStorage.setItem(localStorageKeyService.Me, JSON.stringify(this.me));
          this.getPerson(this.me.id);
          this.getPacs(this.me.id); // this will be removed
        })
        .catch(reason => console.error(reason));
    } 
    private getPerson(personId) {
        this.personClient.getPerson(personId, {
            fields: ['FirstName', 'LastName', 'DirectoryName', 'updatedAt'],
            populate: {
                Addresses: {
                     populate: ['country', 'country_subdivision', 'address_type'],
                },
                EmailAddresses: {
                    populate: ['email_address_type'],
                },
                PhoneNumbers: {
                    populate: ['phone_number_type'],
                },
                prefix: {
                    fields: ['Name'],
                },
                ProfileImage: {
                    fields: ['formats'],
                },
                Pronoun: {
                    fields: ['Name'],
                },
                SocialMediaAccounts: {
                    populate: ['social_media_type'],
                },
                Suffix: {
                    fields: ['Name'],
                },
                Users: {
                    fields: ['username', 'email'],
                }
            },
          })
          .then((response) => {
            this.person = response.data;
         })
          .catch(reason => console.error(reason));  
    }
    private getPacs(personId) { // this will be removed
        var storedPacs = sessionStorage.getItem('pacs');
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
                Person: {
                    id: {
                        $eq: personId,
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
            sessionStorage.setItem('pacs', JSON.stringify(this.pacs));
        })
          .catch(reason => console.error(reason));  
    }

    componentWillLoad() {
        this.getMe();
    }    
    
    render() {
        return (
            <div class='profile-page'>
                <aside>
                    PROFILE LEFT NAV GOES HERE
                </aside>
                <main>
                    <WelcomePersonName person={this.person} />
                    <h2>My Personal Profile Information</h2>
                    <p>The information below is associated with your account and will not appear in the directory.</p>
                    <div class='profile-box box-container'>
                        <div class='profile-item'>
                            <div class='label centered'>
                                Profile Picture
                            </div>                            
                            <div class='content'>
                                <div class='profile-item-row'>
                                    <div class='value'>
                                        <div class='profile-image'>
                                            RM
                                        </div>
                                    </div>
                                    <div class='actions centered'>
                                        <div class='action'>
                                            <i class="fa-solid fa-pen blue"></i>&nbsp;<span class='action-link primary'>Edit</span>
                                        </div>
                                        <div class='action'>
                                            <i class="fa-solid fa-trash-can brick-red"></i>&nbsp;<span class='action-link secondary'>Delete</span>
                                        </div>                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='profile-item'>
                            <div class='label'>
                                Name
                            </div>
                            <div class='content'>
                                <div class='profile-item-row'>
                                    <div class='value'>
                                        <PersonNameAndPronouns person={this.person} />
                                    </div>
                                    <div class='actions'>
                                        <div class='action'>
                                            <i class="fa-solid fa-pen blue"></i>&nbsp;<span class='action-link primary'>Edit</span>
                                        </div>
                                        <div class='action disabled'>
                                            <i class="fa-solid fa-trash-can"></i>&nbsp;<span class='action-link'>Delete</span>
                                        </div>                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='profile-item'>
                            <div class='label'>
                                Username
                            </div>                            
                            <div class='content'>
                                <div class='profile-item-row'>
                                    <div class='value'>
                                        {this.person?.attributes?.Users?.data[0]?.attributes.username}
                                    </div>
                                    <div class='actions'>
                                        <div class='action disabled'>
                                            <i class="fa-solid fa-pen"></i>&nbsp;<span class='action-link primary'>Edit</span>
                                        </div>
                                        <div class='action disabled'>
                                            <i class="fa-solid fa-trash-can"></i>&nbsp;<span class='action-link'>Delete</span>
                                        </div>                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='profile-item'>
                            <div class='label'>
                                Email
                            </div>
                            <div class='content'>
                                {this.person?.attributes?.EmailAddresses?.data && this.person?.attributes?.EmailAddresses?.data.map(emailAddressItem => 
                                    <ProfileEmailAddressItem emailAddressItem={emailAddressItem} />
                                )}                                
                                <div class='profile-item-row'>
                                    <div class='value'>
                                        <div class='add-another'>
                                            + <span class='action-link'>Add another email address</span>
                                        </div>
                                    </div>                                   
                                    <div class='actions'></div>
                                </div>                                
                            </div>
                        </div>
                        <div class='profile-item'>
                            <div class='label'>
                                Phone
                            </div>
                            <div class='content'>
                                {this.person?.attributes?.PhoneNumbers?.data && this.person?.attributes?.PhoneNumbers?.data.map(phoneNumberItem => 
                                    <ProfilePhoneNumberItem phoneNumberItem={phoneNumberItem} />
                                )}                                
                                <div class='profile-item-row'>
                                    <div class='value'>
                                        <div class='add-another'>
                                            + <span class='action-link'>Add another phone number</span>
                                        </div>
                                    </div>                                   
                                    <div class='actions'></div>
                                </div>                                
                            </div>
                        </div>
                        <div class='profile-item last'>
                            <div class='label'>
                                Address
                            </div>
                            <div class='content'>
                                {this.person?.attributes?.Addresses?.data && this.person?.attributes?.Addresses?.data.map(addressItem => 
                                    <ProfileAddressItem addressItem={addressItem} />
                                )}                                
                                <div class='profile-item-row'>
                                    <div class='value'>
                                        <div class='add-another'>
                                            + <span class='action-link'>Add another address</span>
                                        </div>
                                    </div>                                   
                                    <div class='actions'></div>
                               </div>                                
                            </div>
                        </div>
                    </div>
                    <div class='id-timestamp'>
                        <div class='item-id'>ID: {this.person?.id}</div>
                        <LastUpdated updatedAt={new Date(this.person?.attributes.updatedAt)} />
                    </div>
                </main>
            </div>
        );
    }
}
