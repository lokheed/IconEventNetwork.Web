import { Component, Listen, Prop, State, h } from "@stencil/core";
import { DataResponse, LanguageAttributes, PersonSaveData } from '../../services/clients/client-base';
import { LanguageClient } from "../../services/clients/language-client";
import { PersonClient } from "../../services/clients/person-client";
import state from '../../services/store';


@Component({
  tag: "app-profile-preferred-language",
  styleUrl: "app-profile-preferred-language.scss",
  shadow: false
})
export class AppProfilePreferredLanguage {
    private personClient: PersonClient;
    private languageClient: LanguageClient;
    constructor() {
        this.personClient = new PersonClient();
        this.languageClient = new LanguageClient();
    }  
    @Prop() languageItem: DataResponse<LanguageAttributes>;
    @Prop() canEdit: boolean;
    @Prop() personId: number;
    @State() isEditing: boolean = false;
    @State() displayLanguageId: number = 0;
    @State() editLanguageId: number = 0;
    @State() displayLanguageName: string = '';
    @State() editLanguageName: string = '';
    @State() languages: DataResponse<LanguageAttributes>[];
    @Listen('editClick') editClickHandler() { 
        this.initializeEditForm();
    }
    private handleLanguageSelect(event) {
        this.editLanguageId = event.target.value;
        this.editLanguageName = event.target[event.target.selectedIndex].text;
    }

    private handleCancelClick(e: MouseEvent) {
        e.preventDefault();
        this.isEditing = false;
    }

    private handleSaveClick(e: MouseEvent) {
        e.preventDefault();
        this.saveData();
    }

    private getLanguages() {
        if (state.languages.length > 0) {
          this.languages = state.languages;
           return;
        }
        this.languageClient.getLanguages({
            fields: ['EnglishName', 'A2'],
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
            this.languages = response.data;
            state.languages = response.data;
        })
        .catch(reason => console.error(reason));  
    }

    private initializeEditForm() {     
        if (this.displayLanguageId === 0) {
            const defaultLanguage = this.languages.filter(language => language.attributes.A2 == 'en' )[0];
            this.editLanguageId = defaultLanguage.id;
            this.editLanguageName = defaultLanguage.attributes.EnglishName;
        } else {
            this.editLanguageId = this.displayLanguageId;
            this.editLanguageName = this.displayLanguageName;    
        }
        this.isEditing = true;
    }

    private saveData() {
        let personSaveData: PersonSaveData = {
            data: {
                PreferredLanguage: { },
            }
        };
        if (this.editLanguageId != this.displayLanguageId) {
            personSaveData.data.PreferredLanguage.disconnect = this.displayLanguageId == 0 ? [] : [{id: this.displayLanguageId}];
            personSaveData.data.PreferredLanguage.connect = this.editLanguageId == 0 ? [] : [{id: this.editLanguageId}];
        } 
        this.personClient.updatePerson(this.personId, personSaveData)
        .then(() => {
            this.isEditing = false;
            this.displayLanguageId = this.editLanguageId
            this.displayLanguageName = this.editLanguageName;
        })
        .catch(reason => {
            console.log(reason.error.message);
        });
    }
        
    componentWillLoad() { 
        this.displayLanguageId = this.languageItem?.id??0;
        this.displayLanguageName = this.languageItem?.attributes?.EnglishName??'(none specified)';
        this.getLanguages();
    } 

    render() {
        return (
            <div>
                <div class='content-row'>
                    { !this.isEditing &&
                        <div class='content-value'>
                            {this.displayLanguageName}
                        </div>                   
                    }
                    { !this.isEditing && this.canEdit &&
                        <icn-profile-actions deleteDisabled />                                    
                    }
                    { this.isEditing &&
                        <form class='edit-form' >
                            <div class='form-item'>
                                <label htmlFor="preferred-language">Preferred Language</label>
                                <select id='preferred-language' name='preferred-language' onInput={(event) => this.handleLanguageSelect(event)}>
                                    {this.languages?.sort((a,b) => {
                                        var rankA = a.attributes.Rank;
                                        var rankB = b.attributes.Rank;
                                        return (rankA < rankB) ? -1 : (rankA > rankB) ? 1 : 0;
                                    }).map(language => (
                                        <option
                                            value={language.id}
                                            selected={this.editLanguageId === language.id}
                                        >
                                            {language.attributes.EnglishName}
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