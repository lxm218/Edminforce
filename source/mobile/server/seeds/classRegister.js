Meteor.startup(function () {

    DB.ClassesRegister.remove();


    if (DB.ClassesRegister.find({}).count() === 0) {

        //_(4).times(function(n){ //testSession1-4

        DB.ClassesRegister.insert({
            classId: 'testSession1class1',
            swimmerId: 'swimmer1',

            registerDate: new Date(+new Date() - (1000 * 60 * 60 * 24 * ( 1)))

        });
        DB.ClassesRegister.insert({
            classId: 'testSession1class2',
            swimmerId: 'swimmer1',

            registerDate: new Date(+new Date() - (1000 * 60 * 60 * 24 * (7*0 + 1)))

        });

        //});
    }
});