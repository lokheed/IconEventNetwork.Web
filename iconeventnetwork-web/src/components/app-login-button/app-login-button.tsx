import { Component, h } from '@stencil/core';
@Component({
  tag: 'app-login-button',
  styleUrl: 'app-login-button.css',
  shadow: true,
})

export class AppLoginButton { 
  render() {
    var strapiBaseUrl = 'https://api.iconeventnetwork.com';
    if (window.location.hostname.toLowerCase() === 'localhost') strapiBaseUrl = 'http://localhost:1337';
    if (window.location.hostname.toLowerCase().startsWith('qa')) strapiBaseUrl = 'https://qaapi.iconeventnetwork.com';
    if (window.location.hostname.toLowerCase().startsWith('stg')) strapiBaseUrl = 'https://stgapi.iconeventnetwork.com';

    const loginUrl = strapiBaseUrl + '/api/connect/cognito';

    const logout = (e) => {
      e.preventDefault();
      localStorage.removeItem('jwt');
      localStorage.removeItem('username');
      window.location.replace('/')
    };    
    
    var isAuthenticated = !!localStorage.getItem('jwt');    
    if (isAuthenticated) {
      return (
        <div>
          <a onClick={logout}>
            Log Out
          </a> 
        </div>

      );  
    } else {
      return (
        <div>
          <a href={loginUrl}>
            Log In
          </a>
        </div>

      );  
    }

  }

}
