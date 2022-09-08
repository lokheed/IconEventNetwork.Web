import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  @Prop() isAuthenticated: boolean;

  componentWillRender() {
    this.isAuthenticated = !!localStorage.getItem('jwt');
   }

  render() {
    var strapiBaseUrl = 'https://api.iconeventnetwork.com';
    if (window.location.hostname.toLowerCase() === 'localhost') strapiBaseUrl = 'http://localhost:1337';
    if (window.location.hostname.toLowerCase().startsWith('qa')) strapiBaseUrl = 'https://qaapi.iconeventnetwork.com';
    if (window.location.hostname.toLowerCase().startsWith('stg')) strapiBaseUrl = 'https://stgapi.iconeventnetwork.com';

    return (
      <Host>
        <app-header isAuthenticated={this.isAuthenticated} strapiBaseUrl={strapiBaseUrl}></app-header>
        <stencil-router>
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route url="/" component="page-home" exact={true} />
            <stencil-route url="/dashboard" component="page-dashboard" componentProps={{ isAuthenticated: this.isAuthenticated, strapiBaseUrl: strapiBaseUrl }} />
            <stencil-route url="/directory" component="page-directory" componentProps={{ isAuthenticated: this.isAuthenticated, strapiBaseUrl: strapiBaseUrl }} />
            <stencil-route url="/destinations" component="page-destinations" componentProps={{ isAuthenticated: this.isAuthenticated, strapiBaseUrl: strapiBaseUrl }} />
            <stencil-route url="/join" component="page-join" componentProps={{ isAuthenticated: this.isAuthenticated, strapiBaseUrl: strapiBaseUrl }} />
            <stencil-route url="/page-login-redirect" component="page-login-redirect" componentProps={{ strapiBaseUrl: strapiBaseUrl }} />
          </stencil-route-switch>
        </stencil-router>
      </Host>
    );
  }
}
