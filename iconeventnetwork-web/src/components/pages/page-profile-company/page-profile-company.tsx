import { Component, Prop, State, h } from '@stencil/core';
import { defineCustomElements } from "@revolist/revogrid/loader";
import { CompanyData } from '../../../services/clients/client-base';
import { CompanyClient, SecurityCheckResponse } from '../../../services/clients/company-client';
import { ProfileEmailAddressItem } from '../../functionalComponents/ProfileEmailAddressItem';
import { ProfilePhoneNumberItem } from '../../functionalComponents/ProfilePhoneNumberItem';
import { ProfileAddressItem } from '../../functionalComponents/ProfileAddressItem';

// stubbing in some fake types for the Team Members grid, these will be replaced later
// wither properly defined types in the data client
type revoGridColumn = {
    prop: string;
    name: string;
    sortable: boolean;
    autoSize: boolean;
    size: number;
}
type teamMember = {
    DisplayName: string;
    JobTitle: string;
    Department: string;
    id: number;
}

@Component({
  tag: 'page-profile-company',
  styleUrl: 'page-profile-company.scss',
  shadow: false,
})
export class PageProfileCompany {
    private readonly companyClient: CompanyClient;
    constructor() {
        defineCustomElements();
        this.companyClient = new CompanyClient();
    }

    @Prop() companyId: string;
    @State() security: SecurityCheckResponse; 
    @State() company: CompanyData;  
    @State() basicInformationTabClass: string = 'tab selected';
    @State() basicInformationClass: string = '';
    @State() contactInformationTabClass: string = 'tab';
    @State() contactInformationClass: string = 'hidden';
    @State() featuresTabClass: string = 'tab';
    @State() featuresClass: string = 'hidden';
    @State() mediaGalleryTabClass: string = 'tab';
    @State() mediaGalleryClass: string = 'hidden';
    @State() teamMembersTabClass: string = 'tab';
    @State() teamMembersClass: string = 'hidden';
    @State() companyFamilyTabClass: string = 'tab';
    @State() companyFamilyClass: string = 'hidden';
    @State() descriptionDisplay: string = '';
    @State() descriptionReadMoreText: string = '';

    // stubbing in some fake data for the Team Members grid, this will be replaced later
    // with a proper client and definted data
    @State() teamMembers: teamMember[] =
        [
            { DisplayName: 'James Doe', JobTitle: 'Office Assistant', Department: 'Administration', id: 98413 },
            { DisplayName: 'Abbey Hansen', JobTitle: 'Senior Designer', Department: 'Marketing', id: 12345 },
            { DisplayName: 'David Hansen', JobTitle: 'Co-Founder', Department: 'Operations', id: 43456 },
            { DisplayName: 'Ron Miles', JobTitle: 'Head of Technology', Department: 'Technology', id: 96587 },
            { DisplayName: 'Amelia Ross', JobTitle: 'Head of Digital Product', Department: 'Technology', id: 23477 },
        ];

    private securityCheck() {
        this.companyClient.securityCheck(this.companyId)
        .then((response) => {
            this.security = response;
            this.getCompany();
        })
        .catch((reason) => window.location.pathname = '/access-denied/' + encodeURI(reason.error.message));  
    }
 
    private getCompany() {
        this.companyClient.getCompany(this.companyId, {
            fields: ['Description', 'Name', 'ParentCompanyId', 'Tagline', 'Website'],
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
                   populate: ['phone_number_type'],
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
        })
        .catch(reason => console.error(reason));  
    }

    componentWillLoad() {
        this.securityCheck();
    }        

    tabClick(e: MouseEvent, tab: string) {
        e.preventDefault();
        this.basicInformationTabClass = tab == 'basic-information' ? 'tab selected' : 'tab';
        this.basicInformationClass = tab == 'basic-information' ? '' : 'hidden';
        this.contactInformationTabClass = tab == 'contact-information' ? 'tab selected' : 'tab';
        this.contactInformationClass = tab == 'contact-information' ? '' : 'hidden';
        this.featuresTabClass = tab == 'features' ? 'tab selected' : 'tab';
        this.featuresClass = tab == 'features' ? '' : 'hidden';
        this.mediaGalleryTabClass = tab == 'media-gallery' ? 'tab selected' : 'tab';
        this.mediaGalleryClass = tab == 'media-gallery' ? '' : 'hidden';
        this.teamMembersTabClass = tab == 'team-members' ? 'tab selected' : 'tab';
        this.teamMembersClass = tab == 'team-members' ? '' : 'hidden';
        this.companyFamilyTabClass = tab == 'company-family' ? 'tab selected' : 'tab';
        this.companyFamilyClass = tab == 'company-family' ? '' : 'hidden';
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
        const columns: revoGridColumn[] = 
        [
            { prop: 'DisplayName', name: 'Name', sortable: true, autoSize: true, size: 500 },
            { prop: 'JobTitle', name: 'Title', sortable: true, autoSize: true, size: 300 },
            { prop: 'Department', name: 'Department', sortable: true, autoSize: true, size: 200 },
            { prop: 'id', name: 'ID', sortable: true, autoSize: true, size: 200 }
        ];
        return (
            <div class='profile-page company'>
                <aside>
                    PROFILE LEFT NAV GOES HERE
                </aside>
                <main>
                    <div>
                        <span onClick={() => window.location.pathname = ('/profile-pacs')} class='action-link-navigation'>&lt; Back to My Companies</span>
                    </div>
                    <h1>{this.company?.data?.attributes?.Name??''}</h1>
                    <div class='tab-grid company'>
                        <div onClick={e => this.tabClick(e, 'basic-information')} class={this.basicInformationTabClass}>Basic Information</div>
                        <div onClick={e => this.tabClick(e, 'contact-information')} class={this.contactInformationTabClass}>Contact Information</div>
                        <div onClick={e => this.tabClick(e, 'features')} class={this.featuresTabClass}>Features</div>
                        <div onClick={e => this.tabClick(e, 'media-gallery')} class={this.mediaGalleryTabClass}>Media Gallery</div>
                        <div onClick={e => this.tabClick(e, 'team-members')} class={this.teamMembersTabClass}>Team Members</div>
                        <div onClick={e => this.tabClick(e, 'company-family')} class={this.companyFamilyTabClass}>Company Family</div>
                    </div>

                    <div class={this.basicInformationClass}>
                        <h2>Basic Information</h2>
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
                    </div>

                    <div class={this.contactInformationClass}>
                        <h2>Contact Information</h2>
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
                                    {this.company?.data?.attributes?.EmailAddresses?.data && this.company?.data?.attributes?.EmailAddresses?.data.map(emailAddressItem => 
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
                                    {this.company?.data?.attributes?.PhoneNumbers?.data && this.company?.data?.attributes?.PhoneNumbers?.data.map(phoneNumberItem => 
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
                                    {this.company?.data.attributes?.Addresses?.data && this.company?.data?.attributes?.Addresses?.data.map(addressItem => 
                                        <ProfileAddressItem addressItem={addressItem} />
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
                        </div>
                    </div>

                    <div class={this.featuresClass}>
                        <h2>Features</h2>
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

                    <div class={this.mediaGalleryClass}>
                        <h2>Media Gallery</h2>
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

                    <div class={this.teamMembersClass}>
                        <h2>Team Members</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                            ut labore et dolore magna aliqua.
                        </p>
                        <revo-grid
                            class='revo-grid box-container'
                            autoSizeColumn={true}
                            resize={true}
                            filter={true}
                            theme='material'
                            columns={columns}
                            source={this.teamMembers}
                        />
                        <div>
                            <input type='checkbox' id='include-inactive-team-members' />
                            <label>Include inactive team members</label>
                        </div>
                    </div>

                    <div class={this.companyFamilyClass}>
                        <h2>Company Family</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                            ut labore et dolore magna aliqua.
                        </p>
                        <h3>Parent Company</h3>
                        <div class='company-list'>
                            <div class='action-link'>The Ritz-Carlton Hotel Company</div>
                            <div class='location-name'>New York, New York</div>
                            <div class='item-id'>ID: 1234</div>
                        </div>
                        <h3>Children Companies</h3>
                        <div class='company-list child-companies'>
                            <div class='action-link'>The Ritz-Carlton Amelia Island</div>
                            <div class='location-name'>Amelia Island, Florida</div>
                            <div class='item-id'>ID: 1235</div>
                            <div class='action-link'>The Ritz-Carlton Downtown</div>
                            <div class='location-name'>New York, New York</div>
                            <div class='item-id'>ID: 1236</div>
                            <div class='action-link'>The Ritz-Carlton Grand Lakes</div>
                            <div class='location-name'>Orlando, Florida</div>
                            <div class='item-id'>ID: 1237</div>
                            <div class='action-link'>The Ritz-Carlton Phuket</div>
                            <div class='location-name'>Phuket, Thailand</div>
                            <div class='item-id'>ID: 1238</div>
                            <div class='action-link'>The Ritz-Carlton Riviera</div>
                            <div class='location-name'>Monaco City, Monaco</div>
                            <div class='item-id'>ID: 1239</div>
                            <div class='action-link'>The Ritz-Carlton Sarasota</div>
                            <div class='location-name'>Sarasota, Florida</div>
                            <div class='item-id'>ID: 1240</div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}