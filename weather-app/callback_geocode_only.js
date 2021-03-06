const request = require('request')

const geocode = (address, callback) => {
    const mapbox_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWpzYTE3OTgiLCJhIjoiY2s5bTVxMXpjMDYzYTNxbnFkeG1qdThvNiJ9.4hmVhG-FFgUKCh9lDZmgBw&limit=1`

    request({url: mapbox_url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to fetch geocode data')
        } else if (!response.body.features) {
            callback('Unable to find geocode data.')
        } else {
            const longitude = response.body.features[0].geometry.coordinates[0]
            const latitude = response.body.features[0].geometry.coordinates[1]
        
            callback(undefined, {
                'longitude' : longitude,
                'latitude' : latitude
            });
        }
    })

}

geocode('Philadelphia', (error, data) => {
    console.log(data);
})