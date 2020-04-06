const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/89373d218ce94a22b2f363ddb1d7e3d9/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. The high today is '+ body.daily.data[0].temperatureHigh+' with a low of '+body.daily.data[0].temperatureLow +' and There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast