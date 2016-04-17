
// publish data for account page: user, customer, and students
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

        Collections.Customer.find({
            _id : this.userId
        }),

        Collections.student.find({
            accountID: this.userId
        })
    ]
});

// publish one or all students for the current logged-in user
Meteor.publish('student', function(id) {
    let selector = {
        accountID: this.userId
    };
    id && (selector._id = id);

    return Collections.student.find(selector);
});
