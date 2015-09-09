Meteor.startup(function () {
    DB.Classes.remove()
    if (DB.Classes.find({}).count() === 0) {

        //_(4).times(function(n){

            DB.Classes.insert({
                name: 'class_'+1,
                startDate: new Date(),
                endDate:new Date(+ new Date() +(1000*60*60*24 * 90  ) ),//90天后结束
                frequency:"2/week",
                level:'level-1',
                type:'ss',
                availableSeats:10,
                price:100,
                students:[]
            });


            DB.Classes.insert({
                name: 'class_'+2,
                startDate: new Date(),
                endDate:new Date(+ new Date() +(1000*60*60*24 * 90 ) ),
                frequency:"2/week",
                level:'level-1',
                type:'ss',
                availableSeats:10,
                price:100,
                students:[]
            });



       // });
    }
});