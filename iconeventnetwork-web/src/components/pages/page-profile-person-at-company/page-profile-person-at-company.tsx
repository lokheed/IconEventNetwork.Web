import { Component, Listen, State, Prop, h } from '@stencil/core';
import { PersonAtCompanyClient, SecurityCheckResponse } from '../../../services/clients/person-at-company-client';
import { DataResponse, EmailAddressAttributes, PersonAtCompanyData, PhoneNumberAttributes } from '../../../services/clients/client-base';
import { GetRequestingPersonResponse, PersonClient } from '../../../services/clients/person-client';
import { localStorageKeyService } from '../../../services/local-storage-key-service';
import { ProfileImageDisc } from '../../functionalComponents/ProfileImageDisc';
import { PersonNameAndPronouns } from '../../functionalComponents/PersonNameAndPronouns';
import { ProfileAddressItem } from '../../functionalComponents/ProfileAddressItem';
import { LastUpdated } from '../../functionalComponents/LastUpdated';

@Component({
  tag: 'page-profile-person-at-company',
  styleUrl: 'page-profile-person-at-company.scss',
  shadow: false,
})
export class PageProfilePersonAtCompany {
    private readonly personClient: PersonClient;
    private readonly personAtCompanyClient: PersonAtCompanyClient;
    private basicInformationTab: HTMLDivElement;
    private basicInformationTabContent: HTMLDivElement;
    private contactInformationTab: HTMLDivElement;
    private contactInformationTabContent: HTMLDivElement;
    constructor(){
      this.personClient = new PersonClient();
      this.personAtCompanyClient = new PersonAtCompanyClient();
    }  
    @Prop() personAtCompanyId: string;
    @State() security: SecurityCheckResponse;   
    @State() me: GetRequestingPersonResponse; 
    @State() personAtCompany: PersonAtCompanyData;
    @State() emailAddresses: DataResponse<EmailAddressAttributes>[] = [];   
    @State() phoneNumbers: DataResponse<PhoneNumberAttributes>[] = [];   
    @State() bioDisplay: string = '';
    @State() bioReadMoreText: string = '';
    @State() contactInformationClass: string = 'hidden';
    @State() contactInformationTabClass: string = 'tab';
    @Listen('emailAddressDeleted') emailAddressDeletedHandler(event: CustomEvent<number>) {
        this.emailAddresses = [...this.emailAddresses.filter(e => e.id != event.detail)];
    }    
    @Listen('phoneNumberDeleted') phoneNumberDeletedHandler(event: CustomEvent<number>) {
        this.phoneNumbers = [...this.phoneNumbers.filter(e => e.id != event.detail)];
    }


    private securityCheck() {
        this.personAtCompanyClient.securityCheck(this.personAtCompanyId)
        .then((response) => {
            this.security = response;
            this.getMe();
            this.getPac();
        })
        .catch((reason) => window.location.pathname = '/access-denied/' + encodeURI(reason.error.message));  
    }
    private getMe() {
        var storedMe = sessionStorage.getItem(localStorageKeyService.Me);
        if (storedMe) {
          this.me = JSON.parse(storedMe);
          return;
        }
        this.personClient.getRequestingPerson()
        .then((response) => {
          this.me = response;
          sessionStorage.setItem(localStorageKeyService.Me, JSON.stringify(this.me));
        })
        .catch(reason => console.error(reason));
    } 
    private getPac() {
        this.personAtCompanyClient.getPersonAtCompany(this.personAtCompanyId, {
            fields: ['Bio', 'JobTitle', 'updatedAt'],
            populate: {
                Addresses: {
                    populate: ['country', 'country_subdivision', 'address_type'],
                },
                Company: {
                    fields: ['Name'],
                },                
                EmailAddresses: {
                   populate: ['email_address_type'],
                },
                PhoneNumbers: {
                   populate: ['phone_number_type', 'country'],
                },
                Person: {
                    fields: ['FirstName', 'MiddleName', 'LastName', 'DirectoryName'],
                    populate: {
                        prefix: {
                            fields: ['Name'],
                        },
                        ProfileImage: {
                            fields: ['formats'],
                        },
                        Pronoun: {
                            fields: ['Name'],
                        },
                        Suffix: {
                            fields: ['Name'],
                        },   
                    }                  
                },
                SocialMediaAccounts: {
                    populate: ['social_media_type'],
                },
           },
        })
        .then((response) => {
            this.personAtCompany = response;
            if (this.personAtCompany?.data?.attributes?.Bio && this.personAtCompany.data.attributes.Bio.length <= 250) {
                this.bioDisplay = this.personAtCompany.data.attributes.Bio;
            }
            if (this.personAtCompany?.data?.attributes?.Bio && this.personAtCompany.data.attributes.Bio.length > 250) {
                this.bioDisplay = this.personAtCompany.data.attributes.Bio.substring(0, 250) + '...';
                this.bioReadMoreText = 'Read more';
            }           
            this.emailAddresses = this.personAtCompany.data.attributes.EmailAddresses.data;
            this.phoneNumbers = this.personAtCompany.data.attributes.PhoneNumbers.data;
        })
        .catch(reason => console.error(reason));  
    }

    componentWillLoad() {
        this.securityCheck();
    }        

    readMoreClick(e: MouseEvent) {
        e.preventDefault();
        switch (this.bioReadMoreText) {
            case 'Read more':
                this.bioDisplay = this.personAtCompany.data.attributes.Bio;
                this.bioReadMoreText = 'Read less';
                break;
            case 'Read less':
                this.bioDisplay = this.personAtCompany.data.attributes.Bio.substring(0, 250) + '...';
                this.bioReadMoreText = 'Read more';
                break;
        }
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

    render() {
        return (
            <div class='profile-page person-at-company'>
                <aside>
                    <app-profile-left-nav me={this.me} appliesTo='personAtCompany' selectedItemId={this.personAtCompanyId} />
                </aside>
                <main>
                    <div>
                        <span class='action-link-navigation' onClick={() => window.location.pathname = ('/profile-pacs')}>&lt; Back to My Companies</span>
                    </div>
                    <div class='company-header'>
                        <div>
                            <h1>{this.personAtCompany?.data?.attributes?.Company?.data?.attributes?.Name??'Unknown Company'}</h1>
                        </div>
                        <div class='action-column'>
                            <div class='action-link' onClick={() => window.location.pathname = (`/profile-company/${this.personAtCompany?.data?.attributes?.Company?.data?.id??0}`)}>View company page</div>
                        </div>
                    </div>
                    <div class='tab-grid'>
                        <div ref={el => this.basicInformationTab = el} onClick={e => this.tabClick(e, 'basic-information')} class='tab selected'>My Basic Information</div>
                        <div ref={el => this.contactInformationTab = el} onClick={e => this.tabClick(e, 'contact-information')} class='tab'>My Contact Information</div>
                    </div>
                    <div ref={el => this.basicInformationTabContent = el}>
                        <p>
                            The information below will appear as your profile within the company page.
                        </p>
                        <div class='profile-box box-container'>
                            <div class='profile-item'>
                                <div class='label centered'>
                                    Profile Picture
                                </div>                            
                                <div class='content'>
                                    <div class='profile-item-row'>
                                        <div class='value'>
                                            <ProfileImageDisc profileImage={this.personAtCompany?.data?.attributes?.Person?.data?.attributes?.ProfileImage} firstName={this.personAtCompany?.data?.attributes?.Person?.data?.attributes?.FirstName} lastName={this.personAtCompany?.data?.attributes?.Person?.data?.attributes?.LastName} />
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
                                            <PersonNameAndPronouns person={this.personAtCompany?.data?.attributes?.Person.data} />
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
                                    Job Title
                                </div>
                                <div class='content'>
                                    <div class='profile-item-row'>
                                        <div class='value'>
                                            {this.personAtCompany?.data?.attributes?.JobTitle??''}
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
                            <div class='profile-item last'>
                                <div class='label'>
                                    Bio
                                </div>
                                <div class='content'>
                                    <div class='profile-item-row'>
                                        <div class='value textarea'>
                                            <div innerHTML={this.bioDisplay}>
                                            </div>
                                            <div onClick={e => this.readMoreClick(e)} class='action-link'>
                                                {this.bioReadMoreText}
                                            </div>
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
                        </div>
                        <div class='id-timestamp'>
                            <div class='item-id'>ID: {this.personAtCompany?.data?.id}</div>
                            <LastUpdated updatedAt={new Date(this.personAtCompany?.data?.attributes.updatedAt)} />
                        </div>                     
                    </div>
                    <div ref={el => this.contactInformationTabContent = el} class='hidden'>
                        <p>
                            The information below will appear as your contact information within the company page.
                        </p>
                        <div class='profile-box box-container'>
                            <div class='profile-item'>
                                <div class='label'>
                                    Email
                                </div>
                                <div class='content'>
                                    {this.emailAddresses && this.emailAddresses.map(emailAddressItem => 
                                        <app-profile-email-address-item emailAddressItem={emailAddressItem} canEdit={this.security.canManageProfileFields} appliesTo='personAtCompany' personAtCompanyId={this.personAtCompany?.data?.id??0} />
                                    )}    
                                    {this.security?.canManageProfileFields &&
                                        <div class='profile-item-row'>
                                            <div class='value'>
                                                <div class='add-another' onClick={e => this.handleAddNewEmailAddress(e)}>
                                                    + <span class='action-link'>Add email address</span>
                                                </div>
                                            </div>                                   
                                            <div class='actions'></div>
                                        </div>    
                                    }                                                        
                                </div>
                            </div>
                            <div class='profile-item'>
                                <div class='label'>
                                    Phone
                                </div>
                                <div class='content'>
                                    {this.phoneNumbers && this.phoneNumbers.map(phoneNumberItem => 
                                        <app-profile-phone-number-item phoneNumberItem={phoneNumberItem} canEdit={this.security.canManageProfileFields} appliesTo='personAtCompany' personAtCompanyId={this.personAtCompany?.data?.id??0} />
                                    )}    
                                    {this.security?.canManageProfileFields &&                                
                                        <div class='profile-item-row'>
                                            <div class='value'>
                                                <div class='add-another' onClick={e => this.handleAddNewPhoneNumber(e)}>
                                                    + <span class='action-link'>Add phone number</span>
                                                </div>
                                            </div>                                   
                                            <div class='actions'></div>
                                        </div>   
                                    }                             
                                </div>
                            </div>
                            <div class='profile-item last'>
                                <div class='label'>
                                    Address
                                </div>
                                <div class='content'>
                                    {this.personAtCompany?.data.attributes?.Addresses?.data && this.personAtCompany?.data?.attributes?.Addresses?.data.map(addressItem => 
                                        <ProfileAddressItem addressItem={addressItem} />
                                    )}                                
                                    <div class='profile-item-row'>
                                        <div class='value'>
                                            <div class='add-another'>
                                                + <span class='action-link'>Add email address</span>
                                            </div>
                                        </div>                                   
                                        <div class='actions'></div>
                                </div>                                
                                </div>
                            </div>
                        </div>  
                    </div>           
                </main>
            </div>
        );
    }
}