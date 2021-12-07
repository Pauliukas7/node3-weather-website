const request = require("request");

const forecast = (address, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=4f9da33e7e88f7e3146aae254985fb1a&query=" +
    address;

  request({ url, json: true }, (err, res) => {
    if (err) {
      callback("Unable to connect to weather services.");
    } else if (res.body.error) {
      callback(res.body.error);
    } else {
      callback(
        undefined,
        `${res.body.current.weather_descriptions[0]}. It is currently ${res.body.current.temperature} degrees out. It feels like ${res.body.current.feelslike} degrees out`
      );
    }
  });
};

module.exports = forecast;
