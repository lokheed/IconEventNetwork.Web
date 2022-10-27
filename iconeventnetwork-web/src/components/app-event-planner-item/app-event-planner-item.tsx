import { Component, Prop, h } from '@stencil/core';
@Component({
  tag: 'app-event-planner-item',
})

export class EventPlannerItem { 
    @Prop() FirstName: string;
    @Prop() LastName: string;
    @Prop() CompanyName: string;
    @Prop() Bio: string;
    @Prop() HeadshotURL: string;
    @Prop() HeadshotAltText: string;
    @Prop() Color: string;

    render() {   
        return (
            <div class='event-planner-item'>
                <div class='headshot'>
                    <img src={this.HeadshotURL} alt={this.HeadshotAltText} class='leadership-headshot' />
                </div>
                <div class='info'>
                    <h3>{this.FirstName} {this.LastName}</h3>
                    <div class='company'>{this.CompanyName}</div>
                    <div class="bio">
                        <div innerHTML={this.Bio}></div>
                    </div> 
                </div>
            </div>
        );
    }     
}
