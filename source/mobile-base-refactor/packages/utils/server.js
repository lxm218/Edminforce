
/* 
 * Call count using mongo rawCollection object
 * the mongo rawCollection count is way more
 * efficient than meteor.collection.find().count()
 */
EdminForce.utils.mongoCount = function(meteorMongoCollection, query) {
    return Meteor.wrapAsync( (callback) => {
        meteorMongoCollection.rawCollection().count(query, callback);
    });
}
