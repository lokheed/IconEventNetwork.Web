class LocalStorageKeyService{
    private readonly jwt: string;
    private readonly username: string;
    private readonly loginEmail: string;
    private readonly me: string;
    private readonly profileNav: string;

    constructor() {
        if (window.location.hostname.toLowerCase() === 'localhost')
        {
            this.jwt = 'dev-jwt';
            this.username = 'dev-username';
            this.loginEmail = 'dev-loginEmail'
            this.me = 'dev-me';
            this.profileNav = 'dev-profile-nav';
            return;
        }

        if (window.location.hostname.toLowerCase().startsWith('qa'))
        {
            this.jwt = 'qa-jwt';
            this.username = 'qa-username';
            this.loginEmail = 'qa-loginEmail';
            this.me = 'qa-me';
            this.profileNav = 'qa-profile-nav';
            return;
        } 

        if (window.location.hostname.toLowerCase().startsWith('stg'))
        {
            this.jwt = 'stg-jwt';
            this.username = 'stg-username';
            this.loginEmail = 'stg-loginEmail';
            this.me = 'stg-me';
            this.profileNav = 'stg-profile-nav';
            return;
        }
        
        this.jwt = 'jwt';
        this.username = 'username';
        this.loginEmail = 'loginEmail';
        this.me = 'me';
        this.profileNav = 'profile-nav';
    }
    
    /** Gets the strapi URL to use depending on the environment. */
    public get Jwt() { return this.jwt }

    /** Gets the cognito URL to use depending on the environment. */
    public get Username() { return this.username };

    public get LoginEmail() { return this.loginEmail };

    public get Me() { return this.me };

    public get ProfileNav() { return this.profileNav };
}

export const localStorageKeyService = new LocalStorageKeyService();