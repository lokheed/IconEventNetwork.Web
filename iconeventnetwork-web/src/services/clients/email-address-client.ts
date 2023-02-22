import { ClientBase, SuccessResponse, EmailAddressAttributes, EmailAddressSaveData } from "./client-base";
import { localStorageKeyService } from '../../services/local-storage-key-service';

export class EmailAddressClient extends ClientBase {
    private endpoint = "/api/email-addresses";

    constructor() {
        super();
    }

    public updateEmailAddress(emailAddressId: number, data: EmailAddressSaveData) {
        return new Promise<SuccessResponse<EmailAddressAttributes>>((resolve, reject) => {
            const token = localStorage.getItem(localStorageKeyService.Jwt);
            fetch(
                `${this.baseUrl}${this.endpoint}/${emailAddressId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(data)
                })
                .then(response => resolve(this.processResponse(response)))
                .catch(error => reject(error));
        });
    }
}