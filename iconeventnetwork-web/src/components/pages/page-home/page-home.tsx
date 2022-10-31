import { Component, Host, Prop, State, h } from '@stencil/core';
import { scrollToFragment } from 'scroll-to-fragment';
import { urlService } from '../../../services/url-service';
@Component({
  tag: 'page-home',
  styleUrl: 'page-home.scss',
  shadow: false,
})
export class PageHome {
  @Prop() foundingPlannerLogos: HTMLElement;
  @State() isEventPlannersLinkSelected: boolean = false;
  @State() isProvderPartnersLinkSelected: boolean = false;

  componentWillLoad() {
    this.getFoundingPlannerLogos();
  }

  componentDidLoad() {
    scrollToFragment();
  }

  private eventPlannersLinkToggle() {
    this.isEventPlannersLinkSelected = true;
    this.isProvderPartnersLinkSelected = false;
  }

  private getFoundingPlannerLogos() {   
    var baseUrl = urlService.getApiBaseUrl();
    var options = this.getOptions();
    fetch(`${baseUrl}/api/founding-planners?fields[0]=CompanyName&populate[Logo][fields][0]=alternativeText&populate[Logo][fields][1]=url&sort[0]=LogoRank`, options)
    .then(res => res.json())
    .then(res => {
      this.updateFoundingPlannerLogos(res.data);
    });
  }

  private getOptions() {
    return {  
      method: 'GET'
    }
  }

  private providerPartnersLinkToggle() {
    this.isEventPlannersLinkSelected = false;
    this.isProvderPartnersLinkSelected = true;
  }

  updateFoundingPlannerLogos(foundingPlannerLogoData) {
    var returnedLogos = foundingPlannerLogoData.map((d) => <img src={d.attributes.Logo.data.attributes.url} alt={d.attributes.Logo.data.attributes.alternativeText} class="logo"/>);
    if (returnedLogos.length === 15) this.foundingPlannerLogos = returnedLogos;
    if (returnedLogos.length > 15) this.foundingPlannerLogos = returnedLogos.slice(0, 15);
    if (returnedLogos.length < 15) {
      var finalLogos = returnedLogos;
      while (finalLogos.length < 15) {
        finalLogos.push(...returnedLogos);
      }
      this.foundingPlannerLogos = finalLogos.slice(0, 15);
    }
 }

  render() {
    return (
      <Host>
        <div class='hero'>
          <h1>
            Introducing 
            <br/>
            The Icon Network
          </h1>
          <p>
            The Icon Network was envisioned by a community of world-class event planners and 
            providers who together create iconic experiences for life's most important occasions.
          </p>
          <div class='photo-credit'>Photo courtesy of Marcy Blum Events</div>       
        </div>
        <div>
          <a id='our-mission'></a>        
          <h2>Our Mission</h2>
          <hr class='purple'/>
          <p>
            To empower luxury event professionals to operate at their highest potential by creating
            a platform to collaborate and create, share best practices, and drive fullfillment
            through community
          </p>
        </div>
        <div class='triple-image image-set-1'>
          <div><div class='photo-credit'>Photo courtesy of Mindy Weiss Party Consultants</div></div>
          <div><div class='photo-credit'>Photo courtesy of David Stark Design and Production</div></div>
          <div><div class='photo-credit'>Photo courtesy of JZ Events</div></div>
        </div>
        <a id='how-it-works'></a>        
        <div class='left-image'>
          <div class='image-container'>
            <div></div>
            <div><div class='photo-credit'>Photo courtesy of Easton Events</div></div>
          </div>
          <div class='text-container'>
            <h2>How it Works</h2>
            <hr class='green'/>
            <div class='list'>
              <div class='list-item-container'>
                <div class='counter-container pink'></div>                  
                <p>
                  The Icon Network is a by-invitation-only organization designed to develop
                  connections between event planners and the providers they partner with to
                  deliver iconic events.
                </p>
              </div>
              <div class='list-item-container orange'>
                <div class='counter-container'></div>   
                <p>
                  Providers are vetted and selected based on their experience and performance, 
                  giving planners the utmost confidence when they utilize an Icon Network Provider.
                </p>              
              </div>           
              <div class='list-item-container'>
                <div class='counter-container blue'></div>    
                <p>
                  Thereafter, all Icon Network members are monitored and held accountable for
                  quality, reliability, and consistency.
                </p>              
              </div>        
            </div>            
          </div>
        </div>
        <div class='single-image'>
          <div class='image1'><div class='photo-credit'>Photo courtesy of Matthew Robbins Design</div></div>
        </div>      
        <a id='are-you-an-icon'></a>        
        <div class='right-image'>
          <div class='text-container'>
            <h2>Are You an Icon?</h2>
            <hr class='blue'/>
            <h3>The Selection Process</h3>
            <p>
              The Icon Network consists of world-renowned event planners and providers who
              co-created the organization and its rules of engagement. Applications to join
              the network will be processed online and reviewed in a timely manner, with
              notification of status occurring within 30 days. Select an option below to learn
              more about the application criteria and benefits.
            </p>
            <div class='tab-links'>
              <div class='tab-link'><span id='event-planners-link' class={{selected: this.isEventPlannersLinkSelected}} onClick={() => this.eventPlannersLinkToggle()}>Event Planners</span></div>
              <div class='tab-link'><span id='provider-partners-link' class={{selected: this.isProvderPartnersLinkSelected}} onClick={() => this.providerPartnersLinkToggle()}>Provider Partners</span></div>            
            </div>        
          </div>         
          <div class='image-container'>
            <div class='image5'><div class='photo-credit'>Photo courtesy of Easton Events</div></div>
            <div></div>
          </div>
        </div>
        <div class={{tabContent: true, hidden: !this.isEventPlannersLinkSelected}}>
          <h2>Event Planners</h2>
          <hr/>
          <div class="item">
            <div class='label'>Evaluation<br></br>Criteria</div>
            <div class='content'>
              <ul>
                <li>Recommendation from an Advisory Board member or other network participant</li>
                <li>Demonstrated experience in the luxury sector</li>
                <li>Total sales and event production data</li>
                <li>Network feedback</li>
                <li>Photos/videos of work</li>
              </ul>
            </div>
          </div>
          <hr/>
          <div class="item">
            <div class='label'>Network<br/>Benefits</div>
            <div class='content'>
              <ul>
                <li>A vetted list of trusted providers from all categories, in markets around the globe</li>
                <li>Online directory listing on the Icon Network digital platform</li>
                <li>Consumer-facing directory listing on the Icon Network website</li>
                <li>The Icon Network logo/seal for inclusion in your business communications</li>
                <li>Consumer marketing via social media, PR, and other channels</li>
                <li>Networking events that incorporate 1:1 appointments between planners and providers</li>              
              </ul>
            </div>
          </div>
          <hr/>
        </div>
        <div class={{tabContent: true, hidden: !this.isProvderPartnersLinkSelected}}>
          <h2>Provider Partners</h2>
          <hr/>
          <div class="item">
            <div class='label'>Evaluation<br></br>Criteria</div>
            <div class='content'>
              <ul>
                <li>Recommendation from an Advisory Board member or other network participant</li>
                <li>Demonstrated experience in the luxury sector</li>
                <li>Total sales and event production data</li>
                <li>Network feedback</li>
                <li>Photos/videos of work</li>
              </ul>
            </div>
          </div>
          <hr/>
          <div class="item">
            <div class='label'>Network<br/>Benefits</div>
            <div class='content'>
              <ul>
                <li>Exclusive access to the world’s best event planners, representing hundreds of millions in luxury event sales</li>
                <li>Online directory listing on the Icon Network digital platform</li>
                <li>The Icon Network logo/seal for inclusion in your business communications</li>
                <li>B2B marketing opportunities to reach event planners</li>
                <li>Networking events that incorporate 1:1 appointments between planners and providers</li>
              </ul>
            </div>
          </div>
          <hr/>

        </div>
        <div class='single-image'>
          <div class='image2'><div class='photo-credit'>Photo courtesy of Matthews Robbins Design</div></div>
        </div>      
        <div>
          <a id='founding-planners'></a>        
          <h2>Founding Planners</h2>
          <hr class='pink'/>
          <div class='founding-planner-logo-ctn'>
           {this.foundingPlannerLogos}
          </div>
        </div>
        <div class='triple-image image-set-2'>
          <div><div class='photo-credit'>Photo courtesy of Rafanelli Events</div></div>
          <div><div class='photo-credit'>Photo courtesy of Marcy Blum Events</div></div>
          <div><div class='photo-credit'>Photo courtesy of Colin Cowie Lifestyle</div></div>
        </div>
      </Host>
    );
  }
}
