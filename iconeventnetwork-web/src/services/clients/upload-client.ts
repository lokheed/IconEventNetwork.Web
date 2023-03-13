import { ClientBase, SuccessResponse, ImageResponseData } from "./client-base";
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

    // file: The file to upload
    // ref: The unique ID (uid) of the model which the file will be linked to, e.g. 'api::person.person'
    // refId: The ID of the entry which the file will be linked to
    // field: The field of the entry which the file will be precisely linked to
    public upload(file: File) {
        return new Promise<ImageResponseData[]>((resolve, reject) => {
            const token = localStorage.getItem(localStorageKeyService.Jwt);
            const formData = new FormData();
            formData.append('files', file, file.name);
            fetch(
                `${this.baseUrl}${this.endpoint}`,
                {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData,
                })
                .then(response => resolve(this.processResponse(response)))
                .catch(error => reject(error));
        });
    }
}