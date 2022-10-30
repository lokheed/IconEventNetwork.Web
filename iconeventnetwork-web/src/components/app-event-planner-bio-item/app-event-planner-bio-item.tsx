import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
@Component({
    tag: 'app-event-planner-bio-item',
    styleUrl: 'app-event-planner-bio-item.scss',
    shadow: false,
})

export class EventPlannerBioItem { 
    @Prop() EventPlannerId: number;
    @Prop() FirstName: string;
    @Prop() LastName: string;
    @Prop() CompanyName: string;
    @Prop() Bio: string;
    @Event() eventPlannerItemSelected: EventEmitter<number>;
  
    thisEventPlannerItemSelectedHandler() {
        this.eventPlannerItemSelected.emit(0);
    }

    render() {   
        return (
            <div id={'eventPlannerBio' + this.EventPlannerId} class='event-planner-bio-item'>
                <div class='closer' onClick={() => this.thisEventPlannerItemSelectedHandler()}>&#x2715; CLOSE</div>
                <h2>{this.FirstName} {this.LastName}</h2>
                <h3>{this.CompanyName}</h3>
                <hr class='blue'/>
                <div class='bio' innerHTML={this.Bio}></div>
            </div>
        );
    }     
}
