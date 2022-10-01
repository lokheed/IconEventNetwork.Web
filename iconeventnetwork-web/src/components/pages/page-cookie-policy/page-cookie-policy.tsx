import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-cookie-policy',
  styleUrl: 'page-cookie-policy.css',
  shadow: true,
})
export class PageCookiePolicy {
  render() {
    return (
      <div class="page-cookie-policy">
        <h1>Cookie Policy</h1>
        <p>This is the cookie policy page</p>
      </div>
    );
  }
}
