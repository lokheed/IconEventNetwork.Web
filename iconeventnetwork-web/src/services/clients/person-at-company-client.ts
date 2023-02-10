import { ApiParameters, ClientBase, PersonAtCompanyInfo, CollectionSuccessResponse, PersonAtCompanyData } from "./client-base";
import { localStorageKeyService } from '../../services/local-storage-key-service';

export class PersonAtCompanyClient extends ClientBase {
    private endpoint = "/api/people-at-companies";

    constructor() {
        super();
    }

    public getPersonsAtCompanies(parameters?: ApiParameters) {
        return new Promise<CollectionSuccessResponse<PersonAtCompanyInfo>>((resolve, reject) => {
            let query = this.stringifyParameters(parameters);
            const token = localStorage.getItem(localStorageKeyService.Jwt);
            fetch(
                `${this.baseUrl}${this.endpoint}?${query}`,
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


    public getPersonAtCompany(personAtCompanyId: string, parameters?: ApiParameters) {
        return new Promise<PersonAtCompanyData>((resolve, reject) => {
            let query = this.stringifyParameters(parameters);
            const token = localStorage.getItem(localStorageKeyService.Jwt);
            fetch(
                `${this.baseUrl}${this.endpoint}/${personAtCompanyId}?${query}`,
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

    public securityCheck(personAtCompanyId: string) {
        return new Promise<SecurityCheckResponse>((resolve, reject) => {
            const token = localStorage.getItem(localStorageKeyService.Jwt);
            fetch(
                `${this.baseUrl}${this.endpoint}/security/${personAtCompanyId}`,
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
export interface SecurityCheckResponse{
    canManageProfileFields: boolean;
    canManageActiveArchiveFlags: boolean;
    canManageCompanyDetailsAndStaffFlags: boolean;
}