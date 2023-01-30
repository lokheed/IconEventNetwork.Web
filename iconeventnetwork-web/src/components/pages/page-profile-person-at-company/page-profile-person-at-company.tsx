import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'page-profile-person-at-company',
  styleUrl: 'page-profile-person-at-company.scss',
  shadow: false,
})
export class PageProfilePersonAtCompany {
    @Prop() personAtCompanyId: number;

    render() {
        return (
            <div class='profile-page person-at-company'>
                <aside>
                    PROFILE LEFT NAV GOES HERE
                </aside>
                <main>
                    <div>
                        <span class='action-link-navigation'>&lt; Back to My Companies</span>
                    </div>
                    <div class='company-header'>
                        <div>
                            <h1>Company Two</h1>
                        </div>
                        <div class='action-column'>
                            <div class='action-link'>View company page</div>
                        </div>
                    </div>
                    <div class='tab-grid'>
                        <div class='tab selected'>My Basic Information</div>
                        <div class='tab'>My Contact Information</div>
                    </div>
                    <a id='basic-information'></a>
                    <h2>My Basic Information</h2>
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
                                        Ron Miles <span class='pronouns'>(he/him/his)</span>
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
                                        Senior Designer
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
                                Job Function
                            </div>
                            <div class='content'>
                                <div class='profile-item-row'>
                                    <div class='value'>
                                        Manager
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
                    <h2>My Contact Information</h2>
                    <p>
                        The information below will appear as your contact information within the company page.
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
                                            Work
                                        </div>
                                        <div class='value'>
                                            rmiles@theiconnetwork.com
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
                                            Mobile
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
                                            Work
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
                </main>
            </div>
        );
    }
}