import { ApiParameters, ClientBase, CollectionSuccessResponse, CountrySubdivisionAttributes } from "./client-base";

export class CountrySubdivisionClient extends ClientBase {
    private endpoint = "/api/countrysubdivisions";

    constructor() {
        super();
    }

    public getCountrySubdivisions(parameters?: ApiParameters) {
        return new Promise<CollectionSuccessResponse<CountrySubdivisionAttributes>>((resolve, reject) => {
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