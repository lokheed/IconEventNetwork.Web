import { ApiParameters, ClientBase, CollectionSuccessResponse, AddressTypeAttributes } from "./client-base";

export class AddressTypeClient extends ClientBase {
    private endpoint = "/api/address-types";

    constructor() {
        super();
    }

    public getAddressTypes(parameters?: ApiParameters) {
        return new Promise<CollectionSuccessResponse<AddressTypeAttributes>>((resolve, reject) => {
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