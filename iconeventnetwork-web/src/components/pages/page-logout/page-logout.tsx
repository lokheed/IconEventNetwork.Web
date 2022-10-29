import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'page-logout',
  styleUrl: 'page-logout.scss',
  shadow: false,
})
export class PageLogout {;
  componentDidRender() {
    var isAuthenticated = !!localStorage.getItem('jwt');
    if (!isAuthenticated) {
      window.location.replace('/');
    } else {
      localStorage.removeItem('jwt');
      localStorage.removeItem('username');
      var cognitoBaseUrl = 'https://iconeventnetwork.auth.us-east-1.amazoncognito.com';
      var clientId = '6gs898o3k11pu8q57da2p4lkcs';
      if (window.location.hostname.toLowerCase() === 'localhost') {
        cognitoBaseUrl = 'http://deviconeventnetwork.auth.us-east-1.amazoncognito.com/';
        clientId = '794a2cmjve48m7gq4solf4k1v';
      }
      if (window.location.hostname.toLowerCase().startsWith('qa')) {
        cognitoBaseUrl = 'https://qaiconeventnetwork.auth.us-east-1.amazoncognito.com/';
        clientId = '1k9u2t8al652k79283a6hsqj3';
      }
      if (window.location.hostname.toLowerCase().startsWith('stg')) {
        cognitoBaseUrl = 'https://stgiconeventnetwork.auth.us-east-1.amazoncognito.com/';
        clientId = '1i6chmckpi833hea22en6r82s2';
      }
      var logoutUrl = cognitoBaseUrl + '/logout?client_id=' + clientId + '&logout_uri=' + window.location.href;
      window.location.replace(logoutUrl);
    }
  }

  render() {
    return (
      <Host>
        <div class='hero'>
          <p>Logging Out...</p>
        </div>
      </Host>
    )
  }
}
