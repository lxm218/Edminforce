/**
 * Created on 9/14/15.
 */

Meteor.startup(function () {

    let collection = EdminForce.Collections.student;

    function resetData() {
        collection.remove({});

        let data = [
            {
                _id: "mick_zhao",
                name: "Mick Zhao",
                accountID: "jliu@gmail.com",
                profile: {
                    birthday: new Date("1/1/2005"),
                    gender: "Male"
                },
                status: "Active",
                skillLevel: "1",
                createTime: new Date("1/1/2014"),
                note: "Every thing is good!"
            },
            {
                _id: "robert_wang",
                name: "Robert Wang",
                accountID: "jliu@gmail.com",
                profile: {
                    birthday: new Date("4/1/2008"),
                    gender: "Female"
                },
                status: "Active",
                skillLevel: "1",
                createTime: new Date("1/1/2014"),
                note: "Every thing is good!"
            },
            {
                _id: "tao_peng",
                name: "Tao Peng",
                accountID: "jbhe@gmail.com",
                profile: {
                    birthday: new Date("4/1/20011"),
                    gender: "Female"
                },
                status: "Active",
                skillLevel: "1",
                createTime: new Date("1/1/2014"),
                note: "Every thing is good!"
            }
        ];

        _(data).forEach(function (item) {
            collection.insert(item);
        });

    }

    if (collection.find({}).count() === 0) {
        resetData()
    }

});