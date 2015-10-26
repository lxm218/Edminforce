(function(){Meteor.startup(function () {
    DB.Sessions.remove();


    if (DB.Sessions.find({}).count() === 0) {


        //当前session
        DB.Sessions.insert({
            _id: 'testSession1' ,
            name: 'testSession1',
            // 模拟4个不同的注册时间
            registerStartDate: new Date(+new Date() - (1000 * 60 * 60 * 24 * (150 * 7 + 1))),
            startDate:new Date(+new Date() - (1000 * 60 * 60 * 24 * (120 * 7 + 1))),

        });


        //////////session coming
        //昨天开始注册 目前处于第1阶段 bookTheSameTime
        //session 开始时间定义为 4周即28天之后
        DB.Sessions.insert({
            _id: 'testSession2' ,
            name: 'testSession2',
            // 模拟4个不同的注册时间
            registerStartDate: new Date(+new Date() - (1000 * 60 * 60 * 24 * (0 * 7 + 1))),
            startDate: new Date(+new Date() - (1000 * 60 * 60 * 24 * (0 * 7 + 1-28)))


        });

        //7天前开始注册 目前处于第2阶段
        DB.Sessions.insert({
            _id: 'testSession3' ,
            name: 'testSession3',
            // 模拟4个不同的注册时间
            registerStartDate: new Date(+new Date() - (1000 * 60 * 60 * 24 * (1 * 7 + 1))),
            startDate: new Date(+new Date() - (1000 * 60 * 60 * 24 * (1 * 7 + 1-28)))

        });

        //目前处于第3阶段
        DB.Sessions.insert({
            _id: 'testSession4' ,
            name: 'testSession4',
            // 模拟4个不同的注册时间
            registerStartDate: new Date(+new Date() - (1000 * 60 * 60 * 24 * (2 * 7 + 1))),
            startDate: new Date(+new Date() - (1000 * 60 * 60 * 24 * (2 * 7 + 1-28)))


        });

        //目前处于第4阶段  全面开放
        DB.Sessions.insert({
            _id: 'testSession5' ,
            name: 'testSession5',
            // 模拟4个不同的注册时间
            registerStartDate: new Date(+new Date() - (1000 * 60 * 60 * 24 * (3 * 7 + 1))),
            startDate: new Date(+new Date() - (1000 * 60 * 60 * 24 * (3 * 7 + 1-28))),


        });
    }
});
}).call(this);

//# sourceMappingURL=sessions.js.map
