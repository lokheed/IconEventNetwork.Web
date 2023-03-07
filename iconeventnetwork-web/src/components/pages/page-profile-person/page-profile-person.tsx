import { Component, Listen, State, h } from '@stencil/core';
import { DataResponse, AddressAttributes, EmailAddressAttributes, LanguageAttributes, PersonInfo, PhoneNumberAttributes } from '../../../services/clients/client-base';
import { GetRequestingPersonResponse, PersonClient } from '../../../services/clients/person-client';
import { localStorageKeyService } from '../../../services/local-storage-key-service';
import { WelcomePersonName } from '../../functionalComponents/WelcomePersonName';
import { LastUpdated } from '../../functionalComponents/LastUpdated';
import { ProfileImageDisc } from '../../functionalComponents/ProfileImageDisc';

@Component({
  tag: 'page-profile-person',
  styleUrl: 'page-profile-person.scss',
  shadow: false,
})
export class PageProfilePerson {
    private readonly personClient: PersonClient;
    private basicInformationTab: HTMLDivElement;
    private basicInformationTabContent: HTMLDivElement;
    private contactInformationTab: HTMLDivElement;
    private contactInformationTabContent: HTMLDivElement;
    constructor(){
      this.personClient = new PersonClient();
    }  
    @State() me: GetRequestingPersonResponse; 
    @State() person: DataResponse<PersonInfo>;
    @State() preferredLanguage: DataResponse<LanguageAttributes>;
    @State() addresses: DataResponse<AddressAttributes>[] = [];   
    @Listen('addressDeleted') addressDeletedHandler(event: CustomEvent<number>) {
        this.addresses = [...this.addresses.filter(e => e.id != event.detail)];
    }
    @State() emailAddresses: DataResponse<EmailAddressAttributes>[] = [];   
    @Listen('emailAddressDeleted') emailAddressDeletedHandler(event: CustomEvent<number>) {
        this.emailAddresses = [...this.emailAddresses.filter(e => e.id != event.detail)];
    }
    @State() phoneNumbers: DataResponse<PhoneNumberAttributes>[] = [];     
    @Listen('phoneNumberDeleted') phoneNumberDeletedHandler(event: CustomEvent<number>) {
        this.phoneNumbers = [...this.phoneNumbers.filter(e => e.id != event.detail)]
    }

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
            fields: ['FirstName', 'MiddleName', 'LastName', 'DirectoryName', 'PreferredName', 'updatedAt'],
            populate: {
                Addresses: {
                     populate: ['country', 'country_subdivision', 'address_type'],
                },
                EmailAddresses: {
                    populate: ['email_address_type'],
                },
                PhoneNumbers: {
                    populate: ['phone_number_type', 'country'],
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
                PreferredLanguage: {
                    fields: ['EnglishName'],
                },
            },
          })
          .then((response) => {
            this.person = response.data;
            this.addresses = this.person.attributes.Addresses.data;
            this.emailAddresses = this.person.attributes.EmailAddresses.data;
            this.phoneNumbers = this.person.attributes.PhoneNumbers.data;
            this.preferredLanguage = this.person.attributes.PreferredLanguage?.data??{ id: 0, attributes: { EnglishName: '(none specified)'}};
         })
          .catch(reason => console.error(reason));  
    }

    private handleAddNewAddress(e: MouseEvent) {
        e.preventDefault();
        this.addresses = [...this.addresses, {
            id: 0,
            attributes: {
                Line1: '',
                Line2: '',
                City: '',
                PostalCode: '',
                country: {
                    data: {
                        id: 0,
                        attributes: {
                            Name: '',
                            A2: '',
                            A3: '',
                            Number: 0,
                        }
                    }
                },
                country_subdivision: {
                    data: {
                        id: 0,
                        attributes: {
                            Name: '',
                            Code: '',
                        }
                    }
                },
                address_type: {
                    data: {
                        id: 0,
                        attributes: {
                            Name: '',
                            Rank: 0,
                        }
                    }
                }
            }
        }];   
    }

    private handleAddNewEmailAddress(e: MouseEvent) {
        e.preventDefault();
        this.emailAddresses = [...this.emailAddresses, {
            id: 0,
            attributes: {
                IsValidated: false,
                EmailAddress: '',
                email_address_type: {
                    data: {
                        id: 0,
                        attributes: {
                            Name: '',
                            Rank: 0,
                        }
                    }
                }
            }
        }];   
    }

    private handleAddNewPhoneNumber(e: MouseEvent) {
        e.preventDefault();
        this.phoneNumbers = [...this.phoneNumbers, { 
            id: 0,
            attributes: {
                RawFormat: '',
                IsValidated: false,
                E164Format: '',
                InternationalFormat: '',
                NationalFormat: '',
                country: {
                    data: {
                        id: 0,
                        attributes: {
                            Name: '',
                            A2: '',
                            A3: '',
                            Number: 0,
                        }
                    }
                },
                phone_number_type: {
                    data: {
                        id: 0,
                        attributes: {
                            Name: '',
                            Rank: 0,
                        }
                    }
                },
            }
        }];   
    } 

    tabClick(e: MouseEvent, tab: string) {
        e.preventDefault();
        this.basicInformationTab.classList.remove('selected');
        this.basicInformationTabContent.classList.add('hidden');
        this.contactInformationTab.classList.remove('selected');
        this.contactInformationTabContent.classList.add('hidden');                  
        switch (tab) {
            case 'basic-information':
                this.basicInformationTab.classList.add('selected');
                this.basicInformationTabContent.classList.remove('hidden');               
                break;
            case 'contact-information':
                this.contactInformationTab.classList.add('selected');
                this.contactInformationTabContent.classList.remove('hidden');                   
                break;
        }
    }

    componentWillLoad() {
        this.getMe();
    }    
    
    render() {
        const username: string = localStorage.getItem(localStorageKeyService.Username);
        return (
            <div class='profile-page'>
                <aside>
                    <app-profile-left-nav me={this.me} appliesTo='person' />
                </aside>
                <main>
                    <WelcomePersonName me={this.me} />
                    <div class='tab-grid'>
                        <div ref={el => this.basicInformationTab = el} onClick={e => this.tabClick(e, 'basic-information')} class='tab selected'>My Basic Information</div>
                        <div ref={el => this.contactInformationTab = el} onClick={e => this.tabClick(e, 'contact-information')} class='tab'>My Contact Information</div>
                    </div>
                    <div ref={el => this.basicInformationTabContent = el}>
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
                                    {this.person &&
                                        <app-profile-name-item canEdit personItem={this.person} />
                                    }                                   
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
                                    Preferred Language
                                </div>                            
                                <div class='content'>
                                    {this.person && this.preferredLanguage &&
                                        <app-profile-preferred-language-item canEdit languageItem={this.preferredLanguage} personId={this.person.id} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref={el => this.contactInformationTabContent = el} class='hidden'>
                        <p>The information below is associated with your account and will not appear in the directory.</p>
                        <div class='profile-box box-container'>
                            <div class='profile-item'>
                                <div class='label'>
                                    Email
                                </div>
                                <div class='content'>
                                    {this.emailAddresses && this.emailAddresses?.map(emailAddressItem => 
                                        <app-profile-email-address-item emailAddressItem={emailAddressItem} canEdit appliesTo='person' personId={this.person?.id??0} />
                                    )}                                
                                    <div class='profile-item-row'>
                                        <div class='value'>
                                            <div class='add-another' onClick={e => this.handleAddNewEmailAddress(e)}>
                                                + <span class='action-link'>Add email address</span>
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
                                    {this.phoneNumbers && this.phoneNumbers.map(phoneNumberItem => 
                                        <app-profile-phone-number-item phoneNumberItem={phoneNumberItem} canEdit appliesTo='person' personId={this.person?.id??0} />
                                    )}                                
                                    <div class='profile-item-row'>
                                        <div class='value'>
                                            <div class='add-another' onClick={e => this.handleAddNewPhoneNumber(e)}>
                                                + <span class='action-link'>Add phone number</span>
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
                                    {this.addresses && this.addresses.map(addressItem => 
                                        <app-profile-address-item addressItem={addressItem} canEdit appliesTo='person' personId={this.person?.id??0} />
                                    )}                                
                                    <div class='profile-item-row'>
                                        <div class='value'>
                                            <div class='add-another' onClick={e => this.handleAddNewAddress(e)}>
                                                + <span class='action-link'>Add address</span>
                                            </div>
                                        </div>                                   
                                        <div class='actions'></div>
                                    </div>                                
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
