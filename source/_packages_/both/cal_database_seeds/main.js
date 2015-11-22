/**
 * Created by Jeffreyfan on 11/22/15.
 */

calTestData.resetTestData=function(){


    calTestData.resetAccounts()

    calTestData.resetApp()

    calTestData.resetClasses()

    calTestData.resetSessions()

    calTestData.resetShoppingCart()

    calTestData.resetSwimmers()

}


// todo disable !!!
//若在客户端调用calTestData.resetDB 可能遇到权限问题
console.log('methods resetTestData should be disabled in product ENV')
Meteor.methods({

    'resetTestData':function(){

        calTestData.resetTestData()

        console.log('resetTestData success!');

    }

})


