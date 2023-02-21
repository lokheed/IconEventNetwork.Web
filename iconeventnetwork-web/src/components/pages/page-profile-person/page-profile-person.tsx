import { Component, State, h } from '@stencil/core';
import { DataResponse, PersonInfo } from '../../../services/clients/client-base';
import { GetRequestingPersonResponse, PersonClient } from '../../../services/clients/person-client';
import { localStorageKeyService } from '../../../services/local-storage-key-service';
import { WelcomePersonName } from '../../functionalComponents/WelcomePersonName';
import { PersonNameAndPronouns } from '../../functionalComponents/PersonNameAndPronouns';
import { ProfilePhoneNumberItem } from '../../functionalComponents/ProfilePhoneNumberItem';
import { ProfileAddressItem } from '../../functionalComponents/ProfileAddressItem';
import { LastUpdated } from '../../functionalComponents/LastUpdated';
import { ProfileImageDisc } from '../../functionalComponents/ProfileImageDisc';

@Component({
  tag: 'page-profile-person',
  styleUrl: 'page-profile-person.scss',
  shadow: false,
})
export class PageProfilePerson {
    private readonly personClient: PersonClient;
    constructor(){
      this.personClient = new PersonClient();
    }  
    @State() me: GetRequestingPersonResponse; 
    @State() person: DataResponse<PersonInfo>;
    private getMe() {
        var storedMe = sessionStorage.getItem(localStorageKeyService.Me);
        if (storedMe) {
          this.me = JSON.parse(storedMe);
          this.getPerson(this.me.id);
          return;
        }
        this.personClient.getRequestingPerson()
        .then((response) => {
          this.me = response;
          sessionStorage.setItem(localStorageKeyService.Me, JSON.stringify(this.me));
          this.getPerson(this.me.id);
        })
        .catch(reason => console.error(reason));
    } 
    private getPerson(personId) {
        this.personClient.getPerson(personId, {
            fields: ['FirstName', 'MiddleName', 'LastName', 'DirectoryName', 'updatedAt'],
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
            },
          })
          .then((response) => {
            this.person = response.data;
         })
          .catch(reason => console.error(reason));  
    }

    componentWillLoad() {
        this.getMe();
    }    
    
    render() {
        const username: string = localStorage.getItem(localStorageKeyService.Username);
        return (
            <div class='profile-page'>
                <aside>
                    <app-profile-left-nav me={this.me} />
                </aside>
                <main>
                    <WelcomePersonName me={this.me} />
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
                                        <ProfileImageDisc profileImage={this.person?.attributes?.ProfileImage} firstName={this.person?.attributes?.FirstName} lastName={this.person?.attributes?.LastName} />
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
                                        {username}
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
                                    <app-profile-email-address-item emailAddressItem={emailAddressItem} />
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
