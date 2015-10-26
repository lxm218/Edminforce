(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/account/AccountManagement.jsx                            //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/26/15.                                                 //
 */                                                                    //
                                                                       //
Cal.AccountManagement = React.createClass({                            // 5
    displayName: "AccountManagement",                                  //
                                                                       //
    mixins: [ReactMeteorData],                                         // 7
                                                                       //
    getMeteorData: function () {                                       // 10
                                                                       //
        Meteor.subscribe("swimmersByAccountId", Meteor.userId());      // 12
                                                                       //
        return {                                                       // 14
            currentUser: Meteor.user(),                                // 15
            swimmers: DB.Swimmers.find({ accountId: Meteor.userId() }).fetch()
        };                                                             //
    },                                                                 //
                                                                       //
    render: function () {                                              // 20
                                                                       //
        return React.createElement(                                    // 22
            "div",                                                     //
            null,                                                      //
            React.createElement(RC.Card, { title: "Manage My Account" }),
            React.createElement(                                       //
                RC.List,                                               // 27
                null,                                                  //
                React.createElement(                                   //
                    RC.Item,                                           // 28
                    { className: "item-text-wrap" },                   //
                    React.createElement(                               //
                        "div",                                         //
                        { className: "row" },                          //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col" },                      //
                            "User Name"                                //
                        ),                                             //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col" },                      //
                            this.data.currentUser.username ? this.data.currentUser.username : 'User Name Not Set'
                        ),                                             //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col" },                      //
                            React.createElement(                       //
                                "a",                                   //
                                { className: "button button-block", href: "/account/resetUserName" },
                                "Change"                               //
                            )                                          //
                        )                                              //
                    )                                                  //
                ),                                                     //
                React.createElement(                                   //
                    RC.Item,                                           // 46
                    { className: "item-text-wrap" },                   //
                    React.createElement(                               //
                        "div",                                         //
                        { className: "row" },                          //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col" },                      //
                            "Email"                                    //
                        ),                                             //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col" },                      //
                            this.data.currentUser ? this.data.currentUser.emails[0].address : ''
                        )                                              //
                    )                                                  //
                ),                                                     //
                React.createElement(                                   //
                    RC.Item,                                           // 59
                    { className: "item-text-wrap" },                   //
                    React.createElement(                               //
                        "div",                                         //
                        { className: "row" },                          //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col" },                      //
                            "Password"                                 //
                        ),                                             //
                        React.createElement("div", { className: "col" }),
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col" },                      //
                            React.createElement(                       //
                                "a",                                   //
                                { className: "button button-block", href: "/account/resetPassword" },
                                "Change"                               //
                            )                                          //
                        )                                              //
                    )                                                  //
                ),                                                     //
                React.createElement(                                   //
                    RC.Item,                                           // 74
                    { className: "item-text-wrap" },                   //
                    React.createElement(                               //
                        "div",                                         //
                        { className: "row" },                          //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col" },                      //
                            "Emergency Contact"                        //
                        ),                                             //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col" },                      //
                            this.data.currentUser.emergencyContact ? this.data.currentUser.emergencyContact.name : 'Emergency Contact Not Set'
                        ),                                             //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col" },                      //
                            React.createElement(                       //
                                "a",                                   //
                                { className: "button button-block", href: "/account/emergencyContact" },
                                "Update"                               //
                            )                                          //
                        )                                              //
                    )                                                  //
                ),                                                     //
                React.createElement(                                   //
                    RC.Item,                                           // 93
                    { className: "item-text-wrap" },                   //
                    React.createElement(                               //
                        "div",                                         //
                        { className: "row" },                          //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col" },                      //
                            "Alternate Contact"                        //
                        ),                                             //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col" },                      //
                            this.data.currentUser.alterContact ? this.data.currentUser.alterContact.name : 'Alternate Contact Not Set'
                        ),                                             //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col" },                      //
                            React.createElement(                       //
                                "a",                                   //
                                { className: "button button-block", href: "/account/alternateContact" },
                                "Update"                               //
                            )                                          //
                        )                                              //
                    )                                                  //
                ),                                                     //
                React.createElement(                                   //
                    RC.Item,                                           // 111
                    { className: "item-text-wrap" },                   //
                    React.createElement(                               //
                        "div",                                         //
                        { className: "row" },                          //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col" },                      //
                            "Swimmers"                                 //
                        ),                                             //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col" },                      //
                            React.createElement(                       //
                                "p",                                   //
                                null,                                  //
                                this.data.swimmers.map(function (swimmer) {
                                                                       //
                                    var href = '/account/SwimmerProfile/' + swimmer._id;
                                                                       //
                                    return React.createElement(        // 124
                                        "a",                           //
                                        { key: swimmer._id,            //
                                            className: "button button-block button-small",
                                            href: href },              // 126
                                        swimmer.name                   //
                                    );                                 //
                                })                                     //
                            ),                                         //
                            React.createElement(                       //
                                "p",                                   //
                                null,                                  //
                                React.createElement(                   //
                                    "a",                               //
                                    { className: "button button-block",
                                        href: "/account/AddSwimmer" },
                                    "Add"                              //
                                )                                      //
                            )                                          //
                        )                                              //
                    )                                                  //
                )                                                      //
            )                                                          //
        );                                                             //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
