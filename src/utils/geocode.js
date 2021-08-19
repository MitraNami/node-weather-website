const request = require('postman-request');


const geocode = (city, callback) => {
  /*
  Input: city (string), callback: function(error, data)
  data is an object with keys place_name, longitude, latitude
  */
  const limit = 1;
  const ACCESS_TOKEN = 'pk.eyJ1IjoibWl0cmEtbiIsImEiOiJja3MxMHhlaGgwcnJoMm9yd2F0eHpzYnQ4In0.rM7bvVJujGZFU2pUeoG18Q';
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=${ACCESS_TOKEN}&limit=${limit}`;

  request({
    url,
    method: 'GET',
    json: true
  }, (error, response) => {
    if (error) {
      callback(`Error: ${error.message}`, null);
      return;
    }
    const mostRelaventData = response.body.features[0];
    // if the city is not found the array corresponding to 'features' key will be empty
    // so mostRelaventData will be undefined
    if (!mostRelaventData) {
      //city was not found
      callback('City not found!', null);
      return;
    }
    const {place_name, center: [longitude, latitude]} = mostRelaventData;
    callback(null, {place_name, longitude, latitude});
  });
};

module.exports = geocode;