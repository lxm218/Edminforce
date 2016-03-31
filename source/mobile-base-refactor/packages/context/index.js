/*
 * Edminforce mobile app context
 */
import KG from 'meteor/edminforce:collections';

console.log(KG);

EdminForce = {
    utils: {},
    Components : {},
    Containers: {},
    Actions : {},
    Contexts: {},
    Collections: {},
    VERSION : '0.0.1'
};

EdminForce.Collections.Customer = KG.create('EF-Customer')._db;
EdminForce.Collections.program = KG.create("EF-Program")._db;
EdminForce.Collections.class = KG.create("EF-Class")._db;
EdminForce.Collections.classStudent = KG.create("EF-ClassStudent")._db;
EdminForce.Collections.session = KG.create("EF-Session")._db;
EdminForce.Collections.student = KG.create("EF-Student")._db;
EdminForce.Collections.orders = KG.create("EF-Order", {DBName : 'EF-Orders'})._db;
EdminForce.Collections.coupon = KG.create("EF-Coupon")._db;
EdminForce.Collections.customerCoupon = KG.create("EF-CustomerCoupon")._db;
