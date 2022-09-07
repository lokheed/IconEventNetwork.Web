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
        <ul class="navigation">
          <li>
            <stencil-route-link 
              url="/" 
              activeClass="link-active" 
              exact={true}>
                Why Icon?
            </stencil-route-link>
          </li>
          
          <li>
            <stencil-route-link 
              url="/dashboard" 
              activeClass="link-active">
                Dashboard
            </stencil-route-link>
          </li>
          <li>
            <stencil-route-link 
              url="/directory" 
              activeClass="link-active">
                Directory
            </stencil-route-link>
          </li>
          <li>
            <stencil-route-link 
              url="/destinations" 
              activeClass="link-active">
                Destinations
            </stencil-route-link>
          </li>
        </ul>
      );
    }
    
    // not authenticated
    return (
      <ul class="navigation">
        <li>
          <stencil-route-link 
            url="/" 
            activeClass="link-active" 
            exact={true}>
              Why Icon?
          </stencil-route-link>
        </li>
        <li>
          <stencil-route-link 
            url="/" 
            activeClass="link-active" 
            exact={true}>
              Foo
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
    );
}

}
