import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-logout',
})
export class PageLogout {;
  render() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    window.location.replace('/') 
    return <h1>Logging Out...</h1>
  }
}
