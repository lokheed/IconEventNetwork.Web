import { Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'page-login-redirect',
  styleUrl: 'page-login-redirect.css',
  shadow: true,
})
export class PageLoginRedirect {
  @Prop() strapiBaseUrl!: string;
  @State() text: string = 'Loading...';

  render() {
    var currentText = this.text;

    // Successfully logged with the provider
    // Now logging with strapi by using the access_token (given by the provider) in props.location.search
    fetch(`${this.strapiBaseUrl}/api/auth/cognito/callback${window.location.search}`)
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
        currentText = 'You have been successfully logged in. You will be redirected in a few seconds...';
        window.location.replace('/')
      })
      .catch(err => {
        console.log(err);
        currentText = 'An error occurred, please see the developer console.';
      });

  
    return <p>{currentText}</p>
  
  }

}