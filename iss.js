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

module.exports = { fetchMyIP };
