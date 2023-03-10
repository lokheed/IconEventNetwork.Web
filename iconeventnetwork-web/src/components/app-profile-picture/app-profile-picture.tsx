import { Component, Listen, Prop, State, h } from "@stencil/core";
import { DataResponse, ImageInfo, PersonInfo, PersonSaveData } from '../../services/clients/client-base';
import { PersonClient } from '../../services/clients/person-client';
//import { UploadClient } from "../../services/clients/upload-client";
import { ProfileImageDisc } from '../functionalComponents/ProfileImageDisc';

@Component({
  tag: "app-profile-picture",
  styleUrl: "app-profile-picture.scss",
  shadow: false
})
export class AppProfilePicture {
    private readonly personClient: PersonClient;
    //private readonly uploadClient: UploadClient;
    private deleteConfirmationDialog: HTMLAppConfirmationElement;
    private deleteButton: HTMLButtonElement;
    constructor(){
      this.personClient = new PersonClient();
      //this.uploadClient = new UploadClient();
    }  
    @Prop() personItem: DataResponse<PersonInfo>;
    @State() isEditing: boolean = false;
    @State() displayImage: ImageInfo;
    @State() editImage: ImageInfo;
    @Listen('primaryConfirmationClick') primaryDeleteConfirmationClickHandler() {
        this.deleteConfirmationDialog.visible = false;  
        //this.uploadClient.destroy(this.displayImage.data.id);    //TODO: resolve 403 error
        let personSaveData: PersonSaveData = {
            data: {
                ProfileImage: null,
            }
        };
        this.personClient.updatePerson(this.personItem.id, personSaveData)
        .then(() => {
            this.isEditing = false;
            this.displayImage.data = null;
            this.deleteButton.classList.add('disabled');
        })
        .catch(reason => {
            console.log(reason.error.message);
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
        this.editImage = this.displayImage;
        this.isEditing = true;
    }

    private handleSaveClick(e: MouseEvent) {
        e.preventDefault();
        this.saveData();
    }     

    private saveData() {
        //TODO: save logic here
        //TODO: don't forget to remove the 'delete' class from this.deleteButton if necessary
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
                                <ProfileImageDisc profileImage={this.editImage} firstName={this.personItem?.attributes?.FirstName} lastName={this.personItem?.attributes?.LastName} />
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
                                        <input type='file' class='file-select' accept="image/jpeg, image/png" />
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