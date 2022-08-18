import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-directory',
  styleUrl: 'app-directory.css',
  shadow: true,
})
export class AppDirectory {
  render() {
    return (
      <div class="app-directory">
        <h1>Directory</h1>
        <p>Directory stuff will go here.</p>
      </div>
    );
  }
}
