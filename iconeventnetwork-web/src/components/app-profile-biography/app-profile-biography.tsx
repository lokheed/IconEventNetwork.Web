import { Component, Prop, State, h } from "@stencil/core";
import { PersonAtCompanyData } from '../../services/clients/client-base';

@Component({
  tag: "app-profile-biography",
  styleUrl: "app-profile-biography.scss",
  shadow: false
})
export class AppProfileBiography {
    @Prop() personAtCompany: PersonAtCompanyData;
    @Prop() canEdit: boolean;
    @State() isEditing: boolean = false;
    @State() displayBio: string;
    @State() editBio: string;  
    @State() bioCollapsableDisplay: string = '';
    @State() bioReadMoreText: string = '';

    private handleCancelClick(e: MouseEvent) {
        e.preventDefault();
        this.isEditing = false;
    }

    private handleEditClick(e: MouseEvent) {
        e.preventDefault();
        this.editBio = this.displayBio;
        this.isEditing = true;
    }

    private handleSaveClick(e: MouseEvent) {
        e.preventDefault();
        this.saveData();
    }     

    handleReadMoreClick(e: MouseEvent) {
        e.preventDefault();
        switch (this.bioReadMoreText) {
            case 'Read more':
                this.bioCollapsableDisplay = this.displayBio;
                this.bioReadMoreText = 'Read less';
                break;
            case 'Read less':
                this.bioCollapsableDisplay = this.displayBio.substring(0, 250) + '...';
                this.bioReadMoreText = 'Read more';
                break;
        }
    }   

    private saveData() {
        // save logic will go here
    }
        
    componentWillLoad() { 
        this.displayBio = this.personAtCompany?.data?.attributes?.Bio??'';
        this.bioCollapsableDisplay = this.displayBio.length > 250 ? this.displayBio.substring(0, 250) + '...' : this.displayBio;
        this.bioReadMoreText = this.displayBio.length > 250 ? 'Read more' : '';
} 

    render() {
        return (
            <div>
                <div class='profile-item-row'>
                    { !this.isEditing &&
                        <div class='value textarea'>
                            <div innerHTML={this.bioCollapsableDisplay}></div>
                            <div onClick={e => this.handleReadMoreClick(e)} class='action-link'>
                                {this.bioReadMoreText}
                            </div>
                        </div>                   
                    }
                    { !this.isEditing && this.canEdit && 
                        <div class='actions'>
                            <button class='action' onClick={e => this.handleEditClick(e)}>
                                <i class="fa-solid fa-pen blue"></i>&nbsp;<span class='action-link primary'>Edit</span>
                            </button>
                            <button class='action disabled'>
                                <i class="fa-solid fa-trash-can brick-red"></i>&nbsp;<span class='action-link secondary'>Delete</span>
                            </button>                                       
                        </div>                    
                    }
                    { this.isEditing &&
                        <form class='edit-form' >
                            <div class='form-item'>
                                <textarea></textarea>
                            </div>
                            <div class="button-container">
                                <button class="secondary-action" onClick={e => this.handleCancelClick(e)}>Cancel</button>
                                <button class="primary-action" onClick={e => this.handleSaveClick(e)}>Save</button>
                            </div>                        
                        </form>
                    }
                </div>
            </div>
        );
    }
}