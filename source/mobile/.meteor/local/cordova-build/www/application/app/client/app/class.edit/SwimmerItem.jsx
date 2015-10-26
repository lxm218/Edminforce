(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.edit/SwimmerItem.jsx                               //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Cal.ClassEditSwimmerItem = React.createClass({                         // 1
    displayName: 'ClassEditSwimmerItem',                               //
                                                                       //
    mixins: [ReactMeteorData],                                         // 3
    getMeteorData: function () {                                       // 4
                                                                       //
        var swimmerId = this.props.swimmer._id;                        // 8
                                                                       //
        Meteor.subscribe("registerInfoBySwimmerId", swimmerId);        // 10
                                                                       //
        return {                                                       // 12
            classesRegisterInfo: DB.ClassesRegister.find({             // 13
                swimmerId: swimmerId,                                  // 14
                status: 'normal', //不显示cancel中的和 change中的              // 15
                sessionId: App.info && App.info.sessionNow             // 16
            }).fetch()                                                 //
        };                                                             //
    },                                                                 //
                                                                       //
    render: function () {                                              // 21
                                                                       //
        //let href = '/classEditSwimmer/'+this.props.swimmer._id+'/registeredClass'
        var href = '/classEdit/SwimmerRegisteredClass?swimmerId=' + this.props.swimmer._id;
                                                                       //
        return React.createElement(                                    // 27
            RC.Item,                                                   // 27
            { className: 'item-text-wrap',                             //
                href: href,                                            // 28
                theme: 'icon-left, icon-right ',                       // 29
                uiClass: 'user, angle-right' },                        // 30
            this.props.swimmer.name,                                   //
            this.data.classesRegisterInfo.map(function (register, n) {
                                                                       //
                return React.createElement(Cal.ClassEditSwimmerItemClassItem, { registerInfo: register, key: n });
            })                                                         //
        );                                                             //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
