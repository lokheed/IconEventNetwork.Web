import { Component, Event, EventEmitter, Listen, Prop, State, h } from "@stencil/core";
import { CompanySaveData, DataResponse, EmailAddressAttributes, EmailAddressSaveData, EmailAddressTypeAttributes, PersonSaveData, PersonAtCompanySaveData } from '../../services/clients/client-base';
import { EmailAddressClient } from "../../services/clients/email-address-client";
import { EmailAddressTypeClient } from "../../services/clients/email-address-type-client";
import { PersonClient } from "../../services/clients/person-client";
import { PersonAtCompanyClient } from "../../services/clients/person-at-company-client";
import { CompanyClient } from "../../services/clients/company-client";
import state from '../../services/store';

@Component({
  tag: "app-profile-email-address-item",
  styleUrl: "app-profile-email-address-item.scss",
  shadow: false
})
export class AppProfileEmailAddressItem {
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
    @Prop() canEdit: boolean;
    @State() isEditing: boolean = false;
    @Prop() appliesTo!: 'person' | 'personAtCompany' | 'company';
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
    @Event() private emailAddressDeleted: EventEmitter<number>;
    private editForm: HTMLFormElement;
    private emailAddressInput: HTMLInputElement;
    private emailAddressErrorMessage: HTMLDivElement;
    @Listen('primaryConfirmationClick') primaryDeleteConfirmationClickHandler() {
        this.deleteConfirmationDialog.visible = false;    
        switch (this.appliesTo) {
            case 'person':
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
            case 'personAtCompany':
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
            case 'company':
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
    @Listen('emailAddressAdded') emailAddressAddedHandler(event: CustomEvent<number>) {
        if (this.emailAddressItem.id == event.detail) {
            this.initializeEditForm();
        }
    }

    private handleCancelClick(e: MouseEvent) {
        e.preventDefault();
        this.emailAddressInput.classList.remove('invalid');
        this.emailAddressErrorMessage.innerHTML = '';
        this.isEditing = false;
        if (this.emailAddressItem.id === 0) {
            this.emailAddressDeleted.emit(this.emailAddressItem.id);
        }
    }

    private handleDeleteClick(e: MouseEvent) {
        e.preventDefault();
        this.deleteConfirmationDialog.visible = true;
    }

    private handleEditClick(e: MouseEvent) {
        e.preventDefault();
        this.initializeEditForm();
    }

    private handleSaveClick(e: MouseEvent) {
        e.preventDefault();
        this.emailAddressInput.classList.remove('invalid');
        this.emailAddressErrorMessage.innerHTML = '';
        let isValid = this.editForm.reportValidity();
        if (isValid) {
            this.saveData();
            return;
        }
        if (!this.emailAddressInput.validity.valid) {
            this.emailAddressInput.classList.add('invalid');
            this.emailAddressErrorMessage.innerHTML = 'Email Address must be a valid email address.';
        }    
    }
    
    private handleEmailTypeSelect(event) {
        this.editEmailAddressTypeId = event.target.value;
        this.editEmailAddressTypeName = event.target[event.target.selectedIndex].text;
    }

    private handleEmailAddressChange(event) {
        this.editEmailAddress = event.target.value;
    }

    private initializeEditForm() {
        this.editEmailAddress = this.displayEmailAddress;        
        this.editEmailAddressTypeId = this.displayEmailAddressTypeId;
        this.editEmailAddressTypeName = this.displayEmailAddressTypeName;
        this.isEditing = true;
    }

    private initializeDefaultEmailAddressType() {
        const defaultEmailAddressType = this.emailAddressTypes?.sort((a,b) => {
            var rankA = a.attributes.Rank;
            var rankB = b.attributes.Rank;
            return (rankA < rankB) ? -1 : (rankA > rankB) ? 1 : 0;
        })[0];
        this.editEmailAddressTypeId = defaultEmailAddressType.id;
        this.displayEmailAddressTypeId = defaultEmailAddressType.id;
        this.editEmailAddressTypeName = defaultEmailAddressType.attributes.Name;
        this.displayEmailAddressTypeName = defaultEmailAddressType.attributes.Name;
    }

    private getPersonEmailAddressTypes() {
        if (state.personEmailAddressTypes.length > 0) {
          this.emailAddressTypes = state.personEmailAddressTypes;
          if (this.emailAddressItem.id === 0) {
              this.initializeDefaultEmailAddressType();
          }
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
            state.personEmailAddressTypes = response.data;
            if (this.emailAddressItem.id === 0) {
                this.initializeDefaultEmailAddressType();
            }
        })
        .catch(reason => console.error(reason));  
    }

    private getPersonAtCompanyEmailAddressTypes() {
        if (state.personAtCompanyEmailAddressTypes.length > 0) {
          this.emailAddressTypes = state.personAtCompanyEmailAddressTypes;
          if (this.emailAddressItem.id === 0) {
              this.initializeDefaultEmailAddressType();
          }
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
            state.personAtCompanyEmailAddressTypes = response.data;
            if (this.emailAddressItem.id === 0) {
                this.initializeDefaultEmailAddressType();
            }
        })
        .catch(reason => console.error(reason));  
    }

    private getCompanyEmailAddressTypes() {
        if (state.companyEmailAddressTypes.length > 0) {
          this.emailAddressTypes = state.companyEmailAddressTypes;
          if (this.emailAddressItem.id === 0) {
              this.initializeDefaultEmailAddressType();
          }
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
            state.companyEmailAddressTypes = response.data;
            if (this.emailAddressItem.id === 0) {
                this.initializeDefaultEmailAddressType();
            }
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
        }
        if (this.emailAddressItem.id > 0)  {
            if (this.editEmailAddressTypeId != this.displayEmailAddressTypeId) {
                emailAddressSaveData.data.email_address_type.disconnect = [{id: this.displayEmailAddressTypeId}];
                emailAddressSaveData.data.email_address_type.connect = [{id: this.editEmailAddressTypeId}];
            } 
            this.emailAddressClient.updateEmailAddress(this.emailAddressItem.id, emailAddressSaveData)
            .then(() => {
                this.isEditing = false;
                this.displayEmailAddress = this.editEmailAddress;
                this.displayEmailAddressTypeId = this.editEmailAddressTypeId;
                this.displayEmailAddressTypeName = this.editEmailAddressTypeName;
            })
            .catch(reason => {
                this.emailAddressErrorMessage.innerHTML = reason.error.message;
            });
            return;  
        }
        if (this.emailAddressItem.id === 0) {
            emailAddressSaveData.data.email_address_type.connect = [{id: this.editEmailAddressTypeId}];
            this.emailAddressClient.addEmailAddress(emailAddressSaveData)
            .then((result) => {
                this.isEditing = false;
                this.emailAddressItem.id = result.data.id;
                this.displayEmailAddress = this.editEmailAddress;
                this.displayEmailAddressTypeId = this.editEmailAddressTypeId;
                this.displayEmailAddressTypeName = this.editEmailAddressTypeName;
                switch (this.appliesTo) {
                    case 'person':
                        let personSaveData: PersonSaveData = {
                            data: {
                                EmailAddresses: { 
                                    connect: [{id: this.emailAddressItem.id}],
                                },
                            }
                        };
                        this.personClient.updatePerson(this.personId, personSaveData)
                            .then(() => { })
                            .catch(reason => console.error(reason));
                        break;
                    case 'personAtCompany':
                        let personAtCompanySaveData: PersonAtCompanySaveData = {
                            data: {
                                EmailAddresses: { 
                                    connect: [{id: this.emailAddressItem.id}],
                                },
                            }
                        };
                        this.personAtCompanyClient.updatePersonAtCompany(this.personAtCompanyId, personAtCompanySaveData)
                            .then(() => { })
                            .catch(reason => console.error(reason));                
                        break;
                    case 'company':
                        let companySaveData: CompanySaveData = {
                            data: {
                                EmailAddresses: { 
                                    connect: [{id: this.emailAddressItem.id}],
                                },
                            }
                        };
                        this.companyClient.updateCompany(this.companyId, companySaveData)
                            .then(() => { })
                            .catch(reason => console.error(reason));                
                        break;
                }
            })
            .catch(reason => {
                this.emailAddressErrorMessage.innerHTML = reason.error.message;
            });
            return;  
        } 
  
    }
        
    componentWillLoad() {
        this.displayEmailAddress = this.emailAddressItem.attributes.EmailAddress;
        this.displayEmailAddressTypeId = this.emailAddressItem.attributes.email_address_type.data.id;
        this.displayEmailAddressTypeName = this.emailAddressItem.attributes.email_address_type.data.attributes.Name;
        switch (this.appliesTo) {
            case 'person':
                this.getPersonEmailAddressTypes();
                break;
            case 'personAtCompany':
                this.getPersonAtCompanyEmailAddressTypes();
                break;
            case 'company':
                this.getCompanyEmailAddressTypes();
                break;
        }
    } 
    
    componentDidLoad() {
        if (this.emailAddressItem.id === 0) {
            this.initializeEditForm();
        }
    }

    render() {
        return (
            <div>
                <div class='profile-item-row'>
                    { !this.isEditing && 
                        <div class='value'>
                            <div class='label'>
                                {this.displayEmailAddressTypeName}
                            </div>
                            <div class='value'>
                                {this.displayEmailAddress}
                            </div>
                        </div>                   
                    }
                    { !this.isEditing && this.canEdit && 
                        <div class='actions'>
                            <button class='action' onClick={e => this.handleEditClick(e)}>
                                <i class="fa-solid fa-pen blue"></i>&nbsp;<span class='action-link primary'>Edit</span>
                            </button>
                            <button class='action' onClick={e => this.handleDeleteClick(e)}>
                                <i class="fa-solid fa-trash-can brick-red"></i>&nbsp;<span class='action-link secondary'>Delete</span>
                            </button>                                       
                        </div>
                    }       
                    { this.isEditing &&
                        <form ref={el => this.editForm = el} class='edit-form' >
                            <div class='form-item'>
                                <label htmlFor='email-address-type'>Type</label>
                                <select id='email-address-type' name='email-address-type' onInput={(event) => this.handleEmailTypeSelect(event)}>
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
                                <label htmlFor="email-address">Email Address</label>
                                <input id='email-address' name='email-address' required ref={el => this.emailAddressInput = el} type="email" value={this.editEmailAddress} onInput={(e) => this.handleEmailAddressChange(e)} />
                                <div ref={el => this.emailAddressErrorMessage = el} class='form-error-message'></div>
                            </div>
                            <div class="button-container">
                                <button class="secondary-action" onClick={e => this.handleCancelClick(e)}>Cancel</button>
                                <button class="primary-action" onClick={e => this.handleSaveClick(e)}>Save</button>
                            </div>                        
                        </form>
                    }                
                </div>
                <app-confirmation ref={el => this.deleteConfirmationDialog = el} >
                    Are you sure you want to delete this email address?
                </app-confirmation>    
                <hr/>
            </div>
        );
    }
}

