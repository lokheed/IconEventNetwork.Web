import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-dashboard',
  styleUrl: 'app-dashboard.css',
  shadow: true,
})
export class AppDashboard {
  render() {
    return (
      <div class="app-dashboard">
        <h1>Dashboard</h1>
        <p>Dashboard stuff will go here.</p>
      </div>
    );
  }
}
