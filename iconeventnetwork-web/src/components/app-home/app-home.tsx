import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  render() {
    return (
      <div class="app-home">
        <h1>Why Icon?</h1>
        <p>I am sure Amelia will come up with something to put here.</p>
      </div>
    );
  }
}
