/**
 * Created on 9/30/15.
 */
{

    Cal.CRBookTheSameTimeCurrent = React.createClass({

        propTypes: {
            //swimmer: React.PropTypes.object //.isRequired
        },

        mixins: [ReactMeteorData],
        getMeteorData() {
            return {}
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
                actionType: "BookTheSameTime_CLASS_SELECT_FOR_CURRENT",
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

                    {
                        this.props.currentSwimmerClasses.map(function (register) {

                            return <Cal.CRClassBookItem
                                classId={register.classId}
                                />
                        })
                    }

                </RC.Form>

            </div>
        }
    })

}
