/**
 * Created on 10/1/15.
 */

Cal.CRSelectSwimmer = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        let swimmers = this.props.swimmers.map(function (v, i) {
            return {text: v['name'], value: v._id}
        })


        let currentSwimmerValue = this.props.currentSwimmer && this.props.currentSwimmer._id
            //&& {value:this.props.currentSwimmer._id,
            //    text:this.props.currentSwimmer.name}



        return {
            swimmers:swimmers,
            currentSwimmerValue:currentSwimmerValue
        }
    },

    //actions
    swimmerChange(e){
        var value = this.refs.swimmer.getValue()

        var swimmer = _.find(this.props.swimmers, function (v, n) {
            return v._id == value;
        })
        debugger

        Dispatcher.dispatch({
            actionType: "BookTheSameTime_SWIMMER_CHANGE",
            swimmer: swimmer
        });

    },

    render() {

        //this.props.swimmers
        console.log('render CRSelectSwimmer', this.data.currentSwimmerValue)

        debugger
        //

        return <RC.Select2
                ref="swimmer"
                options={this.data.swimmers}
                value={this.data.currentSwimmerValue}
                name="swimmer"
                changeHandler={this.swimmerChange}
                label="Swimmer"
            />
    }
})