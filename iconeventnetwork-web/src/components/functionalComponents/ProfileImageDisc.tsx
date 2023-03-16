import {FunctionalComponent, h} from "@stencil/core"
import { ImageInfo } from '../../services/clients/client-base';

interface ProfileImageDiscProps {
    profileImage: ImageInfo;
    firstName: string;
    lastName: string;
}

export const ProfileImageDisc: FunctionalComponent<ProfileImageDiscProps> = (props => (
    <div class={props.profileImage?.data?.attributes?.formats ? 'profile-image' : 'profile-image no-image'}>
        { props.firstName && props.firstName.length > 0 ? props.firstName.substring(0,1) : '?' }
        { props.lastName && props.lastName.length > 0 ? props.lastName.substring(0,1) : '?' }
        { props.profileImage?.data ? <app-responsive-image image={props.profileImage} class='profile-image-disc' expectedWidth={75} /> : '' }
    </div>
));