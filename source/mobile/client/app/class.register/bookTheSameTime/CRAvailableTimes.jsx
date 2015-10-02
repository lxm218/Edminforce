/**
 * Created on 10/1/15.
 */

Cal.CRAvailableTimes = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        return {}
    },

    timeChange(e){
        var value = this.refs.time.getValue()
        value = parseInt(value, 10)
        Dispatcher.dispatch({
            actionType: "BookTheSameTime_TIME_CHANGE",
            time: value
        });

    },

    render() {

        return <RC.Select2
                ref="time"
                options={this.props.avaiableTimes}
                value={this.props.currentTime}
                name="time"
                changeHandler={this.timeChange}
                label="Time"
            />
    }
})