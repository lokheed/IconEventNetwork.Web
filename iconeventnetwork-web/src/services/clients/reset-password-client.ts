import { ClientBase } from "./client-base";

export class ResetPasswordClient extends ClientBase {
    private endpoint = "/api/auth/reset-password";

    constructor() {
        super();
    }

    public resetPassword(code: string, password: string, passwordConfirmation: string) {
        return new Promise<any> ((resolve, reject) => {
            fetch(
                `${this.baseUrl}${this.endpoint}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({code: code, password: password, passwordConfirmation: passwordConfirmation}),
                })
                .then(response => {
                    return resolve(this.processResponse(response));
                })
                .catch(error => reject(error));
        });
    }
}