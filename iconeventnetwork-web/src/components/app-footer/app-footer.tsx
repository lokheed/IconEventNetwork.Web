import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-footer',
  styleUrl: 'app-footer.scss',
  shadow: false,
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
          </div>
        </div>
        <div class='container contact-container'>
          <h2>Contact</h2>
          <address>
            307 Fifth Ave.<br/> 
            New York, NY<br/> 
            10016<br/><br/>
            <a href="mailto:info@theiconnetwork.com?subject=Inquiry about the Icon Network">info@theiconnetwork.com</a><br/>
            +1-212-476-9444     
          </address>
        </div>
        <div class='container navigation-container'>
          <app-footer-navigation></app-footer-navigation>
        </div>
        <div class='container navigation-container'>
          <app-footer-legal-links></app-footer-legal-links>
        </div>
        <div class='copyright'>&copy; 2022 Icon Network</div>
     </footer>
    );
  }

}