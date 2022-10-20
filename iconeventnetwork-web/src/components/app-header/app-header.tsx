import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'app-header',
})
export class AppHeader {
  @Prop() backgroundClass: string;

  render() {
    return (
      <nav class={this.backgroundClass}>      
        <a href='/'><div class='logo'></div></a>       
        <app-navigation></app-navigation>
        <div class='user-container'>
          <app-login-button></app-login-button>
        </div>
     </nav>
    );
  }

}
