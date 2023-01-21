import { Component, Host, State, h } from '@stencil/core';
import { createRouter, Route, NotFound } from 'stencil-router-v2';

const Router = createRouter();

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
          <Router.Switch>
            <Route path="/">
              <page-home />
            </Route>
            <Route path="/event-planners">
              <page-event-planners />
            </Route>
            <Route path="/about-us">
              <page-about-us />
            </Route>
            <Route path="/dashboard">
              <page-dashboard />
            </Route>
            <Route path="/directory">
              <page-directory />
            </Route>
            <Route path="/destinations">
              <page-destinations />
            </Route>
            <Route path="/join">
              <page-join />
            </Route>
            <Route path="/page-login-redirect">
              <page-login-redirect />
            </Route>
            <Route path="/code-of-conduct">
              <page-code-of-conduct />
            </Route>
            <Route path="/terms-of-service">
              <page-terms-of-service />
            </Route>
            <Route path="/privacy-policy">
              <page-privacy-policy />
            </Route>
            <Route path="/cookie-policy">
              <page-cookie-policy />
            </Route>
            <Route path="/login">
              <page-login />
            </Route>
            <Route path="/logout">
              <page-logout />
            </Route>
            <Route path="/profile-person">
              <page-profile-person />
            </Route>
            <Route path="/profile-pacs">
              <page-profile-person-at-companies />
            </Route>            
            <Route path="/profile-pac">
              <page-profile-person-at-company/>
            </Route>            
            <Route path="/profile-company">
              <page-profile-company />
            </Route>            
            <Route path="/demo">
              <page-demo />
            </Route>            
            <Route path={NotFound}>
              <page-not-found />
            </Route>
        </Router.Switch>
        </div>
        <app-footer></app-footer>
      </Host>
    );
  }
}
