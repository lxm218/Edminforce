import {KG} from 'meteor/kg:base';
export const Collections = {
    Customer : KG.create('EF-Customer')._db,
    program : KG.create("EF-Program")._db,
    class : KG.create("EF-Class")._db,
    classStudent : KG.create("EF-ClassStudent")._db,
    session : KG.create("EF-Session")._db,
    student : KG.create("EF-Student")._db,
    orders : KG.create("EF-Order", {DBName : 'EF-Orders'})._db,
    coupon : KG.create("EF-Coupon")._db,
    customerCoupon : KG.create("EF-CustomerCoupon")._db
};