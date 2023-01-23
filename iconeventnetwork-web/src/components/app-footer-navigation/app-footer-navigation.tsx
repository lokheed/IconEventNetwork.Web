import { Component, Host, Prop, h } from '@stencil/core';
import { MenuLink } from '../../services/clients/client-base';
import { localStorageKeyService } from '../../services/local-storage-key-service';

@Component({
  tag: 'app-footer-navigation',
  styleUrl: 'app-footer-navigation.scss',
  shadow: false,
})
export class AppFooterNavigation {

  @Prop() menuItems: MenuLink[] = [];

  render() {
    var header = <h2></h2>;
    var headerItem = this.menuItems.find(m => m.LinkType === 'HeadingLink' || m.LinkType === 'HeadingNoLink'); 
    if (headerItem && headerItem.LinkType === 'HeadingLink' && headerItem.IsVisibleAnonymous) {
      header = <h2><a href={headerItem.Link}>{headerItem.DisplayName}</a></h2>
    } else if (headerItem && headerItem.LinkType === 'HeadingNoLink' && headerItem.IsVisibleAnonymous) {
      header = <h2>{headerItem.DisplayName}</h2>
    }
    const isAuthenticated = !!localStorage.getItem(localStorageKeyService.Jwt);
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