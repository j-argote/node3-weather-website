const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/90c6b702f679d77d345156a0e00cd0be/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Invalid coordinates!', undefined)
        } else {
            const currentTemp = body.currently.temperature
            const currentPrecipProb = body.currently.precipProbability
            const dailySummary = body.daily.data[0].summary

            callback(undefined, `${dailySummary} It is currently ${currentTemp} degrees out. There is a ${currentPrecipProb}% chance of rain.`)
        }
    })
}


module.exports = forecast