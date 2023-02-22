import { ApiParameters, ClientBase, ImageFormatsInfo, PersonInfo, PersonSaveData, SuccessResponse, UserInfo } from "./client-base";
import { localStorageKeyService } from '../../services/local-storage-key-service';

export class PersonClient extends ClientBase {
    private endpoint = "/api/people";

    constructor() {
        super();
    }

    public getRequestingPerson() {
        return new Promise<GetRequestingPersonResponse>((resolve, reject) => {
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
                .then(response => response.json())
                .then(body => resolve(body.data))
                .catch(error => reject(error));
        });
    }
  
    public getPerson(personId: number, parameters?: ApiParameters) {
        return new Promise<SuccessResponse<PersonInfo>>((resolve, reject) => {
            let query = this.stringifyParameters(parameters);
            const token = localStorage.getItem(localStorageKeyService.Jwt);
            fetch(
                `${this.baseUrl}${this.endpoint}/${personId}?${query}`,
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

    public updatePerson(personId: number, data: PersonSaveData) {
        return new Promise<SuccessResponse<PersonSaveData>>((resolve, reject) => {
            const token = localStorage.getItem(localStorageKeyService.Jwt);
            fetch(
                `${this.baseUrl}${this.endpoint}/${personId}`,
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
        formats: ImageFormatsInfo;
    }
}