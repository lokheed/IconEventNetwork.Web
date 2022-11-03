class CognitoService{
    getClientId = () =>
    {
        if (window.location.hostname.toLowerCase() === 'localhost')
        {
            return '794a2cmjve48m7gq4solf4k1v';
        }

        if (window.location.hostname.toLowerCase().startsWith('qa'))
        {
            return '1k9u2t8al652k79283a6hsqj3';
        } 

        if (window.location.hostname.toLowerCase().startsWith('stg'))
        {
            return '1i6chmckpi833hea22en6r82s2';
        }
        
        return '6gs898o3k11pu8q57da2p4lkcs';
    }
    getBaseUrl = () =>
    {
        if (window.location.hostname.toLowerCase() === 'localhost')
        {
            return 'http://deviconeventnetwork.auth.us-east-1.amazoncognito.com/';
        }

        if (window.location.hostname.toLowerCase().startsWith('qa'))
        {
            return 'https://qaiconeventnetwork.auth.us-east-1.amazoncognito.com/';
        } 

        if (window.location.hostname.toLowerCase().startsWith('stg'))
        {
            return 'https://stgiconeventnetwork.auth.us-east-1.amazoncognito.com/';
        }
        
        return 'https://iconeventnetwork.auth.us-east-1.amazoncognito.com';
    }
}

export const cognitoService = new CognitoService();