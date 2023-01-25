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
                        <div class='company-box'>
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
                        <div class='company-box'>
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
                            </div>                        </div> 
                        <div class='company-box'>
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
                </main>
            </div>
        );
    }
}