class LocalStorageKeyService{
    private readonly jwt: string;
    private readonly username: string;

    constructor() {
        if (window.location.hostname.toLowerCase() === 'localhost')
        {
            this.jwt = 'dev-jwt';
            this.username = 'dev-username';
            return;
        }

        if (window.location.hostname.toLowerCase().startsWith('qa'))
        {
            this.jwt = 'qa-jwt';
            this.username = 'qa-username';
            return;
        } 

        if (window.location.hostname.toLowerCase().startsWith('stg'))
        {
            this.jwt = 'stg-jwt';
            this.username = 'stg-username';
            return;
        }
        
        this.jwt = 'jwt';
        this.username = 'username';
    }

    /** Gets the strapi URL to use depending on the environment. */
    public get Jwt() { return this.jwt }

    /** Gets the cognito URL to use depending on the environment. */
    public get Username() { return this.username };
}

export const localStorageKeyService = new LocalStorageKeyService();