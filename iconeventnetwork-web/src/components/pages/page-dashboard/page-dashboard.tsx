import { Component, Prop, h } from '@stencil/core';
import { RouterHistory } from '@stencil-community/router';

@Component({
  tag: 'page-dashboard',
  styleUrl: 'page-dashboard.css',
  shadow: true,
})
export class PageDashboard {
  @Prop() isAuthenticated!: boolean;
  @Prop() history: RouterHistory;

  componentWillRender() {
    if (!this.isAuthenticated) {
      this.history.replace('/', {});
    }
  } 

  render() {
    return (
      <div class="page-dashboard">
        <h1>Dashboard</h1>
        <p>This is the dashboard page.</p>
      </div>
    );
  }

}
