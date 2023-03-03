import { ClientBase, SuccessResponse, AddressAttributes, AddressSaveData } from "./client-base";
import { localStorageKeyService } from '../../services/local-storage-key-service';

export class AddressClient extends ClientBase {
    private endpoint = "/api/addresses";

    constructor() {
        super();
    }

    public addAddress(data: AddressSaveData) {
        return new Promise<SuccessResponse<AddressAttributes>>((resolve, reject) => {
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

    public deleteAddress(addressId: number) {
        return new Promise<SuccessResponse<AddressAttributes>>((resolve, reject) => {
            const token = localStorage.getItem(localStorageKeyService.Jwt);
            fetch(
                `${this.baseUrl}${this.endpoint}/${addressId}`,
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

    public updateAddress(addressId: number, data: AddressSaveData) {
        return new Promise<SuccessResponse<AddressAttributes>>((resolve, reject) => {
            const token = localStorage.getItem(localStorageKeyService.Jwt);
            fetch(
                `${this.baseUrl}${this.endpoint}/${addressId}`,
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