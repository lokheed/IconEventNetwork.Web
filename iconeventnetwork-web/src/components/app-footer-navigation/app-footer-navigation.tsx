import { Component, Host, Prop, State, h } from '@stencil/core';
import { MenuLink } from '../../services/clients/client-base';
import { localStorageKeyService } from '../../services/local-storage-key-service';

@Component({
  tag: 'app-footer-navigation',
  styleUrl: 'app-footer-navigation.scss',
  shadow: false,
})
export class AppFooterNavigation {

  @Prop() menuItems: MenuLink[] = [];
  @State() menuItemsToRender: MenuLink[] = [];
  @State() headerItem: MenuLink;

  componentWillRender() {
    const isAuthenticated = !!localStorage.getItem(localStorageKeyService.Jwt);
    this.menuItemsToRender = isAuthenticated 
    ? this.menuItems.filter(m => m.LinkType === 'Normal' && m.Link != '/login')
    : this.menuItems.filter(m => m.LinkType === 'Normal' && m.IsVisibleAnonymous);
    this.headerItem = this.menuItems.find(m => m.LinkType === 'HeadingLink' || m.LinkType === 'HeadingNoLink');
  }

  render() {
    return (
      <Host>        
          {this.headerItem && this.headerItem.LinkType === 'HeadingLink' && this.headerItem.IsVisibleAnonymous &&
            <h2><a href={this.headerItem.Link}>{this.headerItem.DisplayName}</a></h2>
          }
          {(!this.headerItem || this.headerItem.LinkType !== 'HeadingLink' || !this.headerItem.IsVisibleAnonymous) &&
            <h2>{this.headerItem.DisplayName}</h2>
          }       
        <ul>   
          {this.menuItemsToRender.map((menuItem) => {
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