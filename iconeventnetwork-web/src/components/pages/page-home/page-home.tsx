import { Component, Host, State, h } from '@stencil/core';
import { scrollToFragment } from 'scroll-to-fragment';
import { DataResponse } from '../../../services/clients/client-base';
import { FoundingPlannerClient, GetFoundingPlannersResponse } from '../../../services/clients/founding-planner-client';
import { noImageDataUrl } from '../../../utils/images-fallback';

@Component({
  tag: 'page-home',
  styleUrl: 'page-home.scss',
  shadow: false,
})
export class PageHome {
  private foundingPlannersClient: FoundingPlannerClient;
  
  constructor() {
    // short term hack until proper domain redirect is working at the DNS level
    if (window.location.hostname.toLowerCase().includes('iconeventnetwork.com')) window.location.replace('https://theiconnetwork.com');
    
    this.foundingPlannersClient = new FoundingPlannerClient();
  }
  
  @State() foundingPlanners: DataResponse<GetFoundingPlannersResponse>[];
  @State() isEventPlannersLinkSelected: boolean = false;
  @State() isProvderPartnersLinkSelected: boolean = false;

  componentWillLoad() {
    this.foundingPlannersClient.getFoundingPlanners({
      fields: ['CompanyName'],
      populate: {
        Logo: {
          fields: ['alternativeText', 'url'],
        },
      },
      sort: ['LogoRank'],
    })
      .then((response) => {
        this.updateFoundingPlannerLogos(response.data);
      })
      .catch((error) => console.error(error));
  }

  componentDidLoad() {
    scrollToFragment();
  }

  private eventPlannersLinkToggle() {
    this.isEventPlannersLinkSelected = true;
    this.isProvderPartnersLinkSelected = false;
  }

  private providerPartnersLinkToggle() {
    this.isEventPlannersLinkSelected = false;
    this.isProvderPartnersLinkSelected = true;
  }

  updateFoundingPlannerLogos(foundingPlannerLogoData: DataResponse<GetFoundingPlannersResponse>[]) {
    const wantedPlanners = 15;
    const planners: DataResponse<GetFoundingPlannersResponse>[] = [];
    while (planners.length < wantedPlanners){
      planners.push(...foundingPlannerLogoData);
    }
    this.foundingPlanners = planners.slice(0,15);
 }

  render() {
    return (
      <Host>
        <div class='hero'>
          <h1>
            Introducing 
            <br/>
            The Icon Network<sup>TM</sup>
          </h1>
          <p>
            The Icon Network was envisioned by a community of world-class event planners and 
            providers who together create iconic experiences for life's most important occasions.
          </p>
          <div class='photo-credit'>Photo courtesy of Marcy Blum Events</div>       
        </div>
        <div class="our-mission-container">
          <a id='our-mission'></a>        
          <h2>Our Mission</h2>
          <hr/>
          <p>
            To empower luxury event professionals to operate at their highest potential by creating
            a platform to collaborate and create, share best practices, and drive fullfillment
            through community
          </p>
        </div>
        <div class='triple-image image-set-1'>
          <div><div class='photo-credit'>Photo courtesy of Mindy Weiss Party Consultants</div></div>
          <div><div class='photo-credit'>Photo courtesy of David Stark Design and Production</div></div>
          <div><div class='photo-credit'>Photo courtesy of Alison Events</div></div>
        </div>
        <a id='how-it-works'></a>        
        <div class='left-image'>
          <div class='image-container'>
            <div></div>
            <div><div class='photo-credit'>Photo courtesy of Easton Events</div></div>
          </div>
          <div class='text-container'>
            <h2>How it Works</h2>
            <hr/>
            <div class='list'>
              <div class='list-item-container'>
                <div class='counter-container'></div>                  
                <p>
                  The Icon Network is a by-invitation-only organization designed to develop
                  connections between event planners and the providers they partner with to
                  deliver iconic events.
                </p>
              </div>
              <div class='list-item-container'>
                <div class='counter-container'></div>   
                <p>
                  Providers are vetted and selected based on their experience and performance, 
                  giving planners the utmost confidence when they utilize an Icon Network Provider.
                </p>              
              </div>           
              <div class='list-item-container'>
                <div class='counter-container'></div>    
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
        <div class='right-image are-you-an-icon-container'>
          <div class='text-container'>
            <h2>Are You an Icon?</h2>
            <hr/>
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
          <a id='founding-members'></a>        
          <h2>Founding Members</h2> 
          <hr class='pink'/>
          <div class='founding-planner-logo-ctn'>
           {this.foundingPlanners && this.foundingPlanners.map((planner) => 
            <img
              src={planner.attributes.Logo.data?.attributes.url ? planner.attributes.Logo.data.attributes.url : noImageDataUrl}
              alt={planner.attributes.Logo.data?.attributes.alternativeText} class="logo"
            />
          )}
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
