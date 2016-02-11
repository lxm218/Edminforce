
Meteor.publish('stores', function() {
    return Stores.find();
})
