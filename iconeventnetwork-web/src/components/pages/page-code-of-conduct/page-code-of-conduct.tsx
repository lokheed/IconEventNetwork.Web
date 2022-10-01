import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-code-of-conduct',
  styleUrl: 'page-code-of-conduct.css',
  shadow: true,
})
export class PageCodeOfConduct {
  render() {
    return (
      <div class="page-code-of-conduct">
        <h1>Code of Conduct</h1>
        <p>This is the code of conduct page.</p>
      </div>
    );
  }

}
