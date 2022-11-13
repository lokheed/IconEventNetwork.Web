import { Component, Prop, h } from '@stencil/core';
import { RouterHistory } from '@stencil-community/router';

@Component({
  tag: 'page-dashboard',
  styleUrl: 'page-dashboard.scss',
  shadow: false,
})
export class PageDashboard {
  @Prop() history: RouterHistory;

  componentWillRender() {
    var isAuthenticated = !!localStorage.getItem('jwt');
    if (!isAuthenticated) {
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
