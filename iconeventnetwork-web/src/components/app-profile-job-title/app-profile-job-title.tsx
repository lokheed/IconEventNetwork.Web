import { Component, Prop, State, h } from "@stencil/core";
import { PersonAtCompanyData, PersonAtCompanySaveData } from '../../services/clients/client-base';
import { PersonAtCompanyClient } from "../../services/clients/person-at-company-client";

@Component({
  tag: "app-profile-job-title",
  styleUrl: "app-profile-job-title.scss",
  shadow: false
})
export class AppProfileJobTitle {
    private personAtCompanyClient: PersonAtCompanyClient;
    constructor() {
        this.personAtCompanyClient = new PersonAtCompanyClient();
    }  
    @Prop() personAtCompany: PersonAtCompanyData;
    @Prop() canEdit: boolean;
    @State() isEditing: boolean = false;
    @State() displayJobTitle: string;
    @State() editJobTitle: string; 
    private handleCancelClick(e: MouseEvent) {
        e.preventDefault();
        this.isEditing = false;
    }

    private handleEditClick(e: MouseEvent) {
        e.preventDefault();
        this.editJobTitle = this.displayJobTitle;
        this.isEditing = true;
    }

    private handleSaveClick(e: MouseEvent) {
        e.preventDefault();
        this.saveData();
    } 

    private handleJobTitleChange(event) {
        this.editJobTitle = event.target.value;
    }  

    private saveData() {
        let personAtCompanySaveData: PersonAtCompanySaveData = {
            data: {
                JobTitle: this.editJobTitle.trim()??'',
            }
        };
        this.personAtCompanyClient.updatePersonAtCompany(this.personAtCompany.data.id, personAtCompanySaveData)
        .then(() => {
            this.isEditing = false;
            this.displayJobTitle = this.editJobTitle.trim()??'';
        })
        .catch(reason => {
            console.log(reason.error.message);
        });    
    }
        
    componentWillLoad() { 
        this.displayJobTitle = this.personAtCompany?.data?.attributes?.JobTitle??'';
    } 

    render() {
        return (
            <div>
                <div class='profile-item-row'>
                    { !this.isEditing &&
                        <div class='value'>
                            {this.displayJobTitle}
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
                                <input id='job-title' name='job-title' type="text" maxLength={50} value={this.editJobTitle} onInput={(e) => this.handleJobTitleChange(e)} />
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