import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'page-not-found',
  styleUrl: 'page-not-found.scss',
  shadow: false,
})
export class PageNotFound {
  render() {
    return (
      <Host>
        <div class='hero'>
          <h1>
            Whoops! 
            <br/>
            Page Not Found
          </h1>
          <p>
            The page requested has moved or does not exist.
          </p>
        </div>        
      </Host>
    );
  }
}
