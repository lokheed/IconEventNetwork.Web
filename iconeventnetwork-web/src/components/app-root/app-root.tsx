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
          <li><a href="/">Why Icon?</a></li>
          <li><a href="/dashboard/">Dashboard</a></li>
          <li><a href="/directory/">Directory</a></li>
          <li><a href="/destinations/">Destinations</a></li>
          <li><a href="/Join/">Join the Network</a></li>
        </ul>
        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} />
              <stencil-route url="/dashboard/" component="app-dashboard" exact={true} />
              <stencil-route url="/directory/" component="app-directory" exact={true} />
              <stencil-route url="/destinations/" component="app-destinations" exact={true} />
              <stencil-route url="/join/" component="app-join" exact={true} />
              <stencil-route url="/profile/:name" component="app-profile" exact={true} />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
