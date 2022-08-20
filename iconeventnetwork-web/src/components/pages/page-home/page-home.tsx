import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-home',
  styleUrl: 'page-home.css',
  shadow: true,
})
export class PageHome {

  render() {
    return (
      <div class="page-home">
        <h1>Why Icon?</h1>
        <p>I am sure Amelia will come up with something to put here.</p>
      </div>
    );
  }

}
