import { Component, Host, Prop, h } from '@stencil/core';
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

  @Prop() footerNavigationHeader: HTMLElement;
  @Prop() footerNavigationItems: HTMLElement;

  componentWillLoad() {
    this.footerMenuClient.getFooterMenu()
      .then(res => {
        const menuItems = res.data.attributes.MenuItems
        this.updateFooterMenuHeader(menuItems);
        this.updateFooterMenuItems(menuItems);
      })
      .catch(err => console.error(err));
  }

  updateFooterMenuHeader(menuLinks: MenuLink[]) {
    this.footerNavigationHeader = <h2></h2>
    var menuHeaderData = menuLinks.find(m => m.LinkType === 'HeadingLink' || m.LinkType === 'HeadingNoLink');
    if (menuHeaderData) {
      switch(menuHeaderData.LinkType) {
        case 'HeadingLink': {
          this.footerNavigationHeader = <h2><a href={menuHeaderData.Link}>{menuHeaderData.DisplayName}</a></h2>;
          break;
        }
        case 'HeadingNoLink': {
          this.footerNavigationHeader = <h2>{menuHeaderData.DisplayName}</h2>;
          break;
        }
      }
    }
  }
  
  updateFooterMenuItems(menuLinks: MenuLink[]) {
    var isAuthenticated = !!localStorage.getItem('jwt');
    var menuItems;
    if (isAuthenticated) {
      menuItems = menuLinks.filter(m => m.LinkType === 'Normal' && m.Link != '/login');
    } else {
      menuItems = menuLinks.filter(m => m.LinkType === 'Normal' && m.IsVisibleAnonymous);
    }
    this.footerNavigationItems = menuItems.map(d => <li><a href={d.Link}>{d.DisplayName}</a></li>);
  }

  render() {
    return (
      <Host>
        {this.footerNavigationHeader}
        <ul>               
          {this.footerNavigationItems}
        </ul>
      </Host>
    ); 
  }
}