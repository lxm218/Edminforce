let co = require('co');
let _ = require('lodash');
let fs = require('fs');
let csvWriter = require('csv-write-stream');
let MongoClient = require('mongodb').MongoClient

let url = 'mongodb://calcolor:Icalcolor123!@aws-us-east-1-portal.13.dblayer.com:10587/calcolor?ssl=true'

co (function *(){
    let db = yield MongoClient.connect(url);

    let collections = {
        customers : db.collection('EF-Customer')
    }

    let customers = yield collections.customers.find({}, {name:1, phone:1,email:1}).toArray();

    let writer = csvWriter();
    writer.pipe(fs.createWriteStream('families.csv'))

    for (let i = 0; i<customers.length; i++) {
        writer.write(_.pick(customers[i],["name","email","phone"]));
        console.log(customers[i]);
    }

    writer.end();
    db.close();
})
