(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/test/test.layout.jsx                                     //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
                                                                       //
Cal.TestLayout = React.createClass({                                   // 2
    displayName: "TestLayout",                                         //
                                                                       //
    render: function () {                                              // 3
        return React.createElement(                                    // 4
            "div",                                                     //
            null,                                                      //
            React.createElement(                                       //
                "header",                                              //
                null,                                                  //
                "This is our header"                                   //
            ),                                                         //
            React.createElement(                                       //
                "main",                                                //
                null,                                                  //
                this.props.content                                     //
            ),                                                         //
            React.createElement(                                       //
                "footer",                                              //
                null,                                                  //
                "This is our footer"                                   //
            )                                                          //
        );                                                             //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
