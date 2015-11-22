/**
 * Created on 9/23/15.
 */

Meteor.startup(function () {



    function resetData(){
        DB.ShoppingCart.remove({});

        DB.ShoppingCart.insert({
            _id:'test_cart_1',
            sessionId:'testSession2',
            accountId:'account1',
            status:'done',
            lastModified:new Date(),
            checkoutType:'pay-now',

            items:[
                {
                    type:'add',
                    swimmerId:'swimmer1',
                    classId:'class1',
                    quantity:1,
                    swimmer:{},
                    class1:{},
                    class2:{},
                    class3:{}

                },
                {
                    type:'add',
                    swimmerId:'swimmer1',
                    classId:'class2',
                    quantity:1,
                    swimmer:{},
                    class1:{},
                    class2:{},
                    class3:{}

                }
            ]
        })


        DB.ShoppingCart.insert({
            _id:'test_cart_2',
            sessionId:'testSession2',
            accountId:'account1',
            status:'done',
            lastModified:new Date(),
            checkoutType:'pay-now',

            items:[
                {
                    type:'add',
                    swimmerId:'swimmer2',
                    classId:'class1',
                    quantity:1,
                    swimmer:{},
                    class1:{},
                    class2:{},
                    class3:{}

                },
                {
                    type:'add',
                    swimmerId:'swimmer2',
                    classId:'class2',
                    quantity:1,
                    swimmer:{},
                    class1:{},
                    class2:{},
                    class3:{}

                },
            ]
        })
    }


    if (DB.ShoppingCart.find({}).count() === 0) {
        resetData()
    }

    calTestData.resetShoppingCart = resetData

});