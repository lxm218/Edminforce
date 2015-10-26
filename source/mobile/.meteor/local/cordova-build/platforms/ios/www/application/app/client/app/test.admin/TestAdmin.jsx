(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/test.admin/TestAdmin.jsx                                 //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 10/4/15.                                                 //
 */                                                                    //
                                                                       //
Cal.TestAdmin = React.createClass({                                    // 5
    displayName: "TestAdmin",                                          //
                                                                       //
    mixins: [ReactMeteorData],                                         // 7
    getMeteorData: function () {                                       // 8
                                                                       //
        Meteor.subscribe('appInfo');                                   // 10
                                                                       //
        return {                                                       // 12
            app: DB.App.findOne()                                      // 13
        };                                                             //
    },                                                                 //
                                                                       //
    render: function () {                                              // 17
        return React.createElement(                                    // 18
            "div",                                                     //
            null,                                                      //
            React.createElement(                                       //
                RC.Card,                                               // 19
                { key: Math.random(), className: "padding" },          //
                React.createElement(                                   //
                    "h4",                                              //
                    { className: "brand" },                            //
                    "Current stage"                                    //
                ),                                                     //
                React.createElement(                                   //
                    "div",                                             //
                    { className: "row" },                              //
                    this.data.app && this.data.app.registerStage       //
                )                                                      //
            ),                                                         //
            React.createElement(                                       //
                RC.List,                                               // 33
                null,                                                  //
                React.createElement(                                   //
                    RC.Item,                                           // 37
                    { theme: "icon-left", uiClass: "list-ul", uiColor: "brand1",
                        href: "#" },                                   // 38
                    "accounts"                                         //
                ),                                                     //
                React.createElement(                                   //
                    RC.Item,                                           // 40
                    { theme: "icon-left", uiClass: "list-ul", uiColor: "brand1",
                        href: "/testAdmin/registerStage" },            // 41
                    "registerStage"                                    //
                ),                                                     //
                React.createElement(                                   //
                    RC.Item,                                           // 43
                    { theme: "icon-left", uiClass: "list-ul", uiColor: "brand2",
                        href: "#" },                                   // 44
                    "classes"                                          //
                ),                                                     //
                React.createElement(                                   //
                    RC.Item,                                           // 45
                    { theme: "icon-left", uiClass: "list-ul", uiColor: "brand3",
                        href: "/testAdmin/billing" },                  // 46
                    "billings"                                         //
                )                                                      //
            )                                                          //
        );                                                             //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
