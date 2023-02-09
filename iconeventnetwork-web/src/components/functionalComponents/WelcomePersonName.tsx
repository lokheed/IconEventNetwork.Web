import {FunctionalComponent, h} from "@stencil/core"
import { DataResponse, PersonInfo } from '../../services/clients/client-base';

interface WelcomePersonNameProps {
    person: DataResponse<PersonInfo>;
}

export const WelcomePersonName: FunctionalComponent<WelcomePersonNameProps> = (props => (
    <h1>
        { 
            props.person?.attributes?.FirstName && props.person?.attributes?.LastName ?
            'Welcome, ' + props.person?.attributes?.FirstName + ' ' + props.person?.attributes?.LastName.substring(0, 1) + '.' :
            'Welcome' 
        }
    </h1>
));