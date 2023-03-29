import { Component, Event, EventEmitter, Listen, Prop, State, h } from "@stencil/core";
import { CompanySaveData, DataResponse, AddressAttributes, AddressSaveData, AddressTypeAttributes, CountryAttributes, CountrySubdivisionAttributes, PersonSaveData, PersonAtCompanySaveData } from '../../services/clients/client-base';
import { AddressClient } from "../../services/clients/address-client";
import { AddressTypeClient } from "../../services/clients/address-type-client";
import { CountryClient } from "../../services/clients/country-client";
import { CountrySubdivisionClient } from "../../services/clients/country-subdivision-client";
import { PersonClient } from "../../services/clients/person-client";
import { PersonAtCompanyClient } from "../../services/clients/person-at-company-client";
import { CompanyClient } from "../../services/clients/company-client";
import state from '../../services/store';

@Component({
  tag: "app-profile-address-item",
  styleUrl: "app-profile-address-item.scss",
  shadow: false,
  scoped: true,
})
export class AppProfileAddressItem {
    private addressClient: AddressClient;
    private addressTypeClient: AddressTypeClient;
    private countryClient: CountryClient;
    private countrySubdivisionClient: CountrySubdivisionClient;
    private personClient: PersonClient;
    private personAtCompanyClient: PersonAtCompanyClient;
    private companyClient: CompanyClient;
    constructor() {
        this.addressClient = new AddressClient();
        this.addressTypeClient = new AddressTypeClient();
        this.countryClient = new CountryClient();
        this.countrySubdivisionClient = new CountrySubdivisionClient();
        this.personClient = new PersonClient();
        this.personAtCompanyClient = new PersonAtCompanyClient();
        this.companyClient = new CompanyClient();
    }  
    @Prop() addressItem: DataResponse<AddressAttributes>;
    @Prop() canEdit: boolean;
    @State() isEditing: boolean = false;
    @Prop() appliesTo!: 'person' | 'personAtCompany' | 'company';
    @Prop() personId?: number;
    @Prop() personAtCompanyId?: number;
    @Prop() companyId?: number;
    @State() displayLine1: string = '';
    @State() editLine1: string = '';
    @State() displayLine2: string = '';
    @State() editLine2: string = '';
    @State() displayCity: string = '';
    @State() editCity: string = '';
    @State() displayPostalCode: string = '';
    @State() editPostalCode: string = '';
    @State() displayAddressTypeName: string = '';
    @State() editAddressTypeName: string = '';
    @State() displayAddressTypeId: number = 0;
    @State() editAddressTypeId: number = 0;
    @State() displayCountryName: string = '';
    @State() editCountryName: string = '';
    @State() displayCountryA2: string = '';
    @State() editCountryA2: string = '';
    @State() displayCountryId: number = 0;
    @State() editCountryId: number = 0;
    @State() displayCountrySubdivisionName: string = '';
    @State() editCountrySubdivisionName: string = '';
    @State() displayCountrySubdivisionCode: string = '';
    @State() editCountrySubdivisionCode: string = '';
    @State() displayCountrySubdivisionId: number = 0;
    @State() editCountrySubdivisionId: number = 0;
    @State() addressTypes: DataResponse<AddressTypeAttributes>[];
    @State() countries: DataResponse<CountryAttributes>[];
    @State() countrySubdivisions: DataResponse<CountrySubdivisionAttributes>[];
    @Event() private addressDeleted: EventEmitter<number>;
    private editForm: HTMLFormElement;
    private cityInput: HTMLInputElement;
    private cityErrorMessage: HTMLIcnMessageElement;

    private deleteConfirmed() {
        this.cityInput.classList.remove('invalid');
        this.cityErrorMessage.hide();
        this.isEditing = false;    
        switch (this.appliesTo) {
            case 'person':
                let personSaveData: PersonSaveData = {
                    data: {
                        Addresses: { 
                            disconnect: [{id: this.addressItem.id}],
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
                        Addresses: { 
                            disconnect: [{id: this.addressItem.id}],
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
                        Addresses: { 
                            disconnect: [{id: this.addressItem.id}],
                        },
                    }
                };
                this.companyClient.updateCompany(this.companyId, companySaveData)
                    .then(() => { })
                    .catch(reason => console.error(reason));                
                break;
        }
        this.addressClient.deleteAddress(this.addressItem.id)    
        .then(() => {})
        .catch(reason => console.error(reason));
        this.addressDeleted.emit(this.addressItem.id);
        return;     
    }

    @Listen('addressAdded') addressAddedHandler(event: CustomEvent<number>) {
        if (this.addressItem.id == event.detail) {
            this.initializeEditForm();
        }
    }
    @Listen('editClick') editClickHandler() {   
        this.initializeEditForm();
    }

    private handleCancelClick(e: MouseEvent) {
        e.preventDefault();
        this.cityInput.classList.remove('invalid');
        this.cityErrorMessage.hide();
        this.isEditing = false;
        if (this.addressItem.id === 0) {
            this.addressDeleted.emit(this.addressItem.id);
        }
    }

    private handleSaveClick(e: MouseEvent) {
        e.preventDefault();
        this.cityInput.classList.remove('invalid');
        this.cityErrorMessage.hide();
        let isValid = this.editForm.reportValidity();
        if (isValid) {
            this.saveData();
            return;
        }
        this.cityInput.classList.add('invalid');
        this.cityErrorMessage.show();
    }
    
    private handleCountrySelect(event) {
        this.editCountryId = event.target.value;
        this.editCountryName = event.target[event.target.selectedIndex].text;
        let selectedCountry = this.countries.filter(country => country.id == this.editCountryId)[0];
        this.editCountryA2 = selectedCountry.attributes.A2;
        this.getCountrySubdivisions();
    }
    
    private handleCountrySubdivisionSelect(event) {
        this.editCountrySubdivisionId = event.target.value;
        this.editCountrySubdivisionName = event.target[event.target.selectedIndex].text;
        let selectedCountrySubdivision = this.countrySubdivisions.filter(countrySubdivision => countrySubdivision.id == this.editCountrySubdivisionId)[0];
        this.editCountrySubdivisionCode = selectedCountrySubdivision.attributes.Code;
    }
    
    private handleAddressTypeSelect(event) {
        this.editAddressTypeId = event.target.value;
        this.editAddressTypeName = event.target[event.target.selectedIndex].text;
    }

    private handleLine1Change(event) {
        this.editLine1 = event.target.value;
    }

    private handleLine2Change(event) {
        this.editLine2 = event.target.value;
    }

    private handleCityChange(event) {
        this.editCity = event.target.value;
        this.cityInput.classList.remove('invalid');
        this.cityErrorMessage.hide();
    }

    private handlePostalCodeChange(event) {
        this.editPostalCode = event.target.value;
    }

    private initializeEditForm() {
        this.editLine1 = this.displayLine1;   
        this.editLine2 = this.displayLine2;    
        this.editCity = this.displayCity; 
        this.editPostalCode = this.displayPostalCode;
        this.editCountryId = this.displayCountryId;
        this.editCountryName = this.displayCountryName;
        this.editCountryA2 = this.displayCountryA2;
        this.editCountrySubdivisionId = this.displayCountrySubdivisionId;
        this.editCountrySubdivisionName = this.displayCountrySubdivisionName;
        this.editCountrySubdivisionCode = this.displayCountrySubdivisionCode;
        this.editAddressTypeId = this.displayAddressTypeId;
        this.editAddressTypeName = this.displayAddressTypeName;
        this.isEditing = true;
    }

    private initializeDefaultAddressType() {
        const defaultAddressType = this.addressTypes?.sort((a,b) => {
            var rankA = a.attributes.Rank;
            var rankB = b.attributes.Rank;
            return (rankA < rankB) ? -1 : (rankA > rankB) ? 1 : 0;
        })[0];
        this.editAddressTypeId = defaultAddressType.id;
        this.displayAddressTypeId = defaultAddressType.id;
        this.editAddressTypeName = defaultAddressType.attributes.Name;
        this.displayAddressTypeName = defaultAddressType.attributes.Name;
    }

    private initializeDefaultCountry() {
        const defaultCountry = this.countries.filter(country => country.attributes.A2 == 'US' )[0];
        this.editCountryId = defaultCountry.id;
        this.displayCountryId = defaultCountry.id;
        this.editCountryName = defaultCountry.attributes.Name;
        this.displayCountryName = defaultCountry.attributes.Name;
        this.editCountryA2 = defaultCountry.attributes.A2;
        this.displayCountryA2 = defaultCountry.attributes.A2;
        this.getCountrySubdivisions();
    }

    private getCountries() {
        if (state.countries.length > 0) {
          this.countries = state.countries;
          if (this.addressItem.id === 0) {
            this.initializeDefaultCountry();
          } else {
            this.getCountrySubdivisions();
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
            this.countries = response.data;
            state.countries = response.data;
            if (this.addressItem.id === 0) {
              this.initializeDefaultCountry();
            } else {
                this.getCountrySubdivisions();
            }
        })
        .catch(reason => console.error(reason));  
    }

    private getCountrySubdivisions() {
        let selectedCountry = this.countries.filter(country => country.id == this.editCountryId)[0];
        if (!selectedCountry) {
            selectedCountry = this.countries.filter(country => country.attributes.A2 == 'US' )[0];
        }
        this.countrySubdivisionClient.getCountrySubdivisions({
            fields: ['Name', 'Code'],
            filters: {
                IsActive: {
                    $eq: true,
                },
                Code: {
                    $startsWith: selectedCountry.attributes.A2,
                }
            },
            pagination: {
                page: 1,
                pageSize: 300,
                withCount: true,
            }
        })
        .then((response) => {
            this.countrySubdivisions = response.data;
            if (this.countrySubdivisions.length > 0 &&
                this.displayCountrySubdivisionId > 0 &&
                this.editCountryId == this.displayCountryId) {
                    this.editCountrySubdivisionId = this.displayCountrySubdivisionId;
                    this.editCountrySubdivisionName = this.displayCountrySubdivisionName;
                    this.editCountrySubdivisionCode = this.displayCountrySubdivisionCode;
            }
            if (this.countrySubdivisions.length > 0 &&
                this.displayCountrySubdivisionId == 0) {
                    const defaultCountrySubdivision = this.countrySubdivisions[0];
                    this.displayCountrySubdivisionId = defaultCountrySubdivision.id;
                    this.editCountrySubdivisionId = defaultCountrySubdivision.id;
                    this.displayCountrySubdivisionName = defaultCountrySubdivision.attributes.Name;
                    this.editCountrySubdivisionName = defaultCountrySubdivision.attributes.Name;
                    this.displayCountrySubdivisionCode = defaultCountrySubdivision.attributes.Code;
                    this.editCountrySubdivisionCode = defaultCountrySubdivision.attributes.Code;
            }
        })
        .catch(reason => console.error(reason));  
    }

    private getPersonAddressTypes() {
        if (state.personAddressTypes.length > 0) {
            this.addressTypes = state.personAddressTypes;
            if (this.addressItem.id === 0) {
                this.initializeDefaultAddressType();
                this.initializeEditForm();
            }
            return;
        }
        this.addressTypeClient.getAddressTypes({
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
            this.addressTypes = response.data;
            state.personAddressTypes = response.data;
            if (this.addressItem.id === 0) {
                this.initializeDefaultAddressType();
                this.initializeEditForm();
            }
        })
        .catch(reason => console.error(reason));  
    }

    private getPersonAtCompanyAddressTypes() {
        if (state.personAtCompanyAddressTypes.length > 0) {
          this.addressTypes = state.personAtCompanyAddressTypes;
          if (this.addressItem.id === 0) {
              this.initializeDefaultAddressType();
              this.initializeEditForm();
          }
          return;
        }
        this.addressTypeClient.getAddressTypes({
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
            this.addressTypes = response.data;
            state.personAtCompanyAddressTypes = response.data;
            if (this.addressItem.id === 0) {
                this.initializeDefaultAddressType();
                this.initializeEditForm();
            }
        })
        .catch(reason => console.error(reason));  
    }

    private getCompanyAddressTypes() {
        if (state.companyAddressTypes.length > 0) {
          this.addressTypes = state.companyAddressTypes;
          if (this.addressItem.id === 0) {
              this.initializeDefaultAddressType();
              this.initializeEditForm();
          }
          return;
        }
        this.addressTypeClient.getAddressTypes({
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
            this.addressTypes = response.data;
            state.companyAddressTypes = response.data;
            if (this.addressItem.id === 0) {
                this.initializeDefaultAddressType();
                this.initializeEditForm();
            }
        })
        .catch(reason => console.error(reason));  
    }

    private saveData() {
        let addressSaveData: AddressSaveData = {
            data: {
                Line1: this.displayLine1??'',
                Line2: this.displayLine2??'',
                City: this.displayCity??'',
                PostalCode: this.displayPostalCode??'',
                country: { },
                country_subdivision: { },
                address_type: { },
            }
        };
        if (this.editLine1?.trim() != this.displayLine1) {
            addressSaveData.data.Line1 = this.editLine1;
        }
        if (this.editLine2?.trim() != this.displayLine2) {
            addressSaveData.data.Line2 = this.editLine2;
        }
        if (this.editCity?.trim() != this.displayCity) {
            addressSaveData.data.City = this.editCity;
        }
        if (this.editPostalCode?.trim() != this.displayPostalCode) {
            addressSaveData.data.PostalCode = this.editPostalCode;
        }
        if (this.addressItem.id > 0)  {
            if (this.editCountryId != this.displayCountryId) {
                addressSaveData.data.country.disconnect = [{id: this.displayCountryId}];
                addressSaveData.data.country.connect = [{id: this.editCountryId}];
            } 
            if (this.editCountrySubdivisionId != this.displayCountrySubdivisionId) {
                if (this.displayCountrySubdivisionId > 0) {
                    addressSaveData.data.country_subdivision.disconnect = [{id: this.displayCountrySubdivisionId}];
                }
                if (this.editCountrySubdivisionId > 0 ) {
                    addressSaveData.data.country_subdivision.connect = [{id: this.editCountrySubdivisionId}];
                }
            } 
            if (this.editAddressTypeId != this.displayAddressTypeId) {
                addressSaveData.data.address_type.disconnect = [{id: this.displayAddressTypeId}];
                addressSaveData.data.address_type.connect = [{id: this.editAddressTypeId}];
            } 
            this.addressClient.updateAddress(this.addressItem.id, addressSaveData)
            .then(() => {
                this.isEditing = false;
                this.displayLine1 = this.editLine1;
                this.displayLine2 = this.editLine2;
                this.displayCity = this.editCity;
                this.displayPostalCode = this.editPostalCode;
                this.displayCountryId = this.editCountryId;
                this.displayCountryName = this.editCountryName;
                this.displayCountryA2 = this.editCountryA2;
                this.displayCountrySubdivisionId = this.editCountrySubdivisionId;
                this.displayCountrySubdivisionName = this.editCountrySubdivisionName;
                this.displayCountrySubdivisionCode = this.editCountrySubdivisionCode;
                this.displayAddressTypeId = this.editAddressTypeId;
                this.displayAddressTypeName = this.editAddressTypeName;
            })
            .catch(reason => {
                console.log(reason.error.message);
            });
            return;  
        }
        if (this.addressItem.id === 0) {
            addressSaveData.data.country.connect = [{id: this.editCountryId}];
            if (this.editCountrySubdivisionId > 0) {
                addressSaveData.data.country_subdivision.connect = [{id: this.editCountrySubdivisionId}];
            }
            addressSaveData.data.address_type.connect = [{id: this.editAddressTypeId}];
            this.addressClient.addAddress(addressSaveData)
            .then((result) => {
                this.isEditing = false;
                this.addressItem.id = result.data.id;
                this.displayLine1 = this.editLine1;
                this.displayLine2 = this.editLine2;
                this.displayCity = this.editCity;
                this.displayPostalCode = this.editPostalCode;
                this.displayCountryId = this.editCountryId;
                this.displayCountryName = this.editCountryName;
                this.displayCountryA2 = this.editCountryA2;
                this.displayCountrySubdivisionId = this.editCountrySubdivisionId;
                this.displayCountrySubdivisionName = this.editCountrySubdivisionName;
                this.displayCountrySubdivisionCode = this.editCountrySubdivisionCode;
                this.displayAddressTypeId = this.editAddressTypeId;
                this.displayAddressTypeName = this.editAddressTypeName;
                switch (this.appliesTo) {
                    case 'person':
                        let personSaveData: PersonSaveData = {
                            data: {
                                Addresses: { 
                                    connect: [{id: this.addressItem.id}],
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
                                Addresses: { 
                                    connect: [{id: this.addressItem.id}],
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
                                Addresses: { 
                                    connect: [{id: this.addressItem.id}],
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
                console.log(reason.error.message);
            });
            return;  
        }  
    }
        
    componentWillLoad() {
        this.displayLine1 = this.addressItem.attributes.Line1;
        this.displayLine2 = this.addressItem.attributes.Line2;
        this.displayCity = this.addressItem.attributes.City;
        this.displayPostalCode = this.addressItem.attributes.PostalCode;
        this.displayCountryId = this.addressItem.attributes.country.data.id;
        this.editCountryId = this.addressItem.attributes.country.data.id; // needed to initialize country subdivisions on initial load
        this.displayCountryName = this.addressItem.attributes.country.data.attributes.Name;
        this.displayCountryA2 = this.addressItem.attributes.country.data.attributes.A2;
        this.displayCountrySubdivisionId = this.addressItem.attributes.country_subdivision?.data?.id??0;
        this.displayCountrySubdivisionName = this.addressItem.attributes.country_subdivision?.data?.attributes?.Name??'';
        this.displayCountrySubdivisionCode = this.addressItem.attributes.country_subdivision?.data?.attributes?.Code??'';
        this.displayAddressTypeId = this.addressItem.attributes.address_type.data.id;
        this.displayAddressTypeName = this.addressItem.attributes.address_type.data.attributes.Name;
        this.getCountries();
        switch (this.appliesTo) {
            case 'person':
                this.getPersonAddressTypes();
                break;
            case 'personAtCompany':
                this.getPersonAtCompanyAddressTypes();
                break;
            case 'company':
                this.getCompanyAddressTypes();
                break;
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
                                    {this.displayAddressTypeName}
                                </div>
                                <div class='sub-content-value'>
                                    {this.displayLine1 ?? ''}
                                    {this.displayLine1 ? <br/> : '' }
                                    {this.displayLine2 ?? ''}
                                    {this.displayLine2 ? <br/> : '' }
                                    {this.displayCity ? this.displayCity + ', ' : ''}
                                    {this.displayCountrySubdivisionCode ? this.displayCountrySubdivisionCode.substring(3, 5).toUpperCase() + ' ' : ''}
                                    {this.displayPostalCode ?? ''}
                                    {this.displayCountryA2 && this.displayCountryA2 != 'US' ? <br/> : '' }
                                    {this.displayCountryA2 && this.displayCountryA2 != 'US' ? this.displayCountryName : '' }
                                </div>
                            </div>
                        </div>               
                    }
                    { !this.isEditing && this.canEdit &&
                        <icn-profile-actions />                         
                    }       
                    { this.isEditing &&
                        <form ref={el => this.editForm = el} class='edit-form' >
                            <div class='form-item'>
                                <label htmlFor='address-type'>Type</label>
                                <select id='address-type' name='address-type' onInput={(event) => this.handleAddressTypeSelect(event)}>
                                    {this.addressTypes?.sort((a,b) => {
                                        var rankA = a.attributes.Rank;
                                        var rankB = b.attributes.Rank;
                                        return (rankA < rankB) ? -1 : (rankA > rankB) ? 1 : 0;
                                    }).map(addressType => (
                                        <option
                                            value={addressType.id}
                                            selected={this.editAddressTypeId === addressType.id}
                                        >
                                            {addressType.attributes.Name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div class='form-item'>
                                <label htmlFor="line1">Street Address <span class='optional'>(Optional)</span></label>
                                <input id='line1' name='line1' type="text" value={this.editLine1} onInput={(e) => this.handleLine1Change(e)} />
                            </div>
                            <div class='form-item'>
                                <label htmlFor="line2">Suite or Unit Number <span class='optional'>(Optional)</span></label>
                                <input id='line2' name='line2' type="text" value={this.editLine2} onInput={(e) => this.handleLine2Change(e)} />
                            </div>
                            <div class='form-item'>
                                <label htmlFor="city">City</label>
                                <input id='city' name='city' ref={el => this.cityInput = el} type="text" value={this.editCity} onInput={(e) => this.handleCityChange(e)} required />
                                <icn-message type='error' hidden ref={el => this.cityErrorMessage = el}>
                                    City is required.
                                </icn-message>
                            </div>
                            <div class='form-item'>
                                <label htmlFor='country'>Country</label>
                                <select id='country' name='country' onInput={(event) => this.handleCountrySelect(event)}>
                                    {this.countries?.sort((a,b) => {
                                        var rankA = a.attributes.Name;
                                        var rankB = b.attributes.Name;
                                        return (rankA < rankB) ? -1 : (rankA > rankB) ? 1 : 0;
                                    }).map(country => (
                                        <option
                                            value={country.id}
                                            selected={this.editCountryId === country.id}
                                        >
                                            {country.attributes.Name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div class='form-item'>
                                <label htmlFor='region'>State/Region <span class='optional'>(Optional)</span></label>
                                <select id='region' name='region' onInput={(event) => this.handleCountrySubdivisionSelect(event)}>
                                    {this.countrySubdivisions?.sort((a,b) => {
                                        var rankA = a.attributes.Name;
                                        var rankB = b.attributes.Name;
                                        return (rankA < rankB) ? -1 : (rankA > rankB) ? 1 : 0;
                                    }).map(countrySubdivision => (
                                        <option
                                            value={countrySubdivision.id}
                                            selected={this.editCountrySubdivisionId === countrySubdivision.id}
                                        >
                                            {countrySubdivision.attributes.Name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div class='form-item'>
                                <label htmlFor="postal-code">Postal Code <span class='optional'>(Optional)</span></label>
                                <input id='postal-code' name='postal-code' type="text" value={this.editPostalCode} onInput={(e) => this.handlePostalCodeChange(e)} />
                            </div>
                            <div class="button-container">
                                { this.addressItem.id > 0 &&
                                    <icn-button type="danger" class="delete" 
                                        confirm
                                        confirmMessage="Are you sure you want to delete this address?"
                                        confirmYesText="Delete"
                                        confirmNoText="Cancel"
                                        onConfirmed={() => this.deleteConfirmed()}
                                    >
                                        Delete this address
                                    </icn-button>
                                }                                 
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

