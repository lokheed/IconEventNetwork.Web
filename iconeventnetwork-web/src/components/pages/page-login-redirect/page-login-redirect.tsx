import { Component, Host, State, h } from '@stencil/core';
import { urlService } from '../../../services/url-service';

@Component({
  tag: 'page-login-redirect',
  styleUrl: 'page-login-redirect.scss',
  shadow: false,
})
export class PageLoginRedirect {
  @State() currentText: string = 'Logging In...';

  componentDidRender() {
    var strapiBaseUrl = urlService.getApiBaseUrl();


    // Successfully logged with the provider
    // Now logging with strapi by using the access_token (given by the provider) in props.location.search
    fetch(`${strapiBaseUrl}/api/auth/cognito/callback${window.location.search}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then(res => res.json())
      .then(res => {
        // Successfully logged with Strapi
        // Now saving the jwt to use it for future authenticated requests to Strapi
        localStorage.setItem('jwt', res.jwt);
        localStorage.setItem('username', res.user.username);
        this.currentText = 'You have been successfully logged in. You will be redirected shortly...';
        window.location.replace('/')
      })
      .catch(err => {
        console.error(err);
        this.currentText = 'An error occurred, please see the developer console.';
      });
  }

  render() {
    return (
      <Host>
        <div class='hero'>
          <p>{this.currentText}</p>
        </div>
      </Host>        
    )
  }
}
