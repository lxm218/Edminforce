let co = require('co');
let _ = require('lodash');
let fs = require('fs');
let csvWriter = require('csv-write-stream');
let MongoClient = require('mongodb').MongoClient

let url = 'mongodb://calcolor:Icalcolor123!@aws-us-east-1-portal.13.dblayer.com:10587/calcolor?ssl=true'

co (function *(){
    let db = yield MongoClient.connect(url);

    let collections = {
        customers : db.collection('EF-Customer'),
        students: db.collection('EF-Student')
    }

    let customers = yield collections.customers.find({}).toArray();

    let writer = csvWriter();
    writer.pipe(fs.createWriteStream('students.csv'))

    for (let i = 0; i< customers.length; i++) {

        let students = yield collections.students.find({accountID:customers[i]._id}).toArray();

        //writer.write(_.pick(customers[i],["name","email","phone"]));
        console.log(customers[i]);

        for (let j = 0; j<students.length; j++) {
            console.log(students[j])

            writer.write({
                id: customers[i]._id,
                guardian: customers[i].name,
                email: customers[i].email,
                phone: customers[i].phone,
                location: customers[i].location,
                student: students[j].name,
                gender: students[j].profile.gender,
                dob: students[j].profile.birthday
            })
        }
    }

    writer.end();
    db.close();
})
