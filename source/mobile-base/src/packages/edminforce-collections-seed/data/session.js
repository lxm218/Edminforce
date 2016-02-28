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
                startDate: moment("1/1/2016", 'MM/DD/YYYY').toDate(),
                endDate: moment("3/31/2016", 'MM/DD/YYYY').toDate(),
                registrationStartDate : moment("12/1/2015", 'MM/DD/YYYY').toDate(),
                registrationEndDate : moment("2/1/2016", 'MM/DD/YYYY').toDate(),
                registrationStatus :"Yes",
                createTime : moment("11/1/2016", 'MM/DD/YYYY').toDate()
            },
            {
                _id: "2016_session2",
                name: "2016 session2",
                startDate: moment("3/31/2016", 'MM/DD/YYYY').toDate(),
                endDate: moment("6/30/2016", 'MM/DD/YYYY').toDate(),
                registrationStartDate : moment("2/1/2016", 'MM/DD/YYYY').toDate(),
                registrationEndDate : moment("5/1/2016", 'MM/DD/YYYY').toDate(),
                registrationStatus :"Yes",
                createTime : moment("1/1/2016", 'MM/DD/YYYY').toDate()
            },
            {
                _id: "2016_session3",
                name: "2016 session3",
                startDate: moment("6/30/2016", 'MM/DD/YYYY').toDate(),
                endDate: moment("9/30/2016", 'MM/DD/YYYY').toDate(),
                registrationStartDate : moment("5/1/2016", 'MM/DD/YYYY').toDate(),
                registrationEndDate : moment("8/1/2016", 'MM/DD/YYYY').toDate(),
                registrationStatus :"Yes",
                createTime : moment("3/1/2016", 'MM/DD/YYYY').toDate()
            },
            {
                _id: "2016_session4",
                name: "2016 session4",
                startDate: moment("9/30/2016", 'MM/DD/YYYY').toDate(),
                endDate: moment("12/30/2016", 'MM/DD/YYYY').toDate(),
                registrationStartDate : moment("8/1/2016", 'MM/DD/YYYY').toDate(),
                registrationEndDate : moment("11/1/2016", 'MM/DD/YYYY').toDate(),
                registrationStatus :"Yes",
                createTime : moment("6/1/2016", 'MM/DD/YYYY').toDate()
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