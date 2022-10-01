import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-footer-legal-links',
  styleUrl: 'app-footer-legal-links.css',
  shadow: true,
})
export class AppFooterLegalLinks {
  render() {
      return (
        <Host>
            <h2>Legal Information</h2>
            <ul>               
                <li>
                    <stencil-route-link url="/code-of-conduct">
                        Code of Conduct
                    </stencil-route-link>
                </li>
                <li>
                    <stencil-route-link url="/terms-of-service">
                        Terms of Service
                    </stencil-route-link>
                </li>
                <li>
                    <stencil-route-link url="/privacy-policy" >
                        Privacy Policy
                    </stencil-route-link>
                </li>
                <li>
                <stencil-route-link url="/cookie-policy" >
                        Cookie Policy
                    </stencil-route-link>
                </li>            
          </ul>
        </Host>
      );
    }
 }