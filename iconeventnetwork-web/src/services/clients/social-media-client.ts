import { ClientBase, SuccessResponse, SocialMediaAttributes, SocialMediaSaveData } from "./client-base";
import { localStorageKeyService } from '../../services/local-storage-key-service';

export class SocialMediaClient extends ClientBase {
    private endpoint = "/api/social-medias";

    constructor() {
        super();
    }

    public addSocialMedia(data: SocialMediaSaveData) {
        return new Promise<SuccessResponse<SocialMediaAttributes>>((resolve, reject) => {
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

    public deleteSocialMedia(socialMediaId: number) {
        return new Promise<SuccessResponse<SocialMediaAttributes>>((resolve, reject) => {
            const token = localStorage.getItem(localStorageKeyService.Jwt);
            fetch(
                `${this.baseUrl}${this.endpoint}/${socialMediaId}`,
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

    public updateSocialMedia(socialMediaId: number, data: SocialMediaSaveData) {
        return new Promise<SuccessResponse<SocialMediaAttributes>>((resolve, reject) => {
            const token = localStorage.getItem(localStorageKeyService.Jwt);
            fetch(
                `${this.baseUrl}${this.endpoint}/${socialMediaId}`,
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