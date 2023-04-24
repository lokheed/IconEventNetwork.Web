import { ClientBase, AuthenticationData, AuthenticationResponse } from "./client-base";

export class LoginClient extends ClientBase {
    private endpoint = "/api/auth/local";

    constructor() {
        super();
    }

    public authenticate(data: AuthenticationData) {
        return new Promise<AuthenticationResponse>((resolve, reject) => {
            fetch(
                `${this.baseUrl}${this.endpoint}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(data)
                })
                .then(response => resolve(this.processResponse(response)))
                .catch(error => reject(error));
        });
    }
}