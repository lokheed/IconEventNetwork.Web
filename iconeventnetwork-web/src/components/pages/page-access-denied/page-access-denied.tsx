import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'page-access-denied',
  styleUrl: 'page-access-denied.scss',
  shadow: false,
})
export class PageAccessDenied {
    @Prop() message: string;
  render() {
    return (
      <Host>
        <div class='hero'>
          <h1>
            Access Denied
          </h1>
          <p>
            { decodeURI(this.message) }
          </p>
        </div>        
      </Host>
    );
  }
}
