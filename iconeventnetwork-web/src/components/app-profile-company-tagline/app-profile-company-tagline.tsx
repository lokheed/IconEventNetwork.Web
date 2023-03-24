import { Component, Listen, Prop, State, h } from "@stencil/core";
import { CompanyData, CompanySaveData } from '../../services/clients/client-base';
import { CompanyClient } from "../../services/clients/company-client";

@Component({
  tag: "app-profile-company-tagline",
  styleUrl: "app-profile-company-tagline.scss",
  shadow: false,
  scoped: true,
})
export class AppProfileCompanyTagline {
    private companyClient: CompanyClient;
    constructor() {
        this.companyClient = new CompanyClient();
    }  
    @Prop() company: CompanyData;
    @Prop() canEdit: boolean;
    @State() isEditing: boolean = false;
    @State() displayTagline: string;
    @State() editTagline: string; 
    @Listen('editClick') editClickHandler() { 
        this.editTagline = this.displayTagline;
        this.isEditing = true;
    }
    private handleCancelClick(e: MouseEvent) {
        e.preventDefault();
        this.isEditing = false;
    }

    private handleSaveClick(e: MouseEvent) {
        e.preventDefault();
        this.saveData();
    } 

    private handleTaglineChange(event) {
        this.editTagline = event.target.value;
    }  

    private saveData() {
        let companySaveData: CompanySaveData = {
            data: {
                Tagline: this.editTagline.trim()??'',
            }
        };
        this.companyClient.updateCompany(this.company.data.id, companySaveData)
        .then(() => {
            this.isEditing = false;
            this.displayTagline = this.editTagline.trim()??'';
        })
        .catch(reason => {
            console.log(reason.error.message);
        });    
    }
        
    componentWillLoad() { 
        this.displayTagline = this.company?.data?.attributes?.Tagline??'';
    } 

    render() {
        return (
            <div>
                <div class='content-row'>
                    { !this.isEditing &&
                        <div class='content-value'>
                            {this.displayTagline}
                        </div>                   
                    }
                    { !this.isEditing && this.canEdit && 
                        <icn-profile-actions deleteDisabled />                                                    
                    }
                    { this.isEditing &&
                        <form class='edit-form' >
                            <div class='form-item'>
                                <input id='job-title' name='job-title' type="text" maxLength={50} value={this.editTagline} onInput={(e) => this.handleTaglineChange(e)} />
                            </div>
                            <div class="button-container">
                                <icn-button type='neutral' onClick={e => this.handleCancelClick(e)}>Cancel</icn-button>
                                <icn-button onClick={e => this.handleSaveClick(e)}>Save</icn-button>
                            </div>    
                        </form>
                    }
                </div>
            </div>
        );
    }
}