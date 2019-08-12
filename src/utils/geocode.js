const request = require('request');
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicmlvbmR1YiIsImEiOiJjano0aDlpYWYwMGJkM25xaTVhaXdvZ2NqIn0.d65Y04dQyw_e-3aqCsFtMw';

    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('No Internet', undefined);
        }else if(body.features.length === 0){
            callback('No Location Found!', undefined);
        }else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
}
module.exports = geocode;