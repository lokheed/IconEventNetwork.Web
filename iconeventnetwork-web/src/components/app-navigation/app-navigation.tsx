import { Component, State, Prop, h } from '@stencil/core';
import { urlService } from '../../services/url-service';

@Component({
  tag: 'app-navigation',
})

export class AppNavigation {
  @State() hamburgerIsChecked: boolean;
  @Prop() menu: HTMLElement;

  componentWillLoad() {
    this.hamburgerIsChecked = false;
    this.getMenu();
  }

  private getMenu() {   
    var strapiBaseUrl = urlService.getApiBaseUrl();
    var options = this.getOptions();
    fetch(`${strapiBaseUrl}/api/main-menu?populate=Navigation.Links`, options)
    .then(res => res.json())
    .then(res => {
      this.updateMenu(res.data);
    });
  }

  private getOptions() {
    return {  
      method: 'GET'
    }
  }

  updateMenu(menuData) {
    var isAuthenticated = !!localStorage.getItem('jwt');
    var menuItems = 
      <div class='menu'>
        <ul class='parent'>
        {menuData.attributes.Navigation.map((menuItem) => {
          var path = window.location.pathname ? window.location.pathname.toLowerCase() : '/';
          var link = menuItem.Link ? menuItem.Link.toLowerCase() : '/';
          var className = path == link ? 'link-active' : '';
          switch (menuItem.__component) {
            case 'menu.menu-link':
              if (menuItem.IsVisibleAnonymous || isAuthenticated) {
                return (
                  <li><a class={className} href={link}>{menuItem.DisplayName}</a></li>
                );
              }              
              break;
            case 'menu.sub-menu':
              return (
                <li class='dropdown-container'>
                  <a class={className} href={link}>{menuItem.DisplayName}</a>
                  <ul class='dropdown'>
                    {menuItem.Links.map((subMenuItem) => {
                      return (
                        <li><a href={subMenuItem.Link}>{subMenuItem.DisplayName}</a></li>
                      )
                    })}
                  </ul>
                </li>
              )
          }
        })}
        </ul>
      </div>
    this.menu = menuItems;
  }

  render() {

      return (
        <div>
          <input type="checkbox" id="menu_checkbox_toggle"></input>
          <label htmlFor='menu_checkbox_toggle' class="hamburger">&#9776;</label>
          {this.menu}
        </div>
      );
  }
}
