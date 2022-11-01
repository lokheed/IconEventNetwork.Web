import { ApiParameters, ClientBase, CollectionSuccessResponse, ImageInfo } from "./client-base";

export class FoundingPlannerClient extends ClientBase {
    private endpoint = "/api/founding-planners";

    constructor() {
        super();
    }

    public getFoundingPlanners(parameters?: ApiParameters) {
        return new Promise<CollectionSuccessResponse<GetFoundingPlannersResponse>>((resolve, reject) => {
            let query = this.stringifyParameters(parameters);
            fetch(
                `${this.baseUrl}${this.endpoint}?${query}`,
                {
                    method: "GET",
                })
                .then(response => {
                    return resolve(this.processResponse(response));
                })
                .catch(error => reject(error));
        });
    }
}

export interface GetFoundingPlannersResponse{
    CompanyName: string;
    Logo: ImageInfo;
    FirstName?: string;
    LastName?: string;
    Bio?: string;
    Headshot?: ImageInfo;
}