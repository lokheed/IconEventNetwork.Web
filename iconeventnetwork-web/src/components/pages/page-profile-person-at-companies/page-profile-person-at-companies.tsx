import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'page-profile-person-at-companies',
  styleUrl: 'page-profile-person-at-companies.scss',
  shadow: false,
})
export class PageProfilePersonAtCompanies {
    render() {
        return (
            <Host>
                <div>[PROFILE LEFT NAV GOES HERE]</div>
                <div>
                    [PERSON'S LIST OF PERSON AT COMPANY RECORDS PAGE CONTENT GOES HERE]
                </div>
            </Host>
        );
    }
}