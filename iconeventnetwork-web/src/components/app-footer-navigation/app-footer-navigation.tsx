import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'app-footer-navigation',
  styleUrl: 'app-footer-navigation.css',
  shadow: true,
})
export class AppFooterNavigation {
  @Prop() footerNavigationHeader: HTMLElement;
  @Prop() footerNavigationItems: HTMLElement;

  componentWillLoad() {
    this.getFooterMenu();
  }

  private getOptions() {
    return {  
      method: 'GET'
    }
  }

  private getFooterMenu() {   
    var strapiBaseUrl = this.getStrapiBaseUrl();
    var options = this.getOptions();
    fetch(`${strapiBaseUrl}/api/footer-menu?populate=*`, options)
    .then(res => res.json())
    .then(res => {
      this.updateFooterMenuHeader(res.data);
      this.updateFooterMenuItems(res.data);
    });
  }

  private getStrapiBaseUrl() {
    var strapiBaseUrl = 'https://api.iconeventnetwork.com';
    if (window.location.hostname.toLowerCase() === 'localhost') strapiBaseUrl = 'http://localhost:1337';
    if (window.location.hostname.toLowerCase().startsWith('qa')) strapiBaseUrl = 'https://qaapi.iconeventnetwork.com';
    if (window.location.hostname.toLowerCase().startsWith('stg')) strapiBaseUrl = 'https://stgapi.iconeventnetwork.com';
    return strapiBaseUrl;
  }

  updateFooterMenuHeader(footerMenuData) {
    this.footerNavigationHeader = <h2></h2>
    var menuHeaderData = footerMenuData.attributes.MenuItems.find(m => m.LinkType === 'HeadingLink' || m.LinkType === 'HeadingNoLink');
    if (menuHeaderData) {
      switch(menuHeaderData.LinkType) {
        case 'HeadingLink': {
          this.footerNavigationHeader = <h2><stencil-route-link url={menuHeaderData.link}>{menuHeaderData.DisplayName}</stencil-route-link></h2>;
          break;
        }
        case 'HeadingNoLink': {
          this.footerNavigationHeader = <h2>{menuHeaderData.DisplayName}</h2>;
          break;
        }
      }
    }
  }
  
  updateFooterMenuItems(footerMenuData) {
    var isAuthenticated = !!localStorage.getItem('jwt');
    var menuItems;
    if (isAuthenticated) {
      menuItems = footerMenuData.attributes.MenuItems.filter(m => m.LinkType === 'Normal' && m.link != '/login');
    } else {
      menuItems = footerMenuData.attributes.MenuItems.filter(m => m.LinkType === 'Normal' && m.IsVisibleAnonymous);
    }
    this.footerNavigationItems = menuItems.map(d => <li><stencil-route-link url={d.link}>{d.DisplayName}</stencil-route-link></li>);
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