/*
 * Edminforce mobile app context
 */

Collections = {
    Customer : KG.create('EF-Customer')._db,
    program : KG.create("EF-Program")._db,
    session : KG.create("EF-Session")._db,
    class : KG.create("EF-Class")._db,
    student : KG.create("EF-Student")._db,
    // order is important here, classStudent has to be created after class & student
    classStudent : KG.create("EF-ClassStudent")._db,
    coupon : KG.create("EF-Coupon")._db,
    orders : KG.create("EF-Order", {DBName : 'EF-Orders'})._db,
    customerCoupon : KG.create("EF-CustomerCoupon")._db,
    school : KG.create("EF-School")._db,
    log: KG.create("EF-Log")._db,
    classLevel: KG.create("EF-ClassLevel")._db,
    studentComment: KG.create("EF-StudentComment")._db
};

EdminForce = {
    //https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
    Settings: {
        timeZone: "America/Los_Angeles"
    },
    utils: {},
    Components : {},
    Containers: {},
    Actions : {},
    Contexts: {},
    //Collections : Collections,
    Registration: {},
    VERSION : '0.0.1',
};


// context settings
Meteor.startup(function () {
    // get school time zone setting from db
    var school = Collections.school.findOne({});
    if (school) {
        EdminForce.Settings.timeZone = school.timezoneString;
    }
});


