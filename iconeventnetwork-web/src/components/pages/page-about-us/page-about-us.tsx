import { Component, Host, Prop, h } from '@stencil/core';
import { scrollToFragment } from 'scroll-to-fragment';
import { urlService } from '../../../services/url-service';

@Component({
  tag: 'page-about-us',
  styleUrl: 'page-about-us.scss',
  shadow: false,
})
export class PageAboutUs {
  @Prop() leadershipTeamMembers: HTMLElement;

  componentWillLoad() {
    this.getLeadershipTeamMembers();
  }

  componentDidLoad() {
    scrollToFragment();
  }

  private getLeadershipTeamMembers() {   
    var baseUrl = urlService.getApiBaseUrl();
    var options = this.getOptions();
    fetch(`${baseUrl}/api/leadership-team-members?fields[0]=Title&fields[1]=FirstName&fields[2]=LastName&fields[3]=Bio&populate[Headshot][fields][0]=alternativeText&populate[Headshot][fields][1]=url&sort[0]=Rank`, options)
    .then(res => res.json())
    .then(res => {
      this.updateLeadershipTeamMembers(res.data);
    });
  }


  private getOptions() {
    return {  
      method: 'GET'
    }
  }

  updateLeadershipTeamMembers(leadershipTeamMemberData) {
   this.leadershipTeamMembers = leadershipTeamMemberData.map((d, index) =>
    <app-leadership-team-item 
      FirstName={d.attributes.FirstName}
      LastName={d.attributes.LastName}
      JobTitle={d.attributes.Title}
      Bio={d.attributes.Bio}
      HeadshotURL={d.attributes.Headshot.data.attributes.url}
      HeadshotAltText={d.attributes.Headshot.data.attributes.alternativeText}
      Color={index == 0 ? 'blue' : index == 1 ? 'purple' : index == 2 ? 'green' : 'pink'}
      >
    </app-leadership-team-item>
   );
  }

  render() {
    return (
      <Host>
        <div class='single-image'>
          <div class='image4'><div class='photo-credit'>Photo courtesy of Marcy Blum Events</div></div>
        </div>   
        <a id='our-leadership'></a>         
        <div class='accent-block'>       
          <h2>Our Leadership</h2>
          <hr class='blue'/>
          <p>
            Our executive team brings decades of expertise and experience to the
            Icon Network, provideing the strategic vision and plan for the network's
            ongoing growth and success.
          </p>     
        </div>   
        <div>
          {this.leadershipTeamMembers}
        </div>
        <a id='testimonials'></a>           
        <div class='accent-block'>    
          <h2>Testimonials</h2>
          <hr class='orange'/>
          <app-testimonial-carousel></app-testimonial-carousel>
        </div>     
        <a id='contact-us'></a>        
        <div class='right-image'>
          <div class='text-container contact-us'>
            <h2>Contact Us</h2>
            <hr class='green'/>
            <p>
              To reach The Icon Network call or email us.
            </p>
            <h3>Email:</h3>
            <a href="mailto:info@iconeventnetwork.com?subject=Inquiry about The Icon Network">info@iconeventnetwork</a>
            <h3>Phone:</h3>
            <span class='phone'>012.345.6789</span>   
          </div>         
          <div class='image-container'>
            <div class='image6'><div class='photo-credit'>Photo courtesy of Matthew Robbins Design</div></div>
            <div></div>
          </div>
        </div>
        <br/><br/><br/>
      </Host>
    );
  }
}
