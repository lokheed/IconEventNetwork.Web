import { Component, Host, Prop, State, Listen, h } from '@stencil/core';
import { urlService } from '../../../services/url-service';
@Component({
  tag: 'page-event-planners',
  styleUrl: 'page-event-planners.scss',
  shadow: false,
})
export class PageEventPlanners {
  @Prop() eventPlanners: HTMLElement; 
  @State() eventPlannerBio: HTMLElement; 
  @State() selectedEventPlannerId: number = 0;
  @Listen('eventPlannerItemSelected', {target: 'body'})
  eventPlannerItemSelectedHandler(event: CustomEvent<number>) {
    this.selectedEventPlannerId = event.detail;
      this.getEventPlanner(event.detail);
  }

  componentDidRender() {
    if (this.selectedEventPlannerId > 0) {
      // get the bio item node and the parent grid node
      var selectedEventPlannerBioElementId = 'eventPlannerBio' + this.selectedEventPlannerId;
      var plannerBioItemNode = document.getElementById(selectedEventPlannerBioElementId);
      if (!plannerBioItemNode) return;
      var plannerBioItemParentNode = plannerBioItemNode.parentNode;
      var plannerGridNode = plannerBioItemNode.parentNode.parentNode;
      // if the bio item is not already at the last element, move it there
      var lastChildNode = plannerGridNode.lastChild;
      if (lastChildNode.firstChild != plannerBioItemNode) plannerGridNode.insertBefore(plannerBioItemParentNode, lastChildNode.nextSibling);
      // now find the correct location to move the bio item
      var selectedEventPlannerElementId = 'eventPlanner' + this.selectedEventPlannerId;
      var plannerItemNode = document.getElementById(selectedEventPlannerElementId);
      var plannerItemParentNode = plannerItemNode.parentNode;
      var index = Array.prototype.indexOf.call(plannerGridNode.children, plannerItemParentNode);
      var targetIndex = (Math.floor(index/3) + 1) * 3;
      plannerGridNode.insertBefore(plannerBioItemParentNode, plannerGridNode.children[targetIndex]);
    }
  }

  componentWillLoad() {
    this.getEventPlanners();
  }

  private getEventPlanners() {   
    var baseUrl = urlService.getApiBaseUrl();
    var options = this.getOptions();
    fetch(`${baseUrl}/api/founding-planners?fields[0]=CompanyName&fields[1]=FirstName&fields[2]=LastName&populate[Headshot][fields][0]=alternativeText&populate[Headshot][fields][1]=url&sort[0]=LastName&sort[1]=FirstName&sort[3]=CompanyName`, options)
    .then(res => res.json())
    .then(res => {
      this.updateEventPlanners(res.data);
    });
  }

  private getEventPlanner(eventPlannerId) { 
    if (eventPlannerId == 0)  this.eventPlannerBio = undefined;
    if (eventPlannerId > 0) {
      var strapiBaseUrl = urlService.getApiBaseUrl();
      var options = this.getOptions();
      fetch(`${strapiBaseUrl}/api/founding-planners/${eventPlannerId}?fields[0]=CompanyName&fields[1]=FirstName&fields[2]=LastName&fields[3]=Bio&sort[0]=LastName&sort[1]=FirstName&sort[3]=CompanyName`, options)
      .then(res => res.json())
      .then(res => {
        this.eventPlannerBio = 
          <app-event-planner-bio-item
            EventPlannerId={res.data.id}
            FirstName={res.data.attributes.FirstName}
            LastName={res.data.attributes.LastName}
            CompanyName={res.data.attributes.CompanyName}
            Bio={res.data.attributes.Bio}
          >
          </app-event-planner-bio-item>
      });
    }
  }

  private getOptions() {
    return {  
      method: 'GET'
    }
  }

  updateEventPlanners(eventPlannerData) {
   this.eventPlanners = eventPlannerData.map((d) =>
    <app-event-planner-item 
      EventPlannerId={d.id}
      FirstName={d.attributes.FirstName}
      LastName={d.attributes.LastName}
      CompanyName={d.attributes.CompanyName}
      Bio={d.attributes.Bio}
      HeadshotURL={d.attributes.Headshot.data.attributes.url}
      HeadshotAltText={d.attributes.Headshot.data.attributes.alternativeText}
      >
    </app-event-planner-item>
   );
  }
 
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
          {this.eventPlanners}
          {this.eventPlannerBio}
        </div>     
      </Host>
    );
  }
}
