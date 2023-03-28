import { Component, Host, Listen, Prop, State, h } from "@stencil/core";
import { PersonAtCompanyData, PersonAtCompanySaveData } from '../../services/clients/client-base';
import { PersonAtCompanyClient } from "../../services/clients/person-at-company-client";

@Component({
  tag: "app-profile-biography",
  styleUrl: "app-profile-biography.scss",
  shadow: false,
  scoped: true,
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
    @Listen('editClick') editClickHandler() {  
        this.editBio = this.displayBio;
        this.isEditing = true;
    }
    
    private bioEditor!: HTMLIcnRichTextEditorElement;

    private handleCancelClick(e: MouseEvent) {
        e.preventDefault();
        this.isEditing = false;
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
        this.bioEditor.getValue().then(value => {
            let personAtCompanySaveData: PersonAtCompanySaveData = {
                data: {
                    Bio: value??'',
                }
            };
            this.personAtCompanyClient.updatePersonAtCompany(this.personAtCompany.data.id, personAtCompanySaveData)
            .then(() => {
                this.isEditing = false;
                this.displayBio = value??'';
                this.setCollapsableDisplay();
            })
            .catch(reason => {
                console.log(reason.error.message);
            });        
        });        
    }

    private setCollapsableDisplay() {
        this.bioCollapsableDisplay = this.displayBio.length > 250 ? this.displayBio.substring(0, 250) + '...' : this.displayBio;
        this.bioReadMoreText = this.displayBio.length > 250 ? 'Read more' : '';
    }
        
    componentWillLoad() { 
        this.displayBio = this.personAtCompany?.data?.attributes?.Bio??'';
        this.setCollapsableDisplay();
    } 

    render() {
        return (
            <Host>
                <div class='content-row'>
                    { !this.isEditing &&
                        <div class='content-value'>
                            <div class='textarea-content'>
                                <div innerHTML={this.bioCollapsableDisplay}></div>
                                <div onClick={e => this.handleReadMoreClick(e)} class='action-link'>
                                    {this.bioReadMoreText}
                                </div>
                            </div>
                        </div>                   
                    }
                    { !this.isEditing && this.canEdit && 
                        <icn-profile-actions deleteDisabled />           
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
                                <icn-button reversed onClick={e => this.handleCancelClick(e)}>Cancel</icn-button>
                                <icn-button onClick={e => this.handleSaveClick(e)}>Save</icn-button>
                            </div>                        
                        </form>
                    }
                </div>
            </Host>
        );
    }
}