(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.edit/ClassRegisterDetail.component.jsx             //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/25/15.                                                 //
 */                                                                    //
                                                                       //
Cal.ClassRegisterDetail = React.createClass({                          // 5
    displayName: "ClassRegisterDetail",                                //
                                                                       //
    mixins: [ReactMeteorData],                                         // 7
                                                                       //
    getMeteorData: function () {                                       // 9
        var classId = this.props.classId;                              // 10
        var swimmerId = this.props.swimmerId;                          // 11
                                                                       //
        Meteor.subscribe("class", classId);                            // 13
        Meteor.subscribe("swimmer", swimmerId);                        // 14
                                                                       //
        return {                                                       // 16
            swimmer: DB.Swimmers.findOne({ _id: swimmerId }),          // 17
            "class": DB.Classes.findOne({ _id: classId })              // 18
        };                                                             //
    },                                                                 //
                                                                       //
    render: function () {                                              // 22
        var title = this.props.title || 'Class Register Info';         // 23
                                                                       //
        return React.createElement(                                    // 25
            RC.Card,                                                   // 25
            { title: title },                                          //
            React.createElement(                                       //
                "div",                                                 //
                { className: "row" },                                  //
                React.createElement(                                   //
                    "div",                                             //
                    { className: "col" },                              //
                    " ",                                               //
                    this.data.swimmer && this.data.swimmer.name        //
                ),                                                     //
                React.createElement(                                   //
                    "div",                                             //
                    { className: "col" },                              //
                    this.data["class"] && this.data["class"].name      //
                )                                                      //
            )                                                          //
        );                                                             //
    }                                                                  //
});                                                                    //
                                                                       //
/*                                                                     //
 <div className="row">                                                 //
 <div className="col"> Swimmer</div>                                   //
 <div className="col">                                                 //
 {this.data.swimmer && this.data.swimmer.name}                         //
 </div>                                                                //
 </div>                                                                //
 <div className="row">                                                 //
 <div className="col"> Class</div>                                     //
 <div className="col">                                                 //
 {this.props.currentLevel}                                             //
  </div>                                                               //
 </div>                                                                //
 <div className="row">                                                 //
 <div className="col"> Class Day</div>                                 //
 <div className="col">                                                 //
 {this.data.class && App.Config.week[this.data.class.day]}             //
   </div>                                                              //
 </div>                                                                //
 <div className="row">                                                 //
 <div className="col"> Class Time</div>                                //
 <div className="col">                                                 //
 {this.data.class && App.num2time(this.data.class.startTime)}-         //
 {this.data.class && App.num2time(this.data.class.endTime)}            //
  </div>                                                               //
 </div>                                                                //
   * */                                                                //
/////////////////////////////////////////////////////////////////////////

}).call(this);
