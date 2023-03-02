import { Component, Event, EventEmitter, Listen, Prop, State, h } from "@stencil/core";
import { CompanySaveData, CountryAttributes, DataResponse, PersonSaveData, PersonAtCompanySaveData, PhoneNumberAttributes, PhoneNumberSaveData, PhoneNumberTypeAttributes } from '../../services/clients/client-base';
import { PhoneNumberClient } from "../../services/clients/phone-number-client";
import { PhoneNumberTypeClient } from "../../services/clients/phone-number-type-client";
import { CountryClient } from "../../services/clients/country-client";
import { PersonClient } from "../../services/clients/person-client";
import { PersonAtCompanyClient } from "../../services/clients/person-at-company-client";
import { CompanyClient } from "../../services/clients/company-client";
import { localStorageKeyService } from '../../services/local-storage-key-service';


@Component({
  tag: "app-profile-phone-number-item",
  styleUrl: "app-profile-phone-number-item.scss",
  shadow: false
})
export class AppProfilePhoneItem {
    private editDialog: HTMLAppModalElement;
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
    @State() phoneNumberClass: string = '';
    @Event() private phoneNumberDeleted: EventEmitter<number>;

    @Listen('primaryModalClick') primaryModalClickHandler() {
        this.phoneNumberClass = '';
        let isValid = this.editForm.reportValidity();
        if (isValid) {
            this.saveData();
            return;
        }
        this.phoneNumberClass = this.phoneNumberInput.validity.valid ? '' : 'invalid';
        this.phoneNumberErrorMessage.innerHTML = this.phoneNumberInput.validity.valid ? '' : 'Phone Number must be a valid phone number.';
    }
    @Listen('secondaryModalClick') secondaryModalClickHandler() {
        this.phoneNumberClass = '';
        this.phoneNumberErrorMessage.innerHTML = '';
        this.editDialog.visible = false;
        if (this.phoneNumberItem.id === 0) {
            this.phoneNumberDeleted.emit(this.phoneNumberItem.id);
        }
    }

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
            this.handleEditClick(new MouseEvent('click'));
        }
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

    private handleEditClick(e: MouseEvent) {
        e.preventDefault();
        this.initializeEditDialog();
    }

    private handleDeleteClick(e: MouseEvent) {
        e.preventDefault();
        this.deleteConfirmationDialog.visible = true;
    }

    private getPersonPhoneNumberTypes() {
        var storedPersonPhoneNumberTypes = sessionStorage.getItem(localStorageKeyService.PhoneNumberTypesPerson);
        if (storedPersonPhoneNumberTypes) {
          this.phoneNumberTypes = JSON.parse(storedPersonPhoneNumberTypes);
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
            sessionStorage.setItem(localStorageKeyService.PhoneNumberTypesPerson, JSON.stringify(this.phoneNumberTypes));
        })
        .catch(reason => console.error(reason));  
    }

    private getPersonAtCompanyPhoneNumberTypes() {
        var storedPersonAtCompanyPhoneNumberTypes = sessionStorage.getItem(localStorageKeyService.PhoneNumberTypesPersonAtCompany);
        if (storedPersonAtCompanyPhoneNumberTypes) {
          this.phoneNumberTypes = JSON.parse(storedPersonAtCompanyPhoneNumberTypes);
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
            sessionStorage.setItem(localStorageKeyService.PhoneNumberTypesPersonAtCompany, JSON.stringify(this.phoneNumberTypes));
        })
        .catch(reason => console.error(reason));  
    }

    private getCompanyPhoneNumberTypes() {
        var storedCompanyPhoneNumberTypes = sessionStorage.getItem(localStorageKeyService.PhoneNumberTypesCompany);
        if (storedCompanyPhoneNumberTypes) {
          this.phoneNumberTypes = JSON.parse(storedCompanyPhoneNumberTypes);
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
            sessionStorage.setItem(localStorageKeyService.PhoneNumberTypesCompany, JSON.stringify(this.phoneNumberTypes));
        })
        .catch(reason => console.error(reason));  
    }

    private getPhoneNumberCountries() {
        var storedPhoneNumberCountries = sessionStorage.getItem(localStorageKeyService.PhoneNumberCountries);
        if (storedPhoneNumberCountries) {
          this.phoneNumberCountries = JSON.parse(storedPhoneNumberCountries);
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
            sessionStorage.setItem(localStorageKeyService.PhoneNumberCountries, JSON.stringify(this.phoneNumberCountries));
        })
        .catch(reason => console.error(reason));  
    }

    private initializeEditDialog() {
        this.editPhoneNumber = this.displayPhoneNumber;        
        this.editPhoneNumberTypeId = this.displayPhoneNumberTypeId;
        this.editPhoneNumberTypeName = this.displayPhoneNumberTypeName;
        this.editPhoneNumberCountryId = this.displayPhoneNumberCountryId;
        this.editDialog.visible = true;
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
                this.editDialog.visible = false;
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
                this.editDialog.visible = false;
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
            const defaultPhoneNumberType = this.phoneNumberTypes?.sort((a,b) => {
                var rankA = a.attributes.Rank;
                var rankB = b.attributes.Rank;
                return (rankA < rankB) ? -1 : (rankA > rankB) ? 1 : 0;
            })[0];
            this.editPhoneNumberTypeId = defaultPhoneNumberType.id;
            this.displayPhoneNumberTypeId = defaultPhoneNumberType.id;
            this.editPhoneNumberTypeName = defaultPhoneNumberType.attributes.Name;
            this.displayPhoneNumberTypeName = defaultPhoneNumberType.attributes.Name;
            const defaultPhoneNumberCountry = this.phoneNumberCountries.filter(country => country.attributes.A2 == 'US' )[0];
            this.displayPhoneNumberCountryId = defaultPhoneNumberCountry.id;
            this.initializeEditDialog();
        }
    }

    render() {
        return (
            <div>
                <div class='profile-item-row'>
                    <div class='value'>
                        <div class='label'>
                            {this.displayPhoneNumberTypeName}
                        </div>
                        <div class='value'>
                            {this.displayPhoneNumber}
                        </div>
                    </div>
                    {this.canEdit && 
                        <div class='actions'>
                            <button class='action' onClick={e => this.handleEditClick(e)}>
                                <i class="fa-solid fa-pen blue"></i>&nbsp;<span class='action-link primary'>Edit</span>
                            </button>
                            <button class='action' onClick={e => this.handleDeleteClick(e)}>
                                <i class="fa-solid fa-trash-can brick-red"></i>&nbsp;<span class='action-link secondary'>Delete</span>
                            </button>                                       
                        </div>                    
                    }
                </div>
                <app-modal ref={el => this.editDialog = el} dialogTitle="Phone">
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
                            <select id='phone-number' name='phone-number' onInput={(event) => this.handlePhoneCountrySelect(event)}>
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

                            <input ref={el => this.phoneNumberInput = el} type="phone" value={this.editPhoneNumber} onInput={(e) => this.handlePhoneNumberChange(e)} class={this.phoneNumberClass} required />
                            <div ref={el => this.phoneNumberErrorMessage = el} class='form-error-message'></div>
                        </div>
                    </form>
                </app-modal>
                <app-confirmation ref={el => this.deleteConfirmationDialog = el} >
                    Are you sure you want to delete this phone number?
                </app-confirmation>    
                <hr/>            
            </div>
        );
    }
}