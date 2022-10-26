import { Component, Prop, h } from '@stencil/core';
@Component({
  tag: 'app-testimonial-carousel',
})

export class TestimonialCarousel { 
    @Prop() testimonials: HTMLElement;

    componentWillLoad() {
        this.getTestimonials();
    }

    private getTestimonials() {   
        var strapiBaseUrl = this.getStrapiBaseUrl();
        var options = this.getOptions();
        fetch(`${strapiBaseUrl}/api/testimonials?fields[0]=Name&fields[1]=Company&fields[2]=Quote&populate[Headshot][fields][0]=alternativeText&populate[Headshot][fields][1]=url&sort[0]=Rank`, options)
        .then(res => res.json())
        .then(res => {
            this.updateTestimonials(res.data);
        });
    }

    private getOptions() {
        return {  
            method: 'GET'
        }
    }

    private getStrapiBaseUrl() {
        var strapiBaseUrl = 'https://api.iconeventnetwork.com';
        if (window.location.hostname.toLowerCase() === 'localhost') strapiBaseUrl = 'http://localhost:1337';
        if (window.location.hostname.toLowerCase().startsWith('qa')) strapiBaseUrl = 'https://qaapi.iconeventnetwork.com';
        if (window.location.hostname.toLowerCase().startsWith('stg')) strapiBaseUrl = 'https://stgapi.iconeventnetwork.com';
        return strapiBaseUrl;
    }
    
    updateTestimonials(testimonialData) {
        this.testimonials = testimonialData.map((d, index) =>
            <div class='testimonial-item'>
                <div class='container'>
                    <div class='headshot'>
                        <img src={d.attributes.Headshot.data.attributes.url} alt={d.attributes.Headshot.data.attributes.alternativeText} class="testimonial-headshot"/>
                    </div>
                    <div class={'open-quote ' + (index == 0 ? 'green' : index == 1 ? 'blue' : index == 2 ? 'orange' : index == 3 ? 'pink' : 'purple')}>&#8220;</div>
                    <div class='info'>
                        <div class="quote">
                            <div innerHTML={d.attributes.Quote + '&#8221;'}></div>
                        </div> 
                        <h3>{d.attributes.Name}</h3>
                        <div class='title'>{d.attributes.Company}</div>                    
                    </div>
                </div>
            </div>
        );
    }
    
    render() {   
        return (
            <div class='testimonial-carousel'>
                {this.testimonials}
            </div>
        );
    }     
}
