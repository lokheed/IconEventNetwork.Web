import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-destinations',
  styleUrl: 'page-destinations.css',
  shadow: true,
})
export class PageDestinations {

  render() {
    return (
      <div class="page-destinations">
        <h1>Destinations</h1>
        <p>This is the destinations page.</p>
      </div>
    );
  }

}
