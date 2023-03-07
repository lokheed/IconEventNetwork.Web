import { ApiParameters, ClientBase, CollectionSuccessResponse, LanguageAttributes } from "./client-base";

export class LanguageClient extends ClientBase {
    private endpoint = "/api/languages";

    constructor() {
        super();
    }

    public getLanguages(parameters?: ApiParameters) {
        return new Promise<CollectionSuccessResponse<LanguageAttributes>>((resolve, reject) => {
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