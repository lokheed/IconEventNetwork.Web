import { Component, Prop, h } from '@stencil/core';
import { RouterHistory } from '@stencil-community/router';

@Component({
  tag: 'page-destinations',
  styleUrl: 'page-destinations.css',
  shadow: true,
})
export class PageDestinations {
  @Prop() isAuthenticated!: boolean;
  @Prop() history: RouterHistory;

  componentWillRender() {
    if (!this.isAuthenticated) {
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
