import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css',
  shadow: true,
})
export class AppHeader {
  render() {
    return (
      <nav>
        <div class='logo'>
          <h1>The Icon Network</h1>
        </div>
        <app-navigation></app-navigation>
        <div class='user-container'>
          <app-login-button></app-login-button>
        </div>
     </nav>
    );
  }

}
