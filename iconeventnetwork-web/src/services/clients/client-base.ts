import qs from "qs";
import { urlService } from "../url-service";


export class ClientBase {
    private _baseUrl: string;
    
    constructor() {
        this._baseUrl = urlService.ApiBaseUrl;
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

export interface AddressData{
    data: DataResponse<AddressAttributes>[];
}

export interface AddressAttributes{
    Line1?: string;
    Line2?: string;
    City?: string;
    PostalCode?: string;
    country?: CountryData;
    country_subdivision?: CountrySubdivisionData;
    address_type?: AddressTypeData;
}

export interface AddressSaveData{
    data: {
        Line1?: string;
        Line2?: string;
        City?: string;
        PostalCode?: string;
        country?: { disconnect?: [{id?: number}], connect?: [{id?: number}] };
        country_subdivision?: { disconnect?: [{id?: number}], connect?: [{id?: number}] };
        address_type?: { disconnect?: [{id?: number}], connect?: [{id?: number}] };
    }
}

export interface AddressTypeData{
    data: DataResponse<AddressTypeAttributes>;
}

export interface AddressTypeAttributes{
    Name: string;
    Rank: number;
}

export interface CountryData{
    data: DataResponse<CountryAttributes>;
}

export interface CountryAttributes{
    Name: string;
    A2: string;
    A3: string;
    Number: number;
}

export interface CountrySubdivisionData{
    data: DataResponse<CountrySubdivisionAttributes>;
}

export interface CountrySubdivisionAttributes{
    Name: string;
    Code: string;
}

export interface CompanyData{
    data: DataResponse<CompanyInfo>;
}

export interface CompanyInfo{
    Name: string;
    SearchableName: string;
    InvoiceCompanyName: string;
    Tagline?: string;
    Description?: string;
    Website?: string;
    ParentCompanyId: number;
    IsActive?: boolean;
    CompanyStatus?: CompanyStatusData;
    AccountManager?: PersonAtCompanyData;
    PrimaryContact?: PersonAtCompanyData;
    LogoImage?: ImageInfo;
    Addresses?: AddressData;
    EmailAddresses?: EmailAddressData;
    PhoneNumbers?: PhoneNumberData;
    SocialMediaAccounts?: SocialMediaData;
}

export interface CompanySaveData{
    data: {
        Name?: string;
        Addresses?: { disconnect?: [{id?: number}], connect?: [{id?: number}] };
        EmailAddresses?: { disconnect?: [{id?: number}], connect?: [{id?: number}] };
        PhoneNumbers?: { disconnect?: [{id?: number}], connect?: [{id?: number}] };
        SocialMediaAccounts?: { disconnect?: [{id?: number}], connect?: [{id?: number}] };
        Description?: string;
        Tagline?: string;
    }
}


export interface CompanyStatusData{
    data: DataResponse<CompanyStatusInfo>
}
export interface CompanyStatusInfo{
    DisplayName: string;
}

export interface EmailAddressData{
    data: DataResponse<EmailAddressAttributes>[];
}

export interface EmailAddressAttributes{
    IsValidated: boolean;
    EmailAddress: string;
    email_address_type: EmailAddressTypeData;
}

export interface EmailAddressTypeData{
    data: DataResponse<EmailAddressTypeAttributes>;
}

export interface EmailAddressTypeAttributes{
    Name: string;
    Rank: number;
}

export interface EmailAddressSaveData{
    data: {
        EmailAddress?: string;
        email_address_type?: { disconnect?: [{id?: number}], connect?: [{id?: number}] };
    }
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
    formats? : ImageFormatsInfo
}

export interface ImageResponseData{
    id: number;
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats: ImageFormatsInfo;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?; string;
    createdAt?: Date,
    updatedAt?: Date;
}

export interface ImageFormatsInfo{
    xlarge?: ImageFormatInfo;
    large?: ImageFormatInfo;
    medium?: ImageFormatInfo;
    small?: ImageFormatInfo;
    thumbnail?: ImageFormatInfo;
    xsmall?: ImageFormatInfo;
}

export interface ImageFormatInfo{
    ext: string;
    hash: string;
    height: number;
    mime: string;
    name: string;
    path: string;
    size: number;
    url: string;
    width: number;
}

export interface LanguageSingularData{
    data: LanguageInfo;
}

export interface LanguageCollectionData{
    data: DataResponse<LanguageAttributes>[];
}

export interface LanguageInfo{
    id: number;
    attributes: LanguageAttributes;
}

export interface LanguageAttributes{
    EnglishName?: string;
    NativeName?: string;
    SearchableName?: string;
    A2?: string;
    A3?: string;
    Rank?: number;
}


export interface PersonData{
    data: DataResponse<PersonInfo>;
}
export interface PersonInfo{
    FirstName?: string;
    MiddleName?: string;
    LastName?: string;
    DirectoryName?: string;
    PreferredName?: string;  
    Addresses?: AddressData;
    EmailAddresses?: EmailAddressData;
    PhoneNumbers?: PhoneNumberData;
    prefix?: PrefixData;
    ProfileImage?: ImageInfo;
    Pronoun?: PronounData;
    SocialMediaAccounts?: SocialMediaData[];
    Suffix?: SuffixData;
    Users?: UserData;
    PreferredLanguage?: LanguageSingularData;
    LanguagesSpoken?: LanguageCollectionData;
}

export interface PersonSaveData{
    data: {
        FirstName?: string,
        MiddleName?: string,
        LastName?: string,
        DirectoryName?: string,
        PreferredName?: string,
        Addresses?: { disconnect?: [{id?: number}], connect?: [{id?: number}] };
        EmailAddresses?: { disconnect?: [{id?: number}], connect?: [{id?: number}] };
        PhoneNumbers?: { disconnect?: [{id?: number}], connect?: [{id?: number}] };
        prefix?: { disconnect?: [{id?: number}], connect?: [{id?: number}] };
        Pronoun?: { disconnect?: [{id?: number}], connect?: [{id?: number}] };
        Suffix?: { disconnect?: [{id?: number}], connect?: [{id?: number}] };
        PreferredLanguage?: { disconnect?: [{id?: number}?], connect?: [{id?: number}?] };
        LanguagesSpoken?: { disconnect: {id?: number}[], connect: {id?: number}[] };
        ProfileImage?: number;
    }
}

export interface PersonAtCompanyData{
    data: DataResponse<PersonAtCompanyInfo>;
}

export interface PersonAtCompanyInfo{
    JobTitle?: string;
    Bio?: string;
    CanManageCompanyDetails?: boolean;
    CanManageCompanyStaff?: boolean;
    IsActive?: boolean;
    createdAt?: Date,
    updatedAt?: Date;
    Company?: CompanyData;
    Person?: PersonData;
    Addresses?: AddressData;
    EmailAddresses?: EmailAddressData;
    PhoneNumbers?: PhoneNumberData;
    SocialMediaAccounts?: SocialMediaData[];
}

export interface PersonAtCompanySaveData{
    data: {
        JobTitle?: string;
        Bio?: string;
        Addresses?: { disconnect?: [{id?: number}], connect?: [{id?: number}] };
        EmailAddresses?: { disconnect?: [{id?: number}], connect?: [{id?: number}] };
        PhoneNumbers?: { disconnect?: [{id?: number}], connect?: [{id?: number}] };
    }
}

export interface PhoneNumberData{
    data: DataResponse<PhoneNumberAttributes>[];
}

export interface PhoneNumberAttributes{
    RawFormat?: string;
    IsValidated: boolean;
    E164Format?: string;
    InternationalFormat?: string;
    NationalFormat?: string;
    country?: CountryData;
    phone_number_type?: PhoneNumberTypeData;
}

export interface PhoneNumberSaveData{
    data: {
        RawFormat?: string;
        country?: { disconnect?: [{id?: number}], connect?: [{id?: number}] };
        phone_number_type?: { disconnect?: [{id?: number}], connect?: [{id?: number}] };
    }
}

export interface PhoneNumberTypeData{
    data: DataResponse<PhoneNumberTypeAttributes>;
}

export interface PhoneNumberTypeAttributes{
    Name: string;
    Rank: number;
}

export interface PrefixData{
    data: PrefixInfo;
}

export interface PrefixInfo{
    id: number;
    attributes: PrefixAttributes;
}

export interface PrefixAttributes{
    Name: string;
    Rank: number;
}

export interface PronounData{
    data: PronounInfo;
}

export interface PronounInfo{
    id: number;
    attributes: PronounAttributes;
}

export interface PronounAttributes{
    Name: string;
    Rank: number;
}

export interface SocialMediaData{
    data: DataResponse<SocialMediaAttributes>[];
}

export interface SocialMediaInfo{
    id: number;
    attributes: SocialMediaAttributes;
}

export interface SocialMediaAttributes{
    Name: string;
    URL: string;
    social_media_type: SocialMediaTypeData;
}

export interface SocialMediaTypeData{
    data: SocialMediaTypeInfo;
}

export interface SocialMediaTypeInfo{
    id: number;
    attributes: SocialMediaTypeAttributes;
}

export interface SocialMediaTypeAttributes{
    Name: string;
    Rank: number;
    BaseURL: string;
}

export interface SocialMediaSaveData{
    data: {
        Name?: string;
        URL?: string;
        social_media_type?: { disconnect?: [{id?: number}], connect?: [{id?: number}] };
    }
}

export interface SuffixData{
    data: SuffixInfo;
}

export interface SuffixInfo{
    id: number;
    attributes: SuffixAttributes;
}

export interface SuffixAttributes{
    Name: string;
    Rank: number;
}

export interface UserData{
    data: UserDataInfo[];
}

export interface UserDataInfo{
    id: number;
    attributes: UserDataAttributes;
}

export interface UserDataAttributes{
    username: string;
    email: string;
}

export interface UserInfo{
    id: number;
    username: string;
    email: string;
}