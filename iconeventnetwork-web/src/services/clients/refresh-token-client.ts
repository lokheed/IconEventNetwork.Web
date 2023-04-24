import { ClientBase } from "./client-base";
import { localStorageKeyService } from '../../services/local-storage-key-service';

export class RefreshTokenClient extends ClientBase {
    private endpoint = "/api/token/refresh";

    constructor() {
        super();
    }

    public refreshToken() {
        return new Promise<any>((resolve, reject) => {
            fetch(
                `${this.baseUrl}${this.endpoint}`,
                {
                    mode: 'no-cors',
                    method: 'POST',
                    headers: {
                        'Access-Control-Allow-Credentials': 'true',
                        'Content-type': 'application/json',
                        'Accept': '*/*',
                    },
                    body: JSON.stringify({ "refreshToken": localStorage.getItem(localStorageKeyService.Jwt) }),
                    credentials: 'include',
                })
                .then(response => resolve(this.processResponse(response)))
                .catch(error => reject(error));
        });
    }
}