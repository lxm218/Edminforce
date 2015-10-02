Meteor.startup(function () {

    DB.ClassesRegister.remove();

     /*
     *
     * 此表仅存储已注册成功(支付过)的数据
     * */

    if (DB.ClassesRegister.find({}).count() === 0) {


        DB.ClassesRegister.insert({
            classId: 'class1',
            swimmerId: 'swimmer1',
            accountId:'account1',
            sessionId: 'testSession2',
            cartId:'test_cart_1',

            registerDate: new Date(+new Date() - (1000 * 60 * 60 * 24 * (1)))

        });
        DB.ClassesRegister.insert({
            classId: 'class2',
            swimmerId: 'swimmer1',
            accountId:'account1',
            sessionId: 'testSession2',
            cartId:'test_cart_1',

            registerDate: new Date(+new Date() - (1000 * 60 * 60 * 24 * ( 1)))

        });

        DB.ClassesRegister.insert({
            classId: 'class1',
            swimmerId: 'swimmer2',
            accountId:'account1',
            sessionId: 'testSession2',
            cartId:'test_cart_2',


            registerDate: new Date(+new Date() - (1000 * 60 * 60 * 24 * (7)))

        });
        DB.ClassesRegister.insert({
            classId: 'class2',
            swimmerId: 'swimmer2',
            accountId:'account1',
            sessionId: 'testSession2',
            cartId:'test_cart_2',


            registerDate: new Date(+new Date() - (1000 * 60 * 60 * 24 * ( 7)))

        });

    }
});