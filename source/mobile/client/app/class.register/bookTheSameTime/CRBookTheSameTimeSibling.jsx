/**
 * Created on 9/30/15.
 */


{

    Cal.CRBookTheSameTimeSibling = React.createClass({

        mixins: [ReactMeteorData],
        getMeteorData() {
            return {}
        },

        formSubmit (e) {
            e.preventDefault()

            var formData = this.refs.myForm.getFormData()


            //todo validation info in ui
            //if (!this.data.currentSwimmer || !this.data.currentDay || !this.data.currentTime) {
            //
            //    alert('please select a class')
            //    return;
            //}

            var selectedClasses =this.props.selectedClasses
            var currentClass =this.props.currentClass

            if(!currentClass){
                alert('please select a class')
                return;
            }

            if(App.currentClass_in_selectedClasses(currentClass,selectedClasses)){
                alert('class duplicated')
                return;
            }


            Dispatcher.dispatch({
                actionType: "BookTheSameTime_CLASS_SELECT_FOR_SIBLING",
                currentStep: this.props.currentStep,
                selectedClass: formData
            });

            //<Cal.CRSelectSwimmer
            //    swimmers={this.props.swimmers}
            //    currentSwimmer={this.props.currentSwimmer}
            //    ></Cal.CRSelectSwimmer>

        },
        render() {

            return <div>
                <RC.Form ref="myForm" key={Math.random()} onSubmit={this.formSubmit}>


                    <Cal.SelectSwimmer
                        swimmers={this.props.swimmers}
                        currentSwimmer={this.props.currentSwimmer}
                        changeMessage="BookTheSameTime_SWIMMER_CHANGE"
                        />


                    <RC.Item uiColor="brand1">
                        Level: {this.props.currentLevel}
                    </RC.Item>

                    <Cal.SelectDay
                        avaiableDays={this.props.avaiableDays}
                        currentDay={this.props.currentDay}
                        changeMessage="BookTheSameTime_DAY_CHANGE"

                        />
                    <Cal.SelectTime
                        avaiableTimes={this.props.avaiableTimes}
                        currentTime={this.props.currentTime}
                        changeMessage="BookTheSameTime_TIME_CHANGE"

                        />

                    <RC.Button name="button" type="submit"
                               onClick={this.formSubmit}
                               theme="full" buttonColor="brand">
                        {this.props.currentStep == 1 ? 'Book' : 'Select'}
                    </RC.Button>


                </RC.Form>


            </div>
        }
    })
}
