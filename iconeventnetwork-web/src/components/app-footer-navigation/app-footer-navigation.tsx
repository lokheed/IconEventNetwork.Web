import { Component, Host, State, h } from '@stencil/core';
import { MenuLink } from '../../services/clients/client-base';
import { FooterMenuClient } from '../../services/clients/footer-menu-client';

@Component({
  tag: 'app-footer-navigation',
  styleUrl: 'app-footer-navigation.scss',
  shadow: false,
})
export class AppFooterNavigation {
  private readonly footerMenuClient!: FooterMenuClient;

  constructor() {
    this.footerMenuClient = new FooterMenuClient();
  }

  @State() menuItems: MenuLink[] = [];

  componentWillLoad() {
    this.footerMenuClient.getFooterMenu()
      .then(res => {
        this.menuItems = res.data.attributes.MenuItems;
      })
      .catch(err => console.error(err));
  }

  render() {
    var header = <h2></h2>;
    var headerItem = this.menuItems.find(m => m.LinkType === 'HeadingLink' || m.LinkType === 'HeadingNoLink'); 
    if (headerItem && headerItem.LinkType === 'HeadingLink') {
      header = <h2><a href={headerItem.Link}>{headerItem.DisplayName}</a></h2>
    } else if (headerItem && headerItem.LinkType === 'HeadingNoLink') {
      header = <h2>{headerItem.DisplayName}</h2>
    }
    const isAuthenticated = !!localStorage.getItem('jwt');
    var menuItems;
    if (isAuthenticated) {
      menuItems = this.menuItems.filter(m => m.LinkType === 'Normal' && m.Link != '/login');
    } else {
      menuItems = this.menuItems.filter(m => m.LinkType === 'Normal' && m.IsVisibleAnonymous);
    }    
    return (
      <Host>
        {header}
        <ul>   
          {menuItems.map((menuItem) => {
              return (
                <li><a href={menuItem.Link}>{menuItem.DisplayName}</a></li>
              )
            })
          }
        </ul>
      </Host>
    ); 
  }
}