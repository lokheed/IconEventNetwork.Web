import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'page-profile-company',
  styleUrl: 'page-profile-company.scss',
  shadow: false,
})
export class PageProfileCompany {
    @Prop() companyId: number;

    render() {
        return (
            <Host>
                <div>PROFILE LEFT NAV GOES HERE</div>
                <div>
                    COMPANY PROFILE PAGE CONTENT GOES HERE
                </div>
            </Host>
        );
    }
}