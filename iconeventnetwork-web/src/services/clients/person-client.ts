import { ClientBase, ImageFormatsInfo, SuccessResponse, UserInfo } from "./client-base";
import { localStorageKeyService } from '../../services/local-storage-key-service';

export class PersonClient extends ClientBase {
    private endpoint = "/api/people";

    constructor() {
        super();
    }

    public getRequestingPerson() {
        return new Promise<SuccessResponse<GetRequestingPersonResponse>>((resolve, reject) => {
            const token = localStorage.getItem(localStorageKeyService.Jwt);
            fetch(
                `${this.baseUrl}${this.endpoint}/me`,
                {
                    method: 'GET',
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

export interface GetRequestingPersonResponse{
    id: number;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    DirectoryName: string;
    PreferredName: string;
    Users: UserInfo[];
    ProfileImage: {
        id: number;
        formats: ImageFormatsInfo[];
    }

}