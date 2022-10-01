import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-terms-of-service',
  styleUrl: 'page-terms-of-service.css',
  shadow: true,
})
export class PageTermsOfService {
  render() {
    return (
      <div class="page-terms-of-service">
        <h1>Terms of Service</h1>
        <p>This is the terms of service page.</p>
      </div>
    );
  }
}
