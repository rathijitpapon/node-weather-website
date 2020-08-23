const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=d486dbe9cacdd7cfd08109bf2ed8f01b'

    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback("Unable to connect weather service!", undefined);
        } else if (body.cod != 200) {
            callback("Unable to find location", undefined);
        } else {
            callback(undefined, "It's currently " +
                (body.main.temp - 273.15).toFixed(2) +
                " degree celsius temperature out. Now it feels like " +
                (body.main.feels_like - 273.15).toFixed(2) +
                " degree celsius. Current weather condition is " +
                body.weather[0].description + ".")
        }
    })
}


module.exports = forecast