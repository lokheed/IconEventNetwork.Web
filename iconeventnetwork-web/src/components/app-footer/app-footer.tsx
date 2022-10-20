import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-footer',
})
export class AppFooter {
  render() {
    return (
      <footer>
        <div class='container logo-container'>
          <div>
            <a href='/'>
              <img class='icon-network-vertical-logo' src='/assets/icon/TIN-Logo-Vertical-Reversed.png' />
            </a>
          </div>
          <div>
            <a href='#'><img class='icon' src='/assets/icon/Social-Icon-Facebook.png' /></a>
            <a href='#'><img class='icon' src='/assets/icon/Social-Icon-Instagram.png' /></a>
            <a href='#'><img class='icon' src='/assets/icon/Social-Icon-LinkedIn.png' /></a>
          </div>
        </div>
        <div class='container contact-container'>
          <h2>Contact</h2>
          <address>
            <a href="mailto:info@iconeventnetwork.com?subject=Inquiry about The Icon Network">info@iconeventnetwork</a>
            <br/>
            +1-123-456-7890         
          </address>
        </div>
        <div class='container navigation-container'>
          <app-footer-navigation></app-footer-navigation>
        </div>
        <div class='container navigation-container'>
          <app-footer-legal-links></app-footer-legal-links>
        </div>
     </footer>
    );
  }

}