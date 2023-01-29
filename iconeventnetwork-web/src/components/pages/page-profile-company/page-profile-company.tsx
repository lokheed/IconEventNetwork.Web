import { Component, Prop, State, h } from '@stencil/core';
import { defineCustomElements } from "@revolist/revogrid/loader";

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
    constructor() {
        defineCustomElements();

    }

    @Prop() companyId: number;

    // stubbing in some fake data for the Team Members grid, this will be replaced later
    // with a proper client and definted data
    @State() columns: revoGridColumn[] = 
        [
            { prop: 'DisplayName', name: 'Name', sortable: true, autoSize: true, size: 500 },
            { prop: 'JobTitle', name: 'Title', sortable: true, autoSize: true, size: 300 },
            { prop: 'Department', name: 'Department', sortable: true, autoSize: true, size: 300 },
            { prop: 'id', name: 'ID', sortable: true, autoSize: true, size: 200 }
        ];
    @State() teamMembers: teamMember[] =
        [
            { DisplayName: 'James Doe', JobTitle: 'Office Assistant', Department: 'Administration', id: 98413 },
            { DisplayName: 'Abbey Hansen', JobTitle: 'Senior Designer', Department: 'Marketing', id: 12345 },
            { DisplayName: 'David Hansen', JobTitle: 'Co-Founder', Department: 'Operations', id: 43456 },
            { DisplayName: 'Ron Miles', JobTitle: 'Head of Technology', Department: 'Technology', id: 96587 },
            { DisplayName: 'Amelia Ross', JobTitle: 'Head of Digital Product', Department: 'Technology', id: 23477 },
        ];

    render() {
        return (
            <div class='profile-page company'>
                <aside>
                    PROFILE LEFT NAV GOES HERE
                </aside>
                <main>
                    <div>
                        <span class='action-link-navigation'>&lt; Back to My Companies</span>
                    </div>
                    <h1>Company Two</h1>
                    <div class='tab-grid company'>
                        <div class='tab selected'>Basic Information</div>
                        <div class='tab'>Contact Information</div>
                        <div class='tab'>Features</div>
                        <div class='tab'>Media Gallery</div>
                        <div class='tab'>Team Members</div>
                        <div class='tab'>Company Family</div>
                    </div>
                    <a id='basic-information'></a>
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
                                        <div class='profile-logo'>
                                            <i class="fa-regular fa-image"></i>
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
                                        Company Two
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
                                        Creators of Iconic Events
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
                                        <div>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                                            tempor incididunt ut labore et dolore magna aliqua. Aliquet porttitor 
                                            lacus luctus accumsan. Lobortis mattis aliquam faucibus purus in. Nulla 
                                            pellentesque dignissim enim sit amet venenatis urna. Sit amet dictum sit 
                                            amet. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel. 
                                            Semper feugiat nibh sed pulvinar proin. Vel fringilla est ullamcorper eget 
                                            nulla facilisi. Tempus egestas sed sed risus pretium quam vulputate. 
                                            Vulputate sapien nec sagittis aliquam malesuada. Dapibus ultrices in 
                                            iaculis nunc sed.
                                        </div>
                                        <div class='action-link'>
                                            Read less
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
                    <a id='contact-information'></a>
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
                                <div class='profile-item-row'>
                                    <div class='value'>
                                        <div class='label'>
                                            Office
                                        </div>
                                        <div class='value'>
                                            info@theiconnetwork.com
                                        </div>
                                    </div>
                                    <div class='actions'>
                                        <div class='action'>
                                            <i class="fa-solid fa-pen blue"></i>&nbsp;<span class='action-link primary'>Edit</span>
                                        </div>
                                        <div class='action'>
                                            <i class="fa-solid fa-trash-can brick-red"></i>&nbsp;<span class='action-link secondary'>Delete</span>
                                        </div>                                       
                                    </div>
                                </div>
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
                                <div class='profile-item-row'>
                                    <div class='value'>
                                        <div class='label'>
                                            Fax
                                        </div>
                                        <div class='value'>
                                            +1 (234) 567-8910
                                        </div>
                                    </div>
                                    <div class='actions'>
                                        <div class='action'>
                                            <i class="fa-solid fa-pen blue"></i>&nbsp;<span class='action-link primary'>Edit</span>
                                        </div>
                                        <div class='action'>
                                            <i class="fa-solid fa-trash-can brick-red"></i>&nbsp;<span class='action-link secondary'>Delete</span>
                                        </div>                                       
                                    </div>
                                </div>
                                <hr/>
                                <div class='profile-item-row'>
                                    <div class='value'>
                                        <div class='label'>
                                            Office
                                        </div>
                                        <div class='value'>
                                            +1 (917) 123-4567
                                        </div>
                                    </div>
                                    <div class='actions'>
                                        <div class='action'>
                                            <i class="fa-solid fa-pen blue"></i>&nbsp;<span class='action-link primary'>Edit</span>
                                        </div>
                                        <div class='action'>
                                            <i class="fa-solid fa-trash-can brick-red"></i>&nbsp;<span class='action-link secondary'>Delete</span>
                                        </div>                                       
                                    </div>
                                </div>
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
                                <div class='profile-item-row'>
                                    <div class='value'>
                                        <div class='label'>
                                            Office
                                        </div>
                                        <div class='value'>
                                            100 Main Street<br/>
                                            Dallas, TX 75218
                                        </div>
                                    </div>
                                    <div class='actions'>
                                        <div class='action'>
                                            <i class="fa-solid fa-pen blue"></i>&nbsp;<span class='action-link primary'>Edit</span>
                                        </div>
                                        <div class='action'>
                                            <i class="fa-solid fa-trash-can brick-red"></i>&nbsp;<span class='action-link secondary'>Delete</span>
                                        </div>                                       
                                    </div>
                                </div>
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
                    <a id='features'></a>
                    <h2>Features</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                        ut labore et dolore magna aliqua.
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
                    <a id='features'></a>
                    <h2>Media Gallery</h2>
                    <p>
                        The media assets below will appear alongside the company profile within the directory.
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
                                    <File-Name-Goes-Here className="pdf"></File-Name-Goes-Here>
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
                    <a id='team-members'></a>
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
                        columns={this.columns}
                        source={this.teamMembers}
                    />
                </main>
            </div>
        );
    }
}