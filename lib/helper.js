const got = require("got");
const qs = require("querystring");
module.exports = {

        checkApiKey: (apiKey) => {
            if (!apiKey)
                throw new Error('Api key is required!');
        },
        
        makeRequest: (url, option) => {
            return got(url + qs.stringify(option));
        },
        
        buildResponse: (responses) => {
            return responses.map((response) => {
                return {
                    name: response.name,
                    icon: response.icon,
                    rating: response.rating || '',
                    photo_reference: response.photos ? response.photos[0].photo_reference : '',
                    address: response.vicinity,
                    placeId: response.place_id
                };
            });
        },

        buildResponseForPlaceDetails: (response) => {
            return {
                address: response.formatted_address || '',
                phoneNumber: response.formatted_phone_number || '',
                phoneNumberInternational: response.international_phone_number || '',
                rating: response.rating || '',
                website: response.website || '',
                utc_offset: response.utc_offset || 0,
                photos: response.photos || [],
                reviews: response.reviews || [],
                opening_hours: response.opening_hours.weekday_text || ''

            };

        }
};
