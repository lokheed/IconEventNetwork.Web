class RegxService{
    public readonly password: string = '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-+=._ ])';
}

export const regxService = new RegxService();