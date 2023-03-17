import { Component, Prop, State, h } from "@stencil/core";
import { CompanyData, CompanySaveData } from '../../services/clients/client-base';
import { CompanyClient } from "../../services/clients/company-client";

@Component({
  tag: "app-profile-company-tagline",
  styleUrl: "app-profile-company-tagline.scss",
  shadow: false
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
    private handleCancelClick(e: MouseEvent) {
        e.preventDefault();
        this.isEditing = false;
    }

    private handleEditClick(e: MouseEvent) {
        e.preventDefault();
        this.editTagline = this.displayTagline;
        this.isEditing = true;
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
                <div class='profile-item-row'>
                    { !this.isEditing &&
                        <div class='value'>
                            {this.displayTagline}
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
                                <label htmlFor="job-title">Job Title</label>
                                <input id='job-title' name='job-title' type="text" maxLength={50} value={this.editTagline} onInput={(e) => this.handleTaglineChange(e)} />
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