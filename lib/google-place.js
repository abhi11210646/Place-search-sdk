'use strict';
const baseUrl = 'https://maps.googleapis.com/maps/api';
const { checkApiKey, makeRequest, buildResponse, buildResponseForPlaceDetails } = require("./helper");
module.exports = class GooglePlace {

    constructor(apiKey) {
        this.apiKey = apiKey;
        checkApiKey(this.apiKey);
    }

    getGeoLocation(adrs) {

        if (!adrs)
            throw new Error('Address parameter is Required!');

        return makeRequest(baseUrl + '/geocode/json?', {
                address: adrs,
                key: this.apiKey
            })
            .then((response) => {
                if (res.status != 'OK') throw new Error(res.error_message);
                let res = JSON.parse(response.body);
                return res.results[0].geometry.location;
            });
    }
    nearBySearch(options) {

        if (!options.geoCode || !options.geoCode instanceof Object)
            throw new Error('latitude and longitude required and in correct format');

        return makeRequest(baseUrl + '/place/nearbysearch/json?', {
                location: `${options.geoCode.lat},${options.geoCode.lng}`,
                radius: 6000,
                type: options.searchType,
                key: this.apiKey
            })
            .then((response) => {
                if (res.status != 'OK') throw new Error(res.error_message);
                let res = JSON.parse(response.body);
                return buildResponse(res.results);
            });
    }
    getPlaceImage(photo_reference) {
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

        if (!placeId)
            throw new Error('PlaceId is Expexted!');

        return makeRequest(baseUrl + '/place/details/json?', {
                placeid: placeId,
                key: this.apiKey
            })
            .then((response) => {
                if (res.status != 'OK') throw new Error(res.error_message);
                let res = JSON.parse(response.body);
                return buildResponseForPlaceDetails(res.result);
            });
    }
};
