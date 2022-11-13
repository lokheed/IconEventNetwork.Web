import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import { DataResponse } from '../../services/clients/client-base';
import { GetFoundingPlannersResponse } from '../../services/clients/founding-planner-client';
@Component({
    tag: 'app-event-planner-bio-item',
    styleUrl: 'app-event-planner-bio-item.scss',
    shadow: false,
})

export class EventPlannerBioItem { 
    /** The details about the planner */
    @Prop() planner: DataResponse<GetFoundingPlannersResponse>;
    
    @Event() eventPlannerItemSelected: EventEmitter<number>;
  
    thisEventPlannerItemSelectedHandler() {
        this.eventPlannerItemSelected.emit(0);
    }

    render() {   
        return (
            <div id={'eventPlannerBio' + this.planner.id} class='event-planner-bio-item'>
                <div class='closer' onClick={() => this.thisEventPlannerItemSelectedHandler()}>&#x2715; CLOSE</div>
                <h2>{this.planner.attributes.FirstName} {this.planner.attributes.LastName}</h2>
                <h3>{this.planner.attributes.CompanyName}</h3>
                <hr class='blue'/>
                <div class='bio' innerHTML={this.planner.attributes.Bio}></div>
            </div>
        );
    }     
}
