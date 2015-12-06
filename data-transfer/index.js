'use strict';

let excel = require('excel');
let jsonfile = require('jsonfile');
let fs = require('fs');
let Q = require('q');

excel('data/example-of-class.xlsx', function (err, data) {
    if (err) throw err;

    let classSchema = {
        "_id": "",
        "programId": "paced",
        "sessionId": "",
        "name": "",
        "levels": [],
        "day": 1,
        "startTime": 54000000,
        "endTime": 55800000,
        "price": 100,
        "seatsTotal": 10,
        "seatsReamin": 10,
        "students": [],
        "pendingTransactions": []
    };

    let classes = [];
    let classesData = [];

    // ['MON0220', 'intense3', 1, ["BUB1"], "20:00", "20:45", "Intense 3 8:00-8:45pm", "Nicholas", "L", 'intense']

    // the first item is title, so skip first item
    for(let i=1; i<data.length; i++){
        let item = data[i];
        let classItem = [];

        let session = item[0];
        let program = item[1];
        let day = item[2];
        let level = item[3];
        let time = item[4];
        let classID = item[5];
        let className = item[6];
        let coach = item[7];
        let pool = item[8];
        let lane = item[9];
        let registrationStartDate = item[10];
        let sessionStartDate = item[11];
        let sessionEndDate = item[12];


    }

    jsonfile.writeFile('output/example-of-class.json', data, {spaces: 2}, function (err) {
        console.error(err);
    });

});
