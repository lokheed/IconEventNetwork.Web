import { Component, Host, Prop, h } from '@stencil/core';
import { urlService } from '../../services/url-service';
@Component({
  tag: 'app-footer-navigation',
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
    var baseUrl = urlService.getApiBaseUrl();
    var options = this.getOptions();
    fetch(`${baseUrl}/api/footer-menu?populate=*`, options)
    .then(res => res.json())
    .then(res => {
      this.updateFooterMenuHeader(res.data);
      this.updateFooterMenuItems(res.data);
    });
  }

  updateFooterMenuHeader(footerMenuData) {
    this.footerNavigationHeader = <h2></h2>
    var menuHeaderData = footerMenuData.attributes.MenuItems.find(m => m.LinkType === 'HeadingLink' || m.LinkType === 'HeadingNoLink');
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
  
  updateFooterMenuItems(footerMenuData) {
    var isAuthenticated = !!localStorage.getItem('jwt');
    var menuItems;
    if (isAuthenticated) {
      menuItems = footerMenuData.attributes.MenuItems.filter(m => m.LinkType === 'Normal' && m.Link != '/login');
    } else {
      menuItems = footerMenuData.attributes.MenuItems.filter(m => m.LinkType === 'Normal' && m.IsVisibleAnonymous);
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