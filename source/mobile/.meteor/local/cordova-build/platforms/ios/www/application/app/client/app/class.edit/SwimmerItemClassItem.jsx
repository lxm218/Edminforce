(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.edit/SwimmerItemClassItem.jsx                      //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Cal.ClassEditSwimmerItemClassItem = React.createClass({                // 1
    displayName: "ClassEditSwimmerItemClassItem",                      //
                                                                       //
    propTypes: {                                                       // 2
        registerInfo: React.PropTypes.object,                          // 3
        isLink: React.PropTypes.bool                                   // 4
    },                                                                 //
    mixins: [ReactMeteorData],                                         // 6
    getMeteorData: function () {                                       // 7
                                                                       //
        //account swimmers classes                                     //
        //Meteor.subscribe("accountWithSwimmersAndClasses",'account1');
                                                                       //
        var registerInfo = this.props.registerInfo;                    // 12
        var classId = registerInfo.classId;                            // 13
        var swimmerId = registerInfo.swimmerId;                        // 14
                                                                       //
        Meteor.subscribe("class", classId);                            // 16
        Meteor.subscribe("swimmer", swimmerId);                        // 17
                                                                       //
        return {                                                       // 20
            swimmer: DB.Swimmers.find({ _id: swimmerId }).fetch(),     // 21
            classInfo: DB.Classes.find({ _id: classId }).fetch()       // 22
        };                                                             //
    },                                                                 //
                                                                       //
    render: function () {                                              // 26
        var registerInfo = this.props.registerInfo;                    // 27
                                                                       //
        var href = '/classEdit/operationBoard?' + 'classId=' + encodeURIComponent(registerInfo.classId) + '&swimmerId=' + registerInfo.swimmerId + '&registerInfoId=' + registerInfo._id;
                                                                       //
        return !this.props.isLink ? React.createElement(               // 34
            "p",                                                       //
            null,                                                      //
            this.data.classInfo.length ? React.createElement(          //
                "span",                                                //
                null,                                                  //
                this.data.classInfo[0].name                            //
            ) : ''                                                     //
        ) : this.data.classInfo.length ? React.createElement(          //
            RC.Item,                                                   // 41
            { className: "item-text-wrap",                             //
                href: href,                                            // 42
                theme: "icon-left, icon-right ",                       // 43
                uiClass: "user, angle-right" },                        // 44
            this.data.classInfo[0].name                                //
        ) : '';                                                        //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
