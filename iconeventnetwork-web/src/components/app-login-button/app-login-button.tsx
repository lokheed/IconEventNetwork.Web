import { Component, h } from '@stencil/core';
@Component({
  tag: 'app-login-button',
})

export class AppLoginButton { 
  render() {   
    var isAuthenticated = !!localStorage.getItem('jwt');    
    if (isAuthenticated) {
      return (
        <div class='login-button'>
          <a href='/logout'>
            Log Out
          </a> 
        </div>
      );  
    } else {
      return (
        <div class='login-button'>
          <a href='/login'>
            Log In
          </a>
        </div>
      );  
    }
  }
}
