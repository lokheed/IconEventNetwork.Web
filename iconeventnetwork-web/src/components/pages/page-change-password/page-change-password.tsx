import { Component, Host, State, h } from '@stencil/core';
import { ChangePasswordClient } from '../../../services/clients/change-password-client';
import { regxService } from '../../../services/regx-service';
@Component({
  tag: 'page-change-password',
  styleUrl: 'page-change-password.scss',
  shadow: false,
})
// Page for an authenticated uer to reset their password
export class PageChangePassword {
  private changePasswordClient: ChangePasswordClient;
  constructor() {
      this.changePasswordClient = new ChangePasswordClient();
  }  
  @State() currentPassword: string = '';
  @State() newPassword: string = '';
  @State() confirmPassword: string = '';
  private formDiv: HTMLDivElement;
  private successDiv: HTMLDivElement;
  private matchErrorMessage: HTMLIcnMessageElement;
  private minimumLengthErrorMessage: HTMLIcnMessageElement;
  private maximumLengthErrorMessage: HTMLIcnMessageElement;
  private passwordStrengthErrorMessage: HTMLIcnMessageElement;
  private saveErrorMessage: HTMLIcnMessageElement;
  private successMessage: HTMLIcnMessageElement;

  private handleCurrentPasswordChange(event) {
      this.currentPassword = event.target.value;
  } 

  private handleNewPasswordChange(event) {
      this.newPassword = event.target.value;
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

    if (this.newPassword !== this.confirmPassword) {
        this.matchErrorMessage.show();
        return;
    }

    if (this.newPassword.length < 8) {
        this.minimumLengthErrorMessage.show();
        return;
    }

    if (this.newPassword.length > 128) {
        this.maximumLengthErrorMessage.show();
        return;
    }

    let strongPassword = new RegExp(regxService.password);
    if (!strongPassword.test(this.newPassword)) {
        this.passwordStrengthErrorMessage.show();
        return;
    }

    this.changePasswordClient.changePassword(this.currentPassword, this.newPassword, this.confirmPassword)
    .then(() => {
      this.formDiv.classList.add('hidden');
      this.successDiv.classList.remove('hidden');
      this.successMessage.show();
    })
    .catch(() => {
        this.saveErrorMessage.show();
    });
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
                <label htmlFor="password">Current Password</label>
                <input id='currentPassword' name='currentPassword' type="password" onInput={(e) => this.handleCurrentPasswordChange(e)} />                               
            </div>
            <div class='form-item'>
                <label htmlFor="password">New Password</label>
                <input id='newPassword' name='newPassword' type="password" onInput={(e) => this.handleNewPasswordChange(e)} />                               
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
              An error occured while updating your password. Please recheck your current password and try again. 
              If the error persists, please contact your account administrator for assistance.
            </icn-message>
          </div>
          <div class='hidden' ref={el => this.successDiv = el}>
            <icn-message type='success' ref={el => this.successMessage = el}>
              New password is saved.
            </icn-message> 
          </div>
        </div>  
      </Host>  
    )
  }
}
