import {FunctionalComponent, h} from "@stencil/core"
import { DataResponse, PhoneNumberAttributes } from '../../services/clients/client-base';

interface ProfilePhoneNumberItemProps {
    phoneNumberItem: DataResponse<PhoneNumberAttributes>;
}

export const ProfilePhoneNumberItem: FunctionalComponent<ProfilePhoneNumberItemProps> = (props => (
    <div>
        <div class='profile-item-row'>
            <div class='value'>
                <div class='label'>
                    {props.phoneNumberItem.attributes.phone_number_type.data.attributes.Name}
                </div>
                <div class='value'>
                    {props.phoneNumberItem.attributes.InternationalFormat ?? props.phoneNumberItem.attributes.RawFormat}
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