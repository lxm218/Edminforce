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
        orders : db.collection('EF-Orders'),
        classStudent: db.collection('EF-ClassStudent'),
        classes: db.collection('EF-Class')
    }

    let sessions = {
        'ukhFHRhhHzC3AcJWr': { name: 'Fall 2016' },
        'yQZFPZ52943t3K4u8':{ name:'Winter 2017' }
    }

    let sessionKeys = _.keys(sessions);
    for (let i = 0; i< sessionKeys.length; i++) {
        let key = sessionKeys[i];
        let sessionClasses = yield collections.classes.find({sessionID:key},{_id:1}).toArray();
        sessions[key].classes = _.reduce(sessionClasses, (result, value, key)=>{
            result[value._id] = 1;
            return result;
        }, {});
    }

    let customers = yield collections.customers.find({status:'Active'}, {_id:1, name:1, phone:1}).toArray();

    //customers = [customers[0],customers[1],customers[2]];
    let writer = csvWriter();
    writer.pipe(fs.createWriteStream('report.csv'))

    for (let i = 0; i<customers.length; i++) {
        let customer = customers[i];
        console.log('Process customer: ' + customer._id);

        customer.payment = _.mapValues(sessions, () => 0 );

        let customerOrders = yield collections.orders.find({
            accountID:customer._id, 
            status:'success'
        }, {
            details:1,
            paymentTotal:1,
            amount:1,
            discount:1,
            registrationFee:1,
            poundage:1,
            schoolCredit:1
        }).toArray();

        for (let j = 0; j<customerOrders.length; j++) {
            let customerOrder = customerOrders[j];

            if (customerOrder.paymentTotal <= 0) 
                continue;

            let paymentSessionKeys = {};
            for (let k = 0; k<customerOrder.details.length; k++) {
                let classStudentID = customerOrder.details[k];
                let classStudent =  yield collections.classStudent.findOne({_id:classStudentID});

                // check if the order is for the selected sessions
                if (classStudent) {
                    sessionKeys.forEach( (key) => {
                        if (sessions[key].classes[classStudent.classID]) {
                            paymentSessionKeys[key] = 1;
                        }
                    })
                }
            }
            
            // allocate payment 
            paymentSessionKeys = _.keys(paymentSessionKeys);
            if (paymentSessionKeys.length > 0) {
                let sessionPayment = customerOrder.paymentTotal / paymentSessionKeys.length;
                paymentSessionKeys.forEach( key => {
                    customer.payment[key] += sessionPayment;
                })
            }
        }

        let record = {
            name: customer.name,
            phone: customer.phone
        }

        sessionKeys.forEach( key => {
            record[sessions[key].name] = customer.payment[key];
        })

        writer.write(record);
        console.log(customer);
    }

    writer.end();

    db.close();
})
