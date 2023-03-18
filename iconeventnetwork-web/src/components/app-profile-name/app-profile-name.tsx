import { Component, Listen, Prop, State, h } from "@stencil/core";
import { DataResponse, PersonInfo, PersonSaveData, PrefixAttributes, PronounAttributes, SuffixAttributes } from '../../services/clients/client-base';
import { PrefixClient } from "../../services/clients/prefix-client";
import { SuffixClient } from "../../services/clients/suffix-client";
import { PronounClient } from "../../services/clients/pronoun-client";
import { PersonClient } from "../../services/clients/person-client";
import state from '../../services/store';

@Component({
  tag: "app-profile-name",
  styleUrl: "app-profile-name.scss",
  shadow: false
})
export class AppProfileName {
    private prefixClient: PrefixClient;
    private suffixClient: SuffixClient;
    private pronounClient: PronounClient;
    private personClient: PersonClient;
    constructor() {
        this.prefixClient = new PrefixClient();
        this.suffixClient = new SuffixClient();
        this.pronounClient = new PronounClient();
        this.personClient = new PersonClient();
    }  
    @Prop() personItem: DataResponse<PersonInfo>;
    @Prop() canEdit: boolean;
    @State() isEditing: boolean = false;
    @State() displayFirstName: string = '';
    @State() editFirstName: string = '';
    @State() displayMiddleName: string = '';
    @State() editMiddleName: string = '';
    @State() displayLastName: string = '';
    @State() editLastName: string = '';
    @State() displayDirectoryName: string = '';
    @State() editDirectoryName: string = '';
    @State() displayPreferredName: string = '';
    @State() editPreferredName: string = '';
    @State() displayPrefixName: string = '';
    @State() editPrefixName: string = '';
    @State() displayPrefixId: number = 0;
    @State() editPrefixId: number = 0;
    @State() displaySuffixName: string = '';
    @State() editSuffixName: string = '';
    @State() displaySuffixId: number = 0;
    @State() editSuffixId: number = 0;
    @State() displayPronounName: string = '';
    @State() editPronounName: string = '';
    @State() displayPronounId: number = 0;
    @State() editPronounId: number = 0;
    @State() prefixes: DataResponse<PrefixAttributes>[];
    @State() suffixes: DataResponse<SuffixAttributes>[];
    @State() pronouns: DataResponse<PronounAttributes>[];
    @Listen('editClick') editClickHandler() { 
        this.initializeEditForm();
    }
    private editForm: HTMLFormElement;
    private firstNameInput: HTMLInputElement;
    private firstNameErrorMessage: HTMLDivElement;
    private lastNameInput: HTMLInputElement;
    private lastNameErrorMessage: HTMLDivElement;
    private directoryNameInput: HTMLInputElement;
    private directoryNameErrorMessage: HTMLDivElement;

    private handleCancelClick(e: MouseEvent) {
        e.preventDefault();
        this.firstNameInput.classList.remove('invalid');
        this.firstNameErrorMessage.innerHTML = '';
        this.lastNameInput.classList.remove('invalid');
        this.lastNameErrorMessage.innerHTML = '';
        this.directoryNameInput.classList.remove('invalid');
        this.directoryNameErrorMessage.innerHTML = '';
        this.isEditing = false;
    }

    private handleSaveClick(e: MouseEvent) {
        e.preventDefault();
        this.firstNameInput.classList.remove('invalid');
        this.firstNameErrorMessage.innerHTML = '';
        this.lastNameInput.classList.remove('invalid');
        this.lastNameErrorMessage.innerHTML = '';
        this.directoryNameInput.classList.remove('invalid');
        this.directoryNameErrorMessage.innerHTML = '';
        let isValid = this.editForm.reportValidity();
        if (isValid) {
            this.saveData();
            return;
        }
        if (!this.firstNameInput.validity.valid) {
            this.firstNameInput.classList.add('invalid');
            this.firstNameErrorMessage.innerHTML = 'First (Given) Name is a required field.';
        } 
        if (!this.lastNameInput.validity.valid) {
            this.lastNameInput.classList.add('invalid');
            this.lastNameErrorMessage.innerHTML = 'Last (Family) Name is a required field.';
        } 
        if (!this.directoryNameInput.validity.valid) {
            this.directoryNameInput.classList.add('invalid');
            this.directoryNameErrorMessage.innerHTML = 'Directory Name is a required field.';
        } 
    }
    
    private handlePrefixSelect(event) {
        this.editPrefixId = event.target.value;
        this.editPrefixName = this.editPrefixId > 0 ? event.target[event.target.selectedIndex].text : '';
    }
    
    private handleSuffixSelect(event) {
        this.editSuffixId = event.target.value;
        this.editSuffixName = this.editSuffixId > 0 ? event.target[event.target.selectedIndex].text : '';
    }
    
    private handlePronounSelect(event) {
        this.editPronounId = event.target.value;
        this.editPronounName =this.editPronounId > 0 ? event.target[event.target.selectedIndex].text : '';
    }

    private handleFirstNameChange(event) {
        this.editFirstName = event.target.value;
    }

    private handleMiddleNameChange(event) {
        this.editMiddleName = event.target.value;
    }

    private handleLastNameChange(event) {
        this.editLastName = event.target.value;
    }

    private handleDirectoryNameChange(event) {
        this.editDirectoryName = event.target.value;
    }

    private handlePreferredNameChange(event) {
        this.editPreferredName = event.target.value;
    }

    private initializeEditForm() {
        this.editFirstName = this.displayFirstName;   
        this.editMiddleName = this.displayMiddleName;    
        this.editLastName = this.displayLastName; 
        this.editDirectoryName = this.displayDirectoryName;
        this.editPreferredName = this.displayPreferredName;
        this.editPrefixId = this.displayPrefixId;
        this.editPrefixName = this.displayPrefixName;
        this.editSuffixId = this.displaySuffixId;
        this.editSuffixName = this.displaySuffixName;
        this.editPronounId = this.displayPronounId;
        this.editPronounName = this.displayPronounName;
        this.isEditing = true;
    }

    private getPrefixes() {
        if (state.prefixes.length > 0) {
          this.prefixes = state.prefixes;
          return;
        }
        this.prefixClient.getPrefixes({
            fields: ['Name', 'Rank'],
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
            this.prefixes = response.data;
            const selectTitle =  
                { 
                    id: 0,
                    attributes: {
                        Name: 'Select a title',
                        Rank: -1,
                    }
                };
            this.prefixes.unshift(selectTitle);
            state.prefixes = this.prefixes;
        })
        .catch(reason => console.error(reason));  
    }

    private getSuffixes() {
        if (state.suffixes.length > 0) {
            this.suffixes = state.suffixes;
            return;
        }
        this.suffixClient.getSuffixes({
            fields: ['Name', 'Rank'],
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
            this.suffixes = response.data;
            const selectSuffix = 
                { 
                    id: 0,
                    attributes: {
                        Name: 'Select a suffix',
                        Rank: -1,
                    }
                };
            this.suffixes.unshift(selectSuffix);
            state.suffixes = this.suffixes;
        })
        .catch(reason => console.error(reason));  
    }

    private getPronouns() {
        if (state.pronouns.length > 0) {
            this.pronouns = state.pronouns;
            return;
        }
        this.pronounClient.getPronouns({
            fields: ['Name', 'Rank'],
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
            this.pronouns = response.data;
            const selectPronoun =  
                { 
                    id: 0,
                    attributes: {
                        Name: 'Select your pronouns',
                        Rank: -1,
                    }
                };
            this.pronouns.unshift(selectPronoun);
            state.pronouns = this.pronouns;
        })
        .catch(reason => console.error(reason));  
    }

    private saveData() {
        let personSaveData: PersonSaveData = {
            data: {
                FirstName: this.displayFirstName??'',
                MiddleName: this.displayMiddleName??'',
                LastName: this.displayLastName??'',
                DirectoryName: this.displayDirectoryName??'',
                PreferredName: this.displayPreferredName??'',
                prefix: { },
                Suffix: { },
                Pronoun: { },
            }
        };
        if (this.editFirstName?.trim() != this.displayFirstName) {
            personSaveData.data.FirstName = this.editFirstName.trim();
        }
        if (this.editMiddleName?.trim() != this.displayMiddleName) {
            personSaveData.data.MiddleName = this.editMiddleName.trim();
        }
        if (this.editLastName?.trim() != this.displayLastName) {
            personSaveData.data.LastName = this.editLastName.trim();
        }
        if (this.editDirectoryName?.trim() != this.displayDirectoryName) {
            personSaveData.data.DirectoryName = this.editDirectoryName.trim();
        }
        if (this.editPreferredName?.trim() != this.displayPreferredName) {
            personSaveData.data.PreferredName = this.editPreferredName.trim();
        }
        if (this.editPrefixId != this.displayPrefixId) {
            if (this.displayPrefixId > 0) personSaveData.data.prefix.disconnect = [{id: this.displayPrefixId}];
            if (this.editPrefixId > 0) personSaveData.data.prefix.connect = [{id: this.editPrefixId}];
        } 
        if (this.editSuffixId != this.displaySuffixId) {
            if (this.displaySuffixId > 0) personSaveData.data.Suffix.disconnect = [{id: this.displaySuffixId}];
            if (this.editSuffixId > 0) personSaveData.data.Suffix.connect = [{id: this.editSuffixId}];
        } 
        if (this.editPronounId != this.displayPronounId) {
            if (this.displayPronounId > 0) personSaveData.data.Pronoun.disconnect = [{id: this.displayPronounId}];
            if (this.editPronounId > 0) personSaveData.data.Pronoun.connect = [{id: this.editPronounId}];
        } 
        this.personClient.updatePerson(this.personItem.id, personSaveData)
        .then(() => {
            this.isEditing = false;
            this.displayFirstName = this.editFirstName;
            this.displayMiddleName = this.editMiddleName;
            this.displayLastName = this.editLastName;
            this.displayDirectoryName = this.editPreferredName;
            this.displayPreferredName = this.editPreferredName;
            this.displayPrefixId = this.editPrefixId;
            this.displayPrefixName = this.editPrefixName;
            this.displaySuffixId = this.editSuffixId;
            this.displaySuffixName = this.editSuffixName;
            this.displayPronounId = this.editPronounId;
            this.displayPronounName = this.editPronounName;
        })
        .catch(reason => {
            this.lastNameErrorMessage.innerHTML = reason.error.message;
        });
    }
        
    componentWillLoad() {
        this.displayFirstName = this.personItem?.attributes?.FirstName??'';
        this.displayMiddleName = this.personItem?.attributes?.MiddleName??'';
        this.displayLastName = this.personItem?.attributes?.LastName??'';
        this.displayDirectoryName = this.personItem?.attributes?.DirectoryName??'';
        this.displayPreferredName = this.personItem?.attributes?.PreferredName??'';
        this.displayPrefixId = this.personItem?.attributes?.prefix?.data?.id??0;
        this.displayPrefixName = this.personItem?.attributes?.prefix?.data?.attributes?.Name??'';
        this.displaySuffixId = this.personItem?.attributes?.Suffix?.data?.id??0;
        this.displaySuffixName = this.personItem?.attributes?.Suffix?.data?.attributes?.Name??'';
        this.displayPronounId = this.personItem?.attributes?.Pronoun?.data?.id??0;
        this.displayPronounName = this.personItem?.attributes?.Pronoun.data?.attributes?.Name??'';
        this.getPrefixes();
        this.getSuffixes();
        this.getPronouns();
    } 

    render() {
        return (
            <div>
                <div class='profile-item-row'>
                    {!this.isEditing && 
                        <div class='value'>
                            { this.displayPrefixName ? this.displayPrefixName + ' ' : '' } 
                            { this.displayFirstName ? this.displayFirstName + ' ' : '' }                                
                            { this.displayMiddleName ? this.displayMiddleName + ' ' : '' }                                
                            { this.displayLastName ? this.displayLastName + ' ' : '' }
                            { this.displaySuffixName ? this.displaySuffixName + ' ' : '' }                                
                            <span class='pronouns'>{this.displayPronounName ? '(' + this.displayPronounName + ')' : ''}</span>
                        </div>
                    }
                    {!this.isEditing && this.canEdit &&
                        <icn-profile-actions deleteDisabled />
                    }                    
                    {this.isEditing &&
                        <form ref={el => this.editForm = el} class='edit-form' >
                            <div class='form-item'>
                                <label htmlFor='prefix'>Title <span class='optional'>(Optional)</span></label>
                                <select id='prefix-type' name='prefix-type' onInput={(event) => this.handlePrefixSelect(event)}>
                                    {this.prefixes?.sort((a,b) => {
                                        var rankA = a.attributes.Rank;
                                        var rankB = b.attributes.Rank;
                                        return (rankA < rankB) ? -1 : (rankA > rankB) ? 1 : 0;
                                    }).map(prefix => (
                                        <option
                                            value={prefix.id}
                                            selected={this.editPrefixId === prefix.id}
                                        >
                                            {prefix.attributes.Name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div class='form-item'>
                                <label htmlFor="first-name">First (Given) Name</label>
                                <input id='first-name' name='first-name' type="text" required maxLength={50} ref={el => this.firstNameInput = el} value={this.editFirstName} onInput={(e) => this.handleFirstNameChange(e)} />
                                <div ref={el => this.firstNameErrorMessage = el} class='form-error-message'></div>
                            </div>
                            <div class='form-item'>
                                <label htmlFor="middle-name">Middle Name <span class='optional'>(Optional)</span></label>
                                <input id='middle-name' name='middle-name' type="text" maxLength={50} value={this.editMiddleName} onInput={(e) => this.handleMiddleNameChange(e)} />
                            </div>
                            <div class='form-item'>
                                <label htmlFor="last-name">Last (Family) Name</label>
                                <input id='last-name' name='last-name' type="text" required maxLength={50} ref={el => this.lastNameInput = el} value={this.editLastName} onInput={(e) => this.handleLastNameChange(e)} />
                                <div ref={el => this.lastNameErrorMessage = el} class='form-error-message'></div>
                            </div>
                            <div class='form-item'>
                                <label htmlFor="directory-name">Directory Name</label>
                                <input id='directory-name' name='directory-name' type="text" required maxLength={50} ref={el => this.directoryNameInput = el} value={this.editDirectoryName} onInput={(e) => this.handleDirectoryNameChange(e)} />
                                <div class='form-helper-text'>This is how your name will be displayed in the Directory</div>
                                <div ref={el => this.directoryNameErrorMessage = el} class='form-error-message'></div>
                            </div>
                            <div class='form-item'>
                                <label htmlFor="preferred-name">Preferred Name <span class='optional'>(Optional)</span></label>
                                <input id='preferred-name' name='preferred-name' type="text" maxLength={50} value={this.editPreferredName} onInput={(e) => this.handlePreferredNameChange(e)} />
                                <div class='form-helper-text'>This is how your name will be displayed on a conference badge</div>
                            </div>
                            <div class='form-item'>
                                <label htmlFor='suffix'>Suffix <span class='optional'>(Optional)</span></label>
                                <select id='suffix' name='suffix' onInput={(event) => this.handleSuffixSelect(event)}>
                                    {this.suffixes?.sort((a,b) => {
                                        var rankA = a.attributes.Rank;
                                        var rankB = b.attributes.Rank;
                                        return (rankA < rankB) ? -1 : (rankA > rankB) ? 1 : 0;
                                    }).map(suffix => (
                                        <option
                                            value={suffix.id}
                                            selected={this.editSuffixId === suffix.id}
                                        >
                                            {suffix.attributes.Name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div class='form-item'>
                                <label htmlFor='pronouns'>Pronouns <span class='optional'>(Optional)</span></label>
                                <select id='pronouns' name='pronouns' onInput={(event) => this.handlePronounSelect(event)}>
                                    {this.pronouns?.sort((a,b) => {
                                        var rankA = a.attributes.Rank;
                                        var rankB = b.attributes.Rank;
                                        return (rankA < rankB) ? -1 : (rankA > rankB) ? 1 : 0;
                                    }).map(pronoun => (
                                        <option
                                            value={pronoun.id}
                                            selected={this.editPronounId === pronoun.id}
                                        >
                                            {pronoun.attributes.Name}
                                        </option>
                                    ))}
                                </select>
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

