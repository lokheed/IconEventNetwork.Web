import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css',
  shadow: true,
})
export class AppHeader {
  render() {
    return (
      <header>
        <div class='logo-container'>
          <h1>Icon Event Network</h1>
        </div>
        <app-navigation></app-navigation>
        <div class='user-container'>
          <app-login-button></app-login-button>
        </div>
     </header>
    );
  }

}
