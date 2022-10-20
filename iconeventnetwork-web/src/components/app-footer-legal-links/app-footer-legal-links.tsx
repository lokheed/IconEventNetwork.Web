import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'app-footer-legal-links',
})
export class AppFooterLegalLinks {
    @Prop() footerLegalLinksHeader: HTMLElement;
    @Prop() footerLegalLinksItems: HTMLElement;
  
    componentWillLoad() {
      this.getFooterLegalLinks();
    }
  
    private getOptions() {
      return {  
        method: 'GET'
      }
    }
  
    private getFooterLegalLinks() {   
      var strapiBaseUrl = this.getStrapiBaseUrl();
      var options = this.getOptions();
      fetch(`${strapiBaseUrl}/api/footer-legal-menu?populate=*`, options)
      .then(res => res.json())
      .then(res => {
        this.updateFooterLegalLinksHeader(res.data);
        this.updateFooterLegalLinksItems(res.data);
      });
    }
  
    private getStrapiBaseUrl() {
      var strapiBaseUrl = 'https://api.iconeventnetwork.com';
      if (window.location.hostname.toLowerCase() === 'localhost') strapiBaseUrl = 'http://localhost:1337';
      if (window.location.hostname.toLowerCase().startsWith('qa')) strapiBaseUrl = 'https://qaapi.iconeventnetwork.com';
      if (window.location.hostname.toLowerCase().startsWith('stg')) strapiBaseUrl = 'https://stgapi.iconeventnetwork.com';
      return strapiBaseUrl;
    }
  
    updateFooterLegalLinksHeader(footerLegalLinksData) {
      this.footerLegalLinksHeader = <h2></h2>
      var menuLegalLinksData = footerLegalLinksData.attributes.MenuItems.find(m => m.LinkType === 'HeadingLink' || m.LinkType === 'HeadingNoLink');
      if (menuLegalLinksData) {
        switch(menuLegalLinksData.LinkType) {
          case 'HeadingLink': {
            this.footerLegalLinksHeader = <h2><stencil-route-link url={menuLegalLinksData.link}>{menuLegalLinksData.DisplayName}</stencil-route-link></h2>;
            break;
          }
          case 'HeadingNoLink': {
            this.footerLegalLinksHeader = <h2>{menuLegalLinksData.DisplayName}</h2>;
            break;
          }
        }
      }
    }
    
    updateFooterLegalLinksItems(footerLegalLinksData) {
      var isAuthenticated = !!localStorage.getItem('jwt');
      var menuItems;
      if (isAuthenticated) {
        menuItems = footerLegalLinksData.attributes.MenuItems.filter(m => m.LinkType === 'Normal' && m.link != '/login');
      } else {
        menuItems = footerLegalLinksData.attributes.MenuItems.filter(m => m.LinkType === 'Normal' && m.IsVisibleAnonymous);
      }
      this.footerLegalLinksItems = menuItems.map(d => <li><stencil-route-link url={d.Link}>{d.DisplayName}</stencil-route-link></li>);
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