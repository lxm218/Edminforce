(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/common/ContactInfoPage.jsx                               //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/22/15.                                                 //
 */                                                                    //
                                                                       //
Cal.ContactInfoPage = React.createClass({                              // 5
    displayName: "ContactInfoPage",                                    //
                                                                       //
    mixins: [ReactMeteorData],                                         // 7
    getMeteorData: function () {                                       // 8
        return {};                                                     // 9
    },                                                                 //
                                                                       //
    render: function () {                                              // 12
        return React.createElement(                                    // 13
            "div",                                                     //
            { key: Math.random() },                                    //
            React.createElement(                                       //
                RC.Card,                                               // 15
                { key: Math.random(), title: "Contact Us" },           //
                React.createElement(                                   //
                    "div",                                             //
                    { className: "row" },                              //
                    React.createElement(                               //
                        "div",                                         //
                        { className: "col" },                          //
                        React.createElement(                           //
                            "center",                                  //
                            null,                                      //
                            "~~~~~ FREMONT ~~~~~",                     //
                            React.createElement("br", null),           //
                            "Mon - Fri: 9am - 7pm",                    //
                            React.createElement("br", null),           //
                            "Sat - Sun: 8am - 6pm",                    //
                            React.createElement("br", null),           //
                            React.createElement("br", null),           //
                            "34075 Fremont Blvd",                      //
                            React.createElement("br", null),           //
                            "Fremont, CA 94555",                       //
                            React.createElement("br", null),           //
                            "(510) 790-7946",                          //
                            React.createElement("br", null),           //
                            React.createElement("br", null),           //
                            "~~~~~ DUBLIN ~~~~~",                      //
                            React.createElement("br", null),           //
                            "M, W, F: 12n - 8pm",                      //
                            React.createElement("br", null),           //
                            "Tu, Th, Sa, Su: 9am - 5pm",               //
                            React.createElement("br", null),           //
                            React.createElement("br", null),           //
                            "6175 Dublin Blvd",                        //
                            React.createElement("br", null),           //
                            "Dublin, CA 94568",                        //
                            React.createElement("br", null),           //
                            "(925) 248-2989",                          //
                            React.createElement("br", null)            //
                        )                                              //
                    )                                                  //
                )                                                      //
            )                                                          //
        );                                                             //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
