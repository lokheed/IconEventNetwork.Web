import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-profile-person',
  styleUrl: 'page-profile-person.scss',
  shadow: false,
})
export class PageProfilePerson {
    render() {
        return (
            <div class='profile-page'>
                <aside>
                    PROFILE LEFT NAV GOES HERE
                </aside>
                <main>
                    <div class='updated-message'>Profile last updated January 5, 2023</div>
                    <h1>Welcome, Ron M.</h1>
                    <h2>My Personal Profile Information</h2>
                    <p>The information below is associated with your account and will not appear in the directory.</p>
                    <div class='profile-box'>
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
                                            <i class="fa-solid fa-pen blue"></i>&nbsp;<span class='action-link'>Edit</span>
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
                                        rmiles
                                    </div>
                                    <div class='actions'>
                                        <div class='action disabled'>
                                            <i class="fa-solid fa-pen"></i>&nbsp;<span class='action-link'>Edit</span>
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
                                <div class='profile-item-row'>
                                    <div class='value'>
                                        <div class='label'>
                                            Personal
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
                                            Home
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
                    <div class='item-id'>ID: 12345</div>
                </main>
            </div>
        );
    }
}
