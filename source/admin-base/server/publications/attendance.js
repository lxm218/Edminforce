Meteor.publishComposite("EF-CurrentClasses", function () {
        return {
            find: function () {
                let currentDate = new Date();
                return KG.get('EF-Session').getDB().find({
                    $and: [
                        {startDate:{$lte: currentDate}},
                        {endDate: {$gte: currentDate}}
                    ]
                });
            },
            children: [{
                find: function (session) {
                    return KG.get('EF-Class').getDB().find({sessionID:session._id});
                }
            }]
        }
    }
);

Meteor.publishComposite("EF-StudentsByClassID", function(classID) {
    return {
        find: function() {
            return KG.get('EF-ClassStudent').getDB().find({
                classID,
                status: 'checkouted'
            }, {
                fields: {studentID:1,type:1,lessonDate:1,classID:1}
            })
        },
        children: [
            {
                find: function(sc) {
                    return KG.get('EF-Student').getDB().find({
                        _id: sc.studentID
                    }, {
                        fields:{name:1, profile:1}
                    })
                }
            }
        ]
    }
})