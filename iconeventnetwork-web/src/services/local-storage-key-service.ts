class LocalStorageKeyService{
    private readonly jwt: string;
    private readonly username: string;
    private readonly me: string;
    private readonly profileNav: string;
    private readonly emailTypesPerson: string;
    private readonly emailTypesPersonAtCompany: string;
    private readonly emailTypesCompany: string
    private readonly phoneNumberTypesPerson: string;
    private readonly phoneNumberTypesPersonAtCompany: string;
    private readonly phoneNumberTypesCompany: string
    private readonly phoneNumberCountries: string;

    constructor() {
        if (window.location.hostname.toLowerCase() === 'localhost')
        {
            this.jwt = 'dev-jwt';
            this.username = 'dev-username';
            this.me = 'dev-me';
            this.profileNav = 'dev-profile-nav';
            this.emailTypesPerson = 'dev-email-types-person';
            this.emailTypesPersonAtCompany = 'dev-email-types-person-at-company';
            this.emailTypesCompany = 'dev-email-types-company';
            this.phoneNumberTypesPerson = 'dev-phone-number-types-person';
            this.phoneNumberTypesPersonAtCompany = 'dev-phone-number-types-person-at-company';
            this.phoneNumberTypesCompany = 'dev-phone-number-types-company';
            this.phoneNumberCountries = 'dev-phone-number-countries';
            return;
        }

        if (window.location.hostname.toLowerCase().startsWith('qa'))
        {
            this.jwt = 'qa-jwt';
            this.username = 'qa-username';
            this.me = 'qa-me';
            this.profileNav = 'qa-profile-nav';
            this.emailTypesPerson = 'qa-email-types-person';
            this.emailTypesPersonAtCompany = 'qa-email-types-person-at-company';
            this.emailTypesCompany = 'qa-email-types-company';
            this.phoneNumberTypesPerson = 'qa-phone-number-types-person';
            this.phoneNumberTypesPersonAtCompany = 'qa-phone-number-types-person-at-company';
            this.phoneNumberTypesCompany = 'qa-phone-number-types-company';
            this.phoneNumberCountries = 'qa-phone-number-countries';
            return;
        } 

        if (window.location.hostname.toLowerCase().startsWith('stg'))
        {
            this.jwt = 'stg-jwt';
            this.username = 'stg-username';
            this.me = 'stg-me';
            this.profileNav = 'stg-profile-nav';
            this.emailTypesPerson = 'stg-email-types-person';
            this.emailTypesPersonAtCompany = 'stg-email-types-person-at-company';
            this.emailTypesCompany = 'stg-email-types-company';
            this.phoneNumberTypesPerson = 'stg-phone-number-types-person';
            this.phoneNumberTypesPersonAtCompany = 'stg-phone-number-types-person-at-company';
            this.phoneNumberTypesCompany = 'stg-phone-number-types-company';
            this.phoneNumberCountries = 'stg-phone-number-countries';
            return;
        }
        
        this.jwt = 'jwt';
        this.username = 'username';
        this.me = 'me';
        this.profileNav = 'profile-nav';
        this.emailTypesPerson = 'email-types-person';
        this.emailTypesPersonAtCompany = 'email-types-person-at-company';
        this.emailTypesCompany = 'email-types-company';
        this.phoneNumberTypesPerson = 'phone-number-types-person';
        this.phoneNumberTypesPersonAtCompany = 'phone-number-types-person-at-company';
        this.phoneNumberTypesCompany = 'phone-number-types-company';
        this.phoneNumberCountries = 'phone-number-countries';
}

    /** Gets the strapi URL to use depending on the environment. */
    public get Jwt() { return this.jwt }

    /** Gets the cognito URL to use depending on the environment. */
    public get Username() { return this.username };

    public get Me() { return this.me };

    public get ProfileNav() { return this.profileNav };

    public get EmailTypesPerson() { return this.emailTypesPerson };

    public get EmailTypesPersonAtCompany() { return this.emailTypesPersonAtCompany };

    public get EmailTypesCompany() { return this.emailTypesCompany };

    public get PhoneNumberTypesPerson() { return this.phoneNumberTypesPerson };

    public get PhoneNumberTypesPersonAtCompany() { return this.phoneNumberTypesPersonAtCompany };

    public get PhoneNumberTypesCompany() { return this.phoneNumberTypesCompany };

    public get PhoneNumberCountries() { return this.phoneNumberCountries };
}

export const localStorageKeyService = new LocalStorageKeyService();