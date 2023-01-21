import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'page-profile-person',
  styleUrl: 'page-profile-person.scss',
  shadow: false,
})
export class PageProfilePerson {
    render() {
        return (
            <Host>
                <div>PROFILE LEFT NAV GOES HERE</div>
                <div>
                    PERSON PROFILE PAGE CONTENT GOES HERE
                </div>
            </Host>
        );
    }
}
