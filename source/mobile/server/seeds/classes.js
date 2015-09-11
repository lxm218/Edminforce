Meteor.startup(function () {
    DB.Classes.remove()
    if (DB.Classes.find({}).count() === 0) {

        //////////////////////////////////
        //构造session1的class数据

        DB.Classes.insert({
            _id: 'testSession1' + 'class1',
            sessionId: 'testSession1',
            name: 'testSession1' + 'class1',
            startDate: new Date(),
            endDate: new Date(+new Date() + (1000 * 60 * 60 * 24 * 90  )),//90天后结束
            frequency: "2/week",
            level: 'level-1',
            type: 'ss',
            availableSeats: 10,
            price: 100,
            students: ['swimmer1']   //swimmer1已选‘class1’
        });

        DB.Classes.insert({
            _id: 'testSession1' + 'class2',
            sessionId: 'testSession1',
            name: 'testSession1' + 'class2',
            startDate: new Date(),
            endDate: new Date(+new Date() + (1000 * 60 * 60 * 24 * 90  )),//90天后结束
            frequency: "2/week",
            level: 'level-1',
            type: 'ss',
            availableSeats: 10,
            price: 100,
            students: ['swimmer1']
        });

        DB.Classes.insert({
            _id: 'testSession1' + 'class3',
            sessionId: 'testSession1',
            name: 'testSession1' + 'class3',
            startDate: new Date(),
            endDate: new Date(+new Date() + (1000 * 60 * 60 * 24 * 90  )),//90天后结束
            frequency: "2/week",
            level: 'level-1',
            type: 'ss',
            availableSeats: 10,
            price: 100,
            students: []   //swimmer1已选‘class1’
        });


        ////////////////////////////////////////////
        //构造session2的class数据

        DB.Classes.insert({
            _id: 'testSession2'+'class1',
            sessionId: 'testSession2',
            name: 'testSession2'+'class1',
            startDate: new Date(),
            endDate: new Date(+new Date() + (1000 * 60 * 60 * 24 * 90 )),
            frequency: "2/week",
            level: 'level-1',
            type: 'ss',
            availableSeats: 10,
            price: 100,
            students: []
        });


    }
});