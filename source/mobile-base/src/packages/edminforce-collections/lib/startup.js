// when meteor startup, create all collections
Meteor.startup(function () {

    EdminForce.Collections.Customer = new CustomerCollection('EF-Customer');

    // Initial ProgramCollection
    EdminForce.Collections.program = new ProgramCollection("EF-Program");
    EdminForce.Collections.class = new ClassCollection("EF-Class");
    EdminForce.Collections.classStudent = new ClassStudentCollection("EF-ClassStudent");

    EdminForce.Collections.session = new SessionCollection("EF-Session");
    EdminForce.Collections.student = new StudentCollection("EF-Student");

    EdminForce.Collections.orders = new OrdersCollection("EF-Orders");

    EdminForce.Collections.coupon = new OrdersCollection("EF-Coupon");
    EdminForce.Collections.customerCoupon = new OrdersCollection("EF-CustomerCoupon");


    // Add user schema to Meteor.user
    Meteor.users.attachSchema(userSchema);
});