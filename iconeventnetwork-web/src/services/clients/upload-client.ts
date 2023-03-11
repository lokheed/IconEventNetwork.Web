import { ClientBase, SuccessResponse } from "./client-base";
import { localStorageKeyService } from '../../services/local-storage-key-service';

export class UploadClient extends ClientBase {
    private endpoint = "/api/upload";

    constructor() {
        super();
    }

    public destroy(fileId: number) {
        return new Promise<SuccessResponse<any>>((resolve, reject) => {
            const token = localStorage.getItem(localStorageKeyService.Jwt);
            fetch(
                `${this.baseUrl}${this.endpoint}/files/${fileId}`,
                {
                    method: "DELETE",
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                })
                .then(response => resolve(this.processResponse(response)))
                .catch(error => reject(error));
        });
    }
}