!function () {


    var extraFileds = {
        'profile': 1,
        'role': 1,
        'credits': 1,
        'alterContact': 1,
        'emergencyContact': 1,
        'swimmers': 1
    };

    //todo remove
    Meteor.publish("accounts", function () {
        return Meteor.users.find();
    });


    //publish account detail
    Meteor.publish("account", function (accountId) {
        return Meteor.users.find({_id: accountId}, {fields: extraFileds});
    });


    /*
     * publish  [account detail] and [swimmers detail] and  [classes detail]
     *
     * publish单个account下的所有swimmer 以及每个swimmer所选课程的详细信息
     *
     * */
    //Meteor.publishComposite('accountWithSwimmersAndClasses', function(accountId) {
    //    return {
    //        find: function() {
    //            return Meteor.users.find({_id:accountId}, {fields: extraFileds});
    //        },
    //        children: [
    //            {
    //                find: function(account) {  //所有swimmers
    //
    //                    console.log(account)
    //
    //                    return DB.Swimmers.find(
    //                        { accountId: account._id });
    //                },
    //                children: [
    //                    {
    //                        find: function(swimmers, account) {//swimmers对应的class
    //
    //                            console.log(swimmers)
    //                            return DB.Classes.find(
    //                                {
    //                                    _id: { $in:swimmers.classes }
    //
    //                                });
    //                        },
    //                        children:[  //for test
    //                            {
    //                                find:function(classes, swimmers, account){
    //
    //                                    console.log(classes)
    //
    //                                }
    //                            }
    //
    //                        ]
    //                    }
    //                ]
    //            }
    //        ]
    //    }
    //});
    //

    Meteor.publishComposite('accountWithSwimmersAndClasses', function (accountId) {
        return {
            find: function () {
                return Meteor.users.find({_id: accountId}, {fields: extraFileds});
            },
            children: [
                {
                    find: function (account) {  //所有swimmers

                        console.log(account)

                        return DB.Swimmers.find(
                            {accountId: account._id});
                    },
                    children: [
                        {
                            find: function (swimmer, account) {//swimmers对应的class id

                                console.log(swimmer)
                                return DB.classesRegister.find(
                                    {
                                        swimmerId: swimmer._id

                                    });
                            },
                            children: [
                                {
                                    find: function (classesRegister, swimmer, account) {//class对应的详细信息

                                        console.log(classesRegister)

                                        return DB.Classes.find(
                                            {
                                                _id: classesRegister.classId

                                            });
                                    },
                                    children: [
                                        {
                                            find: function (classDetail, classesRegister, swimmer, account) {//just for test

                                                console.log(classDetail)

                                            }
                                        }
                                    ]


                                }
                            ]
                        }
                    ]
                }
            ]
        }
    });


}();






