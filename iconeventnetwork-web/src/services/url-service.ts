class UrlService{
    private readonly apiBaseUrl: string;
    private readonly cognitoBaseUrl: string;
    private readonly cognitoClientId: string;

    constructor() {
        if (window.location.hostname.toLowerCase() === 'localhost')
        {
            this.apiBaseUrl = 'http://localhost:1337';
            this.cognitoBaseUrl = 'http://deviconeventnetwork.auth.us-east-1.amazoncognito.com/';
            this.cognitoClientId = '794a2cmjve48m7gq4solf4k1v';
            return;
        }

        if (window.location.hostname.toLowerCase().startsWith('qa'))
        {
            this.apiBaseUrl = 'https://qaapi.theiconnetwork.com';
            this.cognitoBaseUrl = 'https://qaiconeventnetwork.auth.us-east-1.amazoncognito.com/';
            this.cognitoClientId = '1k9u2t8al652k79283a6hsqj3';
            return;
        } 

        if (window.location.hostname.toLowerCase().startsWith('stg'))
        {
            this.apiBaseUrl = 'https://stgapi.theiconnetwork.com';
            this.cognitoBaseUrl = 'https://stgiconeventnetwork.auth.us-east-1.amazoncognito.com/';
            this.cognitoClientId = '1i6chmckpi833hea22en6r82s2';
            return;
        }
        
        this.apiBaseUrl = 'https://api.theiconnetwork.com';
        this.cognitoBaseUrl = 'https://iconeventnetwork.auth.us-east-1.amazoncognito.com';
        this.cognitoClientId = '6gs898o3k11pu8q57da2p4lkcs';
    }

    /** Gets the strapi URL to use depending on the environment. */
    public get ApiBaseUrl() { return this.apiBaseUrl }

    /** Gets the cognito URL to use depending on the environment. */
    public get CognitoBaseUrl() { return this.cognitoBaseUrl };

    /** Gets the cognito client ID to use depending on the environment. */
    public get CognitoClientId() { return this.cognitoClientId };
}

export const urlService = new UrlService();