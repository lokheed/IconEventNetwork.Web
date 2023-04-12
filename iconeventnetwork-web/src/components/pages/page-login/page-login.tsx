import { Component, Host, State, h } from '@stencil/core';
import { AuthenticationData } from '../../../services/clients/client-base';
import { LoginClient } from '../../../services/clients/login-client';
import { localStorageKeyService } from '../../../services/local-storage-key-service';
@Component({
  tag: 'page-login',
  styleUrl: 'page-login.scss',
  shadow: false,
})
export class PageLogin {
  private loginClient: LoginClient;
  constructor() {
      this.loginClient = new LoginClient();
  }  
  @State() username: string = '';
  @State() password: string = '';

  private handleUserNameChange(event) {
      this.username = event.target.value;
  } 

  private handlePasswordChange(event) {
      this.password = event.target.value;
  } 

  private handleLoginClick(e: MouseEvent) {
    e.preventDefault();
    let authenticationData: AuthenticationData = {
      identifier: this.username,
      password: this.password
    }
    this.loginClient.authenticate(authenticationData)
    .then((response) => {
      // Successfully logged with Strapi
      // Now saving the jwt to use it for future authenticated requests to Strapi
      localStorage.setItem(localStorageKeyService.Jwt, response.jwt);
      localStorage.setItem(localStorageKeyService.Username, response.user.username);
      localStorage.setItem(localStorageKeyService.LoginEmail, response.user.email);
      window.location.replace('/home')
    })
    .catch(reason => {
        console.log(reason.error.message);
    });
  }

  render() {  
    return (
      <Host>
        <div class='accent-block'>
          <div class='form-item'>
              <label htmlFor="username">Username</label>
              <input id='username' name='username' type="text" onInput={(e) => this.handleUserNameChange(e)} />                               
          </div>
          <div class='form-item'>
              <label htmlFor="password">Password</label>
              <input id='password' name='password' type="password" onInput={(e) => this.handlePasswordChange(e)} />
          </div>
          <icn-button onClick={e => this.handleLoginClick(e)}>Login</icn-button>
        </div>  
      </Host>  
    )
  }
}
