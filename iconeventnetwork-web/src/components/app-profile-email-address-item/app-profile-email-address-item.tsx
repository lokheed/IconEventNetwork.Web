import { Component, Listen, Prop, State, h } from "@stencil/core";
import { DataResponse, EmailAddressAttributes, EmailAddressTypeAttributes } from '../../services/clients/client-base';
import { EmailAddressTypeClient } from "../../services/clients/email-address-type-client";
import { AppliesTo } from "./applies-to";
import { localStorageKeyService } from '../../services/local-storage-key-service';

@Component({
  tag: "app-profile-email-address-item",
  styleUrl: "app-profile-email-address-item.scss",
  shadow: false
})
export class AppProfileEmailAddressItem {
    private editDialog: HTMLAppModalElement;
    private emailAddressTypeClient: EmailAddressTypeClient;
    constructor(){
        this.emailAddressTypeClient = new EmailAddressTypeClient();
      }  
    @Prop() emailAddressItem: DataResponse<EmailAddressAttributes>;
    @Prop() appliesTo!: AppliesTo;
    @State() emailAddressTypes: DataResponse<EmailAddressTypeAttributes>[];
    @Listen('primaryModalClick') primaryModalClickHandler() {
        alert('Primary Modal Button Clicked');
        this.editDialog.visible = false;
    }
    @Listen('secondaryModalClick') secondaryModalClickHandler() {
        alert('Secondary Modal Button Clicked');
        this.editDialog.visible = false;
    }

    private handleEditClick(e: MouseEvent) {
        e.preventDefault();
        this.editDialog.visible = true;
    }

    private getPersonEmailAddressTypes() {
        var storedPersonEmailAddressTypes = sessionStorage.getItem(localStorageKeyService.EmailTypesPerson);
        if (storedPersonEmailAddressTypes) {
          this.emailAddressTypes = JSON.parse(storedPersonEmailAddressTypes);
          return;
        }
        this.emailAddressTypeClient.getEmailAddressTypes({
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
            this.emailAddressTypes = response.data;
            sessionStorage.setItem(localStorageKeyService.EmailTypesPerson, JSON.stringify(this.emailAddressTypes));
        })
        .catch(reason => console.error(reason));  
    }

    private getPersonAtCompanyEmailAddressTypes() {
        var storedPersonAtCompanyEmailAddressTypes = sessionStorage.getItem(localStorageKeyService.EmailTypesPersonAtCompany);
        if (storedPersonAtCompanyEmailAddressTypes) {
          this.emailAddressTypes = JSON.parse(storedPersonAtCompanyEmailAddressTypes);
          return;
        }
        this.emailAddressTypeClient.getEmailAddressTypes({
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
            this.emailAddressTypes = response.data;
            sessionStorage.setItem(localStorageKeyService.EmailTypesPersonAtCompany, JSON.stringify(this.emailAddressTypes));
        })
        .catch(reason => console.error(reason));  
    }

    private getCompanyEmailAddressTypes() {
        var storedCompanyEmailAddressTypes = sessionStorage.getItem(localStorageKeyService.EmailTypesCompany);
        if (storedCompanyEmailAddressTypes) {
          this.emailAddressTypes = JSON.parse(storedCompanyEmailAddressTypes);
          return;
        }
        this.emailAddressTypeClient.getEmailAddressTypes({
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
            this.emailAddressTypes = response.data;
            sessionStorage.setItem(localStorageKeyService.EmailTypesPersonAtCompany, JSON.stringify(this.emailAddressTypes));
        })
        .catch(reason => console.error(reason));  
    }
        
    componentWillLoad() {
        switch (this.appliesTo) {
            case AppliesTo.Person:
                this.getPersonEmailAddressTypes();
                break;
            case AppliesTo.PersonAtCompany:
                this.getPersonAtCompanyEmailAddressTypes();
                break;
            case AppliesTo.Company:
                this.getCompanyEmailAddressTypes();
                break;
        }
    }        

    render() {
        return (
            <div>
                <div class='profile-item-row'>
                    <div class='value'>
                        <div class='label'>
                            {this.emailAddressItem.attributes.email_address_type.data.attributes.Name}
                        </div>
                        <div class='value'>
                            {this.emailAddressItem.attributes.EmailAddress}
                        </div>
                    </div>
                    <div class='actions'>
                        <div class='action' onClick={e => this.handleEditClick(e)}>
                            <i class="fa-solid fa-pen blue"></i>&nbsp;<span class='action-link primary'>Edit</span>
                        </div>
                        <div class='action'>
                            <i class="fa-solid fa-trash-can brick-red"></i>&nbsp;<span class='action-link secondary'>Delete</span>
                        </div>                                       
                    </div>
                </div>
                <app-modal ref={el => this.editDialog = el} dialogTitle="Email" visible={false}>
                    The edit form for this email address will go here
                </app-modal>       
                <hr/>
            </div>
        );
    }
}

