// main layout
const reactiveFnAppMain = ({context,actions}, onData) => {
    onData(null, {
        user: Meteor.user(),
        count: Counts.get('shoppingCartCount'),
    });
};
EdminForce.Containers.AppMain = Composer.composeWithTracker(reactiveFnAppMain)(EdminForce.Components.AppMain);