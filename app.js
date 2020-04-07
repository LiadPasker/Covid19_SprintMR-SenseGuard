const fs = require('fs');
const SenseGuardDispacher = require('./SenseGuardDispacher').SenseGuardDispacher;

// senseGuardDispacher.readConfig().then((result) => {
//     result.parse();

// }).catch((err) => {
//     console.log(err);
// });

async function run(){
    let senseGuardDispacher = new SenseGuardDispacher();
    await senseGuardDispacher.init();
    senseGuardDispacher.parse();
    senseGuardDispacher.sendReports();
    console.log("File's parsing is done");
    // build json
    console.log('pushing to elastic');
    //push to elastic
}

run();