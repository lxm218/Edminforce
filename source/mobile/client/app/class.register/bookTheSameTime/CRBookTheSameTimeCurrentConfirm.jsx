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
        confirm(){

            FlowRouter.go('/classRegister/SelectClassReady');

        },

        render() {

            var swimmer= this.data.swimmer
            var selectedClasses= this.data.selectedClasses


            return <div>

                <RC.Card key={Math.random()} className="padding">

                    <h4 className="brand">Your Booking Details</h4>

                    <div className="row">
                        <div className="col">
                            Swimmer
                        </div>
                        <div className="col">

                            {swimmer && swimmer.name}

                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            Level
                        </div>
                        <div className="col">


                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            Time
                        </div>
                        <div className="col">


                        </div>
                    </div>




                </RC.Card>

                <p>

                    <a href="#"> click here to choose more preference</a>
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
