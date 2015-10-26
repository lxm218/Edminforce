(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/test.admin/TestAdminRegisterStage.jsx                    //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 10/4/15.                                                 //
 */                                                                    //
                                                                       //
Cal.TestAdminRegisterStage = React.createClass({                       // 5
    displayName: "TestAdminRegisterStage",                             //
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
    stageChange: function () {                                         // 19
                                                                       //
        var value = this.refs.stageSelect.getValue();                  // 21
                                                                       //
        DB.App.update({ _id: App.info._id }, {                         // 23
            $set: { registerStage: value }                             // 26
        });                                                            //
    },                                                                 //
                                                                       //
    render: function () {                                              // 31
                                                                       //
        var options = [{ text: "stage-1", value: 1 }, { text: "stage-2", value: 2 }, { text: "stage-3", value: 3 }, { text: "stage-4", value: 4 }];
                                                                       //
        return React.createElement(                                    // 40
            "div",                                                     //
            null,                                                      //
            React.createElement(                                       //
                RC.Card,                                               // 42
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
            React.createElement(RC.Select, {                           //
                ref: "stageSelect",                                    // 58
                changeHandler: this.stageChange,                       // 59
                theme: "small-label",                                  // 60
                options: options,                                      // 61
                value: App.info && App.info.registerStage, label: "stage", labelColor: "brand3"
            })                                                         //
        );                                                             //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
