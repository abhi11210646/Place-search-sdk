'use strict';
const baseUrl = 'https://maps.googleapis.com/maps/api';
const { makeRequest, buildResponse, buildResponseForPlaceDetails } = require("./helper");
module.exports = class GooglePlace {
    constructor(apiKey) {
        this.apiKey = apiKey;
        if (!this.apiKey) throw new Error('Api key is required!');
    }
    getGeoLocation(adrs) {
        if (!adrs) {
            throw new Error('Address parameter is Required!');
        } else if (typeof adrs !== 'string') {
            throw new Error('Address must be in string format! e.g \'New Delhi\'');
        }
        return makeRequest(baseUrl + '/geocode/json?', {
            address: adrs,
            key: this.apiKey
        }).then((response) => {
            let res = JSON.parse(response.body);
            if (res.status != 'OK') throw new Error(res.error_message ? res.error_message : res.status);
            return res.results[0].geometry.location;
        });
    }
    nearBySearch(options) {
        const defaults = { geoCode: { lat: '', lng: '' } }
        options = Object.assign({}, defaults, options);
        if (!(options.geoCode instanceof Object && options.geoCode.lat && options.geoCode.lng))
            throw new Error('latitude(lat) and longitude(lng) are required!');
        return makeRequest(baseUrl + '/place/nearbysearch/json?', {
            location: `${options.geoCode.lat},${options.geoCode.lng}`,
            radius: 6000,
            type: options.searchType,
            key: this.apiKey
        }).then((response) => {
                let res = JSON.parse(response.body);
                if (res.status != 'OK') throw new Error(res.error_message ? res.error_message : res.status);
                return buildResponse(res.results);
            });
    }
    getPlaceImage(photo_reference, maxwidth = 400, maxheight = 400) {
        if (!photo_reference || typeof photo_reference !== 'string') {
            throw new Error('photo_reference must be in string format and non empty!');
        }
        return makeRequest(baseUrl + '/place/photo?', {
            maxwidth: maxwidth,
            maxheight: maxheight,
            photoreference: photo_reference,
            key: this.apiKey
        }).then((response) => {
                return response.url;
            });
    }
    getPlaceDetails(placeId) {
        if (!placeId || typeof placeId !== 'string')
            throw new Error('PlaceId is Expexted and in string format!');
        return makeRequest(baseUrl + '/place/details/json?', {
            placeid: placeId,
            key: this.apiKey
        }).then((response) => {
                let res = JSON.parse(response.body);
                if (res.status != 'OK') throw new Error(res.error_message ? res.error_message : res.status);
                return buildResponseForPlaceDetails(res.result);
            });
    }
};
