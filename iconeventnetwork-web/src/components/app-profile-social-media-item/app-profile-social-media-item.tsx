import { Component, Event, EventEmitter, Listen, Prop, State, h } from "@stencil/core";
import { CompanySaveData, DataResponse, SocialMediaAttributes, SocialMediaSaveData, SocialMediaTypeAttributes } from '../../services/clients/client-base';
import { SocialMediaClient } from "../../services/clients/social-media-client";
import { SocialMediaTypeClient } from "../../services/clients/social-media-type-client";
import { CompanyClient } from "../../services/clients/company-client";
import state from '../../services/store';

@Component({
    tag: "app-profile-social-media-item",
    styleUrl: "app-profile-social-media-item.scss",
    shadow: false,
    scoped: true,
})
export class AppProfileSocialMediaItem {
    private socialMediaClient: SocialMediaClient;
    private socialMediaTypeClient: SocialMediaTypeClient;
    private companyClient: CompanyClient;
    constructor() {
        this.socialMediaClient = new SocialMediaClient();
        this.socialMediaTypeClient = new SocialMediaTypeClient();
        this.companyClient = new CompanyClient();
    }  
    @Prop() socialMediaItem: DataResponse<SocialMediaAttributes>;
    @Prop() canEdit: boolean;
    @State() isEditing: boolean = false;
    @Prop() companyId: number;
    @State() displayName: string = '';
    @State() editName: string = '';
    @State() displayURL: string = '';
    @State() editURL: string = '';
    @State() displaySocialMediaTypeId: number = 0;
    @State() editSocialMediaTypeId: number = 0;
    @State() displaySocialMediaTypeName: string = '';
    @State() editSocialMediaTypeName: string = '';
    @State() editSocialMediaTypeBaseURL: string = '';
    @State() socialMediaTypes: DataResponse<SocialMediaTypeAttributes>[];
    @Event() private socialMediaDeleted: EventEmitter<number>;
    private editForm: HTMLFormElement;
    private nameInput: HTMLInputElement;
    private nameErrorMessage: HTMLIcnMessageElement;
    
    private deleteItem() {
        this.resetFormErrors();
        this.isEditing = false; 
        let companySaveData: CompanySaveData = {
            data: {
                SocialMediaAccounts: { 
                    disconnect: [{id: this.socialMediaItem.id}],
                },
            }
        };
        this.companyClient.updateCompany(this.companyId, companySaveData)
        .then(() => { })
        .catch(reason => console.error(reason));                
        this.socialMediaClient.deleteSocialMedia(this.socialMediaItem.id)    
        .then(() => {})
        .catch(reason => console.error(reason));
        this.socialMediaDeleted.emit(this.socialMediaItem.id);
        return;     
    }

    @Listen('emailAddressAdded') emailAddressAddedHandler(event: CustomEvent<number>) {
        if (this.socialMediaItem.id == event.detail) {
            this.isEditing = true;
        }
    }
    @Listen('editClick') editClickHandler() {  
        this.initializeEditForm();
    }

    private handleCancelClick(e: MouseEvent) {
        e.preventDefault();
        this.resetFormErrors();
        this.isEditing = false;
        if (this.socialMediaItem.id === 0) {
            this.socialMediaDeleted.emit(this.socialMediaItem.id);
        }
    }

    private handleSaveClick(e: MouseEvent) {
        e.preventDefault();
        this.resetFormErrors();
        let isValid = this.editForm.reportValidity();
        if (isValid) {
            this.saveData();
            return;
        }
        if (!this.nameInput.validity.valid) {
            this.nameInput.classList.add('invalid');
            this.nameErrorMessage.show();
        }
    }
    
    private handleSocialMediaTypeSelect(event) {
        this.editSocialMediaTypeId = event.target.value;
        this.editSocialMediaTypeName = event.target[event.target.selectedIndex].text;
        const selectedSocialMediaType = this.socialMediaTypes.find(t => {
            return t.id == this.editSocialMediaTypeId
        });
        this.editSocialMediaTypeBaseURL = selectedSocialMediaType?.attributes?.BaseURL??'';
        this.editURL = this.editSocialMediaTypeBaseURL + this.editName;
    }

    private handleNameChange(event) {
        this.nameInput.classList.remove('invalid');
        this.nameErrorMessage.hide();
        this.editName = event.target.value;
        this.editURL = this.editSocialMediaTypeBaseURL + this.editName;
    }

    private initializeDefaultSocialMediaType() {
        const defaultSocialMediaType = this.socialMediaTypes?.sort((a,b) => {
            var rankA = a.attributes.Rank;
            var rankB = b.attributes.Rank;
            return (rankA < rankB) ? -1 : (rankA > rankB) ? 1 : 0;
        })[0];
        this.editSocialMediaTypeId = defaultSocialMediaType.id;
        this.displaySocialMediaTypeId = defaultSocialMediaType.id;
        this.editSocialMediaTypeName = defaultSocialMediaType.attributes.Name;
        this.displaySocialMediaTypeName = defaultSocialMediaType.attributes.Name;
    }

    private initializeEditForm() {
        this.editName = this.displayName;
        this.editURL = this.displayURL;
        this.editSocialMediaTypeId = this.displaySocialMediaTypeId;
        this.editSocialMediaTypeName = this.displaySocialMediaTypeName;
        const selectedSocialMediaType = this.socialMediaTypes.find(t => {
            return t.id == this.editSocialMediaTypeId
        });
        this.editSocialMediaTypeBaseURL = selectedSocialMediaType?.attributes?.BaseURL??'';
        this.isEditing = true;
    }

    private getSocialMediaTypes() {
        if (state.socialMediaTypes.length > 0) {
          this.socialMediaTypes = state.socialMediaTypes;
          if (this.socialMediaItem.id === 0) {
              this.initializeDefaultSocialMediaType();
              this.initializeEditForm();
          }
          return;
        }
        this.socialMediaTypeClient.getSocialMediaTypes({
            fields: ['Name', 'Rank', 'BaseURL'],
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
            this.socialMediaTypes = response.data;
            state.socialMediaTypes = response.data;
            if (this.socialMediaItem.id === 0) {
                this.initializeDefaultSocialMediaType();
                this.initializeEditForm();
            }
        })
        .catch(reason => console.error(reason));  
    }

    private resetFormErrors() {
        this.nameInput.classList.remove('invalid');
        this.nameErrorMessage.hide();
    }

    private saveData() {
        let socialMediaSaveData: SocialMediaSaveData = {
            data: {
                Name: this.socialMediaItem.attributes.Name,
                URL: this.socialMediaItem.attributes.URL,
                social_media_type: { },
            }
        };
        if (this.editName.trim() != this.displayName) {
            socialMediaSaveData.data.Name = this.editName.trim();
        }
        if (this.editURL.trim() != this.displayURL) {
            socialMediaSaveData.data.URL = this.editURL.trim();
        }
        if (this.socialMediaItem.id > 0)  {
            if (this.editSocialMediaTypeId != this.displaySocialMediaTypeId) {
                socialMediaSaveData.data.social_media_type.disconnect = [{id: this.displaySocialMediaTypeId}];
                socialMediaSaveData.data.social_media_type.connect = [{id: this.editSocialMediaTypeId}];
            } 
            this.socialMediaClient.updateSocialMedia(this.socialMediaItem.id, socialMediaSaveData)
            .then(() => {
                this.isEditing = false;
                this.displayName = this.editName;
                this.displayURL = this.editURL;
                this.displaySocialMediaTypeId = this.editSocialMediaTypeId;
                this.displaySocialMediaTypeName = this.editSocialMediaTypeName;
            })
            .catch(reason => {
                console.log(reason.error.message);
            });
            return;  
        }
        if (this.socialMediaItem.id === 0) {
            socialMediaSaveData.data.social_media_type.connect = [{id: this.editSocialMediaTypeId}];
            this.socialMediaClient.addSocialMedia(socialMediaSaveData)
            .then((result) => {
                this.isEditing = false;
                this.socialMediaItem.id = result.data.id;
                this.displayName = this.editName;
                this.displayURL = this.editURL;
                this.displaySocialMediaTypeId = this.editSocialMediaTypeId;
                this.displaySocialMediaTypeName = this.editSocialMediaTypeName;
                let companySaveData: CompanySaveData = {
                    data: {
                        SocialMediaAccounts: { 
                            connect: [{id: this.socialMediaItem.id}],
                        },
                    }
                };
                this.companyClient.updateCompany(this.companyId, companySaveData)
                    .then(() => { })
                    .catch(reason => console.error(reason));                

            })
            .catch(reason => {
                console.log(reason.error.message);
            });
            return;  
        }   
    }
        
    componentWillLoad() {
        this.displayName = this.socialMediaItem.attributes.Name;
        this.displayURL = this.socialMediaItem.attributes.URL;
        this.displaySocialMediaTypeId = this.socialMediaItem.attributes.social_media_type.data.id;
        this.displaySocialMediaTypeName = this.socialMediaItem.attributes.social_media_type.data.attributes.Name;
        this.getSocialMediaTypes();
    } 

    render() {
        return (
            <div>
                <div class='content-row'>
                    { !this.isEditing && 
                        <div class='content-value'>
                            <div class='sub-content'>
                                <div class='sub-content-label'>
                                    {this.displaySocialMediaTypeName}
                                </div>
                                <div class='sub-content-value'>
                                    <div>
                                        {this.displayName}
                                        <a class='external-link-icon' target='_blank' href={this.socialMediaItem.attributes.URL}><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                                    </div>
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
                                <label htmlFor='social-media-type'>Platform</label>
                                <select id='social-media-type' name='social-media-type' onInput={(event) => this.handleSocialMediaTypeSelect(event)}>
                                    {this.socialMediaTypes?.sort((a,b) => {
                                        var rankA = a.attributes.Rank;
                                        var rankB = b.attributes.Rank;
                                        return (rankA < rankB) ? -1 : (rankA > rankB) ? 1 : 0;
                                    }).map(socialMediaType => (
                                        <option
                                            value={socialMediaType.id}
                                            selected={this.editSocialMediaTypeId === socialMediaType.id}
                                        >
                                            {socialMediaType.attributes.Name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div class='form-item'>
                                <label htmlFor="name">Username</label>
                                <input id='name' name='name' required maxLength={50} ref={el => this.nameInput = el} type="text" value={this.editName} onInput={(e) => this.handleNameChange(e)} />
                                <icn-message type='error' hidden ref={el => this.nameErrorMessage = el}>
                                    Name is a required field.
                                </icn-message>
                            </div>
                            <div class='form-item'>
                                <label htmlFor="url">Address <span class='optional'>(generated based on platform and username)</span></label>
                                <input id='url' name='url' disabled type="text" value={this.editURL} />
                            </div>
                            <div class="button-container">
                                { this.socialMediaItem.id > 0 &&
                                    <icn-button class='delete' type="danger"
                                        confirmMessage="Are you sure you want to delete this social media account?"
                                        confirmYesText="Delete"
                                        confirmNoText="Cancel"
                                        onConfirmed={() => this.deleteItem()}
                                    >
                                        Delete this social media account
                                    </icn-button>
                                }                       
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

