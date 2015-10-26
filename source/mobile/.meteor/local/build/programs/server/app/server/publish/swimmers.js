(function(){

Meteor.publish("swimmers", function () {
    return DB.Swimmers.find();
});


Meteor.publish("swimmersByAccountId", function (accountId) {
    return DB.Swimmers.find({accountId:accountId});
});

Meteor.publish("swimmer", function (swimmerId) {//
    //根据角色判断 若是account仅可看到自己的swimmer
    //若是管理员则无此限制
    return DB.Swimmers.find({_id:swimmerId});
});




////////////////////for admin only////////////////////////
Meteor.publish("admin/swimmers", function () {
    //todo authentication
    return DB.Swimmers.find();
});
}).call(this);

//# sourceMappingURL=swimmers.js.map
