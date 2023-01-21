import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'page-profile-person-at-company',
  styleUrl: 'page-profile-person-at-company.scss',
  shadow: false,
})
export class PageProfilePersonAtCompany {
    @Prop() personAtCompanyId: number;

    render() {
        return (
            <Host>
                <div>[PROFILE LEFT NAV GOES HERE</div>
                <div>
                    [INDIVIDUAL PERSON AT COMPANY PAGE CONTENT GOES HERE]
                </div>
            </Host>
        );
    }
}