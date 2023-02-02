import { Component, State, h } from '@stencil/core';

// these three imports are just to test
import { DataResponse } from '../../../services/clients/client-base';
import { GetRequestingPersonResponse, PersonClient } from '../../../services/clients/person-client';
import { localStorageKeyService } from '../../../services/local-storage-key-service';

@Component({
  tag: 'page-profile-person',
  styleUrl: 'page-profile-person.scss',
  shadow: false,
})
export class PageProfilePerson {
    // lines 15 - 35 are an example for David Poindexter on how to get the logged-in user's info for the profile menu
    private readonly personClient: PersonClient;
    constructor(){
      this.personClient = new PersonClient();
    }  
    @State() me: DataResponse<GetRequestingPersonResponse>; 
    private getMe() {
        var storedMe = sessionStorage.getItem(localStorageKeyService.Me);
        if (storedMe) {
          this.me = JSON.parse(storedMe);
          return;
        }
        this.personClient.getRequestingPerson()
        .then((response) => {
          this.me = response.data;
          sessionStorage.setItem(localStorageKeyService.Me, JSON.stringify(this.me));
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
                    <h1>Welcome, Ron M.</h1>
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
                                Username
                            </div>                            
                            <div class='content'>
                                <div class='profile-item-row'>
                                    <div class='value'>
                                        rmiles
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
                    <div class='id-timestamp'>
                        <div class='item-id'>ID: 12345</div>
                        <div class='updated-message'>Last updated January 5, 2023</div>
                    </div>
                </main>
            </div>
        );
    }
}
