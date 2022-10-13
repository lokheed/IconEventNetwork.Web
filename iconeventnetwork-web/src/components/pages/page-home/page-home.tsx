import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'page-home',
  styleUrl: 'page-home.css',
  shadow: true,
})
export class PageHome {

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
        <div>
          <a id='our-mission'></a>        
          <h2>Our Mission</h2>
          <hr class='purple'/>
          <p>
            To empower luxury event professionals to operate at their highest potential by creating
            a platform to collaborate and create, share best practices and drive fullfillment
            through community.
          </p>
        </div>
        <div class='triple-image'>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <a id='how-it-works'></a>        
        <div class='left-image'>
          <div class='image-container'>
            <div></div>
            <div></div>
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
                  quality, reliability and consistency.
                </p>              
              </div>        
            </div>            
          </div>
        </div>
      </Host>
    );
  }
}
