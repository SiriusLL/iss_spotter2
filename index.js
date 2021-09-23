const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
} = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);
// });

// fetchCoordsByIP("209.205.79.252", (error, coords) => {
//   if (error) {
//     console.log("It didn't work", error);
//     return;
//   }
//   console.log("It worked! Returned Coordinates are: ", coords);
// });

// fetchISSFlyOverTimes(
//   { latitude: "50.9129", longitude: "-114.1028" },
//   (error, passes) => {
//     if (error) {
//       console.log("It didn't work", error);
//       return;
//     }
//     console.log("It worked! Returned Coordinates are: ", passes);
//   }
// );

const printPassTimes = (passTimes) => {
  passTimes.map((time) => {
    // console.log(time.risetime);
    const datetime = new Date(time.risetime);
    // console.log(datetime.toUTCString());
    // datetime.setUTCSeconds(passTimes.risetime);
    const duration = time.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  });
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log("It didn't work", error);
    return;
  }
  console.log("It worked! Here is the Pirate Treasure: ", passTimes);
  printPassTimes(passTimes);
});
