const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/5a142894d872ac4be170dc407cc8b38d/'+ encodeURIComponent(longitude) +','+ encodeURIComponent(latitude) +'?units=si';

    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('no internet', undefined);
        }else if(body.error){
            callback('No location found forecast', undefined);
        }else{
           callback(undefined, {
                summary: 'Today is: '+ body.daily.data[0].summary,
                temp: body.currently.temperature,
                timezone: body.timezone
                
            });
        }
    });
}
module.exports = forecast;