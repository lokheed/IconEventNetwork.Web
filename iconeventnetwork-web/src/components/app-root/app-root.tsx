import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  render() {
    return (
      <div>
        <header>
          <h1>Icon Event Network</h1>
        </header>
        <ul class="navigation">
          <li><stencil-route-link url="/" exact={true}>Why Icon?</stencil-route-link></li>
          <li><stencil-route-link url="/dashboard">Dashboard</stencil-route-link></li>
          <li><stencil-route-link url="/directory">Directory</stencil-route-link></li>
          <li><stencil-route-link url="/destinations">Destinations</stencil-route-link></li>
          <li><stencil-route-link url="/join">Join the Network</stencil-route-link></li>
        </ul>
        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="page-home" exact={true} />
              <stencil-route url="/dashboard" component="page-dashboard" />
              <stencil-route url="/directory" component="page-directory" />
              <stencil-route url="/destinations" component="page-destinations" />
              <stencil-route url="/join" component="page-join" />
              <stencil-route url="/profile/:name" component="app-profile" />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
