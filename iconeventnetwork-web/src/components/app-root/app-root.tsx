import { Component, Host, State, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: false,
})
export class AppRoot {
  @State() navigationBackgroundClass: string = 'white';

  componentWillRender() {
    switch (window.location.pathname) {
      case '/':
        this.navigationBackgroundClass = 'brown';
        break;
      default: this.navigationBackgroundClass = 'white';
    }
  }
  render() {
    return (
      <Host>
        <app-header backgroundClass={this.navigationBackgroundClass}></app-header>
        <div class='main-content'>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="page-home" exact={true} />
              <stencil-route url="/event-planners" component="page-event-planners" />
              <stencil-route url="/about-us" component="page-about-us" />
              <stencil-route url="/dashboard" component="page-dashboard" />
              <stencil-route url="/directory" component="page-directory" />
              <stencil-route url="/destinations" component="page-destinations" />
              <stencil-route url="/join" component="page-join" />
              <stencil-route url="/page-login-redirect" component='page-login-redirect' />
              <stencil-route url="/code-of-conduct" component="page-code-of-conduct" />
              <stencil-route url="/terms-of-service" component="page-terms-of-service" />
              <stencil-route url="/privacy-policy" component="page-privacy-policy" />
              <stencil-route url="/cookie-policy" component="page-cookie-policy" />
              <stencil-route url="/login" component="page-login" />
              <stencil-route url="/logout" component="page-logout" />
              <stencil-route url="/demo" component="page-demo" />
              <stencil-route component='page-not-found' />
          </stencil-route-switch>
          </stencil-router>
        </div>
        <app-footer></app-footer>
      </Host>
    );
  }
}
