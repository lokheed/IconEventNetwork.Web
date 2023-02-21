import { ApiParameters, ClientBase, CollectionSuccessResponse, EmailAddressTypeAttributes } from "./client-base";

export class EmailAddressTypeClient extends ClientBase {
    private endpoint = "/api/email-address-types";

    constructor() {
        super();
    }

    public getEmailAddressTypes(parameters?: ApiParameters) {
        return new Promise<CollectionSuccessResponse<EmailAddressTypeAttributes>>((resolve, reject) => {
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