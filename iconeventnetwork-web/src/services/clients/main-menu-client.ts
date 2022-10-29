import { ClientBase, MenuLink, SuccessResponse } from "./client-base";

export class MainMenuClient extends ClientBase {
    private endpoint = "/api/main-menu";

    constructor() {
        super();
    }

    public getMainMenu(populate: string = "*") {
        return new Promise<SuccessResponse<GetMainMenuResponse>>((resolve, reject) => {
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

export interface GetMainMenuResponse{
    Navigation: MenuLink[];
}