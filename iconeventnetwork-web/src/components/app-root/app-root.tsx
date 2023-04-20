import { Component, Host, State, h } from '@stencil/core';
import { createRouter, Route, NotFound, match } from 'stencil-router-v2';
import { localStorageKeyService } from '../../services/local-storage-key-service';

const Router = createRouter();

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: false,
})
export class AppRoot {
  @State() navigationBackgroundClass: string = 'white';
  @State() isAuthenticated: boolean = false;

  componentWillRender() {
    switch (window.location.pathname) {
      case '/home':
        this.navigationBackgroundClass = 'brown';
        break;
      default: this.navigationBackgroundClass = 'white';
    }    
    this.isAuthenticated = !!localStorage.getItem(localStorageKeyService.Jwt);
  }
  render() {
    return (
      <Host>
        <app-header backgroundClass={this.navigationBackgroundClass}></app-header>
        <div class='main-content'>
          <Router.Switch>
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
            <Route path="/prelaunch">
              <page-prelaunch />
            </Route>          
            <Route path="/forgot-password">
              <page-forgot-password />
            </Route>         
            <Route path="/reset-password">
              <page-reset-password />
            </Route>
            {this.isAuthenticated && (
              <Route path="/" to="/home" />
              )}
            {!this.isAuthenticated && (
              <Route path="/" to="/prelaunch" />
            )}
            {this.isAuthenticated && (
              <Route path="/home">
                <page-home />
              </Route>
            )}
            {!this.isAuthenticated && (
              <Route path="/home" to="/prelaunch" />
            )}
            {this.isAuthenticated && (
              <Route path="/event-planners">
                <page-event-planners />
              </Route>
            )}
            {!this.isAuthenticated && (
              <Route path="/event-planners" to="/prelaunch" />
            )}
            {this.isAuthenticated && (
              <Route path="/about-us">
                <page-about-us />
              </Route>
            )}
            {!this.isAuthenticated && (
              <Route path="/about-us" to="/prelaunch" />
            )}
            {this.isAuthenticated && (
              <Route path="/dashboard">
                <page-dashboard />
              </Route>
            )}
            {!this.isAuthenticated && (
              <Route path="/dashboard" to="/prelaunch" />
            )}
            {this.isAuthenticated && (
              <Route path="/directory">
                <page-directory />
              </Route>
            )}
            {!this.isAuthenticated && (
              <Route path="/directory" to="/prelaunch" />
            )}
            {this.isAuthenticated && (
              <Route path="/destinations">
                <page-destinations />
              </Route>
            )}
            {!this.isAuthenticated && (
              <Route path="/destinations " to="/prelaunch" />
            )}
            {this.isAuthenticated && (
              <Route path="/join">
                <page-join />
              </Route>
            )}
            {!this.isAuthenticated && (
              <Route path="/join " to="/prelaunch" />
            )}
            {this.isAuthenticated && (
              <Route path="/profile-person">
                <page-profile-person />
              </Route>
            )}
            {!this.isAuthenticated && (
              <Route path="/logout " to="/prelaunch" />
            )}
            {this.isAuthenticated && (
              <Route path="/profile-pacs">
                <page-profile-person-at-companies />
              </Route>  
            )}
            {!this.isAuthenticated && (
              <Route path="/profile-pacs " to="/prelaunch" />
            )}
            {this.isAuthenticated && (
              <Route path={match('/profile-pac/:id')} 
                render={({id}) => <page-profile-person-at-company personAtCompanyId={id}/> }>                
              </Route>  
            )}
            {!this.isAuthenticated && (
              <Route path="/profile-pac " to="/prelaunch" />
            )}
            {this.isAuthenticated && (
              <Route path={match('/profile-company/:id')}
                render={({id}) => <page-profile-company companyId={id} /> }>                
              </Route>
            )}
            {!this.isAuthenticated && (
              <Route path="/profile-company" to="/prelaunch" />
            )}                    

            {this.isAuthenticated && (
              <Route path="/ux-test">
                <page-ux-test />
              </Route>
            )}
            {!this.isAuthenticated && (
              <Route path="/ux-test " to="/prelaunch" />
            )}
            <Route path={match('/access-denied/:message')} 
              render={({message}) => <page-access-denied message={message}/> }>                
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
