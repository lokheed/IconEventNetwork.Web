import {FunctionalComponent, h} from "@stencil/core"
import { CompanyData } from "../../services/clients/client-base";
import { noLogoDataUrl } from "../../utils/images-fallback";

interface CompanyBoxProps {
    company: CompanyData;
    pacId: number;
}

export const CompanyBox: FunctionalComponent<CompanyBoxProps> = (props => (
    <div class='company-box box-container'>
        <div class='company-row'>
            {props.company?.data?.attributes?.LogoImage &&
                <app-responsive-image 
                    image={props.company.data.attributes.LogoImage} 
                    noImageDataUrl={noLogoDataUrl}
                    class='logo-image' 
                    expectedWidth={300} />
            }
            
            <div class='company-name'>
                {props.company?.data?.attributes?.Name??'Company Name Missing'}
            </div>
        </div>
        <hr />
        <div
            class='profile-actions-row'
            style={{display: "flex", flexDirection: "column", gap: "1em"}}>
            <icn-button
                onClick={() => window.location.pathname = ('/profile-pac/' + props.pacId)}
            >
                View my work profile
            </icn-button>
            <icn-button type="neutral"
                onClick={() => window.location.pathname = ('/profile-company/' + props.company.data.id)}
            >
                View company profile
            </icn-button>
        </div>
    </div>
));