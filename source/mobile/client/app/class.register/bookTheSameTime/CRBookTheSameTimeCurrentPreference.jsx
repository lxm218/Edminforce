/**
 * Created on 10/6/15.
 */

Cal.CRBookTheSameTimeCurrentPreference = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        return {}
    },
    //actions
    formSubmit(e){
        e.preventDefault()

        //var formData = this.refs.myForm.getFormData()

        //todo validation info in ui
        //if (!this.data.currentSwimmer || !this.data.currentDay || !this.data.currentTime) {
        //
        //    alert('please select a class')
        //    return;
        //}

        Dispatcher.dispatch({
            actionType: "BookTheSameTime_CLASS_SELECT_FOR_CURRENT",
            currentStep: this.props.currentStep,
            //selectedClass: formData
        });

    },

    render() {
        return <div>
            <RC.Form ref="myForm" key={Math.random()} >

                <RC.Item uiColor="brand1">
                    Swimmer: {this.props.currentSwimmer && this.props.currentSwimmer.name}
                </RC.Item>


                <Cal.CRSwimmerLevel
                    currentSwimmer={this.props.currentSwimmer}
                    ></Cal.CRSwimmerLevel>

                <Cal.CRAvailableDays
                    avaiableDays={this.props.avaiableDays}
                    currentDay={this.props.currentDay}>
                </Cal.CRAvailableDays>


                <Cal.CRAvailableTimes
                    avaiableTimes={this.props.avaiableTimes}
                    currentTime={this.props.currentTime}
                    ></Cal.CRAvailableTimes>


                <RC.Button name="button" type="submit"
                           onClick={this.formSubmit}
                           theme="full" buttonColor="brand">
                    Select
                </RC.Button>


            </RC.Form>

        </div>
    }
})