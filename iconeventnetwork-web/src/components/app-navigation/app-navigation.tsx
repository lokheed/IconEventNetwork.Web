import { Component, Prop, h } from '@stencil/core';
import { MenuLink } from '../../services/clients/client-base';
import { MainMenuClient } from '../../services/clients/main-menu-client';

@Component({
  tag: 'app-navigation',
  styleUrl: 'app-navigation.scss',
  shadow: false,
})

export class AppNavigation {
  private readonly mainMenuClient: MainMenuClient;

  constructor(){
    this.mainMenuClient = new MainMenuClient();
  }

  @Prop() menu: HTMLElement;

  componentWillLoad() {
    this.mainMenuClient.getMainMenu({
      populate: ["Navigation.Links"],
    })
      .then(res => {
        this.updateMenu(res.data.attributes.Navigation);
      })
      .catch(err => console.error(err));
  }

  closeMenu() {
    var checkbox = document.getElementById('menu_checkbox_toggle') as HTMLInputElement | null;
    if (checkbox != null) checkbox.checked = false;
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
                        <li><a href={subMenuItem.Link} onClick={() => this.closeMenu()}>{subMenuItem.DisplayName}</a></li>
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
          <label htmlFor='menu_checkbox_toggle' class="hamburger">&#9776;</label>
          <input type="checkbox" id="menu_checkbox_toggle"></input>
          {this.menu}
        </div>
      );
  }
}
