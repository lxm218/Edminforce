
Meteor.publish('account', function() {
    return [
        Meteor.users.find({_id: this.userId}, {
            fields : {
                username : 1,
                emails : 1,
                role : 1,
                _id : 1
            }
        }),

        EdminForce.Collections.Customer.find({
            _id : this.userId
        }),

        EdminForce.Collections.student.find({
            accountID: this.userId
        })
    ]
});