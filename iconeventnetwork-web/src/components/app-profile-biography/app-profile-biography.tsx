import { Component, Prop, State, h } from "@stencil/core";
import { PersonAtCompanyData, PersonAtCompanySaveData } from '../../services/clients/client-base';
import { PersonAtCompanyClient } from "../../services/clients/person-at-company-client";

@Component({
  tag: "app-profile-biography",
  styleUrl: "app-profile-biography.scss",
  shadow: false
})
export class AppProfileBiography {
    private personAtCompanyClient: PersonAtCompanyClient;
    constructor() {
        this.personAtCompanyClient = new PersonAtCompanyClient();
    }  
    @Prop() personAtCompany: PersonAtCompanyData;
    @Prop() canEdit: boolean;
    @State() isEditing: boolean = false;
    @State() displayBio: string;
    @State() editBio: string;  
    @State() bioCollapsableDisplay: string = '';
    @State() bioReadMoreText: string = '';
    
    private bioEditor!: HTMLIcnRichTextEditorElement;

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
        let updatedBio = this.displayBio??'';
        this.bioEditor.getValue().then(value => updatedBio = value??'');
        console.log(updatedBio);
        
        let personAtCompanySaveData: PersonAtCompanySaveData = {
            data: {
                Bio: updatedBio,
            }
        };
        this.personAtCompanyClient.updatePersonAtCompany(this.personAtCompany.data.id, personAtCompanySaveData)
        .then(() => {
            this.isEditing = false;
            this.displayBio = updatedBio;
        })
        .catch(reason => {
            console.log(reason.error.message);
        });
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
                                <icn-rich-text-editor
                                    ref={el => this.bioEditor = el}
                                    value={this.editBio}
                                />
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