import { Component, Host, Listen, Prop, State, h } from "@stencil/core";
import { DataResponse, ImageFormatInfo, ImageInfo, PersonInfo, PersonSaveData } from '../../services/clients/client-base';
import { PersonClient } from '../../services/clients/person-client';
import { UploadClient } from "../../services/clients/upload-client";
import { ProfileImageDisc } from '../functionalComponents/ProfileImageDisc';
import { localStorageKeyService } from '../../services/local-storage-key-service';
import { noPhotoDataUrl } from "../../utils/images-fallback";

@Component({
    tag: "app-profile-picture",
    styleUrl: "app-profile-picture.scss",
    shadow: false,
    scoped: true,
})
export class AppProfilePicture {
    private readonly personClient: PersonClient;
    private readonly uploadClient: UploadClient;
    private profileActions: HTMLIcnProfileActionsElement;
    private imageInput: HTMLInputElement;
    private sizeErrorMessage: HTMLIcnMessageElement;
    private typeErrorMessage: HTMLIcnMessageElement;
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
    @Prop() canEdit: boolean;
    @State() isEditing: boolean = false;
    @State() displayImage: ImageInfo;
    @State() editImageUrl: string;
    @Listen('editClick') editClickHandler() {                
        this.isEditing = true;
        this.setEditImageToDisplayImage();
    }
    
    private deletePicture() {
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
            this.profileActions.deleteDisabled = true;
            window.location.replace('/profile-person'); // needed to refresh profile image in navigation
        });
    }

    private handleCancelClick(e: MouseEvent) {
        e.preventDefault();
        this.isEditing = false;
    }

    private handleSaveClick(e: MouseEvent) {
        e.preventDefault();
        this.resetFormErrors();
        if (this.imageInput.files.length === 0) {
            this.isEditing = false;
            return;
        } 
        this.saveData();
    } 

    private handleImageSelect() {
        this.resetFormErrors();
        if (this.imageInput.files.length === 0) return;
        const newImage = this.imageInput.files[0];
        if (newImage.type !== 'image/jpeg' && newImage.type !== 'image/png') {
            this.imageInput.value = '';
            this.typeErrorMessage.show();
            this.setEditImageToDisplayImage();
            return;
        }
        if (newImage.size > this.maxImageSize) {
            this.imageInput.value = '';
            this.sizeErrorMessage.show();
            this.setEditImageToDisplayImage();
            return;
        }
        this.fileReader.readAsDataURL(newImage);
    }

    private resetFormErrors() {
        this.sizeErrorMessage.hide();
        this.typeErrorMessage.hide();
    } 

    private saveData() {
        const extension = this.imageInput.files[0].name.split('.').pop();
        const fileName = `${this.personItem.attributes.FirstName??''}${this.personItem.attributes.LastName??''}Headshot${this.personItem.id}.${extension}`;
        // first upload the new file
        this.uploadClient.upload(this.imageInput.files[0], fileName)
        .then((response) => {
            // next set the default 
            const fileId = response[0].id;
            const imageFormats = response[0].formats;
            const newFileData = {
                alternativeText: this.personItem.attributes.DirectoryName??'',
                caption: this.personItem.attributes.DirectoryName??'',
            };
            const formData = new FormData();
            formData.append('fileInfo', JSON.stringify(newFileData));
            this.uploadClient.updateFileInfo(fileId, formData)
            .then(() => {
                const newImage: ImageInfo = {
                    data: {
                        id: fileId,
                        attributes: {
                            formats: imageFormats,
                            alternativeText: this.personItem.attributes.DirectoryName??'',
                            caption: this.personItem.attributes.DirectoryName??'',
                            url: ''
                        }
                    }
                }
                this.profileActions.deleteDisabled = false;
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
        });
        this.isEditing = false;
    }

    private setEditImageToDisplayImage() {
        if (this.displayImage?.data?.attributes?.formats) {
            let entries = Object.entries(this.displayImage.data.attributes.formats) as [string, ImageFormatInfo][];
            let sortedEntries = entries.sort((a, b) => a[1].width - b[1].width);
            let entry = sortedEntries.find(e => e[1].width >= 150);
            if (entry) {
                this.editImageUrl = entry[1].url;
                return;
            }
        }
        if (this.displayImage?.data?.attributes?.url) {
            this.editImageUrl = this.displayImage.data.attributes.url;
            return;
        }
        this.editImageUrl = noPhotoDataUrl;
    }
        
    componentWillLoad() {
        this.displayImage = this.personItem?.attributes?.ProfileImage;
    } 

    componentDidLoad() {
        if (!this.displayImage.data) {
            this.profileActions.deleteDisabled = true;
        }
    }

    render() {
        return (
            <Host>
                <div class='content-row'>
                    { !this.isEditing &&
                        <div class='content-value'>
                            <ProfileImageDisc profileImage={this.displayImage} firstName={this.personItem?.attributes?.FirstName} lastName={this.personItem?.attributes?.LastName} />
                        </div>                   
                    }
                    { this.canEdit && !this.isEditing && 
                        <icn-profile-actions ref={el => this.profileActions = el} />                 
                    }
                    { this.isEditing &&
                        <form class='edit-form' >
                            <div class='form-item'>
                                <div class='profile-image'>
                                    <img src={this.editImageUrl} />
                                </div>
                                <div class='file-upload'>
                                    <div class='direction'>
                                        The profile picture must be a recent headshot of you.
                                    </div>
                                    <div class='file-type'>
                                        File types accepted: .jpg, .jpeg, and .png
                                    </div>
                                    <div class='file-size'>
                                        Max file size: 5 MB
                                    </div>
                                    <input type='file' class='file-select' accept="image/jpeg, image/png" ref={el => this.imageInput = el} onChange={() => this.handleImageSelect()} />
                                    <icn-message type='error' hidden ref={el => this.sizeErrorMessage = el}>
                                        Image must be less than 5 MB.
                                    </icn-message>
                                    <icn-message type='error' hidden ref={el => this.typeErrorMessage = el}>
                                        File types must be .jpg, .jpeg, or .png.
                                    </icn-message>                                
                                </div>   
                            </div>                         
                            <div class="button-container">
                                { (this.displayImage?.data?.id??0) > 0 &&
                                    <icn-button type="danger" class='delete'
                                        confirm
                                        confirmMessage="Are you sure you want to delete this picture?"
                                        confirmYesText="Delete"
                                        confirmNoText="Cancel"
                                        onConfirmed={() => this.deletePicture()}
                                    >
                                        Delete this picture
                                    </icn-button>
                                }                                      
                                <icn-button reversed onClick={e => this.handleCancelClick(e)}>Cancel</icn-button>
                                <icn-button onClick={e => this.handleSaveClick(e)}>Save</icn-button>
                            </div>
                        </form>
                    }
                </div>
            </Host>
        );
    }
}