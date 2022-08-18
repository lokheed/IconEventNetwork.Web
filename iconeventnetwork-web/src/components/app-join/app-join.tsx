import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-join',
  styleUrl: 'app-join.css',
  shadow: true,
})
export class AppJoin {
  render() {
    return (
      <div class="app-Join">
        <h1>Join the Network</h1>
        <p>You should really join the Icon Event Network. It's pretty cool.</p>
      </div>
    );
  }
}
