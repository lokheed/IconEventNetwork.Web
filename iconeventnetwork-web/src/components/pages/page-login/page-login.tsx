import { Component, Host, h } from '@stencil/core';
import { urlService } from '../../../services/url-service';

@Component({
  tag: 'page-login',
  styleUrl: 'page-login.scss',
  shadow: false,
})
export class PageLogin {;
  componentDidLoad() {
    window.location.replace(!!localStorage.getItem('jwt') ? '/' : urlService.ApiBaseUrl + '/api/connect/cognito');
  }

  render() {  
    return (
      <Host>
        <h1>Logging In... <i class="fa-solid fa-spinner fa-spin-pulse"></i></h1>
        <br/>
        <br/>
      </Host>  
    )
  }
}
