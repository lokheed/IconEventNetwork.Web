import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'page-event-planners',
})
export class PageEventPlanners {
  render() {
    return (
      <Host>
        <div class='single-image'>
          <div class='image3'></div>
        </div>   
        <div class='accent-block'>
          <h2>Event Planners</h2>
          <hr class='purple'/>
          <p>
            The Icon Network is a select community of world-class event planners across
            the globe. Together with vetted providers, they create iconic experiences
            for life's most important occasions. The network was founded in 2022 by these
            luminaries in the luxury event planning industry.
          </p>     
        </div>   
        <div class='planner-grid'>
          (event planner grid will go here)
        </div>     
      </Host>
    );
  }
}
