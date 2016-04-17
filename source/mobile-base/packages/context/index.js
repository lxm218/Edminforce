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
};

EdminForce = {
    utils: {},
    Components : {},
    Containers: {},
    Actions : {},
    Contexts: {},
    //Collections : Collections,
    Registration: {},
    VERSION : '0.0.1',
};



