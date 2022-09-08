import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'app-navigation',
  styleUrl: 'app-navigation.css',
  shadow: true,
})

export class AppNavigation {
  @Prop() isAuthenticated!: boolean;
  render() {
    if (this.isAuthenticated) {
      return (
        <nav>
          <ul>
            <li>
              <stencil-route-link 
                url="/" 
                activeClass="link-active" 
                exact={true}>
                  Who We Are
              </stencil-route-link>
            </li>
            
            <li>
              <stencil-route-link 
                url="/dashboard" 
                activeClass="link-active">
                  Event Planners
              </stencil-route-link>
            </li>
            <li>
              <stencil-route-link 
                url="/directory" 
                activeClass="link-active">
                  About Us
              </stencil-route-link>
            </li>
            <li>
              <stencil-route-link 
                url="/join" 
                activeClass="link-active">
                  Join the Network
                </stencil-route-link>
            </li>
          </ul>
        </nav>
      );
    }
    
    // not authenticated
    return (
      <nav>
        <ul>
          <li>
            <stencil-route-link 
              url="/" 
              activeClass="link-active" 
              exact={true}>
                Who We Are
            </stencil-route-link>
          </li>
          
          <li>
            <stencil-route-link 
              url="/dashboard" 
              activeClass="link-active">
                Event Planners
            </stencil-route-link>
          </li>
          <li>
            <stencil-route-link 
              url="/directory" 
              activeClass="link-active">
                About Us
            </stencil-route-link>
          </li>
          <li>
            <stencil-route-link 
              url="/join" 
              activeClass="link-active">
                Join the Network
              </stencil-route-link>
          </li>
        </ul>
      </nav>
    );
  }
}
