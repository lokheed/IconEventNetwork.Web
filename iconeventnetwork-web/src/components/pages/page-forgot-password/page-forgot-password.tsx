import { Component, Host, State, h } from '@stencil/core';
import { ForgotPasswordClient } from '../../../services/clients/forgot-password-client';
@Component({
  tag: 'page-forgot-password',
  styleUrl: 'page-forgot-password.scss',
  shadow: false,
})
// Page for an anonymous user to request an email link to reset their password
export class PageForgotPassword {
  private forgotPasswordClient: ForgotPasswordClient;
  constructor() {
      this.forgotPasswordClient = new ForgotPasswordClient();
  }  
  @State() email: string = '';
  private errorMessage: HTMLIcnMessageElement;
  private successMessage: HTMLIcnMessageElement;
  private formDiv: HTMLDivElement;
  private successDiv: HTMLDivElement;

  private handleEmailChange(event) {
      this.email = event.target.value;
  } 

  private handleSubmitClick(e: MouseEvent) {
    e.preventDefault();
    this.errorMessage.hide();
    this.successMessage.hide();
    this.forgotPasswordClient.forgotPassword(this.email)
    .then(() => {
      this.formDiv.classList.add('hidden');
      this.successDiv.classList.remove('hidden');
      this.successMessage.show();
    })
    .catch(() => {
        this.errorMessage.show();
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
              Submit the email address for your account, and an email will be sent with
              instructions on how to reset your forgotten password.
            </p>
            <div class='form-item'>
                <label class='hidden' htmlFor="username">Email</label>
                <input id='email' name='email' placeholder='email' type="text" onInput={(e) => this.handleEmailChange(e)} />                               
            </div>
            <div class='form-item'>
              <icn-button onClick={(e) => this.handleSubmitClick(e)}>Submit</icn-button>
            </div>
            <icn-message type='error' hidden ref={el => this.errorMessage = el}>
              To reset your forgotten password, your email address must be in the format username@domain.
            </icn-message>     
          </div>  
          <div class='hidden' ref={el => this.successDiv = el}>
            <icn-message type='success' ref={el => this.successMessage = el}>
              Your request has been submitted. If the specified email address matches an active account, then 
              you will receive an email with instructions for resetting your password. If you do not receive 
              an email, please contact your account administrator.
            </icn-message> 
          </div>
        </div>
      </Host>  
    )
  }
}
