import {FunctionalComponent, h} from "@stencil/core"
import { GetRequestingPersonResponse } from '../../services/clients/person-client';

interface WelcomePersonNameProps {
    me: GetRequestingPersonResponse;
}

export const WelcomePersonName: FunctionalComponent<WelcomePersonNameProps> = (props => (
    <h1 class='welcome'>
        { 
            props.me?.FirstName && props.me?.LastName ?
            'Welcome, ' + props.me?.FirstName + ' ' + props.me?.LastName.substring(0, 1) + '.' :
            'Welcome' 
        }
    </h1>
));