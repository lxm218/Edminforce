(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/auth/userLoginBasic.jsx                                  //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
                                                                       //
Cal.Login = React.createClass({                                        // 2
  displayName: "Login",                                                //
                                                                       //
  render: function () {                                                // 3
    /**                                                                //
     * Notice how I used the .bg-brand class to style the login form.  //
     * Classes such as .bg-brand, .bg-brand2, .bg-brand3 are worth remembering.
     * They are useful and can be re-used many times.                  //
     */                                                                //
                                                                       //
    return React.createElement(IH.RC.User, { fullHeight: true, theme: "overlay-dark", bgColor: "brand-light" });
  }                                                                    //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
