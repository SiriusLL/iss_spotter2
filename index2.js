const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
} = require("./iss_promised");

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then((body) => {
//     console.log(body);
//   });

const printPassTimes = (passTimes) => {
  passTimes.map((time) => {
    const datetime = new Date(time.risetime);
    const duration = time.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  });
};

// call
nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((err) => {
    console.log("Catastrophic failure with error code: ", err.message);
  });
