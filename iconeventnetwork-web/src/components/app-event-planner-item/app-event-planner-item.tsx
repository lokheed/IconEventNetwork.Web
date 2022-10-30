import { Component, Prop, State, Event, EventEmitter, Listen, h } from '@stencil/core';
@Component({
    tag: 'app-event-planner-item',
    styleUrl: 'app-event-planner-item.scss',
    shadow: false,
})

export class EventPlannerItem { 
    @Prop() EventPlannerId: number;
    @Prop() FirstName: string;
    @Prop() LastName: string;
    @Prop() CompanyName: string;
    @Prop() HeadshotURL: string;
    @Prop() HeadshotAltText: string;
    @Prop() Bio: string;
    @State() EventPlannerItemCSSClass: string = 'event-planner-item';
    @Event() eventPlannerItemSelected: EventEmitter<number>;
    @Listen('eventPlannerItemSelected', {target: 'body'})
    eventPlannerItemSelectedHandler(event: CustomEvent<number>) {
        this.otherEventPlannerItemSelectedHander(event.detail);
    }
    
    otherEventPlannerItemSelectedHander(eventPlannerId: number) {
        if (this.EventPlannerId == eventPlannerId) this.EventPlannerItemCSSClass = 'event-planner-item selected';
        if (eventPlannerId > 0 && this.EventPlannerId != eventPlannerId) this.EventPlannerItemCSSClass = 'event-planner-item dimmed';
        if (eventPlannerId == 0) this.EventPlannerItemCSSClass = 'event-planner-item';
    }
  
    thisEventPlannerItemSelectedHandler() {
        this.eventPlannerItemSelected.emit(this.EventPlannerId);
    }

    render() {   
        return (
            <div id={'eventPlanner' + this.EventPlannerId} onClick={() => this.thisEventPlannerItemSelectedHandler()} class={this.EventPlannerItemCSSClass}>
                <div class='headshot'>
                    <img src={this.HeadshotURL} alt={this.HeadshotAltText} class='leadership-headshot' />
                </div>
                <div class='info'>
                    <h3>{this.FirstName} {this.LastName}</h3>
                    <div class='company'>{this.CompanyName}</div>
                </div>
            </div>
        );
    }     
}
