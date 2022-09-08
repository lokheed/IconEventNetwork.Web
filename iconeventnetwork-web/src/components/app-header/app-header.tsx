import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css',
  shadow: true,
})
export class AppHeader {
  @Prop() isAuthenticated!: boolean;
  @Prop() strapiBaseUrl!: string;

  render() {
    return (
      <header>
        <div class='logo-container'>
          <h1>Icon Event Network</h1>
        </div>
        <app-navigation isAuthenticated={this.isAuthenticated} ></app-navigation>
        <div class='user-container'>
          <app-login-button isAuthenticated={this.isAuthenticated} strapiBaseUrl={this.strapiBaseUrl}></app-login-button>
        </div>
     </header>
    );
  }

}
