import { Component, State, h } from '@stencil/core';
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
    // I want to default to the basic anonymous menu so that something shows on initial render before the menu data comes back from the api
    this.menuLinks = [{id: 1,__component: "menu.sub-menu",DisplayName: "Who We Are",Link: "/",IsVisibleAnonymous: true,},{id: 6,__component: "menu.menu-link",DisplayName: "Event Planners",Link: "/event-planners","LinkType": "Normal",IsVisibleAnonymous: true},{id: 2,__component: "menu.sub-menu",DisplayName: "About Us",Link: "/about-us",IsVisibleAnonymous: true,}];
  }

  @State() menuLinks: MenuLink[] = [];

  componentWillLoad() {
    this.mainMenuClient.getMainMenu({
      populate: ["Navigation.Links"],
    })
      .then(res => {
        this.menuLinks = res.data.attributes.Navigation;
      })
      .catch(err => console.error(err));
  }

  closeMenu() {
    var checkbox = document.getElementById('menu_checkbox_toggle') as HTMLInputElement | null;
    if (checkbox != null) checkbox.checked = false;
  }

  render() {
    var isAuthenticated = !!localStorage.getItem('jwt');
    return (
      <div>
        <label htmlFor='menu_checkbox_toggle' class="hamburger">&#9776;</label>
        <input type="checkbox" id="menu_checkbox_toggle"></input>
        <div class='menu'>
          <ul class='parent'>
          {this.menuLinks.map((menuItem) => {
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
            }
          )}
          </ul>
        </div>
      </div>
    );
  }
}
