const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZXRvZ3JhMSIsImEiOiJjazJtb3JoOTgwazdrM25wbnEyNTVmbnB5In0.kyBEyR4BHXi9PoyBFOLkmQ&limit=1`

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Invalid location entered!', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode