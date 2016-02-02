/**
 * Created on 9/14/15.
 */

Meteor.startup(function () {

    let collection = EdminForce.Collections.session;

    function resetData(){
        collection.remove({});

        let data = [
            {
                _id: "2016_session1",
                name: "2016 session1",
                startDate: new Date("1/1/2016"),
                endDate: new Date("3/31/2016"),
                registrationStartDate : new Date("12/1/2015"),
                registrationEndDate : new Date("2/1/2016"),
                registrationStatus :"Yes",
                createTime : new Date("11/1/2015")
            },
            {
                _id: "2016_session2",
                name: "2016 session2",
                startDate: new Date("3/31/2016"),
                endDate: new Date("6/30/2016"),
                registrationStartDate : new Date("2/1/2015"),
                registrationEndDate : new Date("5/1/2016"),
                registrationStatus :"Yes",
                createTime : new Date("1/1/2016")
            },
            {
                _id: "2016_session3",
                name: "2016 session3",
                startDate: new Date("6/30/2016"),
                endDate: new Date("9/30/2016"),
                registrationStartDate : new Date("5/1/2015"),
                registrationEndDate : new Date("8/1/2016"),
                registrationStatus :"Yes",
                createTime : new Date("3/1/2016")
            },
            {
                _id: "2016_session4",
                name: "2016 session4",
                startDate: new Date("9/30/2016"),
                endDate: new Date("12/30/2016"),
                registrationStartDate : new Date("8/1/2015"),
                registrationEndDate : new Date("11/1/2016"),
                registrationStatus :"Yes",
                createTime : new Date("6/1/2016")
            }
        ];

        _(data).forEach(function(item){
            collection.insert(item);
        });

    }

    if (collection.find({}).count() === 0) {
        resetData()
    }

});