import { Component, Listen, Prop, State, h } from "@stencil/core";
import { DataResponse, LanguageAttributes, PersonSaveData } from '../../services/clients/client-base';
import { LanguageClient } from "../../services/clients/language-client";
import { PersonClient } from "../../services/clients/person-client";
import state from '../../services/store';


@Component({
  tag: "app-profile-languages-spoken",
  styleUrl: "app-profile-languages-spoken.scss",
  shadow: false,
  scoped: true,
})
export class AppProfileLanguagesSpoken {
    private personClient: PersonClient;
    private languageClient: LanguageClient;
    constructor() {
        this.personClient = new PersonClient();
        this.languageClient = new LanguageClient();
    }  
    @Prop() languagesSpoken: DataResponse<LanguageAttributes>[];
    @Prop() canEdit: boolean;
    @Prop() personId: number;
    @State() isEditing: boolean = false;
    @State() allLanguages: DataResponse<LanguageAttributes>[]=[];
    @State() displayLanguages: DataResponse<LanguageAttributes>[]=[];
    @State() editLanguages: DataResponse<LanguageAttributes>[]=[];
    @State() unusedLanguages: DataResponse<LanguageAttributes>[]=[];
    @State() disconnectLanguages: DataResponse<LanguageAttributes>[]=[];
    @State() connectLanguages: DataResponse<LanguageAttributes>[]=[];
    @Listen('editClick') editClickHandler() { 
        this.initializeEditForm();
    }
    private languageSelect: HTMLSelectElement;

    private handleLanguageSelect(event) {
        const languageId = event.target.value;
        if (languageId > 0) {
            this.unusedLanguages = [...this.unusedLanguages.filter(language => language.id != languageId)];
            const selectedLanguage = this.allLanguages.find(language => language.id == languageId);
            this.editLanguages.push(selectedLanguage);
            if (!this.displayLanguages.find(language => language.id == languageId)) this.connectLanguages.push(selectedLanguage);
            this.languageSelect.selectedIndex = 0;
        }
    }

    private handleCancelClick(e: MouseEvent) {
        e.preventDefault();
        this.isEditing = false;
    }

    private initializeEditForm() {
        this.editLanguages = [...this.displayLanguages];
        const filterLanguages = [...this.editLanguages];
        let filteredLanguages = this.allLanguages.filter(l => filterLanguages.every(s => l.id !== s.id)) ;
        const selectLanguage =  
                { 
                    id: 0,
                    attributes: {
                        EnglishName: 'Select language',
                        Rank: -1,
                    }
                };
        filteredLanguages.unshift(selectLanguage);
        this.unusedLanguages = filteredLanguages;
        this.isEditing = true;
    }

    private handleRemoveSpokenLanguageClick(e: MouseEvent, languageId) {
        e.preventDefault();
        this.editLanguages = [...this.editLanguages.filter(l => l.id != languageId)];
        const selectedLanguage = this.allLanguages.find(language => language.id == languageId);
        let newUnusedLanguages = [...this.unusedLanguages]
        newUnusedLanguages.push(selectedLanguage);
        this.unusedLanguages = newUnusedLanguages;
        if (this.displayLanguages.find(language => language.id == languageId)) this.disconnectLanguages.push(selectedLanguage);
        this.connectLanguages = [...this.connectLanguages.filter(l => l.id != languageId)];
    }

    private handleSaveClick(e: MouseEvent) {
        e.preventDefault();
        this.saveData();
    }

    private getLanguages() {
        if (state.languages.length > 0) {
          this.allLanguages = state.languages;
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
            this.allLanguages = response.data;
            state.languages = response.data;
        })
        .catch(reason => console.error(reason));  
    }

    private saveData() {
        const disconnectIds = this.disconnectLanguages.length > 0 
            ? this.disconnectLanguages.map(language => {
                const container = {id: 0};
                container.id = language.id;
                return container;
              }) 
            : [];
        const connectIds = this.connectLanguages.length > 0 
            ? this.connectLanguages.map(language => {
                const container = {id: 0};
                container.id = language.id;
                return container;
              }) 
            : [];
        let personSaveData: PersonSaveData = {
            data: {
                LanguagesSpoken: { 
                    disconnect: disconnectIds,
                    connect: connectIds,
                },
            }
        }; 
        this.personClient.updatePerson(this.personId, personSaveData)
        .then(() => {
            this.displayLanguages = [...this.editLanguages];
            this.isEditing = false;
        })
        .catch(reason => {
            console.log(reason.error.message);
        });
    }
        
    componentWillLoad() { 
        this.getLanguages();
        this.displayLanguages = this.languagesSpoken;
    } 

    render() {
        return (
            <div>
                <div class='content-row'>
                    { !this.isEditing &&
                        <div class='content-value list'>
                            {this.displayLanguages?.sort((a,b) => {
                                        var rankA = a.attributes.EnglishName;
                                        var rankB = b.attributes.EnglishName;
                                        return (rankA < rankB) ? -1 : (rankA > rankB) ? 1 : 0;
                                    }).map(language => (
                                <div class='displayed-language'>
                                    {language.attributes.EnglishName}
                                </div>
                            ))}
                        </div>                   
                    }
                    { !this.isEditing && this.displayLanguages.length === 0 &&
                        <div>(None Selected)</div>
                    }
                    { !this.isEditing && this.canEdit &&
                        <icn-profile-actions deleteDisabled />                                  
                    }
                    { this.isEditing &&
                        <form class='edit-form' >
                            <div class='form-item'>
                                <label htmlFor="languages">Languages</label>
                                <select id='languages' name='languages' ref={el => this.languageSelect = el} onInput={(event) => this.handleLanguageSelect(event)}>
                                    {this.unusedLanguages?.sort((a,b) => {
                                        var rankA = a.attributes.Rank;
                                        var rankB = b.attributes.Rank;
                                        return (rankA < rankB) ? -1 : (rankA > rankB) ? 1 : 0;
                                    }).map(language => (
                                        <option
                                            value={language.id}
                                        >
                                            {language.attributes.EnglishName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div class='form-item'>
                                <ol class='language-list'>
                                    {this.editLanguages?.sort((a,b) => {
                                                var rankA = a.attributes.EnglishName;
                                                var rankB = b.attributes.EnglishName;
                                                return (rankA < rankB) ? -1 : (rankA > rankB) ? 1 : 0;
                                            }).map(language => (
                                        <li>
                                            <div class='edit-language-container'>
                                                <div class='edit-language-name'>
                                                    {language.attributes.EnglishName}
                                                </div>
                                                <div class='edit-language-action'>
                                                    <button onClick={e => this.handleRemoveSpokenLanguageClick(e, language.id)}>
                                                        <i class="fa-solid fa-xmark"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
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