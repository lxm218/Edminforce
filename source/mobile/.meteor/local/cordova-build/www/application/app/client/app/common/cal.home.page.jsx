(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/common/cal.home.page.jsx                                 //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Cal.Home = React.createClass({                                         // 1
    displayName: 'Home',                                               //
                                                                       //
    mixins: [ReactMeteorData],                                         // 4
    getMeteorData: function () {                                       // 5
                                                                       //
        Meteor.subscribe("accountCurrent");                            // 7
                                                                       //
        return {                                                       // 9
            account: Meteor.users.findOne()                            // 10
        };                                                             //
    },                                                                 //
    render: function () {                                              // 13
                                                                       //
        var title = 'Welcome To Our ' + (this.data.account && this.data.account.profile.location) + ' Facility';
                                                                       //
        console.log(title);                                            // 17
        return React.createElement(                                    // 18
            'div',                                                     //
            { className: 'padding' },                                  //
            React.createElement(RC.Card, { title: title }),            //
            React.createElement(                                       //
                'div',                                                 //
                { className: 'row' },                                  //
                React.createElement(                                   //
                    'div',                                             //
                    { className: 'col' },                              //
                    React.createElement(                               //
                        RC.Button,                                     // 28
                        { name: 'button', buttonColor: 'dark', className: 'button-clear' },
                        'Paced Program'                                //
                    )                                                  //
                ),                                                     //
                React.createElement(                                   //
                    'div',                                             //
                    { className: 'col' },                              //
                    React.createElement(                               //
                        RC.Button,                                     // 33
                        { name: 'button', buttonColor: 'brand', href: '/classRegister/registraionInfoPage' },
                        'Register'                                     //
                    )                                                  //
                )                                                      //
            ),                                                         //
            React.createElement(                                       //
                'div',                                                 //
                { className: 'row' },                                  //
                React.createElement(                                   //
                    'div',                                             //
                    { className: 'col' },                              //
                    React.createElement(                               //
                        RC.Button,                                     // 42
                        { name: 'button', buttonColor: 'dark', className: 'button-clear' },
                        'Intense Program'                              //
                    )                                                  //
                ),                                                     //
                React.createElement(                                   //
                    'div',                                             //
                    { className: 'col' },                              //
                    React.createElement(                               //
                        RC.Button,                                     // 47
                        { name: 'button', buttonColor: 'brand' },      //
                        'Register'                                     //
                    )                                                  //
                )                                                      //
            ),                                                         //
            React.createElement(                                       //
                'div',                                                 //
                { className: 'row' },                                  //
                React.createElement(                                   //
                    'div',                                             //
                    { className: 'col' },                              //
                    React.createElement(                               //
                        RC.Button,                                     // 56
                        { name: 'button', buttonColor: 'dark', className: 'button-clear' },
                        'Little Star Program'                          //
                    )                                                  //
                ),                                                     //
                React.createElement(                                   //
                    'div',                                             //
                    { className: 'col' },                              //
                    React.createElement(                               //
                        RC.Button,                                     // 61
                        { name: 'button', buttonColor: 'brand' },      //
                        'Register'                                     //
                    )                                                  //
                )                                                      //
            ),                                                         //
            React.createElement(                                       //
                'div',                                                 //
                { className: 'row' },                                  //
                React.createElement(                                   //
                    'div',                                             //
                    { className: 'col' },                              //
                    React.createElement(                               //
                        RC.Button,                                     // 70
                        { name: 'button', buttonColor: 'dark', className: 'button-clear' },
                        'Fasttrack Program'                            //
                    )                                                  //
                ),                                                     //
                React.createElement(                                   //
                    'div',                                             //
                    { className: 'col' },                              //
                    React.createElement(                               //
                        RC.Button,                                     // 75
                        { name: 'button', buttonColor: 'brand' },      //
                        'Register'                                     //
                    )                                                  //
                )                                                      //
            )                                                          //
        );                                                             //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
