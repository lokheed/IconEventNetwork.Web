import {FunctionalComponent, h} from "@stencil/core"

interface LastUpdatedProps {
    updatedAt: Date;
}

export const LastUpdated: FunctionalComponent<LastUpdatedProps> = (props => (
    <div class='updated-message'>
        Last updated {props.updatedAt.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric"})} {props.updatedAt.toLocaleTimeString('en-US')}
    </div>
));