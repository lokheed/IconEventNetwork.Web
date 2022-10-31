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
    
    private info: HTMLDivElement;

    handleClick(e: MouseEvent) {
        e.preventDefault();
        this.ReadMoreClass = 'read-more clicked';
        this.info.classList.add('no-after');
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
                <div class='info' ref={el => this.info = el}>
                    <h3>{this.FirstName} {this.LastName}</h3>
                    <div class='title'>{this.JobTitle}</div>
                    <div class="bio">
                        <div innerHTML={this.Bio}></div>
                        <a onClick={e => this.handleClick(e)} class={this.ReadMoreClass}>Read more</a>
                    </div>
                </div>
            </div>
        );
    }     
}
