(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/test.admin/TestAdminLayout.jsx                           //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 10/4/15.                                                 //
 */                                                                    //
                                                                       //
Cal.TestAdminLayout = React.createClass({                              // 5
    displayName: "TestAdminLayout",                                    //
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
            React.createElement(RC.HeaderNav, { nav: this.props.headerNav,
                hideBackButton: this.props.hideBackButton,             // 16
                title: this.props.title, theme: "flat" }),             // 17
            React.createElement(Cal.Body, { tmpl: this.props.body })   //
        );                                                             //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
