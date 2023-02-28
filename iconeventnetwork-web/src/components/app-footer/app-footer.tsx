import { Component, State, h } from '@stencil/core';
import { MenuLink } from '../../services/clients/client-base';
import { FooterMenuClient } from '../../services/clients/footer-menu-client';
import { FooterLegalMenuClient } from '../../services/clients/footer-legal-menu-client';
@Component({
  tag: 'app-footer',
  styleUrl: 'app-footer.scss',
  shadow: false,
})
export class AppFooter {
  private readonly footerMenuClient!: FooterMenuClient;
  private readonly footerLegalMenuClient!: FooterLegalMenuClient;

  constructor() {
    this.footerMenuClient = new FooterMenuClient();
    this.footerLegalMenuClient = new FooterLegalMenuClient();  
  }

  @State() navigationMenuItems: MenuLink[] = [];
  @State() legalMenuItems: MenuLink[] = [];
  
  
  componentWillLoad() {
    this.getMenuItems();
    this.getLegalMenuItems();
  }

  private getMenuItems() {
    const footerMenuItemsStorageKey = "footerMenuItems";
    var storedMenuItems = sessionStorage.getItem(footerMenuItemsStorageKey);
    if (storedMenuItems) {
      this.navigationMenuItems = JSON.parse(storedMenuItems);
      return;
    }

    this.footerMenuClient.getFooterMenu()
      .then(res => {
        this.navigationMenuItems = res.data.attributes.MenuItems;
        sessionStorage.setItem(footerMenuItemsStorageKey, JSON.stringify(this.navigationMenuItems));
      })
      .catch(err => console.error(err));
  }

  private getLegalMenuItems() {
    const footerLegalMenuItemsStorageKey = "footerLegalMenuItems";
    var storedMenuItems = sessionStorage.getItem(footerLegalMenuItemsStorageKey);
    if (storedMenuItems) {
      this.legalMenuItems = JSON.parse(storedMenuItems);
      return;
    }
    this.footerLegalMenuClient.getFooterLegalMenu()
      .then(res => {
        this.legalMenuItems = res.data.attributes.MenuItems;
        sessionStorage.setItem(footerLegalMenuItemsStorageKey, JSON.stringify(this.legalMenuItems));
      })
      .catch(err => console.error(err));
    }

  render() {
    return (
      <footer>
        <div class='container logo-container'>
          <div>
            <a href='/'>
              <img class='icon-network-vertical-logo' src='/assets/icon/TIN-Logo-Vertical-Reversed.png' />
            </a>
          </div>
          <div>
          </div>
        </div>
        <div class='container contact-container'>
          <h2>Contact</h2>
          <address>
            307 Fifth Ave.<br/> 
            New York, NY<br/>            
            10016<br/> 
            <br/>            
            <a href="mailto:info@theiconnetwork.com?subject=Inquiry about the Icon Network">info@theiconnetwork.com</a>       
            <br/>
            <a href="tel:12124769444">+1-212-476-9444</a>      
            </address>
        </div>
        <div class='container navigation-container'>
          <app-footer-navigation menuItems={this.navigationMenuItems}></app-footer-navigation>
        </div>
        <div class='container navigation-container'>
          <app-footer-navigation menuItems={this.legalMenuItems}></app-footer-navigation>
        </div>
        <div class='copyright'>&copy; {new Date().getFullYear()} Icon Network</div>
     </footer>
    );
  }

}