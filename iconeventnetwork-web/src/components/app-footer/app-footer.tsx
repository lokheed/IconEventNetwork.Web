import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-footer',
  styleUrl: 'app-footer.css',
  shadow: true,
})
export class AppFooter {
  render() {
    return (
      <footer>
        <div class='container logo-container'>
          <div>
            <a href='/'>
              <img src='https://pro-icon-strapi.s3.amazonaws.com/icon_logo_white_a2dca55220.png' />
            </a>
          </div>
          <div>
            <a href='#'><img class='icon' src='/assets/icon/facebook-icon-transparent-white.png' /></a>
            <a href='#'><img class='icon' src='/assets/icon/instagram-icon-transparent-white.png' /></a>
          </div>
        </div>
        <div class='container contact-container'>
          <h2>Contact</h2>
          <address>
            E: <a href="mailto:info@iconeventnetwork.com">info@iconeventnetwork</a>         
          </address>
        </div>
        <div class='container navigation-container'>
          <app-footer-navigation></app-footer-navigation>
        </div>
     </footer>
    );
  }

}