import { ApiParameters, ClientBase, CompanyData } from "./client-base";
import { localStorageKeyService } from '../../services/local-storage-key-service';

export class CompanyClient extends ClientBase {
    private endpoint = "/api/companies";

    constructor() {
        super();
    }

    public getCompany(companyId: string, parameters?: ApiParameters) {
        return new Promise<CompanyData>((resolve, reject) => {
            let query = this.stringifyParameters(parameters);
            const token = localStorage.getItem(localStorageKeyService.Jwt);
            fetch(
                `${this.baseUrl}${this.endpoint}/${companyId}?${query}`,
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

    public securityCheck(companyId: string) {
        return new Promise<SecurityCheckResponse>((resolve, reject) => {
            const token = localStorage.getItem(localStorageKeyService.Jwt);
            fetch(
                `${this.baseUrl}${this.endpoint}/security/${companyId}`,
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
    canManageCompanyDetails: boolean;
    canViewCompanyDetails: boolean;
}