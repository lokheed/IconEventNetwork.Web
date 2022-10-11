import { Component, h } from '@stencil/core';
@Component({
  tag: 'app-login-button',
  styleUrl: 'app-login-button.css',
  shadow: true,
})

export class AppLoginButton { 
  render() {   
    var isAuthenticated = !!localStorage.getItem('jwt');    
    if (isAuthenticated) {
      return (
        <div>
          <a href='/logout'>
            Log Out
          </a> 
        </div>
      );  
    } else {
      return (
        <div>
          <a href='/login'>
            Log In
          </a>
        </div>
      );  
    }
  }
}
