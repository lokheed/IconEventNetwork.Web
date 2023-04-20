import { Component, Host, State, h } from '@stencil/core';
import { ResetPasswordClient } from '../../../services/clients/reset-password-client';
@Component({
  tag: 'page-reset-password',
  styleUrl: 'page-reset-password.scss',
  shadow: false,
})
export class PageResetPassword {
  private passwordRegex: string = '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-+=._ ])';
  private resetPasswordClient: ResetPasswordClient;
  constructor() {
      this.resetPasswordClient = new ResetPasswordClient();
  }  
  @State() code: string = '';
  @State() password: string = '';
  @State() confirmPassword: string = '';
  private formDiv: HTMLDivElement;
  private successDiv: HTMLDivElement;
  private matchErrorMessage: HTMLIcnMessageElement;
  private minimumLengthErrorMessage: HTMLIcnMessageElement;
  private maximumLengthErrorMessage: HTMLIcnMessageElement;
  private passwordStrengthErrorMessage: HTMLIcnMessageElement;
  private saveErrorMessage: HTMLIcnMessageElement;
  private successMessage: HTMLIcnMessageElement;
  private handlePasswordChange(event) {
      this.password = event.target.value;
  } 

  private handleConfirmPasswordChange(event) {
      this.confirmPassword = event.target.value;
  } 

  private handleSubmitClick(e: MouseEvent) {
    e.preventDefault();
    this.matchErrorMessage.hide();
    this.minimumLengthErrorMessage.hide();
    this.maximumLengthErrorMessage.hide();
    this.passwordStrengthErrorMessage.hide();
    this.saveErrorMessage.hide();

    if (this.password !== this.confirmPassword) {
        this.matchErrorMessage.show();
        return;
    }

    if (this.password.length < 8) {
        this.minimumLengthErrorMessage.show();
        return;
    }

    if (this.password.length > 128) {
        this.maximumLengthErrorMessage.show();
        return;
    }

    let strongPassword = new RegExp(this.passwordRegex);
    if (!strongPassword.test(this.password)) {
        this.passwordStrengthErrorMessage.show();
        return;
    }

    this.resetPasswordClient.resetPassword(this.code, this.password, this.confirmPassword)
    .then(() => {
      this.formDiv.classList.add('hidden');
      this.successDiv.classList.remove('hidden');
      this.successMessage.show();
    })
    .catch(() => {
        this.saveErrorMessage.show();
    });
  } 

  private handleLoginClick() {
    window.location.replace('/login')
  } 

  componentDidLoad() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('code')) {
        this.code = params.get('code');
    }
  }

  render() {  
    return (
      <Host>
        <div class='login-form'>
          <div class='logo-header'>
              <img src='/assets/icon/icon.png' class='icon' />
          </div>
          <div ref={el => this.formDiv = el}>
            <p>
              Password must be a minimum of<br/>
              eight characters and include:
              <ul>
                  <li>An uppercase letter</li>
                  <li>A lowercase letter</li>
                  <li>A number</li>
                  <li>A space or a special character # ? ! @ $ % ^ & * - + = . _</li>
              </ul>
            </p>
            <div class='form-item'>
                <label htmlFor="password">New Password</label>
                <input id='password' name='password' type="password" onInput={(e) => this.handlePasswordChange(e)} />                               
            </div>
            <div class='form-item'>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input id='confirmPassword' name='confirmPassword' type="password" onInput={(e) => this.handleConfirmPasswordChange(e)} />                               
            </div>
            <div class='form-item'>
              <icn-button onClick={(e) => this.handleSubmitClick(e)}>Submit</icn-button>
            </div>
            <icn-message type='error' hidden ref={el => this.matchErrorMessage = el}>
              New Password and Confirm Password must match.
            </icn-message>
            <icn-message type='error' hidden ref={el => this.minimumLengthErrorMessage = el}>
                The password must be a minimum of eight characters.
            </icn-message>
            <icn-message type='error' hidden ref={el => this.maximumLengthErrorMessage = el}>
              Maximum password length is 128 characters.
            </icn-message>
            <icn-message type='error' hidden ref={el => this.passwordStrengthErrorMessage = el}>
                The password must include:
                <ul>
                  <li>An uppercase letter</li>
                  <li>A lowercase letter</li>
                  <li>A number</li>
                  <li>A space or a special character # ? ! @ $ % ^ & * - + = . _</li>
              </ul>
            </icn-message>
            <icn-message type='error' hidden ref={el => this.saveErrorMessage = el}>
              An error occured while updating your password. Please recheck your email link and try again. 
              If the error persists, please contact your account administrator for assistance.
            </icn-message>
          </div>
          <div class='hidden' ref={el => this.successDiv = el}>
            <icn-message type='success' ref={el => this.successMessage = el}>
              New password is saved. You can now log in with your new password.
            </icn-message> 
            <div class='form-item'>
              <icn-button type='link' onClick={() => this.handleLoginClick()}>Log In</icn-button>
            </div>
          </div>
        </div>  
      </Host>  
    )
  }
}
