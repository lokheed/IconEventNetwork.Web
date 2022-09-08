import { Component, Prop, h } from '@stencil/core';
import { RouterHistory } from '@stencil-community/router';

@Component({
  tag: 'app-login-button',
  styleUrl: 'app-login-button.css',
  shadow: true,
})

export class AppLoginButton {
  @Prop() isAuthenticated!: boolean;
  @Prop() strapiBaseUrl!: string;
  @Prop() history: RouterHistory;
  
  render() {
    const loginUrl = this.strapiBaseUrl + '/api/connect/cognito';

    const logout = (e) => {
      e.preventDefault();
      localStorage.removeItem('jwt');
      localStorage.removeItem('username');
      window.location.replace('/')
    };    
    
    if (this.isAuthenticated) {
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
