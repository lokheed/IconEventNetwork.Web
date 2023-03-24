import { Component, Listen, Prop, State, h } from "@stencil/core";
import { CompanyData, CompanySaveData } from '../../services/clients/client-base';
import { CompanyClient } from "../../services/clients/company-client";

@Component({
  tag: "app-profile-company-description",
  styleUrl: "app-profile-company-description.scss",
  shadow: false,
  scoped: true,
})
export class AppProfileCompanyDescription {
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
    @Listen('editClick') editClickHandler() { 
        this.editDescription = this.displayDescription;
        this.isEditing = true;
    }
    
    private descriptionEditor!: HTMLIcnRichTextEditorElement;

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
                <div class='content-row'>
                    { !this.isEditing &&
                        <div class='content-value'>
                            <div class='textarea-content'>
                                <div innerHTML={this.descriptionCollapsableDisplay}></div>
                                <div onClick={e => this.handleReadMoreClick(e)} class='action-link'>
                                    {this.descriptionReadMoreText}
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
                                    ref={el => this.descriptionEditor = el}
                                    value={this.editDescription}
                                />
                            </div>
                            <div class="button-container">
                                <icn-button type="neutral" onClick={e => this.handleCancelClick(e)}>Cancel</icn-button>
                                <icn-button onClick={e => this.handleSaveClick(e)}>Save</icn-button>
                            </div>                        
                        </form>
                    }
                </div>
            </div>
        );
    }
}