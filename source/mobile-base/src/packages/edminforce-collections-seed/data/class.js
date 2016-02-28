/**
 * Created on 9/14/15.
 */

Meteor.startup(function () {

    let collection = EdminForce.Collections.class;

    function resetData() {
        collection.remove({});

        let data = [
            {
                _id: "class1",
                name: "Beginning-Mon-3:00",
                programID: "beginning",
                sessionID: "2016_session1",
                status: "Active",
                length: "60min",
                levels: ['Beginner', 'Intermediate', 'Advanced'],
                teacher: "Tracy",

                schedule: {
                    day: 'Mon',
                    time: "3:00 pm"
                },

                tuition: {
                    type: "total",
                    money: "200"
                },
                maxStudent: 2,

                minStudent: 0,
                trialStudent: 0,

                minAgeRequire: 0,
                maxAgeRequire: 100,
                genderRequire: "All",

                createTime: new Date("1/1/2016")
            },
            {
                _id: "class2",
                name: "Beginning-Tues-3:00",
                programID: "beginning",
                sessionID: "2016_session2",
                status: "Active",
                length: "60min",
                levels: ['Beginner', 'Intermediate', 'Advanced'],
                teacher: "Amy",

                schedule: {
                    day: 'Tues',
                    time: "3:00 pm"
                },

                tuition: {
                    type: "total",
                    money: "200"
                },
                maxStudent: 2,

                minStudent: 0,
                trialStudent: 2,

                minAgeRequire: 0,
                maxAgeRequire: 100,
                genderRequire: "All",

                createTime: new Date("1/1/2016")
            },
            {
                _id: "class3",
                name: "Beginning-Fri-3:00",
                programID: "beginning",
                sessionID: "2016_session3",
                status: "Active",
                length: "60min",
                levels: ['Beginner', 'Intermediate', 'Advanced'],
                teacher: "Tracy",
                schedule: {
                    day: 'Fri',
                    time: "3:00 pm"
                },

                tuition: {
                    type: "total",
                    money: "300"
                },
                maxStudent: 2,

                minStudent: 0,
                trialStudent: 1,

                minAgeRequire: 0,
                maxAgeRequire: 100,
                genderRequire: "All",

                createTime: new Date("1/1/2016")
            },
            {
                _id: "class4",
                name: "Beginning-Sat-3:00",
                programID: "beginning",
                sessionID: "2016_session4",
                status: "Active",
                length: "60min",
                levels: ['Beginner', 'Intermediate', 'Advanced'],
                teacher: "Amy",

                schedule: {
                    day: 'Sat',
                    time: "3:00 pm"
                },

                tuition: {
                    type: "total",
                    money: "250"
                },
                maxStudent: 2,

                minStudent: 0,
                trialStudent: 3,

                minAgeRequire: 0,
                maxAgeRequire: 100,
                genderRequire: "All",

                createTime: new Date("1/1/2016")
            },
            {
                _id: "class5",
                name: "Intermediate-Mon-3:00",
                programID: "intermediate",
                sessionID: "2016_session1",
                status: "Active",
                length: "90min",
                levels: ['Beginner', 'Intermediate', 'Advanced'],
                teacher: "Jason",

                schedule: {
                    day: 'Mon',
                    time: "3:00 pm"
                },

                tuition: {
                    type: "total",
                    money: "300"
                },
                maxStudent: 2,

                minStudent: 0,
                trialStudent: 2,

                minAgeRequire: 0,
                maxAgeRequire: 100,
                genderRequire: "All",

                createTime: new Date("1/1/2016")
            },
            {
                _id: "class6",
                name: "Intermediate-Tues-3:00",
                programID: "intermediate",
                sessionID: "2016_session2",
                status: "Active",
                length: "90min",
                levels: ['Beginner', 'Intermediate', 'Advanced'],
                teacher: "Lucy",

                schedule: {
                    day: 'Tues',
                    time: "3:00 pm"
                },

                tuition: {
                    type: "total",
                    money: "300"
                },
                maxStudent: 1,

                minStudent: 0,
                trialStudent: 1,

                minAgeRequire: 0,
                maxAgeRequire: 100,
                genderRequire: "All",

                createTime: new Date("1/1/2016")
            },
            {
                _id: "class7",
                name: "Intermediate-Fri-3:00",
                programID: "intermediate",
                sessionID: "2016_session3",
                status: "Active",
                length: "90min",
                levels: ['Beginner', 'Intermediate', 'Advanced'],
                teacher: "Jason",

                schedule: {
                    day: 'Fri',
                    time: "3:00 pm"
                },

                tuition: {
                    type: "total",
                    money: "300"
                },
                maxStudent: 1,

                minStudent: 0,
                trialStudent: 2,

                minAgeRequire: 0,
                maxAgeRequire: 100,
                genderRequire: "All",

                createTime: new Date("1/1/2016")
            },
            {
                _id: "class8",
                name: "Intermediate-Sat-3:00",
                programID: "intermediate",
                sessionID: "2016_session4",
                status: "Active",
                length: "90min",
                levels: ['Beginner', 'Intermediate', 'Advanced'],
                teacher: "Lucy",

                schedule: {
                    day: 'Sat',
                    time: "3:00 pm"
                },

                tuition: {
                    type: "total",
                    money: "300"
                },
                maxStudent: 1,

                minStudent: 0,
                trialStudent: 0,

                minAgeRequire: 0,
                maxAgeRequire: 100,
                genderRequire: "All",

                createTime: new Date("1/1/2016")
            },
            {
                _id: "class9",
                name: "Advanced-Mon-3:00",
                programID: "advanced",
                sessionID: "2016_session1",
                status: "Active",
                length: "90min",
                levels: ['Beginner', 'Intermediate', 'Advanced'],
                teacher: "Jenna",

                schedule: {
                    day: 'Mon',
                    time: "3:00 pm"
                },

                tuition: {
                    type: "total",
                    money: "300"
                },
                maxStudent: 2,

                minStudent: 0,
                trialStudent: 1,

                minAgeRequire: 0,
                maxAgeRequire: 100,
                genderRequire: "All",

                createTime: new Date("1/1/2016")
            }
        ];

        _(data).forEach(function (item) {
            collection.insert(item);
        });

    }

    if (collection.find({}).count() === 0) {
        //resetData()
    }

});