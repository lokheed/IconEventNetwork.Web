import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'page-about-us',
})
export class PageAboutUs {
  render() {
    return (
      <Host>
        <h1>About Us</h1>
        <p>This is the About Us page.</p>
      </Host>
    );
  }
}
