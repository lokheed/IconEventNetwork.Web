import { Component, Event, EventEmitter, Listen, Prop, State, h } from "@stencil/core";
import { CompanySaveData, DataResponse, EmailAddressAttributes, EmailAddressSaveData, EmailAddressTypeAttributes, PersonSaveData, PersonAtCompanySaveData } from '../../services/clients/client-base';
import { EmailAddressClient } from "../../services/clients/email-address-client";
import { EmailAddressTypeClient } from "../../services/clients/email-address-type-client";
import { PersonClient } from "../../services/clients/person-client";
import { PersonAtCompanyClient } from "../../services/clients/person-at-company-client";
import { CompanyClient } from "../../services/clients/company-client";
import { AppliesTo } from "./applies-to";
import { localStorageKeyService } from '../../services/local-storage-key-service';

@Component({
  tag: "app-profile-email-address-item",
  styleUrl: "app-profile-email-address-item.scss",
  shadow: false
})
export class AppProfileEmailAddressItem {
    private editDialog: HTMLAppModalElement;
    private deleteConfirmationDialog: HTMLAppConfirmationElement;
    private emailAddressClient: EmailAddressClient;
    private emailAddressTypeClient: EmailAddressTypeClient;
    private personClient: PersonClient;
    private personAtCompanyClient: PersonAtCompanyClient;
    private companyClient: CompanyClient;
    constructor() {
        this.emailAddressClient = new EmailAddressClient();
        this.emailAddressTypeClient = new EmailAddressTypeClient();
        this.personClient = new PersonClient();
        this.personAtCompanyClient = new PersonAtCompanyClient();
        this.companyClient = new CompanyClient();
    }  
    @Prop() emailAddressItem: DataResponse<EmailAddressAttributes>;
    @Prop() appliesTo!: AppliesTo;
    @Prop() personId?: number;
    @Prop() personAtCompanyId?: number;
    @Prop() companyId?: number;
    @State() displayEmailAddress: string = '';
    @State() editEmailAddress: string = '';
    @State() displayEmailAddressTypeId: number = 0;
    @State() editEmailAddressTypeId: number = 0;
    @State() displayEmailAddressTypeName: string = '';
    @State() editEmailAddressTypeName: string = '';
    @State() emailAddressTypes: DataResponse<EmailAddressTypeAttributes>[];
    @State() emailAddressClass: string = '';
    @Event() private emailAddressDeleted: EventEmitter<number>;
    private editForm: HTMLFormElement;
    private emailAddressInput: HTMLInputElement;
    private emailAddressErrorMessage: HTMLDivElement;
    @Listen('primaryModalClick') primaryModalClickHandler() {
        this.emailAddressClass = '';
        let isValid = this.editForm.reportValidity();
        if (isValid) {
            this.editDialog.visible = false;
            this.saveData();
            return;
        }
        this.emailAddressClass = this.emailAddressInput.validity.valid ? '' : 'invalid';
        this.emailAddressErrorMessage.innerHTML = this.emailAddressInput.validity.valid ? '' : 'Email Address must be a valid email address.';
    }
    @Listen('secondaryModalClick') secondaryModalClickHandler() {
        this.emailAddressClass = '';
        this.emailAddressErrorMessage.innerHTML = '';
        this.editDialog.visible = false;
    }

    @Listen('primaryConfirmationClick') primaryDeleteConfirmationClickHandler() {
        this.deleteConfirmationDialog.visible = false;    
        switch (this.appliesTo) {
            case AppliesTo.Person:
                let personSaveData: PersonSaveData = {
                    data: {
                        EmailAddresses: { 
                            disconnect: [{id: this.emailAddressItem.id}],
                        },
                    }
                };
                this.personClient.updatePerson(this.personId, personSaveData)
                    .then(() => { })
                    .catch(reason => console.error(reason));
                break;
            case AppliesTo.PersonAtCompany:
                let personAtCompanySaveData: PersonAtCompanySaveData = {
                    data: {
                        EmailAddresses: { 
                            disconnect: [{id: this.emailAddressItem.id}],
                        },
                    }
                };
                this.personAtCompanyClient.updatePersonAtCompany(this.personAtCompanyId, personAtCompanySaveData)
                    .then(() => { })
                    .catch(reason => console.error(reason));                
                break;
            case AppliesTo.Company:
                let companySaveData: CompanySaveData = {
                    data: {
                        EmailAddresses: { 
                            disconnect: [{id: this.emailAddressItem.id}],
                        },
                    }
                };
                this.companyClient.updateCompany(this.companyId, companySaveData)
                    .then(() => { })
                    .catch(reason => console.error(reason));                
                break;
        }
        this.emailAddressClient.deleteEmailAddress(this.emailAddressItem.id)    
        .then(() => {})
        .catch(reason => console.error(reason));
        this.emailAddressDeleted.emit(this.emailAddressItem.id);
        return;     
    }
    @Listen('secondaryConfirmationClick') secondaryDeleteConfirmationClickHandler() {
        this.deleteConfirmationDialog.visible = false;
    }

    private handleEditClick(e: MouseEvent) {
        e.preventDefault();
        this.editEmailAddress = this.displayEmailAddress;        
        this.editEmailAddressTypeId = this.displayEmailAddressTypeId;
        this.editEmailAddressTypeName = this.displayEmailAddressTypeName;
        this.editDialog.visible = true;
    }

    private handleDeleteClick(e: MouseEvent) {
        e.preventDefault();
        this.deleteConfirmationDialog.visible = true;
    }
    
    private handleEmailTypeSelect(event) {
        this.editEmailAddressTypeId = event.target.value;
        this.editEmailAddressTypeName = event.target[event.target.selectedIndex].text;
    }

    private handleEmailAddressChange(event) {
        this.editEmailAddress = event.target.value;
    }

    private getPersonEmailAddressTypes() {
        var storedPersonEmailAddressTypes = sessionStorage.getItem(localStorageKeyService.EmailTypesPerson);
        if (storedPersonEmailAddressTypes) {
          this.emailAddressTypes = JSON.parse(storedPersonEmailAddressTypes);
          return;
        }
        this.emailAddressTypeClient.getEmailAddressTypes({
            fields: ['Name', 'Rank'],
            filters: {
                IsActive: {
                    $eq: true,
                },
                AppliesToPerson: {
                    $eq: true,
                },
            }
        })
        .then((response) => {
            this.emailAddressTypes = response.data;
            sessionStorage.setItem(localStorageKeyService.EmailTypesPerson, JSON.stringify(this.emailAddressTypes));
        })
        .catch(reason => console.error(reason));  
    }

    private getPersonAtCompanyEmailAddressTypes() {
        var storedPersonAtCompanyEmailAddressTypes = sessionStorage.getItem(localStorageKeyService.EmailTypesPersonAtCompany);
        if (storedPersonAtCompanyEmailAddressTypes) {
          this.emailAddressTypes = JSON.parse(storedPersonAtCompanyEmailAddressTypes);
          return;
        }
        this.emailAddressTypeClient.getEmailAddressTypes({
            fields: ['Name', 'Rank'],
            filters: {
                IsActive: {
                    $eq: true,
                },
                AppliesToPersonCompany: {
                    $eq: true,
                },
            }
        })
        .then((response) => {
            this.emailAddressTypes = response.data;
            sessionStorage.setItem(localStorageKeyService.EmailTypesPersonAtCompany, JSON.stringify(this.emailAddressTypes));
        })
        .catch(reason => console.error(reason));  
    }

    private getCompanyEmailAddressTypes() {
        var storedCompanyEmailAddressTypes = sessionStorage.getItem(localStorageKeyService.EmailTypesCompany);
        if (storedCompanyEmailAddressTypes) {
          this.emailAddressTypes = JSON.parse(storedCompanyEmailAddressTypes);
          return;
        }
        this.emailAddressTypeClient.getEmailAddressTypes({
            fields: ['Name', 'Rank'],
            filters: {
                IsActive: {
                    $eq: true,
                },
                AppliesToCompany: {
                    $eq: true,
                },
            }
        })
        .then((response) => {
            this.emailAddressTypes = response.data;
            sessionStorage.setItem(localStorageKeyService.EmailTypesPersonAtCompany, JSON.stringify(this.emailAddressTypes));
        })
        .catch(reason => console.error(reason));  
    }

    private saveData() {
        let emailAddressSaveData: EmailAddressSaveData = {
            data: {
                EmailAddress: this.emailAddressItem.attributes.EmailAddress,
                email_address_type: { },
            }
        };
        if (this.editEmailAddress.trim() != this.displayEmailAddress) {
            emailAddressSaveData.data.EmailAddress = this.editEmailAddress.trim();
            this.displayEmailAddress = this.editEmailAddress.trim();
        }
        if (this.editEmailAddressTypeId != this.displayEmailAddressTypeId) {
            emailAddressSaveData.data.email_address_type.disconnect = [{id: this.emailAddressItem.attributes.email_address_type.data.id}];
            emailAddressSaveData.data.email_address_type.connect = [{id: this.editEmailAddressTypeId}];
            this.displayEmailAddressTypeId = this.editEmailAddressTypeId;
            this.displayEmailAddressTypeName = this.editEmailAddressTypeName;
        } 
        if (this.emailAddressItem.id > 0)  {
            this.emailAddressClient.updateEmailAddress(this.emailAddressItem.id, emailAddressSaveData)
            .then(() => {

            })
            .catch(reason => console.error(reason));
            return;  
        }
  
    }
        
    componentWillLoad() {
        this.displayEmailAddress = this.emailAddressItem.attributes.EmailAddress;
        this.displayEmailAddressTypeId = this.emailAddressItem.attributes.email_address_type.data.id;
        this.displayEmailAddressTypeName = this.emailAddressItem.attributes.email_address_type.data.attributes.Name;
        switch (this.appliesTo) {
            case AppliesTo.Person:
                this.getPersonEmailAddressTypes();
                break;
            case AppliesTo.PersonAtCompany:
                this.getPersonAtCompanyEmailAddressTypes();
                break;
            case AppliesTo.Company:
                this.getCompanyEmailAddressTypes();
                break;
        }
    }        

    render() {
        return (
            <div>
                <div class='profile-item-row'>
                    <div class='value'>
                        <div class='label'>
                            {this.displayEmailAddressTypeName}
                        </div>
                        <div class='value'>
                            {this.displayEmailAddress}
                        </div>
                    </div>
                    <div class='actions'>
                        <div class='action' onClick={e => this.handleEditClick(e)}>
                            <i class="fa-solid fa-pen blue"></i>&nbsp;<span class='action-link primary'>Edit</span>
                        </div>
                        <div class='action' onClick={e => this.handleDeleteClick(e)}>
                            <i class="fa-solid fa-trash-can brick-red"></i>&nbsp;<span class='action-link secondary'>Delete</span>
                        </div>                                       
                    </div>
                </div>
                <app-modal ref={el => this.editDialog = el} dialogTitle="Email" visible={false}>
                    <form ref={el => this.editForm = el} class='edit-form' >
                        <div class='form-item'>
                            <label>Type</label>
                            <select onInput={(event) => this.handleEmailTypeSelect(event)}>
                                {this.emailAddressTypes?.sort((a,b) => {
                                    var rankA = a.attributes.Rank;
                                    var rankB = b.attributes.Rank;
                                    return (rankA < rankB) ? -1 : (rankA > rankB) ? 1 : 0;
                                }).map(emailAddressType => (
                                    <option
                                        value={emailAddressType.id}
                                        selected={this.editEmailAddressTypeId === emailAddressType.id}
                                    >
                                        {emailAddressType.attributes.Name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div class='form-item'>
                            <label>Email Address</label>
                            <input ref={el => this.emailAddressInput = el} type="email" value={this.editEmailAddress} onInput={(e) => this.handleEmailAddressChange(e)} class={this.emailAddressClass} required />
                            <div ref={el => this.emailAddressErrorMessage = el} class='form-error-message'></div>
                        </div>
                    </form>
                </app-modal>
                <app-confirmation ref={el => this.deleteConfirmationDialog = el} visible={false} message='Are you sure you want to delete this email address?'></app-confirmation>    
                <hr/>
            </div>
        );
    }
}

