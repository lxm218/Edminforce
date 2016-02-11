Meteor.startup(() => {
    if (Stores.find().count() === 0) {
        for (var idx = 0; idx < 50; idx++) {
            Stores.insert({
                name: 'Store' + idx,
                address: idx + ' Store Street, Los Angeles, CA 91792',
                city: idx % 2 == 0 ? 'Los Angeles' : 'New York',
                neighbourhood: 'China town'
            });
        }
    }
});
