(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.edit/SwimmerRegisteredClassPage.jsx                //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/11/15.                                                 //
 */                                                                    //
                                                                       //
Cal.SwimmerRegisteredClassPage = React.createClass({                   // 5
    displayName: 'SwimmerRegisteredClassPage',                         //
                                                                       //
    mixins: [ReactMeteorData],                                         // 7
    getMeteorData: function () {                                       // 8
                                                                       //
        var registeredClasses = DB.ClassesRegister.find({              // 10
            swimmerId: this.props.swimmerId,                           // 11
            status: 'normal', //不显示cancel中的和 change中的                  // 12
            sessionId: App.info && App.info.sessionRegister            // 13
        }).fetch();                                                    //
                                                                       //
        var nowClasses = DB.ClassesRegister.find({                     // 16
            swimmerId: this.props.swimmerId,                           // 17
            status: 'normal', //不显示cancel中的和 change中的                  // 18
            sessionId: App.info && App.info.sessionNow                 // 19
        }).fetch();                                                    //
                                                                       //
        var historyClasses = DB.ClassesRegister.find({                 // 22
            swimmerId: this.props.swimmerId,                           // 23
            status: 'normal', //不显示cancel中的和 change中的                  // 24
            sessionId: { $nin: [App.info && App.info.sessionNow, App.info && App.info.sessionRegister] }
                                                                       //
        }).fetch();                                                    //
                                                                       //
        return {                                                       // 31
            registeredClasses: registeredClasses,                      // 32
            nowClasses: nowClasses,                                    // 33
            historyClasses: historyClasses                             // 34
        };                                                             //
    },                                                                 //
                                                                       //
    render: function () {                                              // 38
        return React.createElement(                                    // 39
            RC.Tabs,                                                   // 39
            { className: 'bg-white' },                                 //
            React.createElement(                                       //
                'div',                                                 //
                { label: 'new session', className: 'padding' },        //
                this.data.registeredClasses && this.data.registeredClasses.map(function (item) {
                                                                       //
                    return React.createElement(Cal.ClassEditSwimmerItemClassItem, {
                        isLink: true,                                  // 47
                        registerInfo: item                             // 48
                    });                                                //
                })                                                     //
            ),                                                         //
            React.createElement(                                       //
                'div',                                                 //
                { label: 'current session', className: 'padding' },    //
                this.data.nowClasses && this.data.nowClasses.map(function (item) {
                                                                       //
                    return React.createElement(Cal.ClassEditSwimmerItemClassItem, {
                        isLink: true,                                  // 62
                        registerInfo: item                             // 63
                    });                                                //
                })                                                     //
            ),                                                         //
            React.createElement(                                       //
                'div',                                                 //
                { label: 'history', className: 'padding' },            //
                this.data.historyClasses && this.data.historyClasses.map(function (item) {
                                                                       //
                    return React.createElement(Cal.ClassEditSwimmerItemClassItem, {
                        registerInfo: item                             // 76
                    });                                                //
                })                                                     //
            )                                                          //
        );                                                             //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
