/**
 * Created on 10/1/15.
 */

Cal.CRAvailableDays = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        return {}
    },

    dayChange(e){
        var value = this.refs.day.getValue()
        value = parseInt(value, 10)

        Dispatcher.dispatch({
            actionType: "BookTheSameTime_DAY_CHANGE",
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