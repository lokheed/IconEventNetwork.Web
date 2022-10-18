import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'app-header',
})
export class AppHeader {
  @Prop() backgroundClass: string;

  render() {
    return (
      <nav class={this.backgroundClass}>
        <div class='logo'>
          <h1><a href='/'>The Icon Network</a></h1>
        </div>
        <app-navigation></app-navigation>
        <div class='user-container'>
          <app-login-button></app-login-button>
        </div>
     </nav>
    );
  }

}
