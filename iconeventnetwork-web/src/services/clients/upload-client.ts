import { ClientBase, SuccessResponse } from "./client-base";

export class UploadClient extends ClientBase {
    private endpoint = "/api/upload";

    constructor() {
        super();
    }

    public destroy(fileId: number) {
        return new Promise<SuccessResponse<any>>((resolve, reject) => {
            fetch(
                `${this.baseUrl}${this.endpoint}/files/${fileId}`,
                {
                    method: "DELETE",
                })
                .then(response => resolve(this.processResponse(response)))
                .catch(error => reject(error));
        });
    }
}