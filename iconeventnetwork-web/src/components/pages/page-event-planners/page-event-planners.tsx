import { Component, Host, State, Listen, h } from '@stencil/core';
import { DataResponse } from '../../../services/clients/client-base';
import { FoundingPlannerClient, GetFoundingPlannersResponse } from '../../../services/clients/founding-planner-client';

@Component({
  tag: 'page-event-planners',
  styleUrl: 'page-event-planners.scss',
  shadow: false,
})
export class PageEventPlanners {
  private readonly foundingPlannerClient: FoundingPlannerClient;
  
  constructor() {
    this.foundingPlannerClient = new FoundingPlannerClient();
  }
  
  @State() foundingPlanners: DataResponse<GetFoundingPlannersResponse>[];
  @State() selectedEventPlannerId: number = 0;

  @Listen('eventPlannerItemSelected', {target: 'body'})
  eventPlannerItemSelectedHandler(event: CustomEvent<number>) {
    this.selectedEventPlannerId = event.detail;
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
      var columnCount = 3; //default
      if (window.innerWidth < 769) columnCount = 2;
      if (window.innerWidth < 577) columnCount = 1;
      var targetIndex = (Math.floor(index/columnCount) + 1) * columnCount;
      plannerGridNode.insertBefore(plannerBioItemParentNode, plannerGridNode.children[targetIndex]);
    }
  }

  componentWillLoad() {
    this.foundingPlannerClient.getFoundingPlanners({
      fields: ['CompanyName', 'FirstName', 'LastName', 'Bio'],
      populate: {
        Headshot: {
          fields: ['alternativeText', 'url'],
        },
      },
      sort: ['LastName', 'FirstName', 'CompanyName'],
    })
    .then((response) => this.foundingPlanners = response.data)
    .catch((error) => console.error(error));
  }

  private renderPlannerBio() {
    if (this.selectedEventPlannerId < 1) {
      return
    }
    
    const planner = this.foundingPlanners.find(planner => planner.id == this.selectedEventPlannerId);
    return <app-event-planner-bio-item
      EventPlannerId={planner.id}
      FirstName={planner.attributes.FirstName}
      LastName={planner.attributes.LastName}
      CompanyName={planner.attributes.CompanyName}
      Bio={planner.attributes.Bio}
    />
  }
 
  render() {
    return (
      <Host>
        <div class='single-image'>
          <div class='image3'><div class='photo-credit'>Photo courtesy of Easton Events</div></div>
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
          {this.foundingPlanners && this.foundingPlanners.map(planner => 
            <app-event-planner-item 
              EventPlannerId={planner.id}
              FirstName={planner.attributes.FirstName}
              LastName={planner.attributes.LastName}
              CompanyName={planner.attributes.CompanyName}
              Bio={planner.attributes.Bio}
              HeadshotURL={planner.attributes.Headshot.data.attributes.url}
              HeadshotAltText={planner.attributes.Headshot.data.attributes.alternativeText}
            />
          )}
          {this.renderPlannerBio()}
        </div>     
      </Host>
    );
  }
}
