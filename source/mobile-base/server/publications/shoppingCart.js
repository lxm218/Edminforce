
Meteor.publish(null, function() {
    Counts.publish(this, 'shoppingCartCount', Collections.classStudent.find({
        accountID:this.userId,
        status: 'pending',
        type: {$in: ['register','makeup']}
    }));
});
