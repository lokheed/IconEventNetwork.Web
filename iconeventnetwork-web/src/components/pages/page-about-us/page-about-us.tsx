import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'page-about-us',
})
export class PageAboutUs {
  render() {
    return (
      <Host>
        <div class='single-image'>
          <div class='image4'></div>
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
          (leaderhsip bios here)
        </div>
        <a id='testimonials'></a>           
        <div class='accent-block'>    
          <h2>Testimonials</h2>
          <hr class='orange'/>
          (testimonials will go here)
        </div>     
        <a id='contact-us'></a>        
        <div class='right-image'>
          <div class='text-container'>
            <h2>Contact Us</h2>
            <hr class='green'/>
            <p>
              To reach The Icon Network call or email us.
            </p>
            <h3>Email:</h3>
            <a href="mailto:info@iconeventnetwork.com?subject=Inquiry about The Icon Network">info@iconeventnetwork</a>
            <h3>Phone:</h3>
            +1-123-456-7890     
          </div>         
          <div class='image-container'>
            <div class='image6'></div>
            <div></div>
          </div>
        </div>
        <br/><br/><br/>
      </Host>
    );
  }
}
