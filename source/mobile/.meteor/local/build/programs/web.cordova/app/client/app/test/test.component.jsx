(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/test/test.component.jsx                                  //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
                                                                       //
                                                                       //
Cal.Test = React.createClass({                                         // 3
    displayName: "Test",                                               //
                                                                       //
    mixins: [ReactMeteorData],                                         // 5
    getMeteorData: function () {                                       // 6
                                                                       //
        var handle = Meteor.subscribe("accounts");                     // 8
                                                                       //
        var handle2 = Meteor.subscribe("swimmers");                    // 10
                                                                       //
        var handle3 = Meteor.subscribe("classes");                     // 12
                                                                       //
        Meteor.subscribe("account1");                                  // 15
                                                                       //
        return {                                                       // 19
            //currentUser: Meteor.user(),                              //
                                                                       //
            currentUser: Meteor.users.find({ _id: 'account1' }).fetch()[0],
                                                                       //
            accounts: Meteor.users.find().fetch(),                     // 24
            swimmers: DB.Swimmers.find().fetch(),                      // 25
            classes: DB.Classes.find().fetch()                         // 26
        };                                                             //
    },                                                                 //
                                                                       //
    render: function () {                                              // 30
        return React.createElement(                                    // 31
            "div",                                                     //
            { className: "transition", id: "app-body" },               //
            React.createElement(                                       //
                "div",                                                 //
                { className: "wrapper" },                              //
                React.createElement(                                   //
                    "span",                                            //
                    null,                                              //
                    "Hello",                                           //
                    React.createElement(                               //
                        "b",                                           //
                        null,                                          //
                        this.data.currentUser && this.data.currentUser.profile.name
                    ),                                                 //
                    "!"                                                //
                ),                                                     //
                React.createElement("hr", null),                       //
                this.data.accounts,                                    //
                React.createElement("hr", null),                       //
                this.data.swimmers,                                    //
                React.createElement("hr", null),                       //
                this.data.classes,                                     //
                React.createElement(                                   //
                    RC.Card,                                           // 51
                    null,                                              //
                    "hello"                                            //
                )                                                      //
            )                                                          //
        );                                                             //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
