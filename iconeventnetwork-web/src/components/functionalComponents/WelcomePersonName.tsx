import {FunctionalComponent, h} from "@stencil/core"
import { DataResponse } from '../../services/clients/client-base';
import { GetPersonResponse } from '../../services/clients/person-client';

interface WelcomePersonNameProps {
    person: DataResponse<GetPersonResponse>;
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