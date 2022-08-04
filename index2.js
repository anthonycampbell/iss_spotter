const { nextISSTimesForMyLocation } = require('./iss_promised');
nextISSTimesForMyLocation()
  .then((response) => {
    for (let time of response.response) {
      let date = new Date(0);
      date.setUTCSeconds(time.risetime);
      console.log(`Next pass at ${date} for ${time.duration} seconds!`);
    }
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });