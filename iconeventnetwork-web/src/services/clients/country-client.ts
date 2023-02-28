import { ApiParameters, ClientBase, CollectionSuccessResponse, CountryAttributes } from "./client-base";

export class CountryClient extends ClientBase {
    private endpoint = "/api/countries";

    constructor() {
        super();
    }

    public getCountries(parameters?: ApiParameters) {
        return new Promise<CollectionSuccessResponse<CountryAttributes>>((resolve, reject) => {
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