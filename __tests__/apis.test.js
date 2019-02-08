const expect = require("chai").expect;
const googlePlace = require('./../lib/google-place');
const client = new googlePlace(process.env.API_KEY);
describe('##Place API##', () => {
    describe('getGeoLocation()', () => {
        it('it should throw error if lat/lng not passed', () => {
            expect(() => client.getGeoLocation()).to.throw('Address parameter is Required!');
        });
        it('it should throw error if Invalid input is passed', () => {
            expect(() => client.getGeoLocation(1234)).to.throw(/Address must be in string format!/);
        });
        it('it should return lat/lng on valid input', async () => {
            const latlng = await client.getGeoLocation('jalandhar');
            expect(latlng).to.be.a('object').with.keys('lat', 'lng')
        });
    });
    describe('nearBySearch()', () => {
        it('it should throw error if Invalid Input is passed', () => {
            expect(() => client.nearBySearch({ geoCode: null })).to.throw('latitude(lat) and longitude(lng) are required!')
        });
        it('it should return result on valid input', async () => {
            const result = await client
                .nearBySearch({ geoCode: { lat: 30.097575, lng: 31.3784737 }, searchType: 'restaurant' });
            expect(result).to.be.a('array');
        });
    });
    describe('getPlaceImage()', () => {
        it('it should throw error if photo_reference is not passed', () => {
            expect(() => client.getPlaceImage()).to.throw('photo_reference must be in string format and non empty!');
        });
        it('it should return result on valid input', async () => {
            const result = await client
                .getPlaceImage('CnRvAAAAwMpdHeWlXl-lH0vp7lez4znKPIWSWvgvZFISdKx45AwJVP1Qp37YOrH7sqHMJ8C-vBDC546decipPHchJhHZL94RcTUfPa1jWzo-rSHaTlbNtjh-N68RkcToUCuY9v2HNpo5mziqkir37WU8FJEqVBIQ4k938TI3e7bf8xq-uwDZcxoUbO_ZJzPxremiQurAYzCTwRhE_V0');
            expect(result).to.be.a('string');
        });
    });
    describe('getPlaceDetails()', () => {
        it('it should throw error if Input is not passed', () => {
            expect(() => client.getPlaceDetails()).to.throw('PlaceId is Expexted and in string format!');
        });
        it('it should return result on valid input', async () => {
            const result = await client
                .getPlaceDetails('ChIJkUPgkZs_WBQRIxJMS1zP86M');
            expect(result).to.be.a('object');
        });
    });
});