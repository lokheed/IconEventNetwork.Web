import { Component, Prop, State, h } from '@stencil/core';
@Component({
    tag: 'app-leadership-team-item',
    styleUrl: 'app-leadership-team-item.scss',
    shadow: false,
})

export class LeadershipTeamItem { 
    @Prop() FirstName: string;
    @Prop() LastName: string;
    @Prop() JobTitle: string;
    @Prop() Bio: string;
    @Prop() HeadshotURL: string;
    @Prop() HeadshotAltText: string;
    @Prop() Color: string;
    @State() ReadMoreClass: string;

    handleClick() {
        this.ReadMoreClass = 'read-more clicked';
    }

    componentWillLoad() {
        this.ReadMoreClass = 'read-more ' + this.Color;
    }

    render() {   
        return (
            <div class='leadership-team-item'>
                <div class='headshot'>
                    <img src={this.HeadshotURL} alt={this.HeadshotAltText} class="leadership-headshot"/>
                </div>
                <div class='info'>
                    <h3>{this.FirstName} {this.LastName}</h3>
                    <div class='title'>{this.JobTitle}</div>
                    <div class="bio">
                        <div onClick={() => this.handleClick()} class={this.ReadMoreClass}>Read more</div>
                        <div innerHTML={this.Bio}></div>
                    </div> 
                </div>
            </div>
        );
    }     
}
