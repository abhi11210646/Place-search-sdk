'use strict';
const got = require("got");
const qs = require("querystring");
const baseUrl = 'https://maps.googleapis.com/maps/api';
module.exports = class GooglePlace {

    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    getGeoLocation(adrs) {
        checkApiKey(this.apiKey);

        if (!adrs)
            throw new Error('Pass address parameter');

        return makeRequest(baseUrl + '/geocode/json?', {
                address: adrs,
                key: this.apiKey
            })
            .then((response) => {
                return JSON.parse(response.body).results[0].geometry.location;
            })
            .catch((error) => {
                console.log('getgeoloc error', error);
                return error;
            });
    }
    nearBySearch(options) {
        checkApiKey(this.apiKey);

        if (!options.geoCode || !options.geoCode instanceof Object)
            throw new Error('latitude and longitude required and in correct format');

        return makeRequest(baseUrl + '/place/nearbysearch/json?', {
                location: `${options.geoCode.lat},${options.geoCode.lng}`,
                radius: 6000,
                type: options.searchType,
                key: this.apiKey
            })
            .then((response) => {
                return buildResponse(JSON.parse(response.body).results);
            })
            .catch((error) => {
                console.log('nearbysearch error', error);
                return error;

            });
    }
    getPlaceImage(photo_reference) {
        checkApiKey(this.apiKey);

        return makeRequest(baseUrl + '/place/photo?', {
                maxwidth: 400,
                photoreference: photo_reference,
                key: this.apiKey
            })
            .then((response) => {
                return response.url;
            })
            .catch((error) => {
                console.log('getplaceimg error', error);
                return error;

            });
    }
    getPlaceDetails(placeId) {
        checkApiKey(this.apiKey);

        if (!placeId)
            throw new Error('PlaceId is Expexted');

        return makeRequest(baseUrl + '/place/details/json?', {
                placeid: placeId,
                key: this.apiKey
            })
            .then((response) => {
                return buildResponseForPlaceDetails(JSON.parse(response.body).result);
            })
            .catch((error) => {
                console.log('error', error);
                return error;

            });
    }
};

/* private helper functions  */
function checkApiKey(apiKey) {
    if (!apiKey)
        throw new Error('api key is required');
}

function makeRequest(url, option) {
    return got(url + qs.stringify(option));
}

function buildResponse(responses) {
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
}

function buildResponseForPlaceDetails(response) {
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
