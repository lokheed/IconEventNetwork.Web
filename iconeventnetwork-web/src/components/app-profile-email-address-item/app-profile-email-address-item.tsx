import { Component, Listen, Prop, h } from "@stencil/core";
import { DataResponse, EmailAddressAttributes } from '../../services/clients/client-base';

@Component({
  tag: "app-profile-email-address-item",
  styleUrl: "app-profile-email-address-item.scss",
  shadow: false
})
export class AppProfileEmailAddressItem {
    private editDialog: HTMLAppModalElement;
    @Prop() emailAddressItem: DataResponse<EmailAddressAttributes>;
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