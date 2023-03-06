import { ApiParameters, ClientBase, CollectionSuccessResponse, SuffixAttributes } from "./client-base";

export class SuffixClient extends ClientBase {
    private endpoint = "/api/suffixes";

    constructor() {
        super();
    }

    public getSuffixes(parameters?: ApiParameters) {
        return new Promise<CollectionSuccessResponse<SuffixAttributes>>((resolve, reject) => {
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