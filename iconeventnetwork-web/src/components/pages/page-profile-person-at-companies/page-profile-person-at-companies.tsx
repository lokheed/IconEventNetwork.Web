import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-profile-person-at-companies',
  styleUrl: 'page-profile-person-at-companies.scss',
  shadow: false,
})
export class PageProfilePersonAtCompanies {
    render() {
        return (
            <div class='profile-page'>
                <aside>
                    PROFILE LEFT NAV GOES HERE
                </aside>
                <main>
                    <h1>Welcome, Ron M.</h1>
                    <h2>My Company Profiles</h2>
                    <p>
                        Below are the companies you are currently associated with. To view your profile
                        within the company, <b>View profile</b>. To view the company page, <b>View company</b>.
                    </p>
                    <div class='companies-grid'>
                        <div class='company-box box-container'>
                            <div class='company-row'>
                                <div class='logo'>
                                    <i class="fa-regular fa-image"></i>
                                </div>
                                <div class='company-name'>
                                    The Icon Network
                                </div>
                            </div>
                            <hr />
                            <div class='company-row'>
                                <button class='primary-action'>View profile</button>
                                <button class='secondary-action'>View company</button>
                            </div>
                        </div>
                        <div class='company-box box-container'>
                            <div class='company-row'>
                                <div class='logo'>
                                    <i class="fa-regular fa-image"></i>
                                </div>
                                <div class='company-name'>
                                    Lokheed Enterprises
                                </div>
                            </div>
                            <hr />
                            <div class='company-row'>
                                <button class='primary-action'>View profile</button>
                                <button class='secondary-action'>View company</button>
                            </div>                        
                        </div> 
                        <div class='company-box box-container'>
                            <div class='company-row'>
                                <div class='logo'>
                                    <i class="fa-regular fa-image"></i>
                                </div>
                                <div class='company-name'>
                                    Ron's Super Awesome Happy Funtime Party Planning Service
                                </div>
                            </div>
                            <hr />
                            <div class='company-row'>
                                <button class='primary-action'>View profile</button>
                                <button class='secondary-action'>View company</button>
                            </div>                        
                        </div>                          
                    </div>
                    <div>
                        <span class='action-link'>View my former companies</span>
                    </div>
                    <div class='companies-list box-container'>
                        <div class='company-item'>
                            <div class='label'>
                                Company Name One
                            </div>
                            <div class='status'>
                                Status: Active
                            </div>
                            <div class='contact'>
                                <span class='action-link'>Contact admin</span>
                            </div>
                        </div>
                        <div class='company-item'>
                            <div class='label'>
                                Company Name Two
                            </div>
                            <div class='status'>
                                Status: Active
                            </div>
                            <div class='contact'>
                                <span class='action-link'>Contact admin</span>
                            </div>
                        </div>
                        <div class='company-item'>
                            <div class='label'>
                                Company Name Three
                            </div>
                            <div class='status'>
                                Status: Active
                            </div>
                            <div class='contact'>
                                <span class='action-link'>Contact admin</span>
                            </div>
                        </div>
                        <div class='company-item disabled'>
                            <div class='label'>
                                Company Name Four
                            </div>
                            <div class='status'>
                                Status: Inactive
                            </div>
                            <div class='contact'>
                                <span class='action-link'>Contact admin</span>
                            </div>
                        </div>
                        <div class='company-item disabled last'>
                            <div class='label'>
                                Company Name Five
                            </div>
                            <div class='status'>
                                Status: Inactive
                            </div>
                            <div class='contact'>
                                <span class='action-link'>Contact admin</span>
                            </div>
                        </div>
                    </div>
                    <div class='collapse-container'>
                        <span class='action-link'>Collapse</span>
                    </div>                
                </main>
            </div>
        );
    }
}