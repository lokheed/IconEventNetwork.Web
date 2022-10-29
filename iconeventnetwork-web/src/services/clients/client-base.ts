import { urlService } from "../url-service";


export class ClientBase {
    private _baseUrl;
    
    constructor() {
        this._baseUrl = urlService.getApiBaseUrl();
    }

    get baseUrl() {
        return this._baseUrl;
    }

    public processResponse<T>(response: Response) {
        return new Promise<T>((resolve, reject) => {
            if (response.ok) {
                response.json()
                    .then(data => resolve(data as T))
                    .catch(error => error);
            }
            else{
                response.json()
                    .then(reason => reject(reason as T))
                    .catch(error => reject(error));
            }
        });
    }
}

export interface SuccessResponse<T> {
    data: DataResponse<T> | null;
    meta?: {
        pagination? : PaginationResponse;
    };
    error?: ErrorResponse;
}

export interface DataResponse<T> {
    id: number;
    attributes: T & {
        createdAt: Date,
        updatedAt: Date};
}

export interface PaginationResponse {
    start?: number;
    limit?: number;
    page?: number;
    pageSize?: number;
    pageCount?: number;
    total: number;
}

export interface MenuLink {
    id: number;
    DisplayName: string;
    Link: string;
    LinkType?: LinkType;
    Links? : MenuLink[];
    IsVisibleAnonymous: boolean;
    __component?: string;
}

export type LinkType = "Normal" | "HeadingLink" | "HeadingNoLink";

export interface ErrorResponse {
    /** The http status code such as 401, 404, etc.*/
    status: number;
    /** The error name such as NotFoundError.*/
    name: string;
    /** The error message.*/
    message: string;
    /** The error details.*/
    details: any;
}