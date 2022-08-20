import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-directory',
  styleUrl: 'page-directory.css',
  shadow: true,
})
export class PageDirectory {

  render() {
    return (
      <div class="page-directory">
        <h1>Directory</h1>
        <p>This is the directory page.</p>
      </div>
    );
  }

}
