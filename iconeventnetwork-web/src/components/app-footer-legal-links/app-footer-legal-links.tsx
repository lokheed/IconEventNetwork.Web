import { Component, Host, State, h } from '@stencil/core';
import { MenuLink } from '../../services/clients/client-base';
import { FooterLegalMenuClient } from '../../services/clients/footer-legal-menu-client';

@Component({
  tag: 'app-footer-legal-links',
  styleUrl: 'app-footer-legal-links.scss',
  shadow: false,
})
export class AppFooterLegalLinks {
    private readonly footerLegalMenuClient!: FooterLegalMenuClient;

    constructor() {
      this.footerLegalMenuClient = new FooterLegalMenuClient();
    }

    @State() menuItems: MenuLink[] = [];
  
    componentWillLoad() {
      this.footerLegalMenuClient.getFooterLegalMenu()
      .then(res => {
        this.menuItems = res.data.attributes.MenuItems;
      })
      .catch(err => console.error(err))
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