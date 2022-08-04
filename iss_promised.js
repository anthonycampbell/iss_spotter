const request = require('request-promise-native');
const fetchMyIP = function (){
  return request('https://api.ipify.org?format=json');
}
const fetchCoordsByIP = function(body) {
  let ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};
const fetchISSFlyOverTimes = function(body){
  let obj = JSON.parse(body);
  let lat = obj.latitude;
  let lon = obj.longitude;
  return request(`https://iss-pass.herokuapp.com/json/?lat=${lat}&lon=${lon}`)
}

const nextISSTimesForMyLocation = function(){
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((body) => {
    const json = JSON.parse(body);
    return json;
  });
}

module.exports = { nextISSTimesForMyLocation };