import { Component, Listen, Prop, State, h } from "@stencil/core";
import { PersonAtCompanyData, PersonAtCompanySaveData } from '../../services/clients/client-base';
import { PersonAtCompanyClient } from "../../services/clients/person-at-company-client";

@Component({
  tag: "app-profile-job-title",
  styleUrl: "app-profile-job-title.scss",
  shadow: false,
  scoped: true,
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
    @Listen('editClick') editClickHandler() {  
        this.editJobTitle = this.displayJobTitle;
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
                <div class='content-row'>
                    { !this.isEditing &&
                        <div class='content-value'>
                            {this.displayJobTitle}
                        </div>                   
                    }
                    { !this.isEditing && this.canEdit && 
                        <icn-profile-actions deleteDisabled />         
                    }
                    { this.isEditing &&
                        <form class='edit-form' >
                            <div class='form-item'>
                                <input id='job-title' name='job-title' type="text" maxLength={50} value={this.editJobTitle} onInput={(e) => this.handleJobTitleChange(e)} />
                            </div>
                            <div class="button-container">
                                <icn-button reversed onClick={e => this.handleCancelClick(e)}>Cancel</icn-button>
                                <icn-button onClick={e => this.handleSaveClick(e)}>Save</icn-button>
                            </div>    
                        </form>
                    }
                </div>
            </div>
        );
    }
}