import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-join',
  styleUrl: 'page-join.css',
  shadow: true,
})
export class PageJoin {

  render() {
    return (
      <div class="page-join">
        <h1>Join</h1>
        <p>This is the join page.</p>
      </div>
    );
  }

}
