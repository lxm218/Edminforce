/**
 * Created on 10/1/15.
 */


{
    let PageStore;
    Dependency.autorun(function () {
        PageStore = Dependency.get('classRegister.bookTheSameTimePage.store');
    });



    Cal.CRBookTheSameTimeCurrentConfirm = React.createClass({

        mixins: [ReactMeteorData],
        getMeteorData() {


            return {
                swimmer: PageStore.currentSwimmer.get(),

                selectedClasses: PageStore.selectedClasses.get()
            }
        },

        //actions
        confirm(e){
            e.preventDefault()
            FlowRouter.go('/classRegister/BookTheSameTimeSelectClassReady');

        },
        choosePreference(){

            Dispatcher.dispatch({
                actionType: "BookTheSameTime_CLASS_SELECT_FOR_CURRENT",
                currentStep: '1-1',
                //selectedClass: formData
            });
        },

        render() {

            //var swimmer= this.data.swimmer

            let swimmer = this.data.selectedClasses.get('swimmer')
            let class1 = this.data.selectedClasses.get('class1')
            let class2 = this.data.selectedClasses.get('class2')
            let class3 = this.data.selectedClasses.get('class3')



            return <div>



                <p>
                    <a  onClick={this.choosePreference}>
                        click here to choose more preference
                    </a>
                </p>




                <RC.Button name="button" type="submit"
                           onClick={this.confirm}
                           theme="full" buttonColor="brand">
                    Confirm
                </RC.Button>



            </div>
        }
    })
}
