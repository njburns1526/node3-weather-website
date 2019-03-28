const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/1cfaa3dc3214dd6c4d571dbadecac905/' + lat + ',' + lon
    request({url, json: true}, (error, {body}) => {
    if(error) {
        callback('Unable to connect to weather service.', undefined)
    } else if (body.error) {
        callback('Unable to find location. Try another location', undefined)
    } else {
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.' )
    }
})
}

module.exports = forecast

// const url = 'https://api.darksky.net/forecast/1cfaa3dc3214dd6c4d571dbadecac905/37.8267,-122.4233?'
// request({url: url, json: true}, (error, response) => {
//     if(error) {
//         console.log('Unable to connect to weather service.')
//     } else if (response.body.error) {
//         console.log('Unable to find location.')
//     } else {
//         console.log(response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.' )
//     }
    
// })