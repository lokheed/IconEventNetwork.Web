import { Component, Prop, h } from '@stencil/core';
import { RouterHistory } from '@stencil-community/router';

@Component({
  tag: 'page-directory',
  styleUrl: 'page-directory.css',
  shadow: true,
})
export class PageDirectory {
  @Prop() isAuthenticated!: boolean;
  @Prop() history: RouterHistory;

  componentWillRender() {
    if (!this.isAuthenticated) {
      this.history.replace('/', {});
    }
  } 

  render() {
    return (
      <div class="page-directory">
        <h1>Directory</h1>
        <p>This is the directory page.</p>
      </div>
    );
  }

}
