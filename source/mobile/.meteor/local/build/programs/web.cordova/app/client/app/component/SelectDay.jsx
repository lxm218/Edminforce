(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/component/SelectDay.jsx                                  //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 10/1/15.                                                 //
 */                                                                    //
                                                                       //
Cal.SelectDay = React.createClass({                                    // 5
    displayName: "SelectDay",                                          //
                                                                       //
    propTypes: {                                                       // 6
        avaiableDays: React.PropTypes.array,                           // 7
        currentDay: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        changeMessage: React.PropTypes.string,                         // 12
                                                                       //
        readyOnly: React.PropTypes.bool                                // 14
    },                                                                 //
                                                                       //
    //mixins: [ReactMeteorData],                                       //
    //getMeteorData() {                                                //
    //    return {}                                                    //
    //},                                                               //
                                                                       //
    dayChange: function (e) {                                          // 22
        var value = this.refs.day.getValue();                          // 23
        value = parseInt(value, 10);                                   // 24
                                                                       //
        Dispatcher.dispatch({                                          // 26
            actionType: this.props.changeMessage, //"BookTheSameTime_DAY_CHANGE",
            day: value                                                 // 28
        });                                                            //
    },                                                                 //
                                                                       //
    render: function () {                                              // 33
        return React.createElement(RC.Select2, {                       // 34
            ref: "day",                                                // 35
            options: this.props.avaiableDays,                          // 36
            value: this.props.currentDay,                              // 37
            name: "day",                                               // 38
            changeHandler: this.dayChange,                             // 39
            label: "Day"                                               // 40
        });                                                            //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
