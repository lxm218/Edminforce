(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.register/addWaitingList/AddWaitingListConfirmPage. //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 10/2/15.                                                 //
 */                                                                    //
                                                                       //
{                                                                      // 5
    (function () {                                                     //
        var PageStore = undefined;                                     // 6
        Dependency.autorun(function () {                               // 7
            PageStore = Dependency.get('classRegister.AddWaitingList.store');
        });                                                            //
                                                                       //
        Cal.AddWaitingListConfirmPage = React.createClass({            // 11
            displayName: "AddWaitingListConfirmPage",                  //
                                                                       //
            mixins: [ReactMeteorData],                                 // 13
            getMeteorData: function () {                               // 14
                return {                                               // 15
                    currentSwimmer: PageStore.currentSwimmer.get(),    // 16
                    currentClass: PageStore.currentClass.get()         // 17
                };                                                     //
            },                                                         //
            ok: function () {},                                        // 20
                                                                       //
            render: function () {                                      // 25
                return React.createElement(                            // 26
                    "div",                                             //
                    { className: "padding" },                          //
                    React.createElement(                               //
                        RC.Card,                                       // 30
                        { title: "Your Waiting List Info" },           //
                        React.createElement(                           //
                            "p",                                       //
                            { className: "padding" },                  //
                            React.createElement(                       //
                                "b",                                   //
                                null,                                  //
                                this.data.currentSwimmer && this.data.currentSwimmer.name
                            ),                                         //
                            "has been added on the waiting list for Level:",
                            React.createElement(                       //
                                "b",                                   //
                                null,                                  //
                                this.data.currentClass && this.data.currentClass.level
                            ),                                         //
                            "and Time:",                               //
                            React.createElement(                       //
                                "b",                                   //
                                null,                                  //
                                this.data.currentClass && App.num2time(this.data.currentClass.startTime),
                                "-",                                   //
                                this.data.currentClass && App.num2time(this.data.currentClass.endTime)
                            )                                          //
                        ),                                             //
                        React.createElement(                           //
                            "p",                                       //
                            { className: "padding" },                  //
                            " We will call you once a space is possible"
                        )                                              //
                    ),                                                 //
                    React.createElement(                               //
                        RC.URL,                                        // 50
                        { href: "/" },                                 //
                        React.createElement(                           //
                            RC.Button,                                 // 51
                            { name: "button", theme: "full", buttonColor: "brand" },
                            "OK"                                       //
                        )                                              //
                    )                                                  //
                );                                                     //
            }                                                          //
        });                                                            //
    })();                                                              //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
