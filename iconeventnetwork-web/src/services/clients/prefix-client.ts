import { ApiParameters, ClientBase, CollectionSuccessResponse, PrefixAttributes } from "./client-base";

export class PrefixClient extends ClientBase {
    private endpoint = "/api/prefixes";

    constructor() {
        super();
    }

    public getPrefixes(parameters?: ApiParameters) {
        return new Promise<CollectionSuccessResponse<PrefixAttributes>>((resolve, reject) => {
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