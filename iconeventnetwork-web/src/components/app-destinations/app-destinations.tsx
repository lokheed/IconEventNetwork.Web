import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-destinations',
  styleUrl: 'app-destinations.css',
  shadow: true,
})
export class AppDestinations {
  render() {
    return (
      <div class="app-destinations">
        <h1>Destinations</h1>
        <p>Destinations will go here.</p>
      </div>
    );
  }
}
