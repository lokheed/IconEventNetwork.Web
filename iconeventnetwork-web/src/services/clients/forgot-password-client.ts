import { ClientBase } from "./client-base";

export class ForgotPasswordClient extends ClientBase {
    private endpoint = "/api/auth/forgot-password";

    constructor() {
        super();
    }

    public forgotPassword(email: string) {
        return new Promise<any> ((resolve, reject) => {
            fetch(
                `${this.baseUrl}${this.endpoint}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({email: email}),
                })
                .then(response => {
                    return resolve(this.processResponse(response));
                })
                .catch(error => reject(error));
        });
    }
}