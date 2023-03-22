import { Component, Host, Listen, Prop, State, h } from "@stencil/core";
import { ImageFormatInfo, ImageInfo, CompanySaveData } from '../../services/clients/client-base';
import { CompanyClient } from '../../services/clients/company-client';
import { UploadClient } from "../../services/clients/upload-client";
import { noImageDataUrl } from "../../utils/images-fallback";

@Component({
  tag: "app-profile-company-logo",
  styleUrl: "app-profile-company-logo.scss",
  shadow: false
})
export class AppProfileCompanyLogo {
    private readonly companyClient: CompanyClient;
    private readonly uploadClient: UploadClient;
    private deleteConfirmationDialog: HTMLAppConfirmationElement;
    private profileActions: HTMLIcnProfileActionsElement;
    private imageInput: HTMLInputElement;
    private sizeErrorMessage: HTMLIcnMessageElement;
    private typeErrorMessage: HTMLIcnMessageElement;
    private maxImageSize: number = 5 * 1024 * 1024; // 5 MB
    private fileReader: FileReader;
    constructor(){
      this.companyClient = new CompanyClient();
      this.uploadClient = new UploadClient();
      this.fileReader = new FileReader();
      this.fileReader.onload = (e) => {
          this.editImageUrl = e.target.result.toString();
      }
    }  
    @Prop() companyId: number;
    @Prop() logo: ImageInfo;
    @Prop() canEdit: boolean;
    @State() isEditing: boolean = false;
    @State() displayImage: ImageInfo;
    @State() editImageUrl: string;
    @Listen('editClick') editClickHandler() {   
        this.isEditing = true;
        this.setEditImageToDisplayImage();
    }
    @Listen('primaryConfirmationClick') primaryDeleteConfirmationClickHandler() {
        this.deleteConfirmationDialog.visible = false;         
        this.uploadClient.destroy(this.displayImage.data.id);
        let companySaveData: CompanySaveData = {
            data: {
                LogoImage: null,
            }
        };
        this.companyClient.updateCompany(this.companyId, companySaveData)
        .then(() => {
            this.isEditing = false;
            let updatedImage = JSON.parse(JSON.stringify(this.displayImage));
            updatedImage.data = null;
            this.displayImage = updatedImage;
            this.profileActions.deleteDisabled = true;
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
        this.uploadClient.upload(this.imageInput.files[0])
        .then((response) => {
            const newImage: ImageInfo = {
                data: {
                    id: response[0].id,
                    attributes: {
                        formats: response[0].formats,
                        alternativeText: '',
                        url: response[0].url,
                    }
                }
            }
            const formerImageId = this.displayImage.data?.id??0; 
            if (formerImageId > 0) this.uploadClient.destroy(formerImageId);
            this.displayImage = newImage;            
            let companySaveData: CompanySaveData = {
                data: {
                    LogoImage: this.displayImage.data.id,
                }
            };
            this.companyClient.updateCompany(this.companyId, companySaveData);
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
        this.editImageUrl = noImageDataUrl;
    }
        
    componentWillLoad() {
        this.displayImage = this.logo;
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
                            { this.displayImage && 
                                <app-responsive-image image={this.displayImage} class='logo-image' expectedWidth={150} /> 
                            }                           
                        </div>                   
                    }
                    { this.canEdit && !this.isEditing && 
                        <icn-profile-actions ref={el => this.profileActions = el} />                 
                    }
                    { this.isEditing &&
                        <form class='edit-form' >
                            <div class='form-item'>
                                <div class='company-logo'>
                                    <img src={this.editImageUrl} />
                                </div>
                                <div class='file-upload'>
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
                                <button class="secondary-action" onClick={e => this.handleCancelClick(e)}>Cancel</button>
                                <button class="primary-action" onClick={e => this.handleSaveClick(e)}>Save</button>
                            </div> 
                            { (this.displayImage?.data?.id??0) > 0 &&
                                <div class='delete-container'>
                                    <button class='delete-action' onClick={e => this.handleDeleteClick(e)}>
                                        Delete this logo
                                    </button>
                                </div>
                            }                               
                        </form>
                    }
                </div>
                <app-confirmation ref={el => this.deleteConfirmationDialog = el} >
                    Are you sure you want to delete this logo?
                </app-confirmation>    
            </Host>
        );
    }
}