
const reactiveFn = (context, onData) => {
    if (Meteor.subscribe('account').ready()) {

        onData(null, {
            user: Meteor.user(),
            customer: EdminForce.Collections.Customer.findOne({_id:Meteor.userId()}),
            students: EdminForce.Collections.student.find({accountID:Meteor.userId()}).fetch()
        })
    }
};

EdminForce.Containers.Account = Composer.composeWithTracker(reactiveFn)(EdminForce.Components.Account);