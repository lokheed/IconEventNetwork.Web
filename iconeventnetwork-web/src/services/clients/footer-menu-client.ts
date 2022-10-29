import { ClientBase, MenuLink, SuccessResponse } from "./client-base";

export class FooterMenuClient extends ClientBase {
    private endpoint = "/api/footer-menu";

    constructor() {
        super();
    }

    public getFooterMenu(populate: string = "*") {
        return new Promise<SuccessResponse<GetFooterMenuResponse>>((resolve, reject) => {
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

export interface GetFooterMenuResponse{
    MenuItems: MenuLink[];
}