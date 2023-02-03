import {FunctionalComponent, h} from "@stencil/core"
import { DataResponse } from '../../services/clients/client-base';
import { GetPersonResponse } from '../../services/clients/person-client';

interface PersonNameAndPronounsProps {
    person: DataResponse<GetPersonResponse>;
}

export const PersonNameAndPronouns: FunctionalComponent<PersonNameAndPronounsProps> = (props => (
    <div>
        { props.person?.attributes.DirectoryName ? props.person?.attributes.DirectoryName : 'unknown' } 
        &nbsp;                                      
        <span class='pronouns'>{props.person?.attributes?.Pronoun?.data ? '(' + props.person?.attributes?.Pronoun?.data?.attributes.Name + ')' : ''}</span>
    </div>
));