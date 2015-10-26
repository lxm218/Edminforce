(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/auth/userRegister.jsx                                    //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
                                                                       //
Cal.User_Registration_Only = React.createClass({                       // 2
  displayName: "User_Registration_Only",                               //
                                                                       //
  render: function () {                                                // 3
    /**                                                                //
     * You can change the action to "register" to display a different form.
     * You can also set "allowSwitch" to false to disable switching back and forth.
     */                                                                //
    return React.createElement(                                        // 8
      IH.RC.User,                                                      // 8
      { fullHeight: true, action: "register", disableSwitch: true, theme: "overlay-dark", bgColor: "white" },
      React.createElement("img", { src: "/assets/logo.png" })          //
    );                                                                 //
  }                                                                    //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
