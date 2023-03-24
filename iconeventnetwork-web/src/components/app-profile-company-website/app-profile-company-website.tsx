import { Component, Listen, Prop, State, h } from "@stencil/core";
import { CompanyData, CompanySaveData } from '../../services/clients/client-base';
import { CompanyClient } from "../../services/clients/company-client";

@Component({
    tag: "app-profile-company-website",
    styleUrl: "app-profile-company-website.scss",
    shadow: false,
    scoped: true,
})
export class AppProfileCompanyWebsite {
    private companyClient: CompanyClient;
    constructor() {
        this.companyClient = new CompanyClient();
    }  
    @Prop() company: CompanyData;
    @Prop() canEdit: boolean;
    @State() isEditing: boolean = false;
    @State() displayWebsite: string;
    @State() editWebsite: string;
    private websiteInput: HTMLInputElement;
    private websiteErrorMessage: HTMLIcnMessageElement; 
    @Listen('invalid', { target: 'window', capture: true }) formValidationHandler(e) {
        e.preventDefault(); // This presents the browser validation bubble
    }
    @Listen('editClick') editClickHandler() { 
        this.editWebsite = this.displayWebsite;
        if (this.editWebsite === '') this.editWebsite = 'http://';
        this.isEditing = true;
    }
    private handleCancelClick(e: MouseEvent) {
        e.preventDefault();
        this.isEditing = false;
    }

    private handleSaveClick(e: MouseEvent) {
        e.preventDefault();
        this.resetFormErrors();
        let isValid = true;
        if (this.editWebsite.trim().length > 0) {
            isValid = this.isValidUrl(this.editWebsite.trim());
        }
        if (isValid) {
            this.saveData();
            return;
        }
        
        this.websiteInput.classList.add('invalid');
        this.websiteErrorMessage.show();
    } 

    private handleWebsiteChange(event) {
        this.editWebsite = event.target.value;
        this.websiteInput.classList.remove('invalid');
        this.websiteErrorMessage.hide();
    }
    
    private isValidUrl(url: string) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    private resetFormErrors() {
        this.websiteInput.classList.remove('invalid');
        this.websiteErrorMessage.hide();
    }

    private saveData() {
        let companySaveData: CompanySaveData = {
            data: {
                Website: this.editWebsite.trim()??'',
            }
        };
        this.companyClient.updateCompany(this.company.data.id, companySaveData)
        .then(() => {
            this.isEditing = false;
            this.displayWebsite = this.editWebsite.trim()??'';
        })
        .catch(reason => {
            console.log(reason.error.message);
        });    
    }
        
    componentWillLoad() { 
        this.displayWebsite = this.company?.data?.attributes?.Website??'';
    } 

    render() {
        return (
            <div>
                <div class='content-row'>
                    { !this.isEditing &&
                        <div class='content-value'>
                            <div>
                                {this.displayWebsite}
                                {this.displayWebsite &&
                                    <a class='external-link-icon' target='_blank' href={this.displayWebsite}><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                                }
                            </div>
                        </div>                   
                    }
                    { !this.isEditing && this.canEdit && 
                        <icn-profile-actions deleteDisabled />                                                    
                    }
                    { this.isEditing &&
                        <form class='edit-form' >
                            <div class='form-item'>
                                <input id='website' name='website' type="text" maxLength={256} ref={el => this.websiteInput = el} value={this.editWebsite} onInput={(e) => this.handleWebsiteChange(e)} />
                                <icn-message type='error' hidden ref={el => this.websiteErrorMessage = el}>
                                    Website must be a valid URL (e.g., https://domain).
                                </icn-message>
                            </div>
                            <div class="button-container">
                                <icn-button type='neutral' onClick={e => this.handleCancelClick(e)}>Cancel</icn-button>
                                <icn-button type='primary' onClick={e => this.handleSaveClick(e)}>Save</icn-button>
                            </div>    
                        </form>
                    }
                </div>
            </div>
        );
    }
}