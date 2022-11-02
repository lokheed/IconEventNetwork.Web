import { Component, Host, Prop, h } from '@stencil/core';
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

    @Prop() footerLegalLinksHeader: HTMLElement;
    @Prop() footerLegalLinksItems: HTMLElement;
  
    componentWillLoad() {
      this.footerLegalMenuClient.getFooterLegalMenu()
      .then(res => {
        const menuLinks = res.data.attributes.MenuItems;
        this.updateFooterLegalLinksHeader(menuLinks);
        this.updateFooterLegalLinksItems(menuLinks);
      })
      .catch(err => console.error(err))
    }
  
    updateFooterLegalLinksHeader(menuLinks: MenuLink[]) {
      this.footerLegalLinksHeader = <h2></h2>
      var menuLegalLinksData = menuLinks.find(m => m.LinkType === 'HeadingLink' || m.LinkType === 'HeadingNoLink');
      if (menuLegalLinksData) {
        switch(menuLegalLinksData.LinkType) {
          case 'HeadingLink': {
            this.footerLegalLinksHeader = <h2><stencil-route-link url={menuLegalLinksData.Link}>{menuLegalLinksData.DisplayName}</stencil-route-link></h2>;
            break;
          }
          case 'HeadingNoLink': {
            this.footerLegalLinksHeader = <h2>{menuLegalLinksData.DisplayName}</h2>;
            break;
          }
        }
      }
    }
    
    updateFooterLegalLinksItems(menuLinks: MenuLink[]) {
      var isAuthenticated = !!localStorage.getItem('jwt');
      var menuItems;
      if (isAuthenticated) {
        menuItems = menuLinks.filter(m => m.LinkType === 'Normal' && m.Link != '/login');
      } else {
        menuItems = menuLinks.filter(m => m.LinkType === 'Normal' && m.IsVisibleAnonymous);
      }
      this.footerLegalLinksItems = menuItems.map(d => <li><a href={d.Link}>{d.DisplayName}</a></li>);
    }
  
    render() {
      return (
        <Host>
          {this.footerLegalLinksHeader}
          <ul>               
              {this.footerLegalLinksItems}
          </ul>
        </Host>
      ); 
    }
   }