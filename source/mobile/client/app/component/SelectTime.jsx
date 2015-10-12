/**
 * Created on 10/1/15.
 */

Cal.SelectTime = React.createClass({
    propTypes:{
        avaiableTimes:React.PropTypes.array,
        currentTime:React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        changeMessage:React.PropTypes.string
    },
    //mixins: [ReactMeteorData],
    //getMeteorData() {
    //    return {}
    //},

    timeChange(e){
        var value = this.refs.time.getValue()
        value = parseInt(value, 10)
        Dispatcher.dispatch({
            actionType: this.props.changeMessage,
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