import { Component, Host, h } from '@stencil/core';
import { cognitoService } from '../../../services/cognito-service';


@Component({
  tag: 'page-logout',
  styleUrl: 'page-logout.scss',
  shadow: false,
})
export class PageLogout {;
  constructor() {
    var isAuthenticated = !!localStorage.getItem('jwt');
    if (!isAuthenticated) {
      window.location.replace('/');
    } else {
      localStorage.removeItem('jwt');
      localStorage.removeItem('username');
      window.location.replace(cognitoService.getBaseUrl() + '/logout?client_id=' + cognitoService.getClientId() + '&logout_uri=' + window.location.href);
    }
  }

  render() {
    return (
      <Host></Host>
    )
  }
}
