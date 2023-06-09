import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'page-login',
  styleUrl: 'page-login.scss',
  shadow: false,
})
export class PageLogin {;
  componentDidRender() {
    var isAuthenticated = !!localStorage.getItem('jwt');    
    if (isAuthenticated) {
        window.location.replace('/');
    } else {
        var strapiBaseUrl = 'https://api.theiconnetwork.com';
        if (window.location.hostname.toLowerCase() === 'localhost') strapiBaseUrl = 'http://localhost:1337';
        if (window.location.hostname.toLowerCase().startsWith('qa')) strapiBaseUrl = 'https://qaapi.theiconnetwork.com';
        if (window.location.hostname.toLowerCase().startsWith('stg')) strapiBaseUrl = 'https://stgapi.theiconnetwork.com';
    
        const loginUrl = strapiBaseUrl + '/api/connect/cognito';
    
        window.location.replace(loginUrl) 
    }
  }

  render() {  
    return (
      <Host>
        <div class='hero'>
          <p>Logging In...</p>
        </div>
      </Host>  
    )
  }
}
