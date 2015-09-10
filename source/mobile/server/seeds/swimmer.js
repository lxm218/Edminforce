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
            name: Fake.word(),
            accountId: 'account1',
            location:'Fremont',
            level:'level-1',
            classes:['class1']  //已选class1

        });

        DB.Swimmers.insert({  //account1 第2个孩子
            _id:'swimmer2',// swimmer2
            name: Fake.word(),
            accountId: 'account1',
            location:'Fremont',
            level:'level-1',
            classes:[]  // 未选课
        });

        //account2 有两个孩子
        _(2).times(function(n){
            DB.Swimmers.insert({
                _id:'swimmer'+(2+n+1), //swimmer3 swimmer4
                name: Fake.word(),
                accountId: 'account2',
                location:'Fremont',
                level:'level-1',
                classes:[]
            });
        });

    }

});