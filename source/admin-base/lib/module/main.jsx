KG.create('EF-School');

KG.Account = KG.create('Account');

App.AdminUser = KG.create('EF-AdminUser');
KG.create('EF-Customer');
KG.create('EF-Program');
KG.create('EF-Session');
App.Class = KG.create('EF-Class');
App.Student = KG.create('EF-Student');
App.ClassStudent = KG.create('EF-ClassStudent');
KG.create('EF-Coupon');
KG.create('EF-CustomerCoupon');
KG.create('EF-StudentComment');

KG.create('EF-Order', {
    DBName : 'EF-Orders'
});

KG.create('EF-ClassLevel');