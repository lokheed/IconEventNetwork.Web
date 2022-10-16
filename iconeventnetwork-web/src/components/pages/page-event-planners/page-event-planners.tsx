import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'page-event-planners',
})
export class PageEventPlanners {
  render() {
    return (
      <Host>
        <h1>Event Planners</h1>
        <p>This is the Event Planners page.</p>
      </Host>
    );
  }
}
