class UrlService{
    private readonly apiBaseUrl: string;
    private readonly environmentName: 'DEV' | 'QA' | 'STG' | 'PROD';

    constructor() {
        if (window.location.hostname.toLowerCase() === 'localhost')
        {
            this.apiBaseUrl = 'http://localhost:1337';
            this.environmentName = 'DEV';
            return;
        }

        if (window.location.hostname.toLowerCase().startsWith('qa'))
        {
            this.apiBaseUrl = 'https://qaapi.theiconnetwork.com';
            this.environmentName = 'QA';
            return;
        } 

        if (window.location.hostname.toLowerCase().startsWith('stg'))
        {
            this.apiBaseUrl = 'https://stgapi.theiconnetwork.com';
            this.environmentName = 'STG';
            return;
        }
        
        this.apiBaseUrl = 'https://api.theiconnetwork.com';
        this.environmentName = 'PROD';
    }

    /** Gets the strapi URL to use depending on the environment. */
    public get ApiBaseUrl() { return this.apiBaseUrl }

    /** Gets the cognito client ID to use depending on the environment. */
    public get EnvironmentName() { return this.environmentName };
}

export const urlService = new UrlService();