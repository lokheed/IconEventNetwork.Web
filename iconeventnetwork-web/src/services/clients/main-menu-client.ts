import { ApiParameters, ClientBase, MenuLink, SuccessResponse } from "./client-base";

export class MainMenuClient extends ClientBase {
    private endpoint = "/api/main-menu";

    constructor() {
        super();
    }

    public getMainMenu(parameters?: ApiParameters) {
        return new Promise<SuccessResponse<GetMainMenuResponse>>((resolve, reject) => {
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

export interface GetMainMenuResponse{
    Navigation: MenuLink[];
}