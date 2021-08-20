const request = require('postman-request');


const forecast = (longitude, latitude, callback) => {
  const ACCESS_KEY = 'a671f07de68b6b8a54b1e4c5892cfbbb';
  const system = 'm'; //temperature: Fahrenheit
  const url = `http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=${latitude},${longitude}&units=${system}`;

  request( {
    url,
    method: 'GET',
    json: true
  }, (error, response) => {
    if (error) {
      callback(`Error: ${error.message}`, null);
      return;
    }
    //for invalid latitude and longitude the status code of response is still 200
    // but response.body is {success: false, ...}
    if (response.body.success === false) {
      callback('Invalid latitude or longitude!', null);
      return;
    }
    const currentData = response.body.current;
    const {temperature, feelslike, humidity, weather_descriptions: [weather_des]} = currentData;
    const data = (weather_des +
    `. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees. Humidity is %${humidity}.`);
    callback(null, data);
  });
};


module.exports = forecast;