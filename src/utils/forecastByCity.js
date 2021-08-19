const geocode = require('./geocode');
const forecast = require('./forecast');


const forcastByCity = (city, callback) => {
  geocode(city, (err, data) => {
    if (err) {
      callback(err, null);
      return;
    } 
    const {place_name, longitude, latitude} = data;
    forecast(longitude, latitude, (error, data) => {
      if (error) {
        callback(error, null);
        return;
      }
      callback(null, `${place_name}: ${data}`);
    });
  });
};


module.exports = forcastByCity;