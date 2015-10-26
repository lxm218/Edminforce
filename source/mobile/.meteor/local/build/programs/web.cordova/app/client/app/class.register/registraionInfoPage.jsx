(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.register/registraionInfoPage.jsx                   //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/14/15.                                                 //
 */                                                                    //
                                                                       //
{                                                                      // 5
    var classRegisterStore = undefined;                                // 6
    Dependency.autorun(function () {                                   // 7
        classRegisterStore = Dependency.get('ClassRegister.ViewControl.store');
    });                                                                //
                                                                       //
    Cal.CRRegistraionInfoPage = React.createClass({                    // 11
        displayName: "CRRegistraionInfoPage",                          //
                                                                       //
        mixins: [ReactMeteorData],                                     // 13
        getMeteorData: function () {                                   // 14
                                                                       //
            //Meteor.subscribe('registerInfoByAccountId',Meteor.userId())
                                                                       //
            return {};                                                 // 18
        },                                                             //
        "continue": function () {                                      // 20
                                                                       //
            Dispatcher.dispatch({                                      // 22
                actionType: "CRRegistraionInfoPage_CONTINUE"           // 23
            });                                                        //
        },                                                             //
                                                                       //
        render: function () {                                          // 28
                                                                       //
            return React.createElement(                                // 30
                "div",                                                 //
                { key: Math.random() },                                //
                React.createElement(                                   //
                    RC.Card,                                           // 33
                    { key: Math.random(), title: "Registration Information" },
                    React.createElement(                               //
                        "div",                                         //
                        { className: "row" },                          //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col col-33" },               //
                            React.createElement(                       //
                                "b",                                   //
                                null,                                  //
                                "1st week"                             //
                            ),                                         //
                            ":"                                        //
                        ),                                             //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col" },                      //
                            "Current students who want the same day and time"
                        )                                              //
                    ),                                                 //
                    React.createElement(                               //
                        "div",                                         //
                        { className: "row" },                          //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col col-33" },               //
                            React.createElement(                       //
                                "b",                                   //
                                null,                                  //
                                "2nd week"                             //
                            ),                                         //
                            ":"                                        //
                        ),                                             //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col" },                      //
                            "Current students who want to change their schedule"
                        )                                              //
                    ),                                                 //
                    React.createElement(                               //
                        "div",                                         //
                        { className: "row" },                          //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col col-33" },               //
                            React.createElement(                       //
                                "b",                                   //
                                null,                                  //
                                "3rd week"                             //
                            ),                                         //
                            ":"                                        //
                        ),                                             //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col" },                      //
                            "Returning students"                       //
                        )                                              //
                    ),                                                 //
                    React.createElement(                               //
                        "div",                                         //
                        { className: "row" },                          //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col col-33" },               //
                            React.createElement(                       //
                                "b",                                   //
                                null,                                  //
                                "4th week"                             //
                            ),                                         //
                            ":"                                        //
                        ),                                             //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col" },                      //
                            "Open enrollment"                          //
                        )                                              //
                    ),                                                 //
                    React.createElement(                               //
                        "p",                                           //
                        { className: "padding-left padding-right" },   //
                        "Calphin will still have the right to make changes. Schedules are not confirmed until confirmation emails are sent out."
                    ),                                                 //
                    React.createElement(                               //
                        "p",                                           //
                        { className: "padding-left padding-right" },   //
                        "Paced Program Level Abbreviation",            //
                        React.createElement("br", null),               //
                        "Bubbler -------------BUB",                    //
                        React.createElement("br", null),               //
                        "Crawler -------------CLR ",                   //
                        React.createElement("br", null),               //
                        "Glider -------------GLD",                     //
                        React.createElement("br", null),               //
                        "Sprinter-------------SPR",                    //
                        React.createElement("br", null),               //
                        "Racer-------------RCR",                       //
                        React.createElement("br", null),               //
                        "Challenger-------------CHL",                  //
                        React.createElement("br", null),               //
                        "Master-------------MST",                      //
                        React.createElement("br", null)                //
                    )                                                  //
                ),                                                     //
                React.createElement(                                   //
                    "p",                                               //
                    { className: "padding-left padding-right" },       //
                    React.createElement(                               //
                        "button",                                      //
                        { onClick: this["continue"],                   //
                            className: "button button-full button-brand " },
                        "Continue"                                     //
                    )                                                  //
                )                                                      //
            );                                                         //
        }                                                              //
    });                                                                //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
