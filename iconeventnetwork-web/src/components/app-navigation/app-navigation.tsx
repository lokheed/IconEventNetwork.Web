import { Component, State, Prop, h } from '@stencil/core';
import { MenuLink } from '../../services/clients/client-base';
import { MainMenuClient } from '../../services/clients/main-menu-client';

@Component({
  tag: 'app-navigation',
})

export class AppNavigation {
  private readonly mainMenuClient: MainMenuClient;

  constructor(){
    this.mainMenuClient = new MainMenuClient();
  }

  @State() hamburgerIsChecked: boolean;
  @Prop() menu: HTMLElement;

  componentWillLoad() {
    this.hamburgerIsChecked = false;
    this.mainMenuClient.getMainMenu("Navigation.Links")
      .then(res => {
        this.updateMenu(res.data.attributes.Navigation);
      })
      .catch(err => console.error(err));
  }

  updateMenu(menuLinks: MenuLink[]) {
    var isAuthenticated = !!localStorage.getItem('jwt');
    var menuItems = 
      <div class='menu'>
        <ul class='parent'>
        {menuLinks.map((menuItem) => {
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
