class LocalStorageKeyService{
    private readonly jwt: string;
    private readonly refreshAfter: string;
    private readonly username: string;
    private readonly loginEmail: string;
    private readonly me: string;
    private readonly profileNav: string;

    constructor() {
        if (window.location.hostname.toLowerCase() === 'localhost')
        {
            this.jwt = 'dev-jwt';
            this.refreshAfter = 'dev-refreshAfter';
            this.username = 'dev-username';
            this.loginEmail = 'dev-loginEmail'
            this.me = 'dev-me';
            this.profileNav = 'dev-profile-nav';
            return;
        }

        if (window.location.hostname.toLowerCase().startsWith('qa'))
        {
            this.jwt = 'qa-jwt';
            this.refreshAfter = 'qa-refreshAfter';
            this.username = 'qa-username';
            this.loginEmail = 'qa-loginEmail';
            this.me = 'qa-me';
            this.profileNav = 'qa-profile-nav';
            return;
        } 

        if (window.location.hostname.toLowerCase().startsWith('stg'))
        {
            this.jwt = 'stg-jwt';
            this.refreshAfter = 'stg-refreshAfter';
            this.username = 'stg-username';
            this.loginEmail = 'stg-loginEmail';
            this.me = 'stg-me';
            this.profileNav = 'stg-profile-nav';
            return;
        }
        
        this.jwt = 'jwt';
        this.refreshAfter = 'refreshAfter';
        this.username = 'username';
        this.loginEmail = 'loginEmail';
        this.me = 'me';
        this.profileNav = 'profile-nav';
    }
    
    public get Jwt() { return this.jwt; }

    public get RefreshAfter() { return this.refreshAfter; }

    public get Username() { return this.username; }

    public get LoginEmail() { return this.loginEmail; }

    public get Me() { return this.me; }

    public get ProfileNav() { return this.profileNav; }
}

export const localStorageKeyService = new LocalStorageKeyService();