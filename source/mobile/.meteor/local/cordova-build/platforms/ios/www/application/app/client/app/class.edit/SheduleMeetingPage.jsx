(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.edit/SheduleMeetingPage.jsx                        //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/11/15.                                                 //
 */                                                                    //
                                                                       //
Cal.SheduleMeetingPage = React.createClass({                           // 5
    displayName: "SheduleMeetingPage",                                 //
                                                                       //
    mixins: [ReactMeteorData],                                         // 7
    getMeteorData: function () {                                       // 8
        return {};                                                     // 9
    },                                                                 //
                                                                       //
    render: function () {                                              // 12
        return React.createElement(                                    // 13
            "div",                                                     //
            null,                                                      //
            "SheduleMeetingPage"                                       //
        );                                                             //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
