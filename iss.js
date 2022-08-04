/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (err, res, bod)=>{
    if (err) {
      callback(err, null);
      return;
    }
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${bod}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, JSON.parse(bod).ip);
    return;
  });
};
const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (err, res, bod) => {
    if (err) return callback(err, null);
    let json = JSON.parse(bod);
    if (json.success !== true) {
      const msg = `Success is false when fetching IP. Response: ${bod}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, {lat: json.latitude, lon: json.longitude});
    return;
  });
};
const fetchISSFlyOverTimes = function(pos, callback){
  request(`https://iss-pass.herokuapp.com/json/?lat=${pos.lat}&lon=${pos.lon}`, (err, res, bod) => {
    if (err) return callback(err, null);
    if (res.statusCode !== 200) {
      callback(Error(`Bad status code. Body: ${bod}`), null);
      return;
    }
    let json = JSON.parse(bod).response;
    callback(null, json);
    return;
  });
}

const nextISSTimesForMyLocation = function(callback){
  fetchMyIP((error, ip) => {
    if (error){
      callback(err, null)
      return;
    }
    fetchCoordsByIP(ip, (err, coords)=>{
      if (err) {
        callback(err, null);
        return;
      }
      fetchISSFlyOverTimes(coords, (err, times)=>{
        if (err){
          callback(err, null);
          return;
        } 
        callback(null, times);
      });
    });
  });
}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };