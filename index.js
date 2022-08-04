// index.js
const nextISSTimesForMyLocation = require('./iss').nextISSTimesForMyLocation;
nextISSTimesForMyLocation((err, times) =>{
  if (err) {
    console.log(err);
  } else {
    for (let t of times){
      let d = new Date(0);
      d.setUTCSeconds(t.risetime);
      console.log(`Next pass at ${d} for ${t.duration} seconds!`);
    }
  }
});