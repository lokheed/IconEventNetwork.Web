import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-footer-navigation',
  styleUrl: 'app-footer-navigation.css',
  shadow: true,
})
export class AppFooterNavigation {
  render() {
    var strapiBaseUrl = 'https://api.iconeventnetwork.com';
    if (window.location.hostname.toLowerCase() === 'localhost') strapiBaseUrl = 'http://localhost:1337';
    if (window.location.hostname.toLowerCase().startsWith('qa')) strapiBaseUrl = 'https://qaapi.iconeventnetwork.com';
    if (window.location.hostname.toLowerCase().startsWith('stg')) strapiBaseUrl = 'https://stgapi.iconeventnetwork.com';

    const loginUrl = strapiBaseUrl + '/api/connect/cognito';

    const logout = (e) => {
      e.preventDefault();
      localStorage.removeItem('jwt');
      localStorage.removeItem('username');
      window.location.replace('/')
    };    
    
    var isAuthenticated = !!localStorage.getItem('jwt');
    if (isAuthenticated) {
      return (
        <Host>
            <h2>
                <stencil-route-link 
                    url="/" 
                    exact={true}>
                    Who We Are
                </stencil-route-link>
            </h2>
            <ul>               
                <li>
                <stencil-route-link url="/dashboard">
                    Event Planners
                </stencil-route-link>
                </li>
                <li>
                <stencil-route-link url="/directory" >
                    About Us
                </stencil-route-link>
                </li>
                <li>
                    <stencil-route-link url="/join">
                        Join the Network
                    </stencil-route-link>
                </li>
                <li>
                    <a onClick={logout}>
                        Log Out
                    </a> 
                </li>            
          </ul>
        </Host>
      );
    }
    
    // not authenticated
    return (
      <Host>
        <h2>
            <stencil-route-link 
                url="/" 
                exact={true}>
                  Who We Are
            </stencil-route-link>
        </h2>

        <ul>
            <li>
                <stencil-route-link url="/join">
                    Join the Network
                </stencil-route-link>
            </li>
            <li>
                <a href={loginUrl}>
                    Log In
                </a>
            </li>
        </ul>
      </Host>
    );
  }
}