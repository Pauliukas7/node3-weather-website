const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicGF1bGl1a2FzczciLCJhIjoiY2t3cDBxNTExMDg0eDJxbDBjaXd5dTIyMyJ9.VAoHq2N4l_uB-AHyAAeOSw&limit=1";

  request({ url, json: true }, (err, res) => {
    if (err) {
      callback("Unable to connect to location services.");
    } else if (res.body.features.length === 0) {
      callback("Unable to find location. Try another search.");
    } else {
      callback(undefined, {
        latitude: res.body.features[0].center[0],
        longitude: res.body.features[0].center[1],
        location: res.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
