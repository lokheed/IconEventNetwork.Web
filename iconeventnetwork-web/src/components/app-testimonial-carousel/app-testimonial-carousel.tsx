import { Component, h, State } from '@stencil/core';
import { DataResponse } from '../../services/clients/client-base';
import { GetTestimonialsResponse, TestimonialClient } from '../../services/clients/testimonial-client';


@Component({
    tag: 'app-testimonial-carousel',
    styleUrl: 'app-testimonial-carousel.scss',
    shadow: false,
})

export class TestimonialCarousel { 
    private testimonialClient: TestimonialClient;
    
    constructor() {
        this.testimonialClient = new TestimonialClient();
    }

    @State() testimonials: DataResponse<GetTestimonialsResponse>[];

    componentWillLoad() {
        this.getTestimonials();
    }

    private getTestimonials() {   
        this.testimonialClient.getTestimonials({
            fields: ['Name', 'Company', 'Quote'],
            populate: {
                Headshot: {
                    fields: ['alternativeText', 'url'],
                },
            },
            sort: ['Rank'],
        })
        .then((response) => {
            this.testimonials = response.data;
        })
        .catch(reason => console.error(reason));
    }
    
    render() {   
        return (
            <div class='testimonial-carousel'>
                {this.testimonials && this.testimonials.map((testimonial, index) =>
                    <div class='testimonial-item'>
                    <div class='container'>
                        <div class='headshot'>
                            <img src={testimonial.attributes.Headshot.data.attributes.url} alt={testimonial.attributes.Headshot.data.attributes.alternativeText} class="testimonial-headshot"/>
                        </div>
                        <div class={'open-quote ' + (index == 0 ? 'green' : index == 1 ? 'blue' : index == 2 ? 'orange' : index == 3 ? 'pink' : 'purple')}>&#8220;</div>
                        <div class='info'>
                            <div class="quote">
                                <div innerHTML={testimonial.attributes.Quote + '&#8221;'}></div>
                            </div> 
                            <h3>{testimonial.attributes.Name}</h3>
                            <div class='title'>{testimonial.attributes.Company}</div>
                        </div>
                    </div>
                </div>
                )}
            </div>
        );
    }     
}
