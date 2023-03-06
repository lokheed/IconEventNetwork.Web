import { ApiParameters, ClientBase, CollectionSuccessResponse, PronounAttributes } from "./client-base";

export class PronounClient extends ClientBase {
    private endpoint = "/api/pronouns";

    constructor() {
        super();
    }

    public getPronouns(parameters?: ApiParameters) {
        return new Promise<CollectionSuccessResponse<PronounAttributes>>((resolve, reject) => {
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