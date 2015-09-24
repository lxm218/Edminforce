Meteor.startup(function () {
    DB.Swimmers.remove()


    /*
    * todo swimmers
    *
    * 去年报过名的
    * swimmer的亲戚，但未报过名
    * 正在参加的
    *
    * */
    if (DB.Swimmers.find({}).count() === 0) {

        DB.Swimmers.insert({  //account1 第1个孩子
            _id:'swimmer1',//swimmer1
            name: 'swimmer1',
            accountId: 'account1',
            location:'Fremont',
            level:'BUB I'

        });

        DB.Swimmers.insert({  //account1 第2个孩子
            _id:'swimmer2',// swimmer2
            name: 'swimmer2',
            accountId: 'account1',
            location:'Fremont',
            level:'BUB I'

        });

        //account2 有两个孩子
        _(2).times(function(n){
            DB.Swimmers.insert({
                _id:'swimmer'+(2+n+1), //swimmer3 swimmer4
                name: 'swimmer'+(2+n+1),
                accountId: 'account2',
                location:'Fremont',
                level:'BUB III'

            });
        });
    }

});