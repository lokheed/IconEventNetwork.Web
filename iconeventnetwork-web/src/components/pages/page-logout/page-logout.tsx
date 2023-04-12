import { Component, Host, h } from '@stencil/core';
import { localStorageKeyService } from '../../../services/local-storage-key-service';

@Component({
  tag: 'page-logout',
  styleUrl: 'page-logout.scss',
  shadow: false,
})
export class PageLogout {;
  componentDidLoad() {
    var isAuthenticated = !!localStorage.getItem(localStorageKeyService.Jwt);
    if (!isAuthenticated) {
      window.location.replace('/');
    } else {
      localStorage.removeItem(localStorageKeyService.Jwt);
      localStorage.removeItem(localStorageKeyService.Username);
      sessionStorage.removeItem(localStorageKeyService.Me);
      window.location.replace('/');
    }
  }

  render() {
    return (
      <Host>
        <h1>Logging Out... <i class="fa-solid fa-spinner fa-spin-pulse"></i></h1>
        <br/>
        <br/>
      </Host> 
    )
  }
}
