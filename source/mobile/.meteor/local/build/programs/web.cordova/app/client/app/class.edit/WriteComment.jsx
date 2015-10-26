(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.edit/WriteComment.jsx                              //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/11/15.                                                 //
 */                                                                    //
                                                                       //
Cal.WriteComment = React.createClass({                                 // 5
    displayName: "WriteComment",                                       //
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
            "WriteComment"                                             //
        );                                                             //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
