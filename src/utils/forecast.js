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
            const dailyTempHigh = body.daily.data[0].temperatureHigh
            const dailyTempLow = body.daily.data[0].temperatureLow

            callback(undefined, `${dailySummary} It is currently ${currentTemp}°F out. Today's high is ${dailyTempHigh}°F and low is ${dailyTempLow}°F degrees. There is a ${currentPrecipProb}% chance of rain.`)
        }
    })
}


module.exports = forecast