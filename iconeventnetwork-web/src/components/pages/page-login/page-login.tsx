import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-login',
})
export class PageLogin {;
  render() {  
    var isAuthenticated = !!localStorage.getItem('jwt');    
    if (isAuthenticated) {
        window.location.replace('/');
        return <h1>Redirecting...</h1> 
    } else {
        var strapiBaseUrl = 'https://api.iconeventnetwork.com';
        if (window.location.hostname.toLowerCase() === 'localhost') strapiBaseUrl = 'http://localhost:1337';
        if (window.location.hostname.toLowerCase().startsWith('qa')) strapiBaseUrl = 'https://qaapi.iconeventnetwork.com';
        if (window.location.hostname.toLowerCase().startsWith('stg')) strapiBaseUrl = 'https://stgapi.iconeventnetwork.com';
    
        const loginUrl = strapiBaseUrl + '/api/connect/cognito';
    
        window.location.replace(loginUrl) 
        return <h1>Logging In...</h1>
    }
  }
}
