import { Component, Prop, h } from '@stencil/core';
import { RouterHistory } from '@stencil-community/router';

@Component({
  tag: 'page-join',
  styleUrl: 'page-join.css',
  shadow: true,
})
export class PageJoin {
  @Prop() isAuthenticated!: boolean;
  @Prop() history: RouterHistory;

  componentWillRender() {
    if (this.isAuthenticated) {
      this.history.replace('/', {});
    }
  } 
  
  render() {
    return (
      <div class="page-join">
        <h1>Join</h1>
        <p>This is the join page.</p>
      </div>
    );
  }

}
