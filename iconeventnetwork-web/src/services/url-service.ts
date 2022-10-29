class UrlService{
    getApiBaseUrl = () =>
    {
        if (window.location.hostname.toLowerCase() === 'localhost')
        {
            return 'http://localhost:1337';
        }

        if (window.location.hostname.toLowerCase().startsWith('qa'))
        {
            return 'https://qaapi.iconeventnetwork.com';
        } 

        if (window.location.hostname.toLowerCase().startsWith('stg'))
        {
            return 'https://stgapi.iconeventnetwork.com';
        }
        
        return 'https://api.iconeventnetwork.com';
    }
}

export const urlService = new UrlService();