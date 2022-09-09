import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  render() {
    return (
      <Host>
        <app-header></app-header>
        <stencil-router>
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route url="/" component="page-home" exact={true} />
            <stencil-route url="/dashboard" component="page-dashboard" />
            <stencil-route url="/directory" component="page-directory" />
            <stencil-route url="/destinations" component="page-destinations" />
            <stencil-route url="/join" component="page-join" />
            <stencil-route url="/page-login-redirect" component='page-login-redirect' />
            <stencil-route component='page-not-found' />
         </stencil-route-switch>
        </stencil-router>
      </Host>
    );
  }
}
