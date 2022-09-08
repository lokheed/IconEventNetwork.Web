import { Component, Host, Prop, h } from '@stencil/core';
import { RouterHistory } from '@stencil-community/router';

@Component({
  tag: 'page-home',
  styleUrl: 'page-home.css',
  shadow: true,
})
export class PageHome {
  @Prop() history: RouterHistory;
  
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
            providers who together, create iconic experiences for life's most important occasions.
          </p>
          <div class='scroll-prompt'>
            Scroll
            <br/><br/>
            |
            <br/>
            |
            <br/>
            |
          </div>        
        </div>        
        <h1>Our Mission</h1>
        <hr class='purple'/>
        <p>
          To empower luxury event professionals to operate at their highest potential by creating
          a platform to collaborate and create, share best practices and drive fullfillment
          through community.
        </p>
      </Host>
    );
  }

}
