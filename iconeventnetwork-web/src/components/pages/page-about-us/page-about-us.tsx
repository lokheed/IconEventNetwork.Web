import { Component, Host, State, h } from '@stencil/core';
import { scrollToFragment } from 'scroll-to-fragment';
import { DataResponse } from '../../../services/clients/client-base';
import { GetLeadershipTeamMembersResponse, LeadershipTeamMemberClient } from '../../../services/clients/leadership-team-member-client';

@Component({
  tag: 'page-about-us',
  styleUrl: 'page-about-us.scss',
  shadow: false,
})
export class PageAboutUs {
  private readonly leadershipTeamMemberClient: LeadershipTeamMemberClient;

  constructor(){
    this.leadershipTeamMemberClient = new LeadershipTeamMemberClient();
  }

  @State() leadershipTeamMembers: DataResponse<GetLeadershipTeamMembersResponse>[];

  componentWillLoad() {
    this.leadershipTeamMemberClient.getLeadershipTeamMembers({
      fields: ['Title', 'FirstName', 'LastName', 'Bio'],
      populate: {
        Headshot: {
          fields: ['alternativeText', 'url'],
        },
      },
      sort: ['Rank'],
    })
    .then((response) => {
      this.leadershipTeamMembers = response.data;
    })
    .catch(reason => console.error(reason));
  }

  componentDidLoad() {
    scrollToFragment();
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
            Icon Network, providing the strategic vision and plan for the network's
            ongoing growth and success.
          </p>     
        </div>   
        <div>
          {this.leadershipTeamMembers && this.leadershipTeamMembers.map((member, index) =>
            <app-leadership-team-item 
              FirstName={member.attributes.FirstName}
              LastName={member.attributes.LastName}
              JobTitle={member.attributes.Title}
              Bio={member.attributes.Bio}
              HeadshotURL={member.attributes.Headshot.data.attributes.url}
              HeadshotAltText={member.attributes.Headshot.data.attributes.alternativeText}
              Color={index == 0 ? 'blue' : index == 1 ? 'purple' : index == 2 ? 'green' : 'pink'}
            />
          )}
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
              To reach the Icon Network, email us.
            </p>
            <h3>Email:</h3>
            <a href="mailto:info@theiconnetwork.com?subject=Inquiry about the Icon Network">info@theiconnetwork.com</a>
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
