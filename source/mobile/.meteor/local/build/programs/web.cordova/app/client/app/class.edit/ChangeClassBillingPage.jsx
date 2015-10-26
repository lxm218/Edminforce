(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.edit/ChangeClassBillingPage.jsx                    //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/11/15.                                                 //
 */                                                                    //
{                                                                      // 4
    (function () {                                                     //
                                                                       //
        var PageStore = undefined;                                     // 6
        Dependency.autorun(function () {                               // 7
            PageStore = Dependency.get('classEdit.ChangeClass.store');
        });                                                            //
                                                                       //
        Cal.ChangeClassBillingPage = React.createClass({               // 12
            displayName: "ChangeClassBillingPage",                     //
                                                                       //
            mixins: [ReactMeteorData],                                 // 14
            getMeteorData: function () {                               // 15
                return {                                               // 16
                    swimmer: PageStore.swimmer.get(),                  // 17
                    "class": PageStore["class"].get(),                 // 18
                    newClass: PageStore.currentClass.get()             // 19
                };                                                     //
            },                                                         //
                                                                       //
            ///actions                                                 //
                                                                       //
            confirm: function () {                                     // 25
                                                                       //
                Dispatcher.dispatch({                                  // 27
                    actionType: "ChangeClassPage_BILLING_CONFIRM"      // 28
                });                                                    //
            },                                                         //
                                                                       //
            render: function () {                                      // 32
                return React.createElement(                            // 33
                    "div",                                             //
                    { className: "padding" },                          //
                    React.createElement(                               //
                        RC.Card,                                       // 36
                        { key: Math.random(), title: "Class Change Confirm" },
                        React.createElement(                           //
                            "div",                                     //
                            { className: "row" },                      //
                            React.createElement(                       //
                                "div",                                 //
                                { className: "col" },                  //
                                React.createElement(                   //
                                    "b",                               //
                                    null,                              //
                                    this.data.swimmer && this.data.swimmer.name
                                )                                      //
                            ),                                         //
                            React.createElement(                       //
                                "div",                                 //
                                { className: "col" },                  //
                                this.data["class"] && this.data.swimmer ? React.createElement(
                                    "p",                               //
                                    null,                              //
                                    this.data["class"].name,           //
                                    React.createElement("br", null),   //
                                    React.createElement(               //
                                        "b",                           //
                                        null,                          //
                                        "is Changed to"                //
                                    ),                                 //
                                    React.createElement("br", null),   //
                                    this.data.newClass.name            //
                                ) : 'class change detail'              //
                            )                                          //
                        )                                              //
                    ),                                                 //
                    React.createElement(                               //
                        "div",                                         //
                        { className: "row" },                          //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col" },                      //
                            "Due"                                      //
                        ),                                             //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col" },                      //
                            "0"                                        //
                        )                                              //
                    ),                                                 //
                    React.createElement(                               //
                        "div",                                         //
                        { className: "row" },                          //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col" },                      //
                            "Refund"                                   //
                        ),                                             //
                        React.createElement(                           //
                            "div",                                     //
                            { className: "col" },                      //
                            "0"                                        //
                        )                                              //
                    ),                                                 //
                    React.createElement(                               //
                        RC.Button,                                     // 87
                        { name: "button",                              //
                            onClick: this.confirm,                     // 88
                            theme: "full", buttonColor: "brand" },     // 89
                        "Confirm"                                      //
                    )                                                  //
                );                                                     //
            }                                                          //
        });                                                            //
    })();                                                              //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
