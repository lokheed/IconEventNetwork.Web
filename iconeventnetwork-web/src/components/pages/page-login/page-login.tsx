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
      let refreshDate = new Date(Date.now() + 10*60000);  // refresh after ten minutes, 60,000 milliseconds in a minute
      localStorage.setItem(localStorageKeyService.RefreshAfter, refreshDate.toString());  
      localStorage.setItem(localStorageKeyService.Username, response.user.username);
      localStorage.setItem(localStorageKeyService.LoginEmail, response.user.email);
      window.location.replace('/home')
    })
    .catch(reason => {
        console.log(reason.error.message);
    });
  }

  private handleForgotPasswordClick() {
    window.location.replace('/forgot-password')
  } 

  render() {  
    return (
      <Host>
        <div class='login-form'>
          <div class='logo-header'>
              <img src='/assets/icon/icon.png' class='icon' />
          </div>
          <div class='form-item'>
              <label class='hidden' htmlFor="username">Username</label>
              <input id='username' name='username' placeholder='Username' type="text" onInput={(e) => this.handleUserNameChange(e)} />                               
          </div>
          <div class='form-item'>
              <label class='hidden' htmlFor="password">Password</label>
              <input id='password' name='password' placeholder='Password' type="password" onInput={(e) => this.handlePasswordChange(e)} />
          </div>
          <div class='form-item'>
            <icn-button onClick={e => this.handleLoginClick(e)}>Log In</icn-button>
          </div>
          <div class='form-item'>
            <icn-button type='link' onClick={() => this.handleForgotPasswordClick()}>Forgot Password</icn-button>
          </div>
        </div>  
      </Host>  
    )
  }
}
