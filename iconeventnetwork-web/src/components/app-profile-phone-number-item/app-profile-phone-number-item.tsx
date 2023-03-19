import { Component, Event, EventEmitter, Listen, Prop, State, h } from "@stencil/core";
import { CompanySaveData, CountryAttributes, DataResponse, PersonSaveData, PersonAtCompanySaveData, PhoneNumberAttributes, PhoneNumberSaveData, PhoneNumberTypeAttributes } from '../../services/clients/client-base';
import { PhoneNumberClient } from "../../services/clients/phone-number-client";
import { PhoneNumberTypeClient } from "../../services/clients/phone-number-type-client";
import { CountryClient } from "../../services/clients/country-client";
import { PersonClient } from "../../services/clients/person-client";
import { PersonAtCompanyClient } from "../../services/clients/person-at-company-client";
import { CompanyClient } from "../../services/clients/company-client";
import state from '../../services/store';


@Component({
  tag: "app-profile-phone-number-item",
  styleUrl: "app-profile-phone-number-item.scss",
  shadow: false
})
export class AppProfilePhoneItem {
    private deleteConfirmationDialog: HTMLAppConfirmationElement;
    private editForm: HTMLFormElement;
    private phoneNumberInput: HTMLInputElement;
    private phoneNumberErrorMessage: HTMLDivElement;
    private personClient: PersonClient;
    private personAtCompanyClient: PersonAtCompanyClient;
    private companyClient: CompanyClient;
    private phoneNumberClient: PhoneNumberClient;
    private phoneNumberTypeClient: PhoneNumberTypeClient;
    private countryClient: CountryClient;
    constructor() {
        this.personClient = new PersonClient();
        this.personAtCompanyClient = new PersonAtCompanyClient();
        this.companyClient = new CompanyClient();
        this.phoneNumberClient = new PhoneNumberClient();
        this.phoneNumberTypeClient = new PhoneNumberTypeClient();
        this.countryClient = new CountryClient();
    }  
    @Prop() phoneNumberItem: DataResponse<PhoneNumberAttributes>;
    @Prop() canEdit: boolean;
    @State() isEditing: boolean = false;
    @Prop() appliesTo!:  'person' | 'personAtCompany' | 'company';
    @Prop() personId?: number;
    @Prop() personAtCompanyId?: number;
    @Prop() companyId?: number;
    @State() displayPhoneNumber: string = '';
    @State() editPhoneNumber: string = '';
    @State() displayPhoneNumberTypeId: number = 0;
    @State() editPhoneNumberTypeId: number = 0;
    @State() displayPhoneNumberTypeName: string = '';
    @State() editPhoneNumberTypeName: string = '';
    @State() displayPhoneNumberCountryId: number = 0;
    @State() editPhoneNumberCountryId: number = 0;
    @State() phoneNumberTypes: DataResponse<PhoneNumberTypeAttributes>[];
    @State() phoneNumberCountries: DataResponse<CountryAttributes>[];
    @Event() private phoneNumberDeleted: EventEmitter<number>;

    @Listen('primaryConfirmationClick') primaryDeleteConfirmationClickHandler() {
        this.deleteConfirmationDialog.visible = false;    
        switch (this.appliesTo) {
            case 'person':
                let personSaveData: PersonSaveData = {
                    data: {
                        PhoneNumbers: { 
                            disconnect: [{id: this.phoneNumberItem.id}],
                        },
                    }
                };
                this.personClient.updatePerson(this.personId, personSaveData)
                    .then(() => { })
                    .catch(reason => console.error(reason));
                break;
            case'personAtCompany':
                let personAtCompanySaveData: PersonAtCompanySaveData = {
                    data: {
                        PhoneNumbers: { 
                            disconnect: [{id: this.phoneNumberItem.id}],
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
                        PhoneNumbers: { 
                            disconnect: [{id: this.phoneNumberItem.id}],
                        },
                    }
                };
                this.companyClient.updateCompany(this.companyId, companySaveData)
                    .then(() => { })
                    .catch(reason => console.error(reason));                
                break;
        }
        this.phoneNumberClient.deletePhoneNumber(this.phoneNumberItem.id)    
        .then(() => {})
        .catch(reason => console.error(reason));
        this.phoneNumberDeleted.emit(this.phoneNumberItem.id);
        return;     
    }
    @Listen('secondaryConfirmationClick') secondaryDeleteConfirmationClickHandler() {
        this.deleteConfirmationDialog.visible = false;
    }
    @Listen('phoneNumberAdded') phoneNumberAddedHandler(event: CustomEvent<number>) {
        if (this.phoneNumberItem.id == event.detail) {
            this.initializeEditForm();
        }
    }
    @Listen('deleteClick') deleteClickHandler() { 
        this.deleteConfirmationDialog.visible = true;
    }
    @Listen('editClick') editClickHandler() {   
        this.initializeEditForm();
    }
    
    private handlePhoneTypeSelect(event) {
        this.editPhoneNumberTypeId = event.target.value;
        this.editPhoneNumberTypeName = event.target[event.target.selectedIndex].text;
    }  
    private handlePhoneCountrySelect(event) {
        this.editPhoneNumberCountryId = event.target.value;
    }

    private handlePhoneNumberChange(event) {
        this.editPhoneNumber = event.target.value;
    }

    private handleCancelClick(e: MouseEvent) {
        e.preventDefault();
        this.phoneNumberInput.classList.remove('invalid');
        this.phoneNumberErrorMessage.innerHTML = '';
        this.isEditing = false;
        if (this.phoneNumberItem.id === 0) {
            this.phoneNumberDeleted.emit(this.phoneNumberItem.id);
        }
    }

    private handleSaveClick(e: MouseEvent) {
        e.preventDefault();
        this.phoneNumberInput.classList.remove('invalid');
        this.phoneNumberErrorMessage.innerHTML = '';
        let isValid = this.editForm.reportValidity();
        if (isValid) {
            this.saveData();
            return;
        }
        if (!this.phoneNumberInput.validity.valid) {
            this.phoneNumberInput.classList.add('invalid');
            this.phoneNumberErrorMessage.innerHTML = 'Phone Number must be a valid phone number.';
        }
    }

    private getPersonPhoneNumberTypes() {
        if (state.personPhoneNumberTypes.length > 0) {
          this.phoneNumberTypes = state.personPhoneNumberTypes;
          if (this.phoneNumberItem.id === 0) {
              this.initializeDefaultPhoneNumberType();
          }
          return;
        }
        this.phoneNumberTypeClient.getPhoneNumberTypes({
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
            this.phoneNumberTypes = response.data;
            state.personPhoneNumberTypes = response.data;
            if (this.phoneNumberItem.id === 0) {
                this.initializeDefaultPhoneNumberType();
            }
        })
        .catch(reason => console.error(reason));  
    }

    private getPersonAtCompanyPhoneNumberTypes() {
        if (state.personAtCompanyPhoneNumberTypes.length > 0) {
          this.phoneNumberTypes = state.personAtCompanyPhoneNumberTypes;
          if (this.phoneNumberItem.id === 0) {
              this.initializeDefaultPhoneNumberType();
          }
          return;
        }
        this.phoneNumberTypeClient.getPhoneNumberTypes({
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
            this.phoneNumberTypes = response.data;
            state.personAtCompanyPhoneNumberTypes = response.data;
            if (this.phoneNumberItem.id === 0) {
                this.initializeDefaultPhoneNumberType();
            }
        })
        .catch(reason => console.error(reason));  
    }

    private getCompanyPhoneNumberTypes() {
        if (state.companyPhoneNumberTypes.length > 0) {
          this.phoneNumberTypes = state.companyPhoneNumberTypes;
          if (this.phoneNumberItem.id === 0) {
              this.initializeDefaultPhoneNumberType();
          }
          return;
        }
        this.phoneNumberTypeClient.getPhoneNumberTypes({
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
            this.phoneNumberTypes = response.data;
            state.companyPhoneNumberTypes = response.data;
            if (this.phoneNumberItem.id === 0) {
                this.initializeDefaultPhoneNumberType();
            }
        })
        .catch(reason => console.error(reason));  
    }

    private getPhoneNumberCountries() {
        if (state.countries.length > 0) {
          this.phoneNumberCountries = state.countries;
          if (this.phoneNumberItem.id === 0) {
            const defaultPhoneNumberCountry = this.phoneNumberCountries.filter(country => country.attributes.A2 == 'US' )[0];
            this.displayPhoneNumberCountryId = defaultPhoneNumberCountry.id;
            this.editPhoneNumberCountryId = defaultPhoneNumberCountry.id;
          }
          return;
        }
        this.countryClient.getCountries({
            fields: ['Name', 'A2'],
            filters: {
                IsActive: {
                    $eq: true,
                },
            },
            pagination: {
                page: 1,
                pageSize: 300,
                withCount: true,
            }
        })
        .then((response) => {
            this.phoneNumberCountries = response.data;
            state.countries = response.data;
            if (this.phoneNumberItem.id === 0) {
              const defaultPhoneNumberCountry = this.phoneNumberCountries.filter(country => country.attributes.A2 == 'US' )[0];
              this.displayPhoneNumberCountryId = defaultPhoneNumberCountry.id;
              this.editPhoneNumberCountryId = defaultPhoneNumberCountry.id;
            }
        })
        .catch(reason => console.error(reason));  
    }

    private initializeEditForm() {
        this.editPhoneNumber = this.displayPhoneNumber;        
        this.editPhoneNumberTypeId = this.displayPhoneNumberTypeId;
        this.editPhoneNumberTypeName = this.displayPhoneNumberTypeName;
        this.editPhoneNumberCountryId = this.displayPhoneNumberCountryId;
        this.isEditing = true;
    }

    private initializeDefaultPhoneNumberType() {
        if (this.phoneNumberItem.id === 0) {
            const defaultPhoneNumberType = this.phoneNumberTypes?.sort((a,b) => {
                var rankA = a.attributes.Rank;
                var rankB = b.attributes.Rank;
                return (rankA < rankB) ? -1 : (rankA > rankB) ? 1 : 0;
            })[0];
            this.editPhoneNumberTypeId = defaultPhoneNumberType.id;
            this.displayPhoneNumberTypeId = defaultPhoneNumberType.id;
            this.editPhoneNumberTypeName = defaultPhoneNumberType.attributes.Name;
            this.displayPhoneNumberTypeName = defaultPhoneNumberType.attributes.Name;
        }    
    }

    private saveData() {
        let phoneNumberSaveData: PhoneNumberSaveData = {
            data: {
                RawFormat: this.phoneNumberItem.attributes.RawFormat,
                country: { },
                phone_number_type: { },
            }
        };
        if (this.editPhoneNumber.trim() != this.displayPhoneNumber) {
            phoneNumberSaveData.data.RawFormat = this.editPhoneNumber.trim();
        }
        if (this.phoneNumberItem.id > 0)  {
            if (this.editPhoneNumberTypeId != this.displayPhoneNumberTypeId) {
                phoneNumberSaveData.data.phone_number_type.disconnect = [{id: this.displayPhoneNumberTypeId}];
                phoneNumberSaveData.data.phone_number_type.connect = [{id: this.editPhoneNumberTypeId}];
            } 
            if (this.editPhoneNumberCountryId != this.displayPhoneNumberCountryId) {
                phoneNumberSaveData.data.country.disconnect = [{id: this.displayPhoneNumberCountryId}];
                phoneNumberSaveData.data.country.connect = [{id: this.editPhoneNumberCountryId}];
            } 
            this.phoneNumberClient.updatePhoneNumber(this.phoneNumberItem.id, phoneNumberSaveData)
            .then((response) => {
                this.isEditing = false;
                this.displayPhoneNumber = response.data.attributes.NationalFormat &&
                                          response.data.attributes.NationalFormat.length > 0 ? 
                    response.data.attributes.NationalFormat :
                    response.data.attributes.RawFormat;
                this.displayPhoneNumberTypeId = this.editPhoneNumberTypeId
                this.displayPhoneNumberTypeName = this.editPhoneNumberTypeName;
                this.displayPhoneNumberCountryId = this.editPhoneNumberCountryId;
            })
            .catch(reason => {
                this.phoneNumberErrorMessage.innerHTML = reason.error.message;
            });
            return;  
        }
        if (this.phoneNumberItem.id === 0) {
            phoneNumberSaveData.data.phone_number_type.connect = [{id: this.editPhoneNumberTypeId}];
            phoneNumberSaveData.data.country.connect = [{id: this.editPhoneNumberCountryId}];
            this.phoneNumberClient.addPhoneNumber(phoneNumberSaveData)
            .then((result) => {
                this.isEditing = false;
                this.phoneNumberItem.id = result.data.id;
                this.displayPhoneNumber = result.data.attributes.NationalFormat &&
                                          result.data.attributes.NationalFormat.length > 0 ? 
                    result.data.attributes.NationalFormat :
                    result.data.attributes.RawFormat;
                this.displayPhoneNumberTypeId = this.editPhoneNumberTypeId
                this.displayPhoneNumberTypeName = this.editPhoneNumberTypeName;
                this.displayPhoneNumberCountryId = this.editPhoneNumberCountryId;
                switch (this.appliesTo) {
                    case 'person':
                        let personSaveData: PersonSaveData = {
                            data: {
                                PhoneNumbers: { 
                                    connect: [{id: this.phoneNumberItem.id}],
                                },
                            }
                        };
                        this.personClient.updatePerson(this.personId, personSaveData)
                            .then(() => { })
                            .catch(reason => console.error(reason));
                        break;
                    case'personAtCompany':
                        let personAtCompanySaveData: PersonAtCompanySaveData = {
                            data: {
                                PhoneNumbers: { 
                                    connect: [{id: this.phoneNumberItem.id}],
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
                                PhoneNumbers: { 
                                    connect: [{id: this.phoneNumberItem.id}],
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
                this.phoneNumberErrorMessage.innerHTML = reason.error.message;
            });
            return;  
        } 
  
    }
        
    componentWillLoad() { 
        this.displayPhoneNumber = this.phoneNumberItem.attributes.NationalFormat && 
                                  this.phoneNumberItem.attributes.NationalFormat.length > 0 ? 
            this.phoneNumberItem.attributes.NationalFormat :
            this.phoneNumberItem.attributes.RawFormat;
        this.displayPhoneNumberTypeId = this.phoneNumberItem.attributes.phone_number_type.data.id;
        this.displayPhoneNumberTypeName = this.phoneNumberItem.attributes.phone_number_type.data.attributes.Name;
        this.displayPhoneNumberCountryId = this.phoneNumberItem.attributes.country.data.id;
        switch (this.appliesTo) {
            case 'person':
                this.getPersonPhoneNumberTypes();
                break;
            case'personAtCompany':
                this.getPersonAtCompanyPhoneNumberTypes();
                break;
            case 'company':
                this.getCompanyPhoneNumberTypes();
                break;
        }
        this.getPhoneNumberCountries();
    } 
    
    componentDidLoad() {
        if (this.phoneNumberItem.id === 0) {
            this.initializeEditForm();
        }
    }

    render() {
        return (
            <div>
                <div class='content-row'>
                    { !this.isEditing &&
                        <div class='content-value'>
                            <div class='sub-content'>
                                <div class='sub-content-label'>
                                    {this.displayPhoneNumberTypeName}
                                </div>
                                <div class='sub-content-value'>
                                    {this.displayPhoneNumber}
                                </div>
                            </div>                           
                            {!this.phoneNumberItem.attributes.IsValidated &&
                                <icn-message type="warning">
                                    The phone number is not valid for the selected country. Invalid phone numbers do not appear in the directory.
                                </icn-message>
                            }
                        </div>                   
                    }
                    { !this.isEditing && this.canEdit && 
                        <icn-profile-actions />                                                   
                    }
                    { this.isEditing &&
                        <form ref={el => this.editForm = el} class='edit-form' >
                            <div class='form-item'>
                                <label htmlFor="phone-number-type">Type</label>
                                <select id='phone-number-type' name='phone-number-type' onInput={(event) => this.handlePhoneTypeSelect(event)}>
                                    {this.phoneNumberTypes?.sort((a,b) => {
                                        var rankA = a.attributes.Rank;
                                        var rankB = b.attributes.Rank;
                                        return (rankA < rankB) ? -1 : (rankA > rankB) ? 1 : 0;
                                    }).map(phoneNumberType => (
                                        <option
                                            value={phoneNumberType.id}
                                            selected={this.editPhoneNumberTypeId === phoneNumberType.id}
                                        >
                                            {phoneNumberType.attributes.Name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div class='form-item'>
                                <label htmlFor="phone-number">Phone Number</label>
                                <select id='phone-number' name='phone-number' class='phone-country' onInput={(event) => this.handlePhoneCountrySelect(event)}>
                                    {this.phoneNumberCountries?.sort((a,b) => {
                                        var rankA = a.attributes.A2;
                                        var rankB = b.attributes.A2;
                                        return (rankA < rankB) ? -1 : (rankA > rankB) ? 1 : 0;
                                    }).map(country => (
                                        <option
                                            value={country.id}
                                            selected={this.editPhoneNumberCountryId === country.id}
                                        >
                                            {country.attributes.A2}
                                        </option>
                                    ))}
                                </select>
                                <input type="phone" class='phone-number' required value={this.editPhoneNumber} ref={el => this.phoneNumberInput = el} onInput={(e) => this.handlePhoneNumberChange(e)} />
                                <div class='form-error-message' ref={el => this.phoneNumberErrorMessage = el}></div>
                            </div>
                            <div class="button-container">
                                <button class="secondary-action" onClick={e => this.handleCancelClick(e)}>Cancel</button>
                                <button class="primary-action" onClick={e => this.handleSaveClick(e)}>Save</button>
                            </div>                        
                        </form>
                    }
                </div>
                <app-confirmation ref={el => this.deleteConfirmationDialog = el} visible={false} >
                    Are you sure you want to delete this phone number?
                </app-confirmation>    
            </div>
        );
    }
}