# Place Search
> Search for near by place, get geolocation, place images and place details


## Installation

```
$ npm i place-search-sdk

```


## Usage

**Note**: You'll need to Enable place API key in google developer console(https://console.developers.google.com/).

```js
const googlePlace = require('place-search-sdk');

const client = new googlePlace('API-KEY')
```
### Geolocation 
```js
client.getGeoLocation('jalandhar')
	.then(latlong => {
		/*
        	{
        	    lat: 30.05758,
        	    lng: 31.94734
        	}
		 */
	});
  ```
### Near By Search
```js
client.nearBySearch({geoCode: {lat:30.097575, lng: 31.3784737} , searchType: 'restaurant'})
.then(result=>{
    /*[{
         return all places with details title, place id, photo reference, geomatric location, rating etc etc.
        	name:
            icon:
            rating:
            photo_reference: 
            address: 
            placeId: 
        }]
	*/
});
```
### Place Image
photo_reference is a id returned by nearby search.
```js
client.getPlaceImage('photo_reference')
	.then(result=>{
    /*[{
        	   will return image of place.
        }]
	*/
});
```
### Place Details
placeId is a id returned by nearby search.
```js
client.getPlaceDetails('placeid')
	.then(result=>{
    /*[{
        	will return all details of a place. like
        	address: 
            phoneNumber: 
            phoneNumberInternational: 
            rating: 
            website: 
            utc_offset:
            photos: 
            reviews: 
            opening_hours:
        }]
	*/
});

```