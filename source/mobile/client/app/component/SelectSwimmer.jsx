/**
 * Created on 10/1/15.
 */

Cal.SelectSwimmer = React.createClass({
    propTypes:{
        swimmers:React.PropTypes.array,
        currentSwimmer:React.PropTypes.object,
        changeMessage:React.PropTypes.string,
        readyOnly:React.PropTypes.bool,
    },
    mixins: [ReactMeteorData],
    getMeteorData() {
        let swimmers = this.props.swimmers && this.props.swimmers.map(function (v, i) {
            return {text: v['name'], value: v._id}
        })


        let currentSwimmerValue = this.props.currentSwimmer && this.props.currentSwimmer._id
            //&& {value:this.props.currentSwimmer._id,
            //    text:this.props.currentSwimmer.name}



        return {
            swimmers:swimmers,
            currentSwimmerValue:currentSwimmerValue,

            currentSwimmer:this.props.currentSwimmer,
            readyOnly:this.props.readyOnly
        }
    },

    //actions
    swimmerChange(e){
        var value = this.refs.swimmer.getValue()

        var swimmer = _.find(this.props.swimmers, function (v, n) {
            return v._id == value;
        })

        Dispatcher.dispatch({
            actionType: this.props.changeMessage,
            swimmer: swimmer
        });

    },

    render() {

        return  this.props.readyOnly?

        <RC.Select2
                ref="swimmer"
                options={this.data.swimmers}
                value={this.data.currentSwimmerValue}
                name="swimmer"
                changeHandler={this.swimmerChange}
                label="Swimmer"
            />

        :<RC.Item uiColor="brand1">
            Swimmer: {this.data.currentSwimmer && this.data.currentSwimmer.name}
        </RC.Item>
    }
})