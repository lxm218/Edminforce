(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.edit/ClassOperationBoardPage.jsx                   //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/11/15.                                                 //
 */                                                                    //
                                                                       //
Cal.ClassOperationBoardPage = React.createClass({                      // 5
    displayName: "ClassOperationBoardPage",                            //
                                                                       //
    mixins: [ReactMeteorData],                                         // 7
    getMeteorData: function () {                                       // 8
        return {};                                                     // 9
        //let classId = this.props.classId;                            //
        //let swimmerId= this.props.swimmerId                          //
        //                                                             //
        //Meteor.subscribe("class",classId);                           //
        //Meteor.subscribe("swimmer",swimmerId);                       //
        //                                                             //
        //return {                                                     //
        //    swimmer:DB.Swimmers.findOne({_id:swimmerId}),            //
        //    class:DB.Classes.findOne({_id:classId})                  //
        //                                                             //
        //}                                                            //
    },                                                                 //
                                                                       //
    render: function () {                                              // 23
                                                                       //
        var classId = this.props.classId;                              // 25
        var swimmerId = this.props.swimmerId;                          // 26
                                                                       //
        var colours = [{                                               // 29
            uiColor: "brand",                                          // 30
            value: "Change Class",                                     // 31
            href: '/classEdit/change' + '?classId=' + classId + '&swimmerId=' + swimmerId
                                                                       //
        }, {                                                           //
            uiColor: "brand1",                                         // 37
            value: "Cancel Class",                                     // 38
            href: '/classEdit/cancel' + '?classId=' + classId + '&swimmerId=' + swimmerId
        },                                                             //
        //    {                                                        //
        //    uiColor: "brand2",                                       //
        //    value: "Shedule Meeting",                                //
        //    href:'/classEdit/'+classId+'/sheduleMeeting'             //
        //},                                                           //
        {                                                              // 48
            uiColor: "brand3",                                         // 49
            value: "Write Comment",                                    // 50
            href: '/classEdit/writeComment' + '?classId=' + classId + '&swimmerId=' + swimmerId
        }];                                                            //
                                                                       //
        return React.createElement(                                    // 56
            RC.List,                                                   // 56
            null,                                                      //
            React.createElement(Cal.ClassRegisterDetail, {             //
                classId: this.props.classId,                           // 59
                swimmerId: this.props.swimmerId                        // 60
            }),                                                        //
            colours.map(function (c, n) {                              //
                c.theme = "icon-right";                                // 65
                c.uiClass = "angle-right";                             // 66
                return React.createElement(                            // 67
                    RC.Item,                                           // 67
                    babelHelpers._extends({}, _.omit(c, "value"), { key: n }),
                    c.value                                            //
                );                                                     //
            })                                                         //
        );                                                             //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
