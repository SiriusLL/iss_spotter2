/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require("request");

const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API
  const IPUrl = "https://api.ipify.org/?format=json";

  request(IPUrl, (error, response, body) => {
    // console.log("body", body, typeof body);
    if (error) {
      callback(error, null);
    }
    // console.log("rrrrrr", response.statusCode);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} wehn fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    // console.log("ip", ip);
    callback(null, ip);
  });
};

const fetchCoordsByIP = function (ip, callback) {
  // const ip = "209.205.79.252";
  const geoUrl = `https://freegeoip.app/json/${ip}`;

  request(geoUrl, (error, response, body) => {
    if (error) {
      // console.log("there was an error with the request");
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} wehn fetching COORDS. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const coords = JSON.parse(body);
    // console.log("coords", coords);
    const result = { latitude: coords.latitude, longitude: coords.longitude };
    callback(null, result);
  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  // console.log("ccc", typeof coords.latitude, coords.longitude);
  const ISSUrl = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(ISSUrl, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} wehn fetching ISS pass times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const passes = JSON.parse(body).response;
    // console.log("bodyFOT", passes);
    callback(null, passes);
  });
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(error, null);
        return;
      }
      fetchISSFlyOverTimes(coords, (error, passes) => {
        if (error) {
          callback(error, null);
          return;
        }
        callback(null, passes);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};
