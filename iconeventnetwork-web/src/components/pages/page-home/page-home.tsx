import { Component, Prop, h } from '@stencil/core';
import { RouterHistory } from '@stencil-community/router';

@Component({
  tag: 'page-home',
  styleUrl: 'page-home.css',
  shadow: true,
})
export class PageHome {
  @Prop() isAuthenticated!: boolean;
  @Prop() strapiBaseUrl!: string;
  @Prop() history: RouterHistory;
  
  render() {
    return (
      <div class="page-home">
        <div class="header">
          <app-login-button isAuthenticated={this.isAuthenticated} strapiBaseUrl={this.strapiBaseUrl}></app-login-button>
          <h1>Icon Event Network</h1>
          <app-navigation isAuthenticated={this.isAuthenticated} ></app-navigation>
        </div>
        <h1>Why Icon?</h1>
        <p>I am sure Amelia will come up with something to put here.</p>
      </div>
    );
  }

}
