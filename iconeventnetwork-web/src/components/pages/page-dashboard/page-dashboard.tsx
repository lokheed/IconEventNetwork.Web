import { Component, h } from '@stencil/core';
import { localStorageKeyService } from '../../../services/local-storage-key-service';

@Component({
  tag: 'page-dashboard',
  styleUrl: 'page-dashboard.scss',
  shadow: false,
})
export class PageDashboard {
  componentWillRender() {
    var isAuthenticated = !!localStorage.getItem(localStorageKeyService.Jwt);
    if (!isAuthenticated) {
      window.location.replace('/');
    }
  } 

  render() {
    return (
      <div class="page-dashboard">
        <h1>Dashboard</h1>
        <p>This is the dashboard page.</p>
      </div>
    );
  }

}
