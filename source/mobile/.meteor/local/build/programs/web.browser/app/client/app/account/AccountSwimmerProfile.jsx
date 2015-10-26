(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/account/AccountSwimmerProfile.jsx                        //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/28/15.                                                 //
 */                                                                    //
{                                                                      // 4
                                                                       //
    //'read'  'edit' mode                                              //
    //let mode = new ReactiveVar('read')                               //
                                                                       //
    Cal.AccountSwimmerProfile = React.createClass({                    // 10
        displayName: "AccountSwimmerProfile",                          //
                                                                       //
        mixins: [ReactMeteorData],                                     // 12
        getMeteorData: function () {                                   // 13
                                                                       //
            Meteor.subscribe('swimmer', this.props.swimmerId);         // 16
            return {                                                   // 17
                                                                       //
                swimmer: DB.Swimmers.findOne({                         // 19
                    _id: this.props.swimmerId                          // 20
                })                                                     //
            };                                                         //
        },                                                             //
                                                                       //
        render: function () {                                          // 25
                                                                       //
            return React.createElement(                                // 27
                "div",                                                 //
                null,                                                  //
                this.data.swimmer ? React.createElement(               //
                    RC.Form,                                           // 31
                    { ref: "myForm", onSubmit: this.formSubmit },      //
                    React.createElement(RC.Input, { name: "name", label: "Name", value: this.data.swimmer.name }),
                    React.createElement(RC.Select, {                   //
                        options: ['male', 'female'],                   // 38
                        name: "gender",                                // 39
                        label: "Gender",                               // 40
                        value: this.data.swimmer.gender                // 41
                    }),                                                //
                    React.createElement(RC.Input, { name: "dob", label: "DOB", value: "" }),
                    React.createElement(RC.Select, {                   //
                        options: ['place1', 'place2'],                 // 48
                        name: "location",                              // 49
                        label: "Location",                             // 50
                        value: this.data.swimmer.location              // 51
                    }),                                                //
                    React.createElement(RC.Select, {                   //
                        options: App.Config.classLevelsNUM,            // 55
                        name: "level",                                 // 56
                        readOnly: true,                                // 57
                        label: "Level",                                // 58
                        value: this.data.swimmer.level                 // 59
                                                                       //
                    })                                                 //
                ) : React.createElement(RC.Card, { title: "No such swimmer" })
            );                                                         //
        }                                                              //
    });                                                                //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
