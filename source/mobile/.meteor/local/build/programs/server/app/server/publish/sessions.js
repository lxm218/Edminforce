(function(){Meteor.publish("sessions", function () {
    return DB.Sessions.find();
});
}).call(this);

//# sourceMappingURL=sessions.js.map
