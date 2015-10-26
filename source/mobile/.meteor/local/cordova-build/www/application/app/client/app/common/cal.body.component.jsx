(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/common/cal.body.component.jsx                            //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Cal.Body = React.createClass({                                         // 1
  displayName: "Body",                                                 //
                                                                       //
  render: function () {                                                // 2
    return React.createElement(                                        // 3
      "div",                                                           //
      { className: "transition", id: "app-body" },                     //
      React.createElement(                                             //
        "div",                                                         //
        { className: "wrapper" },                                      //
        h.returnComponent(this.props.tmpl)                             //
      )                                                                //
    );                                                                 //
  }                                                                    //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
