import { Component, h } from '@stencil/core';
import { localStorageKeyService } from '../../../services/local-storage-key-service';

@Component({
  tag: 'page-join',
  styleUrl: 'page-join.scss',
  shadow: false,
})
export class PageJoin {
  componentWillRender() {
    var isAuthenticated = !!localStorage.getItem(localStorageKeyService.Jwt);       
    if (isAuthenticated) {
      window.location.replace('/');
    }
  } 
  
  render() {
    return (
      <div class="page-join">
        <h1>Join</h1>
        <p>This is the join page.</p>
      </div>
    );
  }

}
