const request = require('request')

const weather = (latitude, longitude, location, callback)=>{
const url = 'https://api.darksky.net/forecast/89373d218ce94a22b2f363ddb1d7e3d9/' + encodeURIComponent(longitude)+ ',' + encodeURIComponent(latitude) + '?units=si'
    request({
    url: url,
    json: true
}, (error, response) => {
    if (error) {
        callback(response.body.error+ "Unable to connect to Weather Service, 1:"+ error, undefined)
    } else if (response.body.error) {
        // console.log(response.body.error)
        callback(response.body.error, undefined)
    } else {
        callback(undefined ,{
           summary: response.body.daily.data[0].summary,
           temperature: response.body.currently.temperature,
           rainProbability: response.body.currently.precipProbability,
           location: location
        })
    }
    // console.log(response)
})
}

module.exports = {
    weather: weather
}