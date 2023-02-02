class LocalStorageKeyService{
    private readonly jwt: string;
    private readonly username: string;
    private readonly me: string;

    constructor() {
        if (window.location.hostname.toLowerCase() === 'localhost')
        {
            this.jwt = 'dev-jwt';
            this.username = 'dev-username';
            this.me = 'dev-me';
            return;
        }

        if (window.location.hostname.toLowerCase().startsWith('qa'))
        {
            this.jwt = 'qa-jwt';
            this.username = 'qa-username';
            this.me = 'qa-me';
            return;
        } 

        if (window.location.hostname.toLowerCase().startsWith('stg'))
        {
            this.jwt = 'stg-jwt';
            this.username = 'stg-username';
            this.me = 'stg-me';
            return;
        }
        
        this.jwt = 'jwt';
        this.username = 'username';
        this.me = 'me';
    }

    /** Gets the strapi URL to use depending on the environment. */
    public get Jwt() { return this.jwt }

    /** Gets the cognito URL to use depending on the environment. */
    public get Username() { return this.username };

    public get Me() { return this.me };
}

export const localStorageKeyService = new LocalStorageKeyService();