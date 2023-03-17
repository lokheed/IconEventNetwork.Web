import { ApiParameters, ClientBase, CollectionSuccessResponse, SocialMediaTypeAttributes } from "./client-base";

export class SocialMediaTypeClient extends ClientBase {
    private endpoint = "/api/social-media-types";

    constructor() {
        super();
    }

    public getSocialMediaTypes(parameters?: ApiParameters) {
        return new Promise<CollectionSuccessResponse<SocialMediaTypeAttributes>>((resolve, reject) => {
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