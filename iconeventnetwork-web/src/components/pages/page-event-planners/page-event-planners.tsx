import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'page-event-planners',
  styleUrl: 'page-event-planners.css',
})
export class PageEventPlanners {
  @Prop() eventPlanners: HTMLElement;  
 
  componentWillLoad() {
    this.getEventPlanners();
  }

  private getEventPlanners() {   
    var strapiBaseUrl = this.getStrapiBaseUrl();
    var options = this.getOptions();
    fetch(`${strapiBaseUrl}/api/founding-planners?fields[0]=CompanyName&fields[1]=FirstName&fields[2]=LastName&fields[3]=Bio&populate[Headshot][fields][0]=alternativeText&populate[Headshot][fields][1]=url&sort[0]=LastName&sort[1]=FirstName&sort[3]=CompanyName&populate=*`, options)
    .then(res => res.json())
    .then(res => {
      this.updateEventPlanners(res.data);
    });
  }


  private getOptions() {
    return {  
      method: 'GET'
    }
  }

  updateEventPlanners(eventPlannerData) {
   this.eventPlanners = eventPlannerData.map((d) =>
    <app-event-planner-item 
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

  private getStrapiBaseUrl() {
    var strapiBaseUrl = 'https://api.iconeventnetwork.com';
    if (window.location.hostname.toLowerCase() === 'localhost') strapiBaseUrl = 'http://localhost:1337';
    if (window.location.hostname.toLowerCase().startsWith('qa')) strapiBaseUrl = 'https://qaapi.iconeventnetwork.com';
    if (window.location.hostname.toLowerCase().startsWith('stg')) strapiBaseUrl = 'https://stgapi.iconeventnetwork.com';
    return strapiBaseUrl;
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
        </div>     
      </Host>
    );
  }
}
