import { Component, Prop, State, h } from "@stencil/core";
import { CompanyData, CompanySaveData } from '../../services/clients/client-base';
import { CompanyClient } from "../../services/clients/company-client";

@Component({
  tag: "app-profile-company-description",
  styleUrl: "app-profile-company-description.scss",
  shadow: false
})
export class AppProfileBiography {
    private companyClient: CompanyClient;
    constructor() {
        this.companyClient = new CompanyClient();
    }  
    @Prop() company: CompanyData;
    @Prop() canEdit: boolean;
    @State() isEditing: boolean = false;
    @State() displayDescription: string;
    @State() editDescription: string;  
    @State() descriptionCollapsableDisplay: string = '';
    @State() descriptionReadMoreText: string = '';
    
    private descriptionEditor!: HTMLIcnRichTextEditorElement;

    private handleCancelClick(e: MouseEvent) {
        e.preventDefault();
        this.isEditing = false;
    }

    private handleEditClick(e: MouseEvent) {
        e.preventDefault();
        this.editDescription = this.displayDescription;
        this.isEditing = true;
    }

    private handleSaveClick(e: MouseEvent) {
        e.preventDefault();
        this.saveData();
    }     

    handleReadMoreClick(e: MouseEvent) {
        e.preventDefault();
        switch (this.descriptionReadMoreText) {
            case 'Read more':
                this.descriptionCollapsableDisplay = this.displayDescription;
                this.descriptionReadMoreText = 'Read less';
                break;
            case 'Read less':
                this.descriptionCollapsableDisplay = this.displayDescription.substring(0, 250) + '...';
                this.descriptionReadMoreText = 'Read more';
                break;
        }
    }   

    private saveData() {
        this.descriptionEditor.getValue().then(value => {
            let companySaveData: CompanySaveData = {
                data: {
                    Description: value??'',
                }
            };
            this.companyClient.updateCompany(this.company.data.id, companySaveData)
            .then(() => {
                this.isEditing = false;
                this.displayDescription = value??'';
                this.setCollapsableDisplay();
            })
            .catch(reason => {
                console.log(reason.error.message);
            });        
        });        
    }

    private setCollapsableDisplay() {
        this.descriptionCollapsableDisplay = this.displayDescription.length > 250 ? this.displayDescription.substring(0, 250) + '...' : this.displayDescription;
        this.descriptionReadMoreText = this.displayDescription.length > 250 ? 'Read more' : '';
    }
        
    componentWillLoad() { 
        this.displayDescription = this.company?.data?.attributes?.Description??'';
        this.setCollapsableDisplay();
    } 

    render() {
        return (
            <div>
                <div class='profile-item-row'>
                    { !this.isEditing &&
                        <div class='value textarea'>
                            <div innerHTML={this.descriptionCollapsableDisplay}></div>
                            <div onClick={e => this.handleReadMoreClick(e)} class='action-link'>
                                {this.descriptionReadMoreText}
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
                                    ref={el => this.descriptionEditor = el}
                                    value={this.editDescription}
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