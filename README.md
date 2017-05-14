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

### geolocation 
    client.getGeoLocation('jalandhar')
    	.then(latlong => {
    		/*
            	{
            	    lat: 30.05758,
            	    lng: 31.94734
            	}
    		 */
    	});
    	
### nearbysearch	
	client.nearBySearch({geoCode: {lat:30.097575, lng: 31.3784737} , searchType: 'restaurant'})
	.then(result=>{
	    /*[{
            	   return all places with title , place id, photo reference etc
            }]
    	*/
	});
### place image
    photo_reference is a id returned by nearby search.
	client.getPlaceImage('photo_reference')
		.then(result=>{
	    /*[{
            	   will return image of place.
            }]
    	*/
	});

```