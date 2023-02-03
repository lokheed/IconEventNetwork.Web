import {FunctionalComponent, h} from "@stencil/core"
import { DataResponse, EmailAddressAttributes } from '../../services/clients/client-base';

interface ProfileEmailAddressItemProps {
    emailAddressItem: DataResponse<EmailAddressAttributes>;
}

export const ProfileEmailAddressItem: FunctionalComponent<ProfileEmailAddressItemProps> = (props => (
    <div>
        <div class='profile-item-row'>
            <div class='value'>
                <div class='label'>
                    {props.emailAddressItem.attributes.email_address_type.data.attributes.Name}
                </div>
                <div class='value'>
                    {props.emailAddressItem.attributes.EmailAddress}
                </div>
            </div>
            <div class='actions'>
                <div class='action'>
                    <i class="fa-solid fa-pen blue"></i>&nbsp;<span class='action-link primary'>Edit</span>
                </div>
                <div class='action'>
                    <i class="fa-solid fa-trash-can brick-red"></i>&nbsp;<span class='action-link secondary'>Delete</span>
                </div>                                       
            </div>
        </div>
        <hr/>
    </div>
));