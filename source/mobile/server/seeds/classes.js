Meteor.startup(function () {
    DB.Classes.remove()

    if (DB.Classes.find({}).count() === 0) {

        //////////////////////////////////
        //构造session1的class数据

        DB.Classes.insert({
            _id:  'class1',
            sessionId: 'testSession2',
            name: '' + 'class1',

            level: 'BUB I',
            day:1,
            startTime:App.time2num('9:10'),
            endTime:App.time2num('11:00'),


            seatsTotal:10,
            seatsRemain:10,

            startDate: new Date(),
            endDate: new Date(+new Date() + (1000 * 60 * 60 * 24 * 90  )),//90天后结束
            frequency: "2/week",

            type: 'ss',
            availableSeats: 10,
            price: 100,
            students: ['swimmer1','swimmer2']   //swimmer1已选‘class1’
        });

        DB.Classes.insert({
            _id: 'class2',
            sessionId: 'testSession2',
            name: '' + 'class2',

            level: 'BUB I',
            day:1,
            startTime:App.time2num('14:10'),
            endTime:App.time2num('16:00'),

            seatsTotal:10,
            seatsRemain:10,

            startDate: new Date(),
            endDate: new Date(+new Date() + (1000 * 60 * 60 * 24 * 90  )),//90天后结束
            frequency: "2/week",
            type: 'ss',
            availableSeats: 10,
            price: 100,
            students: ['swimmer1','swimmer2']
        });

        DB.Classes.insert({
            _id:  'class3',
            sessionId: 'testSession2',
            name: '' + 'class3',

            level: 'BUB I',
            day:1,
            startTime:App.time2num('15:10'),
            endTime:App.time2num('17:00'),

            seatsTotal:10,
            seatsRemain:10,

            startDate: new Date(),
            endDate: new Date(+new Date() + (1000 * 60 * 60 * 24 * 90  )),//90天后结束
            frequency: "2/week",
            type: 'ss',
            availableSeats: 10,
            price: 100,
            students: []   //swimmer1已选‘class1’
        });


        ////////////////////////////////////////////
        //构造session2的class数据
        //session2 和session的class一样时才可以bookTheSameTime

        DB.Classes.insert({
            _id:  'testSession2class1',
            sessionId: 'testSession2',
            name: 'testSession2' + 'class1',

            level: 'BUB III',
            day:1,
            startTime:App.time2num('9:10'),
            endTime:App.time2num('11:00'),

            seatsTotal:10,
            seatsRemain:10,

            startDate: new Date(),
            endDate: new Date(+new Date() + (1000 * 60 * 60 * 24 * 90  )),//90天后结束
            frequency: "2/week",

            type: 'ss',
            availableSeats: 10,
            price: 100,
            students: []   //swimmer1已选‘class1’
        });

        DB.Classes.insert({
            _id: 'testSession2class2',
            sessionId: 'testSession2',
            name: 'testSession2' + 'class2',

            level: 'BUB III',
            day:2,
            startTime:App.time2num('14:10'),
            endTime:App.time2num('16:00'),

            seatsTotal:10,
            seatsRemain:10,

            startDate: new Date(),
            endDate: new Date(+new Date() + (1000 * 60 * 60 * 24 * 90  )),//90天后结束
            frequency: "2/week",
            type: 'ss',
            availableSeats: 10,
            price: 100,
            students: []
        });

        DB.Classes.insert({
            _id:  'testSession2class3',
            sessionId: 'testSession2',
            name: 'testSession2' + 'class3',

            level: 'BUB III',
            day:3,
            startTime:App.time2num('15:10'),
            endTime:App.time2num('17:00'),

            seatsTotal:10,
            seatsRemain:10,

            startDate: new Date(),
            endDate: new Date(+new Date() + (1000 * 60 * 60 * 24 * 90  )),//90天后结束
            frequency: "2/week",
            type: 'ss',
            availableSeats: 10,
            price: 100,
            students: []   //swimmer1已选‘class1’
        });


        var times=["10:00","11:00","13:00","15:00","17:00"]
        var days=[1,2,3,4,5,6,7]

        App.Config.classLevels.forEach(function(level,i,o){
            days.forEach(function(day,i,o){
                times.forEach(function(time,i,o){
                    DB.Classes.insert({
                        _id: day+"_"+level+"_"+time.replace(':',"_")+'_testSession2',
                        sessionId: 'testSession2',
                        name: day+"_"+level+"_"+time,

                        level: level,
                        day:day,
                        startTime:App.time2num(time),
                        endTime:App.time2num(time) +30*60*1000,  //30minutes

                        seatsTotal:10,
                        seatsRemain:10,

                        startDate: new Date(),
                        endDate: new Date(+new Date() + (1000 * 60 * 60 * 24 * 90  )),//90天后结束
                        frequency: "2/week",
                        type: 'ss',
                        availableSeats: 10,
                        price: 100,
                        students: []   //swimmer1已选‘class1’
                    });

                })
            })

        })


    }
});