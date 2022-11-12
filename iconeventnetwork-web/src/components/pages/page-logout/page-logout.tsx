import { Component, Host, h } from '@stencil/core';
import { urlService } from '../../../services/url-service';

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
      window.location.replace(urlService.CognitoBaseUrl + '/logout?client_id=' + urlService.CognitoClientId + '&logout_uri=' + window.location.href);
    }
  }

  render() {
    return (
      <Host></Host>
    )
  }
}
