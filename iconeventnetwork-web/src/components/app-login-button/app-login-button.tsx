import { Component, h } from '@stencil/core';
import { localStorageKeyService } from '../../services/local-storage-key-service';

@Component({
  tag: 'app-login-button',
  styleUrl: 'app-login-button.scss',
  shadow: false,
})

export class AppLoginButton { 
  render() {   
    var isAuthenticated = !!localStorage.getItem(localStorageKeyService.Jwt);    
    if (isAuthenticated) {
      return (
        <div class='login-button'>
          <a href='/logout'>
            Log&nbsp;Out
          </a> 
        </div>
      );  
    } else {
      return (
        <div class='login-button'>
          <a href='/login'>
            Log&nbsp;In
          </a>
        </div>
      );  
    }
  }
}
