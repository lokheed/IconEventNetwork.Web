import { Component, Prop, h } from '@stencil/core';
import { RouterHistory } from '@stencil-community/router';

@Component({
  tag: 'page-destinations',
  styleUrl: 'page-destinations.scss',
  shadow: false,
})
export class PageDestinations {
  @Prop() history: RouterHistory;

  componentWillRender() {
    var isAuthenticated = !!localStorage.getItem('jwt');       
    if (!isAuthenticated) {
      this.history.replace('/', {});
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
