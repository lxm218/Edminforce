Meteor.startup(function () {

    DB.ClassesRegister.remove();


    if (DB.ClassesRegister.find({}).count() === 0) {

        //_(4).times(function(n){ //testSession1-4

        DB.ClassesRegister.insert({
            classId: 'class1',
            swimmerId: 'swimmer1',
            sessionId: 'testSession1',

            registerDate: new Date(+new Date() - (1000 * 60 * 60 * 24 * ( 1)))

        });
        DB.ClassesRegister.insert({
            classId: 'class2',
            swimmerId: 'swimmer1',
            sessionId: 'testSession1',

            registerDate: new Date(+new Date() - (1000 * 60 * 60 * 24 * (7*0 + 1)))

        });

        DB.ClassesRegister.insert({
            classId: 'class1',
            swimmerId: 'swimmer2',
            sessionId: 'testSession1',

            registerDate: new Date(+new Date() - (1000 * 60 * 60 * 24 * ( 1)))

        });
        DB.ClassesRegister.insert({
            classId: 'class2',
            swimmerId: 'swimmer2',
            sessionId: 'testSession1',

            registerDate: new Date(+new Date() - (1000 * 60 * 60 * 24 * (7*0 + 1)))

        });


        //});
    }
});