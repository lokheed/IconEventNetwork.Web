import { ClientBase, SuccessResponse } from "./client-base";

export class FooterLegalMenuClient extends ClientBase {
    private endpoint = "/api/footer-legal-menu";

    constructor() {
        super();
    }

    public getFooterLegalMenu(populate: string = "*") {
        return new Promise<SuccessResponse<GetFooterLegalMenuResponse>>((resolve, reject) => {
            fetch(
                `${this.baseUrl}${this.endpoint}?populate=${populate}`,
                {
                    method: "GET",
                })
                .then(response => resolve(this.processResponse(response)))
                .catch(error => reject(error));
        });
    }
}

export interface GetFooterLegalMenuResponse{
    MenuItems: [
        {
            id: number;
            DisplayName: string;
            Link: string;
            LinkType: "Normal" | "HeadingLink" | "HeadingNoLink";
            IsVisibleAnonymous: boolean;
        }
    ];
}