import { ApiParameters, ClientBase, CollectionSuccessResponse, PhoneNumberTypeAttributes } from "./client-base";

export class PhoneNumberTypeClient extends ClientBase {
    private endpoint = "/api/phone-number-types";

    constructor() {
        super();
    }

    public getPhoneNumberTypes(parameters?: ApiParameters) {
        return new Promise<CollectionSuccessResponse<PhoneNumberTypeAttributes>>((resolve, reject) => {
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