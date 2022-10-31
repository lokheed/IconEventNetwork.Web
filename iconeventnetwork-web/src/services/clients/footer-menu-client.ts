import { ApiParameters, ClientBase, MenuLink, SuccessResponse } from "./client-base";

export class FooterMenuClient extends ClientBase {
    private endpoint = "/api/footer-menu";

    constructor() {
        super();
    }

    public getFooterMenu(parameters?: ApiParameters) {
        return new Promise<SuccessResponse<GetFooterMenuResponse>>((resolve, reject) => {
            let query = this.stringifyParameters(parameters);
            fetch(
                `${this.baseUrl}${this.endpoint}?${query}`,
                {
                    method: "GET",
                })
                .then(response => resolve(this.processResponse(response)))
                .catch(error => reject(error));
        });
    }
}

export interface GetFooterMenuResponse{
    MenuItems: MenuLink[];
}