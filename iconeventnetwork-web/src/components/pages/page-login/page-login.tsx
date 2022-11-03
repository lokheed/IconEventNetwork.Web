import { Component, Host, h } from '@stencil/core';
import { urlService } from '../../../services/url-service';

@Component({
  tag: 'page-login',
  styleUrl: 'page-login.scss',
  shadow: false,
})
export class PageLogin {;
  constructor() {
    window.location.replace(!!localStorage.getItem('jwt') ? '/' : urlService.getApiBaseUrl() + '/api/connect/cognito');
  }

  render() {  
    return (
      <Host></Host>  
    )
  }
}
