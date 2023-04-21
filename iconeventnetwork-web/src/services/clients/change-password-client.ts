import { ClientBase } from "./client-base";
import { localStorageKeyService } from '../../services/local-storage-key-service';

export class ChangePasswordClient extends ClientBase {
    private endpoint = "/api/auth/change-password";

    constructor() {
        super();
    }

    public changePassword(currentPassword: string, password: string, passwordConfirmation: string) {
        return new Promise<any> ((resolve, reject) => {
            const token = localStorage.getItem(localStorageKeyService.Jwt);
            fetch(
                `${this.baseUrl}${this.endpoint}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({currentPassword: currentPassword, password: password, passwordConfirmation: passwordConfirmation}),
                })
                .then(response => {
                    return resolve(this.processResponse(response));
                })
                .catch(error => reject(error));
        });
    }
}