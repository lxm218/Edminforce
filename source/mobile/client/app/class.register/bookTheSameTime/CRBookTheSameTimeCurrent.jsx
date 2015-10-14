/**
 * Created on 9/30/15.
 */
{

    Cal.CRBookTheSameTimeCurrent = React.createClass({

        propTypes: {
            swimmers: React.PropTypes.array, //.isRequired
            currentSwimmer:React.PropTypes.object,
            currentSwimmerSameClasses:React.PropTypes.array,
            currentSwimmerAvaibleSameClasses:React.PropTypes.array, //过滤后的
            currentStep:React.PropTypes.number
        },

        mixins: [ReactMeteorData],
        getMeteorData() {
            return {}
        },

        //actions
        formSubmit (e) {
            e.preventDefault()

            var formData = this.refs.myForm.getFormData()


            //todo validation info in ui
            //if (!this.data. || !this.data.currentDay || !this.data.currentTime) {
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

            //let sameTimeClasses =  this.props.currentSwimmerSameClasses;
            let sameTimeClasses =  this.props.currentSwimmerAvaibleSameClasses;


            console.log(sameTimeClasses)

            return <div>

                <RC.Form ref="myForm" key={Math.random()} onSubmit={this.formSubmit}>


                    <Cal.CRSelectSwimmer
                        swimmers={this.props.swimmers}
                        currentSwimmer={this.props.currentSwimmer}
                        ></Cal.CRSelectSwimmer>

                    {
                        sameTimeClasses? sameTimeClasses.map(function (sameTimeClass) {

                            return <Cal.CRBookTheSameTimeClassItem
                                key={sameTimeClass._id}
                                classInfo={sameTimeClass}/>
                        }):''
                    }

                </RC.Form>

            </div>
        }
    })

}
