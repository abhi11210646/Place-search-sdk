'use strict';
const baseUrl = 'https://maps.googleapis.com/maps/api';
const { checkApiKey, makeRequest, buildResponse, buildResponseForPlaceDetails } = require("./helper");
module.exports = class GooglePlace {

    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    getGeoLocation(adrs) {
        checkApiKey(this.apiKey);

        if (!adrs)
            throw new Error('Address parameter is Required!');

        return makeRequest(baseUrl + '/geocode/json?', {
                address: adrs,
                key: this.apiKey
            })
            .then((response) => {
                let res = JSON.parse(response.body);
                if (res.status === 'REQUEST_DENIED') throw new Error(res.error_message);
                return res.results[0].geometry.location;
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
                let res = JSON.parse(response.body);
                if (res.status === 'REQUEST_DENIED') throw new Error(res.error_message);
                return buildResponse(res.results);
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
            });
    }
    getPlaceDetails(placeId) {
        checkApiKey(this.apiKey);

        if (!placeId)
            throw new Error('PlaceId is Expexted!');

        return makeRequest(baseUrl + '/place/details/json?', {
                placeid: placeId,
                key: this.apiKey
            })
            .then((response) => {
                let res = JSON.parse(response.body);
                if (res.status === 'INVALID_REQUEST') throw new Error('Invalid Request!');
                return buildResponseForPlaceDetails(res.result);
            });
    }
};
