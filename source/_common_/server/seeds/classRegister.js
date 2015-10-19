Meteor.startup(function () {

    DB.ClassesRegister.remove();

    /*
    * 一共分三个session
      session1 已过去
      当前正处于session2且已关闭注册
      开放注册的是 session3
    *
    * */

    var classRegisterData=[


        ////history
        {
            classId:'testSession1-MON3',
            swimmerId:'jandmfear@gmail.com_Mia-Fear',
            sessionId: 'testSession1',
            accountId:'jandmfear@gmail.com'
        },


        /////////////////session2//////////////////////////////////////
        //jliu@gmail.com
        {
            classId:'testSession2-MON14',
            swimmerId:'jliu@gmail.com_Allen-Liu',
            sessionId: 'testSession2',
            accountId:'jliu@gmail.com'
        },
        {
            classId:'testSession2-WED14',
            swimmerId:'jliu@gmail.com_Allen-Liu',
            sessionId: 'testSession2',
            accountId:'jliu@gmail.com'
        },
        {
            classId:'testSession2-MON17',
            swimmerId:'jliu@gmail.com_Lily-Liu',
            sessionId: 'testSession2',
            accountId:'jliu@gmail.com'
        },

        //jbhe@gmail.com
        {
            classId:'testSession2-MON17',
            swimmerId:'jbhe@gmail.com_Angle-He',
            sessionId: 'testSession2',
            accountId:'jbhe@gmail.com'
        },
        {
            classId:'testSession2-MON15',
            swimmerId:'jbhe@gmail.com_Mattew-He',
            sessionId: 'testSession2',
            accountId:'jbhe@gmail.com'
        },


        //dave_IrisRojan@gmail.com
        {
            classId:'testSession2-MON19',
            swimmerId:'dave_IrisRojan@gmail.com_Arush-Rojan',
            sessionId: 'testSession2',
            accountId:'dave_IrisRojan@gmail.com'

        }
    ];

    if (DB.ClassesRegister.find({}).count() === 0) {
        classRegisterData.forEach(function(item){

            DB.ClassesRegister.insert({
                classId: item.classId,
                swimmerId: item.swimmerId,
                accountId:item.accountId,
                sessionId: item.sessionId,
                cartId:'test_cart_1',

                registerDate: new Date(+new Date() - (1000 * 60 * 60 * 24 * (1*30))) //一个月前
            });

        })
    }

        /*
        *
        * 此表仅存储已注册成功(支付过)的数据
        * */

    if (DB.ClassesRegister.find({}).count() === 0) {

        //
        //DB.ClassesRegister.insert({
        //    classId: 'class1',
        //    swimmerId: 'swimmer1',
        //    accountId:'account1',
        //    sessionId: 'testSession2',
        //    cartId:'test_cart_1',
        //
        //    registerDate: new Date(+new Date() - (1000 * 60 * 60 * 24 * (1)))
        //
        //});
        //DB.ClassesRegister.insert({
        //    classId: 'class2',
        //    swimmerId: 'swimmer1',
        //    accountId:'account1',
        //    sessionId: 'testSession2',
        //    cartId:'test_cart_1',
        //
        //    registerDate: new Date(+new Date() - (1000 * 60 * 60 * 24 * ( 1)))
        //
        //});
        //
        //DB.ClassesRegister.insert({
        //    classId: 'class1',
        //    swimmerId: 'swimmer2',
        //    accountId:'account1',
        //    sessionId: 'testSession2',
        //    cartId:'test_cart_2',
        //
        //
        //    registerDate: new Date(+new Date() - (1000 * 60 * 60 * 24 * (7)))
        //
        //});
        //DB.ClassesRegister.insert({
        //    classId: 'class2',
        //    swimmerId: 'swimmer2',
        //    accountId:'account1',
        //    sessionId: 'testSession2',
        //    cartId:'test_cart_2',
        //
        //
        //    registerDate: new Date(+new Date() - (1000 * 60 * 60 * 24 * ( 7)))
        //
        //});

    }
});