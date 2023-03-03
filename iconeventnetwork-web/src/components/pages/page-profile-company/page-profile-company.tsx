import { Component, Listen, Prop, State, h } from '@stencil/core';
import { defineCustomElements } from "@revolist/revogrid/loader";
import { AddressAttributes, CompanyData, CompanyInfo, DataResponse, EmailAddressAttributes, PhoneNumberAttributes } from '../../../services/clients/client-base';
import { GetRequestingPersonResponse, PersonClient } from '../../../services/clients/person-client';
import { CompanyClient, SecurityCheckResponse } from '../../../services/clients/company-client';
import { PersonAtCompanyClient } from '../../../services/clients/person-at-company-client';
import { localStorageKeyService } from '../../../services/local-storage-key-service';
import { LastUpdated } from '../../functionalComponents/LastUpdated';

type teamMember = {
    FirstName: string;
    LastName: string;
    PreferredName: string;
    JobTitle: string;
    id: number;
    IsActive: boolean;
}

@Component({
  tag: 'page-profile-company',
  styleUrl: 'page-profile-company.scss',
  shadow: false,
})
export class PageProfileCompany {
    private readonly personClient: PersonClient;
    private readonly companyClient: CompanyClient;
    private readonly personAtCompanyClient: PersonAtCompanyClient;
    private basicInformationTab: HTMLDivElement;
    private basicInformationTabContent: HTMLDivElement;
    private contactInformationTab: HTMLDivElement;
    private contactInformationTabContent: HTMLDivElement;
    private featuresTab: HTMLDivElement;
    private featuresTabContent: HTMLDivElement;
    private mediaGalleryTab: HTMLDivElement;
    private mediaGalleryTabContent: HTMLDivElement;
    private teamMembersTab: HTMLDivElement;
    private teamMembersTabContent: HTMLDivElement;
    private companyFamilyTab: HTMLDivElement;
    private companyFamilyTabContent: HTMLDivElement;
    constructor() {
        defineCustomElements();
        this.personClient = new PersonClient();
        this.companyClient = new CompanyClient();
        this.personAtCompanyClient = new PersonAtCompanyClient();
    }

    @Prop() companyId: string;
    @State() security: SecurityCheckResponse; 
    @State() me: GetRequestingPersonResponse; 
    @State() company: CompanyData;
    @State() addresses: DataResponse<AddressAttributes>[] = [];  
    @State() emailAddresses: DataResponse<EmailAddressAttributes>[] = [];  
    @State() phoneNumbers: DataResponse<PhoneNumberAttributes>[] = [];  
    @State() parentCompany: CompanyData;
    @State() siblingCompanies: DataResponse<CompanyInfo>[];
    @State() descriptionDisplay: string = '';
    @State() descriptionReadMoreText: string = '';
    @State() includeInactiveTeamMembers: boolean = false;
    @State() teamGridColumns: any[];
    @Listen('addressDeleted') addressDeletedHandler(event: CustomEvent<number>) {
        this.addresses = [...this.addresses.filter(e => e.id != event.detail)];

    }    
    @Listen('emailAddressDeleted') emailAddressDeletedHandler(event: CustomEvent<number>) {
        this.emailAddresses = [...this.emailAddresses.filter(e => e.id != event.detail)];

    }    
    @Listen('phoneNumberDeleted') phoneNumberDeletedHandler(event: CustomEvent<number>) {
        this.phoneNumbers = [...this.phoneNumbers.filter(e => e.id != event.detail)];
    }

    // stubbing in some fake data for the Team Members grid, this will be replaced later
    // with a proper client and definted data
    @State() teamMembers: teamMember[];

    private securityCheck() {
        this.companyClient.securityCheck(this.companyId)
        .then((response) => {
            this.security = response;
            this.getMe();
            this.getCompany();
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

    private getCompany() {
        this.companyClient.getCompany(this.companyId, {
            fields: ['Description', 'Name', 'ParentCompanyId', 'Tagline', 'Website', 'updatedAt'],
            populate: {
                AccountManager: {
                    fields: ['FirstName', 'MiddleName', 'LastName', 'DirectoryName'],                 
                },
                Addresses: {
                    populate: ['country', 'country_subdivision', 'address_type'],
                },
                CompanyStatus: {
                    fields: ['DisplayName'],
                },      
                CompanyType: {
                    fields: ['DisplayName'],
                },      
                CompanySubType: {
                    fields: ['DisplayName'],
                },                 
                EmailAddresses: {
                   populate: ['email_address_type'],
                },
                LogoImage: {
                    fields: ['formats'],
                },
                Media: {
                    fields: ['formats'],
                },
                PhoneNumbers: {
                   populate: ['phone_number_type', 'country'],
                },
                PrimaryContact: {
                    fields: ['FirstName', 'MiddleName', 'LastName', 'DirectoryName'],                 
                },
                SocialMediaAccounts: {
                    populate: ['social_media_type'],
                },
           },
        })
        .then((response) => {
            this.company = response;
            if (this.company?.data?.attributes?.Description && this.company?.data?.attributes?.Description.length <= 250) {
                this.descriptionDisplay = this.company.data.attributes.Description;
            }
            if (this.company?.data?.attributes?.Description && this.company?.data?.attributes?.Description.length > 250) {
                this.descriptionDisplay = this.company.data.attributes.Description.substring(0, 250) + '...';
                this.descriptionReadMoreText = 'Read more';
            }
            
            this.addresses = this.company.data.attributes.Addresses.data;
            this.emailAddresses = this.company.data.attributes.EmailAddresses.data;
            this.phoneNumbers = this.company.data.attributes.PhoneNumbers.data;
        })
        .catch(reason => console.error(reason));  
    }

    private getParentCompanyAndSiblings() {
        if (this.company?.data?.attributes?.ParentCompanyId == 0) {
            this.parentCompany = this.company;
            this.getSiblingCompanies();
        } else {
            this.companyClient.getCompany(this.company.data.attributes.ParentCompanyId.toString(), {
                fields: ['Name'],
                populate: {
                   Addresses: {
                        populate: ['country', 'country_subdivision', 'address_type'],
                    },
               },
            })
            .then((response) => {
                this.parentCompany = response;
                this.getSiblingCompanies();
            })
            .catch(reason => console.error(reason));      
        }
    }

    private getSiblingCompanies() {
        this.companyClient.getCompanies({
            fields: ['Name'],
            populate: {
               Addresses: {
                    populate: ['country', 'country_subdivision', 'address_type'],
                },
           },
           filters: {
                ParentCompanyId: {
                    $eq: this.parentCompany.data.id,
                },
                IsActive: true,
            },
        })
        .then((response) => {
            this.siblingCompanies = response.data
        })
        .catch(reason => console.error(reason));      

    }

    private getActiveTeamMembers() {
        this.personAtCompanyClient.getPersonsAtCompanies({
          fields: ['JobTitle'],
          populate: {
            Person: {
              fields: ['LastName','FirstName','PreferredName'],
            },
          },
          filters: {
            IsActive: {
              $eq: 1,
            },
            Company: {
              id: {
                $eq: this.companyId,
              },
            }
          }
        })
        .then((response) => {
            this.teamMembers = response.data.map((pac) => {
                return {
                    FirstName: pac.attributes?.Person?.data?.attributes?.FirstName??'',
                    LastName: pac.attributes?.Person?.data?.attributes?.LastName??'',
                    PreferredName: pac.attributes?.Person?.data?.attributes?.PreferredName??'',
                    JobTitle: pac.attributes?.JobTitle??'',
                    id: pac.id,
                    IsActive: pac.attributes?.IsActive??false,
                }
            });
        })
        .catch(reason => console.error(reason)); 
    }

    private getAllTeamMembers() {
        this.personAtCompanyClient.getPersonsAtCompanies({
          fields: ['JobTitle'],
          populate: {
            Person: {
              fields: ['LastName','FirstName','PreferredName'],
            },
          },
          filters: {
            Company: {
              id: {
                $eq: this.companyId,
              },
            }
          }
        })
        .then((response) => {
            this.teamMembers = response.data.map((pac) => {
                return {
                    FirstName: pac.attributes?.Person?.data?.attributes?.FirstName??'',
                    LastName: pac.attributes?.Person?.data?.attributes?.LastName??'',
                    PreferredName: pac.attributes?.Person?.data?.attributes?.PreferredName??'',
                    JobTitle: pac.attributes?.JobTitle??'',
                    id: pac.id,
                    IsActive: pac.attributes?.IsActive??false,
                }
            });
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

    private initializeTeamGridColumns() {
        this.teamGridColumns = 
        [
            { 
                prop: 'LastName', 
                name: 'Last Name', 
                sortable: true, 
                autoSize: true, 
                size: 200,
                cellTemplate: (createElement, props) => {
                  return createElement('span', {
                    class: 'last-name',
                  }, props.model[props.prop]);
                },
            },
            { 
                prop: 'FirstName', 
                name: 'First Name', 
                sortable: true, 
                autoSize: false, 
                size: 200,
                cellTemplate: (createElement, props) => {
                  return createElement('span', {
                    class: 'first-name',
                  }, props.model[props.prop]);
                },
             },
            { prop: 'PreferredName', name: 'Preferred Name', sortable: true, autoSize: true, size: 300 },
            { prop: 'JobTitle', name: 'Title', sortable: true, autoSize: true, size: 300 },
            { prop: 'id', name: 'ID', sortable: true, autoSize: true, size: 200 },
            { 
                prop: 'id', 
                name: '', 
                sortable: false, 
                autoSize: true, 
                size: 50, 
                filter: false, 
                pin: 'colPinEnd',
                cellTemplate: (createElement, props) => {
                    return createElement('a', {
                        href: '/profile-pac/' + props.model[props.prop], 
                        class: 'edit-person',                      
                    }, createElement('i', {
                        class: 'fa-solid fa-user',
                    }), '');
                }, 
            }
        ];    
    }
    
    componentWillLoad() {
        this.securityCheck();
        this.initializeTeamGridColumns();
    }        

    tabClick(e: MouseEvent, tab: string) {
        e.preventDefault();
        this.basicInformationTab.classList.remove('selected');
        this.basicInformationTabContent.classList.add('hidden');
        this.contactInformationTab.classList.remove('selected');
        this.contactInformationTabContent.classList.add('hidden');  
        this.featuresTab.classList.remove('selected');
        this.featuresTabContent.classList.add('hidden');    
        this.mediaGalleryTab.classList.remove('selected');
        this.mediaGalleryTabContent.classList.add('hidden');    
        this.teamMembersTab.classList.remove('selected');
        this.teamMembersTabContent.classList.add('hidden');    
        this.companyFamilyTab.classList.remove('selected');
        this.companyFamilyTabContent.classList.add('hidden');         
        switch (tab) {
            case 'basic-information':
                this.basicInformationTab.classList.add('selected');
                this.basicInformationTabContent.classList.remove('hidden');    
                break;
            case 'contact-information':
                this.contactInformationTab.classList.add('selected');
                this.contactInformationTabContent.classList.remove('hidden');    
                break;
            case 'features':
                this.featuresTab.classList.add('selected');
                this.featuresTabContent.classList.remove('hidden');                
                break;
            case 'media-gallery':
                this.mediaGalleryTab.classList.add('selected');
                this.mediaGalleryTabContent.classList.remove('hidden');            
                break;
            case 'team-members':
                this.teamMembersTab.classList.add('selected');
                this.teamMembersTabContent.classList.remove('hidden');              
                break;
            case 'company-family':
                this.companyFamilyTab.classList.add('selected');
                this.companyFamilyTabContent.classList.remove('hidden');                  
                break;
    }


        if (tab == 'team-members') {
            this.includeInactiveTeamMembers ? this.getAllTeamMembers() : this.getActiveTeamMembers();
        }
        if (tab == 'company-family') {
            this.getParentCompanyAndSiblings();
        }
    }

    readMoreClick(e: MouseEvent) {
        e.preventDefault();
        switch (this.descriptionReadMoreText) {
            case 'Read more':
                this.descriptionDisplay = this.company.data.attributes.Description;
                this.descriptionReadMoreText = 'Read less';
                break;
            case 'Read less':
                this.descriptionDisplay = this.company.data.attributes.Description.substring(0, 250) + '...';
                this.descriptionReadMoreText = 'Read more';
                break;
        }
    }
  
    render() {
        return (
            <div class='profile-page company'>
                <aside>
                    <app-profile-left-nav me={this.me} appliesTo='company' selectedItemId={this.companyId} />
                </aside>
                <main>
                    <div>
                        <span onClick={() => window.location.pathname = ('/profile-pacs')} class='action-link-navigation'>&lt; Back to My Companies</span>
                    </div>
                    <div class='company-header'>
                            <h1>{this.company?.data?.attributes?.Name??''}</h1>
                    </div>
                    <div class='tab-grid company'>
                        <div ref={el => this.basicInformationTab = el} onClick={e => this.tabClick(e, 'basic-information')} class='tab selected'>Basic Information</div>
                        <div ref={el => this.contactInformationTab = el} onClick={e => this.tabClick(e, 'contact-information')} class='tab'>Contact Information</div>
                        <div ref={el => this.featuresTab = el} onClick={e => this.tabClick(e, 'features')} class='tab'>Features</div>
                        <div ref={el => this.mediaGalleryTab = el} onClick={e => this.tabClick(e, 'media-gallery')} class='tab'>Media Gallery</div>
                        <div ref={el => this.teamMembersTab = el} onClick={e => this.tabClick(e, 'team-members')} class='tab'>Team Members</div>
                        <div ref={el => this.companyFamilyTab = el} onClick={e => this.tabClick(e, 'company-family')} class='tab'>Company Family</div>
                    </div>

                    <div ref={el => this.basicInformationTabContent = el}>
                        <p>
                            The information below will appear as the company profile within the directory 
                            and can only be edited by those with admin privileges.
                        </p>
                        <div class='profile-box box-container'>
                            <div class='profile-item'>
                                <div class='label centered'>
                                    Logo
                                </div>                            
                                <div class='content'>
                                    <div class='profile-item-row'>
                                        <div class='value'>
                                            { 
                                                this.company?.data?.attributes?.LogoImage ? 
                                                    <app-responsive-image image={this.company.data.attributes.LogoImage} class='logo-image' expectedWidth={75} /> : 
                                                    <div class='profile-logo'><i class="fa-regular fa-image"></i></div> 
                                            }                                           
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
                                            {this.company?.data?.attributes?.Name??''}
                                        </div>
                                        <div class='actions'>
                                            <div class='action'>
                                                <i class="fa-solid fa-pen blue"></i>&nbsp;<span class='action-link primary'>Edit</span>
                                            </div>
                                            <div class='action disabled'>
                                                <i class="fa-solid fa-trash-can disabled"></i>&nbsp;<span class='action-link'>Delete</span>
                                            </div>                                      
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='profile-item'>
                                <div class='label'>
                                    Tagline
                                </div>                            
                                <div class='content'>
                                    <div class='profile-item-row'>
                                        <div class='value'>
                                        {this.company?.data?.attributes?.Tagline??''}
                                        </div>
                                        <div class='actions'>
                                            <div class='action'>
                                                <i class="fa-solid fa-pen"></i>&nbsp;<span class='action-link primary'>Edit</span>
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
                                    Description
                                </div>
                                <div class='content'>
                                    <div class='profile-item-row'>
                                        <div class='value textarea'>
                                            <div innerHTML={this.descriptionDisplay}>
                                                </div>
                                                <div onClick={e => this.readMoreClick(e)} class='action-link'>
                                                    {this.descriptionReadMoreText}
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
                            <div class='item-id'>ID: {this.company?.data?.id}</div>
                            <LastUpdated updatedAt={new Date(this.company?.data?.attributes.updatedAt)} />
                        </div>                    
                    </div>

                    <div ref={el => this.contactInformationTabContent = el} class='hidden'>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                            ut labore et dolore magna aliqua.
                        </p>
                        <div class='profile-box box-container'>
                            <div class='profile-item'>
                                <div class='label'>
                                    Email
                                </div>
                                <div class='content'>
                                    {this.emailAddresses && this.emailAddresses.map(emailAddressItem => 
                                        <app-profile-email-address-item emailAddressItem={emailAddressItem} canEdit={this.security.canManageCompanyDetails} appliesTo='company' companyId={this.company?.data?.id??0} />
                                    )}
                                    {this.security?.canManageCompanyDetails && 
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
                                         <app-profile-phone-number-item phoneNumberItem={phoneNumberItem} canEdit={this.security.canManageCompanyDetails} appliesTo='company' companyId={this.company?.data?.id??0} />
                                    )}
                                    {this.security?.canManageCompanyDetails &&     
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
                                    {this.addresses && this.addresses.map(addressItem => 
                                        <app-profile-address-item addressItem={addressItem} canEdit={this.security.canManageCompanyDetails} appliesTo='company' companyId={this.company?.data?.id??0} />
                                    )}      
                                    {this.security?.canManageCompanyDetails &&                               
                                        <div class='profile-item-row'>
                                            <div class='value'>
                                                <div class='add-another' onClick={e => this.handleAddNewAddress(e)}>
                                                    + <span class='action-link'>Add address</span>
                                                </div>
                                            </div>                                   
                                            <div class='actions'></div>
                                        </div>
                                    }                                
                                </div>
                            </div>
                        </div>
                    </div>

                    <div ref={el => this.featuresTabContent = el} class='hidden'>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                            ut labore et dolore magna aliqua.<br/><b>NOTE: Features are not yet implemented or data bound.</b>
                        </p>
                        <div class='profile-box box-container'>
                            <div class='profile-item'>
                                <div class='label'>
                                    Price Range
                                </div>
                                <div class='content'>
                                    <div class='profile-item-row'>
                                        <div class='value'>
                                            $2000 - $20000
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
                                    Boutique Hotel
                                </div>
                                <div class='content'>
                                    <div class='profile-item-row'>
                                        <div class='value'>
                                            No
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
                                    Guest Accommodations
                                </div>
                                <div class='content'>
                                    <div class='profile-item-row'>
                                        <div class='value small-wide-two-column-list'>
                                            <div>400</div>
                                            <div>Standard Guest Room <span class='smaller'>(2 queen beds)</span></div>
                                            <div>300</div>
                                            <div>Junior Suite <span class='smaller'>(2 queen beds)</span></div>
                                            <div>100</div>
                                            <div>Deluxe Suite <span class='smaller'>(2 queen beds)</span></div>
                                            <div>50</div>
                                            <div>Club Level Suite <span class='smaller'>(king bed, living room, kitchen)</span></div>
                                        </div>
                                        <div class='actions'>
                                            <div class='action'>
                                                <i class="fa-solid fa-pen blue"></i>&nbsp;<span class='action-link primary'>Edit</span>
                                            </div>
                                            <div class='action'>
                                                <i class="fa-solid fa-trash-can"></i>&nbsp;<span class='action-link'>Delete</span>
                                            </div>                                      
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='profile-item'>
                                <div class='label'>
                                    Outdoor Venue
                                </div>
                                <div class='content'>
                                    <div class='profile-item-row'>
                                        <div class='value small-wide-two-column-list'>
                                            <div>Yes</div>
                                            <div></div>
                                            <div><i class="fa-solid fa-check green"></i></div>
                                            <div>Permanent</div>
                                            <div><i class="fa-solid fa-check green"></i></div>
                                            <div>Paved</div>
                                            <div><i class="fa-solid fa-check green"></i></div>
                                            <div>Restrooms Facilities</div>
                                        </div>
                                        <div class='actions'>
                                            <div class='action'>
                                                <i class="fa-solid fa-pen blue"></i>&nbsp;<span class='action-link primary'>Edit</span>
                                            </div>
                                            <div class='action'>
                                                <i class="fa-solid fa-trash-can"></i>&nbsp;<span class='action-link'>Delete</span>
                                            </div>                                      
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='profile-item'>
                                <div class='label'>
                                    Amenities
                                </div>
                                <div class='content'>
                                    <div class='profile-item-row'>
                                        <div class='value small-wide-two-column-list'>
                                            <div><i class="fa-solid fa-check green"></i></div>
                                            <div>Kosher kitchen</div>
                                            <div><i class="fa-solid fa-check green"></i></div>
                                            <div>Kid-friendly</div>
                                            <div><i class="fa-solid fa-check green"></i></div>
                                            <div>Golf Course</div>
                                            <div><i class="fa-solid fa-check green"></i></div>
                                            <div>Chapel</div>
                                            <div><i class="fa-solid fa-check green"></i></div>
                                            <div>Ocean views</div>
                                            <div><i class="fa-solid fa-xmark red"></i></div>
                                            <div class='disabled'>Valet</div>
                                        </div>
                                        <div class='actions'>
                                            <div class='action'>
                                                <i class="fa-solid fa-pen blue"></i>&nbsp;<span class='action-link primary'>Edit</span>
                                            </div>
                                            <div class='action'>
                                                <i class="fa-solid fa-trash-can"></i>&nbsp;<span class='action-link'>Delete</span>
                                            </div>                                      
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div ref={el => this.mediaGalleryTabContent = el} class='hidden'>
                        <p>
                            The media assets below will appear alongside the company profile within the directory.<br/><b>NOTE: Media Gallery is not yet implemented or data bound.</b>
                        </p>
                        <div class='media-grid'>
                            <div class='media-box box-container'>
                                <div class='media-preview'>
                                    <i class="fa-regular fa-image"></i>
                                </div>
                                <div class='media-info'>
                                    <div class='filename'>
                                        File-Name-Goes-Here.jpg
                                    </div>
                                    <div class='filetype'>
                                        Image
                                    </div>
                                </div>
                                <div class='actions'>
                                    <div class='edit'><span>Edit</span></div>
                                    <div class='delete'><i class="fa-solid fa-trash-can"></i></div>
                                </div>
                            </div>
                            <div class='media-box box-container'>
                                <div class='media-preview'>
                                    <i class="fa-regular fa-image"></i>
                                </div>
                                <div class='media-info'>
                                    <div class='filename'>
                                        File-Name-Goes-Here.pdf
                                    </div>
                                    <div class='filetype'>
                                        PDF
                                    </div>
                                </div>
                                <div class='actions'>
                                    <div class='edit'><span>Edit</span></div>
                                    <div class='delete'><i class="fa-solid fa-trash-can"></i></div>
                                </div>
                            </div>
                            <div class='media-box box-container'>
                                <div class='media-preview'>
                                    <i class="fa-regular fa-image"></i>
                                </div>
                                <div class='media-info'>
                                    <div class='filename'>
                                        File-Name-Goes-Here.png
                                    </div>
                                    <div class='filetype'>
                                        Image
                                    </div>
                                </div>
                                <div class='actions'>
                                    <div class='edit'><span>Edit</span></div>
                                    <div class='delete'><i class="fa-solid fa-trash-can"></i></div>
                                </div>
                            </div>
                            <div class='media-box box-container'>
                                <div class='media-preview'>
                                    <i class="fa-regular fa-image"></i>
                                </div>
                                <div class='media-info'>
                                    <div class='filename'>
                                        File-Name-Goes-Here.jpg
                                    </div>
                                    <div class='filetype'>
                                        Image
                                    </div>
                                </div>
                                <div class='actions'>
                                    <div class='edit'><span>Edit</span></div>
                                    <div class='delete'><i class="fa-solid fa-trash-can"></i></div>
                                </div>
                            </div>
                            <div class='media-box box-container'>
                                <div class='media-preview'>
                                    <i class="fa-regular fa-image"></i>
                                </div>
                                <div class='media-info'>
                                    <div class='filename'>
                                        File-Name-Goes-Here.mp4
                                    </div>
                                    <div class='filetype'>
                                        Video
                                    </div>
                                </div>
                                <div class='actions'>
                                    <div class='edit'><span>Edit</span></div>
                                    <div class='delete'><i class="fa-solid fa-trash-can"></i></div>
                                </div>
                            </div>
                            <div class='add-media-box box-container'>
                                <div>
                                    <i class="fa-solid fa-circle-plus"></i>
                                </div>
                                <div class='call-to-action'>
                                    Add an asset
                                </div>
                                <div>
                                    Max file size: 10MB
                                </div>
                            </div>
                        </div>
                    </div>

                    <div ref={el => this.teamMembersTabContent = el} class='hidden'>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                            ut labore et dolore magna aliqua.
                        </p>
                        <revo-grid
                            class='revo-grid box-container'
                            autoSizeColumn
                            resize
                            filter
                            theme='material'
                            columns={this.teamGridColumns}
                            source={this.teamMembers}
                        />
                        <div class='include-inactive'>
                            <label class="checkbox-container">
                                Include inactive team members
                                <input 
                                    type='checkbox' 
                                    onChange={() => {
                                        this.includeInactiveTeamMembers = !this.includeInactiveTeamMembers;
                                        this.includeInactiveTeamMembers ? this.getAllTeamMembers() : this.getActiveTeamMembers();
                                    }} 
                                />
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>

                    <div ref={el => this.companyFamilyTabContent = el} class='hidden'>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                            ut labore et dolore magna aliqua.
                        </p>
                        <h3>Parent Company</h3>
                        <div class='company-list'>
                            <div class='action-link'>
                                <a
                                    href={`/profile-company/${this.parentCompany?.data?.id??0}`}>
                                    {this.parentCompany?.data?.attributes?.Name??''}
                                </a>                               
                            </div>
                            <div class='location-name'>
                                {(this.parentCompany?.data?.attributes?.Addresses?.data?.length??0) > 0 &&
                                    <div>
                                        {this.parentCompany.data.attributes.Addresses.data[0].attributes.City??''}
                                        ,&nbsp;
                                        {(this.parentCompany.data.attributes.Addresses.data[0].attributes.country?.data?.attributes?.A2??'') == 'US' &&
                                            <span>
                                                {this.parentCompany.data.attributes.Addresses.data[0].attributes.country_subdivision?.data?.attributes?.Name??''}
                                            </span>
                                        }
                                        {(this.parentCompany.data.attributes.Addresses.data[0].attributes.country?.data?.attributes?.A2??'') != 'US' &&
                                            <span>
                                                {this.parentCompany.data.attributes.Addresses.data[0].attributes.country?.data?.attributes?.Name??''}
                                            </span>
                                        }                                    
                                    </div>
                                }
                            </div>
                            <div class='item-id'>ID: {this.parentCompany?.data?.id??0}</div>
                        </div>
                        {(this.siblingCompanies?.length??0) > 0 &&  
                            <div class='child-companies-group'>
                                <h3>Children Companies</h3>                             
                                {this.siblingCompanies.map(company => 
                                    <div class='company-list child-companies'>
                                        <div class='action-link'>
                                            <a
                                                href={`/profile-company/${company?.id??0}`}>
                                                {company?.attributes?.Name??''}
                                            </a>                               
                                        </div>
                                        <div class='location-name'>
                                            {(company?.attributes?.Addresses?.data?.length??0) > 0 &&
                                                <div>
                                                    {company.attributes.Addresses.data[0].attributes.City??''}
                                                    ,&nbsp;
                                                    {(company.attributes.Addresses.data[0].attributes.country?.data?.attributes?.A2??'') == 'US' &&
                                                        <span>
                                                            {company.attributes.Addresses.data[0].attributes.country_subdivision?.data?.attributes?.Name??''}
                                                        </span>
                                                    }
                                                    {(company.attributes.Addresses.data[0].attributes.country?.data?.attributes?.A2??'') != 'US' &&
                                                        <span>
                                                            {company.attributes.Addresses.data[0].attributes.country?.data?.attributes?.Name??''}
                                                        </span>
                                                    }                                    
                                                </div>
                                            }
                                        </div>
                                        <div class='item-id'>ID: {company?.id??0}</div>
                                    </div>
                                )} 
                            </div>
                        }                        
                    </div>
                </main>
            </div>
        );
    }
}