import { Component, Prop, h } from '@stencil/core';
import { urlService } from '../../services/url-service';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.scss',
  shadow: false,
})
export class AppHeader {
  @Prop() backgroundClass: string;

  render() {
    return (
      <nav class={this.backgroundClass}> 
        {urlService.EnvironmentName != 'PROD' &&
          <app-environment-nag></app-environment-nag>
        }             
        <a href='/'><div class='logo'></div></a>       
        <app-navigation></app-navigation>
        <div class='user-container'>
          <app-login-button></app-login-button>
        </div>
     </nav>
    );
  }
}
