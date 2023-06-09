import qs from "qs";
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

    /** Sets parameters defaults if parameters are undefined */
    public stringifyParameters(parameters: ApiParameters) {
        let params: ApiParameters = {populate: "*", ...parameters}
        return qs.stringify(
            params,
            {
                encodeValuesOnly: true,
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

export interface CollectionSuccessResponse<T> {
    data: DataResponse<T>[] | null;
    meta?: {
        pagination? : PaginationResponse;
    };
    error?: ErrorResponse;
}

export interface DataResponse<T> {
    id: number;
    attributes: T & {
        createdAt?: Date,
        updatedAt?: Date};
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

/** Parameters to configure getting a list of items using the REST APIs.
 * See https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/api-parameters.html
*/
export interface ApiParameters {
    /** Used to sort the results by one or multiple fields:
     * You can append :asc or :desc to the field name to specify the sort order.
     * If you don't specify the sort order, it will default to ascending.
     * Example: sort=["field1:asc","field2:desc"]
    */
    sort?: string | string[];
    /** Used to filter the results by one or multiple fields:
     * Use an array of objects where the key is the field name and the value is the filter value.
     * For the filter value, see https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/filtering-locale-publication.html#filtering
    */
    filters?: object;
    /**
     * Queries can accept a populate parameter to populate various field types:
            - relations & media fields
            - components & dynamic zones
            - creator fields
       See https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/populating-fields.html#relation-media-fields
     */
    populate?: string | object;
    /** Used to limit the fields returned. */
    fields?: string[];
    pagination? : {
        page: number;
        pageSize: number;
        withCount: boolean;
    } | {
        start: number;
        limit: number;
        withCount: boolean;
    },
    /** Used to select between the live or preview data. */
    publicationState?: "live" | "preview";
    /** Can be used to specify in which locale (language) to get the resources in. */
    locale?: string | string[];
}

export interface ImageInfo{
    data: ImageData;
}

export interface ImageData{
    id: number;
    attributes: ImageAttributes;
}

export interface ImageAttributes{
    alternativeText: string;
    url: string;
}