import {FunctionalComponent, h} from "@stencil/core"
import { DataResponse, PersonInfo } from '../../services/clients/client-base';

interface PersonNameAndPronounsProps {
    person: DataResponse<PersonInfo>;
}

export const PersonNameAndPronouns: FunctionalComponent<PersonNameAndPronounsProps> = (props => (
    <div>
        { props.person?.attributes?.prefix?.data?.attributes?.Name ? props.person.attributes.prefix.data.attributes.Name + ' ' : '' } 
        { props.person?.attributes?.FirstName ? props.person.attributes.FirstName + ' ' : '' }                                
        { props.person?.attributes?.MiddleName ? props.person.attributes.MiddleName + ' ' : '' }                                
        { props.person?.attributes?.LastName ? props.person.attributes.LastName + ' ' : '' }
        { props.person?.attributes?.Suffix?.data?.attributes?.Name ? props.person.attributes.Suffix.data.attributes.Name + ' ' : '' }                                
        <span class='pronouns'>{props.person?.attributes?.Pronoun?.data ? '(' + props.person?.attributes?.Pronoun?.data?.attributes.Name + ')' : ''}</span>
    </div>
));