(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/component/SelectTime.jsx                                 //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 10/1/15.                                                 //
 */                                                                    //
                                                                       //
Cal.SelectTime = React.createClass({                                   // 5
    displayName: "SelectTime",                                         //
                                                                       //
    propTypes: {                                                       // 6
        avaiableTimes: React.PropTypes.array,                          // 7
        currentTime: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        changeMessage: React.PropTypes.string                          // 12
    },                                                                 //
    //mixins: [ReactMeteorData],                                       //
    //getMeteorData() {                                                //
    //    return {}                                                    //
    //},                                                               //
                                                                       //
    timeChange: function (e) {                                         // 19
        var value = this.refs.time.getValue();                         // 20
        value = parseInt(value, 10);                                   // 21
        Dispatcher.dispatch({                                          // 22
            actionType: this.props.changeMessage,                      // 23
            time: value                                                // 24
        });                                                            //
    },                                                                 //
                                                                       //
    render: function () {                                              // 29
                                                                       //
        return React.createElement(RC.Select2, {                       // 31
            ref: "time",                                               // 32
            options: this.props.avaiableTimes,                         // 33
            value: this.props.currentTime,                             // 34
            name: "time",                                              // 35
            changeHandler: this.timeChange,                            // 36
            label: "Time"                                              // 37
        });                                                            //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
