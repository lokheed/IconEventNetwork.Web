import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-privacy-policy',
  styleUrl: 'page-privacy-policy.css',
  shadow: true,
})
export class PagePrivacyPolicy {
  render() {
    return (
      <div class="page-privacy-policy">
        <h1>Privacy Policy</h1>
        <p>This is the privacy policy page.</p>
      </div>
    );
  }
}
