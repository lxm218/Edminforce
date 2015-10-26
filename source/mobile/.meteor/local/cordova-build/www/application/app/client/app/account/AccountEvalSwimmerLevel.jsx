(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/account/AccountEvalSwimmerLevel.jsx                      //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/26/15.                                                 //
 */                                                                    //
                                                                       //
Cal.AccountEvalSwimmerLevel = React.createClass({                      // 5
    displayName: "AccountEvalSwimmerLevel",                            //
                                                                       //
    mixins: [ReactMeteorData],                                         // 7
    getMeteorData: function () {                                       // 8
        return {};                                                     // 9
    },                                                                 //
                                                                       //
    //actions                                                          //
    confirm: function () {                                             // 13
                                                                       //
        var level = this.refs.levelInput.getValue();                   // 15
                                                                       //
        Dispatcher.dispatch({                                          // 17
            actionType: "ACCOUNT_EVAL_LEVEL_SUBMIT",                   // 18
            level: level                                               // 19
        });                                                            //
    },                                                                 //
                                                                       //
    render: function () {                                              // 25
                                                                       //
        return React.createElement(                                    // 27
            "div",                                                     //
            null,                                                      //
            React.createElement(                                       //
                RC.Item,                                               // 29
                { theme: "body" },                                     //
                React.createElement(                                   //
                    "h2",                                              //
                    { className: "brand" },                            //
                    "Description"                                      //
                ),                                                     //
                React.createElement(                                   //
                    "p",                                               //
                    null,                                              //
                    "If you do not assign a \"name\" prop, a random string will be generated for you."
                )                                                      //
            ),                                                         //
            React.createElement(RC.RadioGroup, { list: App.Config.classEVALLevels,
                ref: "levelInput",                                     // 35
                name: "my-park",                                       // 36
                value: "elora-gorge", uiColor: "brand2" }),            // 37
            React.createElement(                                       //
                RC.Button,                                             // 39
                { name: "button", theme: "full",                       //
                    onClick: this.confirm,                             // 40
                    buttonColor: "brand" },                            // 41
                "Select"                                               //
            )                                                          //
        );                                                             //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
