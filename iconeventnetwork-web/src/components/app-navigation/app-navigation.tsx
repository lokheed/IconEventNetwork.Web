import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'app-navigation',
  styleUrl: 'app-navigation.css',
  shadow: true,
})

export class AppNavigation {
  @State() hamburgerIsChecked: boolean;

  componentWillLoad() {
    this.hamburgerIsChecked = false;
  }

  render() {
    var isAuthenticated = !!localStorage.getItem('jwt');
    if (isAuthenticated) {
      return (
        <div>
          <input type="checkbox" id="checkbox_toggle" checked={this.hamburgerIsChecked} />
          <label htmlFor="checkbox_toggle" class="hamburger">&#9776;</label>
          <div class='menu'>
            <ul class='parent'>
              <li class='dropdown-container'>
                <stencil-route-link 
                  url="/" 
                  activeClass="link-active" 
                  exact={true}>
                    Who We Are
                </stencil-route-link>
                <ul class='dropdown'>
                  <li><a href='#'>Dropdown 1</a></li>
                  <li><a href='#'>Dropdown 2</a></li>
                  <li><a href='#'>Dropdown 3</a></li>
                  <li><a href='#'>Dropdown 4</a></li>
                  <li><a href='#'>Dropdown 5</a></li>
                </ul>
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
            </ul>
          </div>
        </div>
      );
    }
    
    // not authenticated
    return (
      <div>
        <input type="checkbox" id="checkbox_toggle" />
        <label htmlFor="checkbox_toggle" class="hamburger">&#9776;</label>
        <div class='menu'>
          <ul>
            <li>
              <stencil-route-link 
                url="/" 
                activeClass="link-active" 
                exact={true}>
                  Who We Are
              </stencil-route-link>
              <ul>
                <li><a href='#'>Dropdown 1</a></li>
                <li><a href='#'>Dropdown 2</a></li>
                <li><a href='#'>Dropdown 3</a></li>
                <li><a href='#'>Dropdown 4</a></li>
                <li><a href='#'>Dropdown 5</a></li>
              </ul>          
            </li>
            <li>
              <stencil-route-link 
                url="/join" 
                activeClass="link-active">
                  Join the Network
                </stencil-route-link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
