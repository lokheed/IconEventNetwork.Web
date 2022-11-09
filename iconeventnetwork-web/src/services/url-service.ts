class UrlService{
    getApiBaseUrl = () =>
    {
        if (window.location.hostname.toLowerCase() === 'localhost')
        {
            return 'http://localhost:1337';
        }

        if (window.location.hostname.toLowerCase().startsWith('qa'))
        {
            return 'https://qaapi.theiconnetwork.com';
        } 

        if (window.location.hostname.toLowerCase().startsWith('stg'))
        {
            return 'https://stgapi.theiconnetwork.com';
        }
        
        return 'https://api.theiconnetwork.com';
    }
}

export const urlService = new UrlService();