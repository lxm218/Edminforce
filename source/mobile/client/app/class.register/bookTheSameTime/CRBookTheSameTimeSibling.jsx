/**
 * Created on 9/30/15.
 */


{

    Cal.CRBookTheSameTimeSibling = React.createClass({

        mixins: [ReactMeteorData],
        getMeteorData() {
            return {

            }
        },

        formSubmit (e) {
            e.preventDefault()

            var formData = this.refs.myForm.getFormData()

            debugger

            //todo validation info in ui
            //if (!this.data.currentSwimmer || !this.data.currentDay || !this.data.currentTime) {
            //
            //    alert('please select a class')
            //    return;
            //}

            Dispatcher.dispatch({
                actionType: "BookTheSameTime_CLASS_SELECT_FOR_SIBLING",
                currentStep: this.props.currentStep,
                selectedClass: formData
            });

        },
        render() {

            return <div>
                <RC.Form ref="myForm" key={Math.random()} onSubmit={this.formSubmit}>

                <Cal.CRSelectSwimmer
                    swimmers={this.props.swimmers}
                    currentSwimmer={this.props.currentSwimmer}
                    ></Cal.CRSelectSwimmer>


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
                    {this.props.currentStep == 1 ? 'Book':'Select'}
                </RC.Button>


                </RC.Form>


            </div>
        }
    })
}
