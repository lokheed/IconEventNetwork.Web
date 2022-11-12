import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-destinations',
  styleUrl: 'page-destinations.scss',
  shadow: false,
})
export class PageDestinations {
  componentWillRender() {
    var isAuthenticated = !!localStorage.getItem('jwt');       
    if (!isAuthenticated) {
      window.location.replace('/');
    }
  } 

  render() {
    return (
      <div class="page-destinations">
        <h1>Destinations</h1>
        <p>This is the destinations page.</p>
      </div>
    );
  }

}
