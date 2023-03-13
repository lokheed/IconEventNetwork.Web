import { Component, Listen, Prop, State, h } from "@stencil/core";
import { DataResponse, ImageFormatInfo, ImageInfo, PersonInfo, PersonSaveData } from '../../services/clients/client-base';
import { PersonClient } from '../../services/clients/person-client';
import { UploadClient } from "../../services/clients/upload-client";
import { ProfileImageDisc } from '../functionalComponents/ProfileImageDisc';
import { localStorageKeyService } from '../../services/local-storage-key-service';

@Component({
  tag: "app-profile-picture",
  styleUrl: "app-profile-picture.scss",
  shadow: false
})
export class AppProfilePicture {
    private readonly personClient: PersonClient;
    private readonly uploadClient: UploadClient;
    private deleteConfirmationDialog: HTMLAppConfirmationElement;
    private deleteButton: HTMLButtonElement;
    private imageInput: HTMLInputElement;
    private errorDiv: HTMLDivElement;
    private maxImageSize: number = 5 * 1024 * 1024; // 5 MB
    private fileReader: FileReader;
    constructor(){
      this.personClient = new PersonClient();
      this.uploadClient = new UploadClient();
      this.fileReader = new FileReader();
      this.fileReader.onload = (e) => {
          this.editImageUrl = e.target.result.toString();
      }
    }  
    @Prop() personItem: DataResponse<PersonInfo>;
    @State() isEditing: boolean = false;
    @State() displayImage: ImageInfo;
    @State() editImageUrl: string;
    @Listen('primaryConfirmationClick') primaryDeleteConfirmationClickHandler() {
        this.deleteConfirmationDialog.visible = false;         
        this.uploadClient.destroy(this.displayImage.data.id);
        let personSaveData: PersonSaveData = {
            data: {
                ProfileImage: null,
            }
        };
        this.personClient.updatePerson(this.personItem.id, personSaveData)
        .then(() => {
            sessionStorage.removeItem(localStorageKeyService.Me);
            this.isEditing = false;
            let updatedImage = JSON.parse(JSON.stringify(this.displayImage));
            updatedImage.data = null;
            this.displayImage = updatedImage;
            this.deleteButton.classList.add('disabled');
            window.location.replace('/profile-person'); // needed to refresh profile image in navigation
        });
    }
    @Listen('secondaryConfirmationClick') secondaryDeleteConfirmationClickHandler() {
        this.deleteConfirmationDialog.visible = false;
    }

    private handleCancelClick(e: MouseEvent) {
        e.preventDefault();
        this.isEditing = false;
    }

    private handleDeleteClick(e: MouseEvent) {
        e.preventDefault();
        if (!this.displayImage.data) return;
        this.deleteConfirmationDialog.visible = true;
    }

    private handleEditClick(e: MouseEvent) {
        e.preventDefault();
        if (this.displayImage?.data?.attributes?.formats) {
            let entries = Object.entries(this.displayImage.data.attributes.formats) as [string, ImageFormatInfo][];
            let sortedEntries = entries.sort((a, b) => a[1].width - b[1].width);
            let entry = sortedEntries.find(e => e[1].width >= 125);
            this.editImageUrl = entry[1].url;
        }
        this.isEditing = true;
    }

    private handleSaveClick(e: MouseEvent) {
        e.preventDefault();
        if (this.imageInput.files.length === 0) {
            this.errorDiv.innerHTML = 'ERROR: You must select a profile image.';
            this.errorDiv.classList.remove('hidden');
            return;
        } 
        this.saveData();
    } 

    private handleImageSelect() {
        this.errorDiv.classList.add('hidden');
        if (this.imageInput.files.length === 0) return;
        const newImage = this.imageInput.files[0];
        if (newImage.size > this.maxImageSize) {
            this.errorDiv.innerHTML = 'ERROR: Image must be less than 5 MB.';
            this.errorDiv.classList.remove('hidden');
            return;
        }
        this.fileReader.readAsDataURL(newImage);

    } 

    private saveData() {
        this.uploadClient.upload(this.imageInput.files[0])
        .then((response) => {
            const newImage: ImageInfo = {
                data: {
                    id: response[0].id,
                    attributes: {
                        formats: response[0].formats,
                        alternativeText: '',
                        url: ''
                    }
                }
            }
            this.deleteButton.classList.remove('disabled');
            const formerImageId = this.displayImage.data?.id??0; 
            if (formerImageId > 0) this.uploadClient.destroy(formerImageId);
            this.displayImage = newImage;            
            let personSaveData: PersonSaveData = {
                data: {
                    ProfileImage: this.displayImage.data.id,
                }
            };
            this.personClient.updatePerson(this.personItem.id, personSaveData)
            .then(() => {
                sessionStorage.removeItem(localStorageKeyService.Me);
                window.location.replace('/profile-person'); // needed to refresh profile image in navigation
            });
        });
        this.isEditing = false;
    }
        
    componentWillLoad() {
        this.displayImage = this.personItem?.attributes?.ProfileImage;
    } 

    componentDidLoad() {
        if (!this.displayImage.data) {
            this.deleteButton.classList.add('disabled');
        }
    }

    render() {
        return (
            <div>
                <div class='profile-item-row'>
                    { !this.isEditing &&
                        <div class='value'>
                            <ProfileImageDisc profileImage={this.displayImage} firstName={this.personItem?.attributes?.FirstName} lastName={this.personItem?.attributes?.LastName} />
                        </div>                   
                    }
                    { !this.isEditing && 
                        <div class='actions'>
                            <button class='action' onClick={e => this.handleEditClick(e)}>
                                <i class="fa-solid fa-pen blue"></i>&nbsp;<span class='action-link primary'>Edit</span>
                            </button>
                            <button class='action' ref={el => this.deleteButton = el} onClick={e => this.handleDeleteClick(e)}>
                                <i class="fa-solid fa-trash-can brick-red"></i>&nbsp;<span class='action-link secondary'>Delete</span>
                            </button>                                       
                        </div>                    
                    }
                    { this.isEditing &&
                        <form class='edit-form' >
                            <div class='form-item'>
                                <div class='profile-image'>
                                    <img src={this.editImageUrl} />
                                </div>
                                <div class='instructions'>
                                    <div class='direction'>
                                        The profile picture must be a recent headshot of you.
                                    </div>
                                    <div class='file-type'>
                                        File types accepted: .jpg, .jpeg, and .png
                                    </div>
                                    <div class='file-size'>
                                        Max file size: 5 MB
                                    </div>
                                    <div class='action'>
                                        <input type='file' class='file-select' accept="image/jpeg, image/png" ref={el => this.imageInput = el} onChange={() => this.handleImageSelect()} />
                                    </div>
                                    <div class='error hidden' ref={el => this.errorDiv = el}>
                                        ERROR: Image must be less than 5 MB.
                                    </div>
                                </div>                            
                            </div>
                            <div class="button-container">
                                <button class="secondary-action" onClick={e => this.handleCancelClick(e)}>Cancel</button>
                                <button class="primary-action" onClick={e => this.handleSaveClick(e)}>Save</button>
                            </div>                        
                        </form>
                    }
                </div>
                <app-confirmation ref={el => this.deleteConfirmationDialog = el} >
                    Are you sure you want to delete this profile picture?
                </app-confirmation>    
            </div>
        );
    }
}