import { Component, Prop, State, h } from '@stencil/core';
import { DataResponse } from '../../services/clients/client-base';
import { GetLeadershipTeamMembersResponse } from '../../services/clients/leadership-team-member-client';
import { noPhotoDataUrl } from '../../utils/images-fallback';
@Component({
    tag: 'app-leadership-team-item',
    styleUrl: 'app-leadership-team-item.scss',
    shadow: false,
})

export class LeadershipTeamItem { 
    /** The details about the member. */
    @Prop() member: DataResponse<GetLeadershipTeamMembersResponse>;

    /** The color of the read more link.*/
    @Prop() readMoreColor: string;

    @State() ReadMoreClass: string;
    
    private info: HTMLDivElement;

    handleClick(e: MouseEvent) {
        e.preventDefault();
        this.ReadMoreClass = 'read-more clicked';
        this.info.classList.add('no-after');
    }

    componentWillLoad() {
        this.ReadMoreClass = 'read-more ' + this.readMoreColor;
    }

    render() {   
        return (
            <div class='leadership-team-item'>
                <div class='headshot'>
                    <img
                        src={this.member.attributes.Headshot.data ? this.member.attributes.Headshot.data.attributes.url : noPhotoDataUrl}
                        alt={this.member.attributes.Headshot.data?.attributes.alternativeText} class="leadership-headshot"/>
                </div>
                <div class='info' ref={el => this.info = el}>
                    <h3>{this.member.attributes.FirstName} {this.member.attributes.LastName}</h3>
                    <div class='title'>{this.member.attributes.Title}</div>
                    <div class="bio">
                        <div innerHTML={this.member.attributes.Bio}></div>
                        <a onClick={e => this.handleClick(e)} class={this.ReadMoreClass}>Read more</a>
                    </div>
                </div>
            </div>
        );
    }     
}
