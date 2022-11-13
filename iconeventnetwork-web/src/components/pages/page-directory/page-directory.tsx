import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-directory',
  styleUrl: 'page-directory.scss',
  shadow: false,
})
export class PageDirectory {

  componentWillRender() {
    var isAuthenticated = !!localStorage.getItem('jwt');       
    if (!isAuthenticated) {
      window.location.replace('/');
    }
  } 

  render() {
    return (
      <div class="page-directory">
        <h1>Directory</h1>
        <p>This is the directory page.</p>
      </div>
    );
  }

}
