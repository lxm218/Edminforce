/**
 * Created on 10/1/15.
 */

Cal.SelectDay = React.createClass({
    propTypes:{
        avaiableDays:React.PropTypes.array,
        currentDay:React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        changeMessage:React.PropTypes.string,

        readyOnly:React.PropTypes.bool
    },

    //mixins: [ReactMeteorData],
    //getMeteorData() {
    //    return {}
    //},

    dayChange(e){
        var value = this.refs.day.getValue()
        value = parseInt(value, 10)

        Dispatcher.dispatch({
            actionType: this.props.changeMessage, //"BookTheSameTime_DAY_CHANGE",
            day: value
        });

    },

    render() {
        return <RC.Select2
                ref="day"
                options={this.props.avaiableDays}
                value={this.props.currentDay}
                name="day"
                changeHandler={this.dayChange}
                label="Day"
            />
    }
})