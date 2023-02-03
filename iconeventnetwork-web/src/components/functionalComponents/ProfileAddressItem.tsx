import {FunctionalComponent, h} from "@stencil/core"
import { DataResponse, AddressAttributes } from '../../services/clients/client-base';

interface ProfileAddressItemProps {
    addressItem: DataResponse<AddressAttributes>;
}

export const ProfileAddressItem: FunctionalComponent<ProfileAddressItemProps> = (props => (
    <div>
        <div class='profile-item-row'>
            <div class='value'>
                <div class='label'>
                    {props.addressItem.attributes.address_type.data.attributes.Name}
                </div>
                <div class='value'>
                    {props.addressItem.attributes.Line1 ?? ''}
                    {props.addressItem.attributes.Line1 ? <br/> : '' }
                    {props.addressItem.attributes.Line2 ?? ''}
                    {props.addressItem.attributes.Line2 ? <br/> : '' }
                    {props.addressItem.attributes.City ? props.addressItem.attributes.City + ', ' : ''}
                    {props.addressItem.attributes.country_subdivision?.data ? props.addressItem.attributes.country_subdivision?.data.attributes.Code.substring(3, 5).toUpperCase() + ' ' : ''}
                    {props.addressItem.attributes.PostalCode ?? ''}
                    {props.addressItem.attributes.country?.data && props.addressItem.attributes.country?.data.attributes.A2 != 'US' ? <br/> : '' }
                    {props.addressItem.attributes.country?.data && props.addressItem.attributes.country?.data.attributes.A2 != 'US' ? props.addressItem.attributes.country?.data.attributes.Name : '' }
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