import { ClientBase, SuccessResponse, PhoneNumberAttributes, PhoneNumberSaveData } from "./client-base";
import { localStorageKeyService } from '../../services/local-storage-key-service';

export class PhoneNumberClient extends ClientBase {
    private endpoint = "/api/phone-numbers";

    constructor() {
        super();
    }

    public addPhoneNumber(data: PhoneNumberSaveData) {
        return new Promise<SuccessResponse<PhoneNumberAttributes>>((resolve, reject) => {
            const token = localStorage.getItem(localStorageKeyService.Jwt);
            fetch(
                `${this.baseUrl}${this.endpoint}`,
                {
                    method: 'POST',
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

    public deletePhoneNumber(phoneNumberId: number) {
        return new Promise<SuccessResponse<PhoneNumberAttributes>>((resolve, reject) => {
            const token = localStorage.getItem(localStorageKeyService.Jwt);
            fetch(
                `${this.baseUrl}${this.endpoint}/${phoneNumberId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                })
                .then(response => resolve(this.processResponse(response)))
                .catch(error => reject(error));
        });
    }

    public updatePhoneNumber(phoneNumberId: number, data: PhoneNumberSaveData) {
        return new Promise<SuccessResponse<PhoneNumberAttributes>>((resolve, reject) => {
            const token = localStorage.getItem(localStorageKeyService.Jwt);
            fetch(
                `${this.baseUrl}${this.endpoint}/${phoneNumberId}`,
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