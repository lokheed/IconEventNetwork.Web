import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-dashboard',
  styleUrl: 'page-dashboard.css',
  shadow: true,
})
export class PageDashboard {

  render() {
    return (
      <div class="page-dashboard">
        <h1>Dashboard</h1>
        <p>This is the dashboard page.</p>
      </div>
    );
  }

}
