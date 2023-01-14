import { Component, Prop, State, Event, EventEmitter, Listen, h } from '@stencil/core';
import { DataResponse } from '../../services/clients/client-base';
import { GetFoundingPlannersResponse } from '../../services/clients/founding-planner-client';
import { noPhotoDataUrl } from '../../utils/images-fallback';

@Component({
    tag: 'app-event-planner-item',
    styleUrl: 'app-event-planner-item.scss',
    shadow: false,
})

export class EventPlannerItem { 
    /** The details about the planner. */
    @Prop() planner: DataResponse<GetFoundingPlannersResponse>;

    @State() EventPlannerItemCSSClass: string = 'event-planner-item';
    
    @Event() eventPlannerItemSelected: EventEmitter<number>;
    
    @Listen('eventPlannerItemSelected', {target: 'body'})
    
    eventPlannerItemSelectedHandler(event: CustomEvent<number>) {
        this.otherEventPlannerItemSelectedHander(event.detail);
    }
    
    otherEventPlannerItemSelectedHander(eventPlannerId: number) {
        if (this.planner.id == eventPlannerId) this.EventPlannerItemCSSClass = 'event-planner-item selected';
        if (eventPlannerId > 0 && this.planner.id != eventPlannerId) this.EventPlannerItemCSSClass = 'event-planner-item dimmed';
        if (eventPlannerId == 0) this.EventPlannerItemCSSClass = 'event-planner-item';
    }
  
    thisEventPlannerItemSelectedHandler() {
        this.eventPlannerItemSelected.emit(this.planner.id);
    }

    render() {   
        return (
            <div
                id={'eventPlanner' + this.planner.id}
                onClick={() => this.thisEventPlannerItemSelectedHandler()}
                class={this.EventPlannerItemCSSClass}
            >
                <div class='headshot'>
                    <app-responsive-image
                        image={this.planner.attributes.Headshot}
                        noImageDataUrl={noPhotoDataUrl}
                        class="leadership-headshot"
                        expectedWidth={500}
                    />
                </div>
                <div class='info'>
                    <h3>{this.planner.attributes.FirstName} {this.planner.attributes.LastName}</h3>
                    <div class='company'>{this.planner.attributes.CompanyName}</div>
                </div>
            </div>
        );
    }     
}
