/**
 * Created on 9/14/15.
 */

{
    let classRegisterStore;
    Dependency.autorun(function () {
        classRegisterStore = Dependency.get('ClassRegister.ViewControl.store');
    });

    Cal.CRRegistraionInfoPage = React.createClass({

        mixins: [ReactMeteorData],
        getMeteorData() {

            //Meteor.subscribe('registerInfoByAccountId',Meteor.userId())

            return {}
        },
        continue(){

            Dispatcher.dispatch({
                actionType: "CRRegistraionInfoPage_CONTINUE"
            });

        },

        render() {

            return <div key={Math.random()}>


                <RC.Card key={Math.random()} title="Registration Information">
                    <div className="row">
                        <div className="col">

                            <p>
                                1st week: Current students who want the same day and time
                                <br/>
                                2nd week: Current students who want to change their schedule
                                <br/>
                                3rd week:Returning students
                                <br/>
                                4th week: Open enrollment

                            </p>

                            <p>

                                Calphin will still have the right to make changes. Schedules are not confirmed until
                                confirmation emails are sent out.

                            </p>

                        </div>

                    </div>

                </RC.Card>


                <p className="padding-left padding-right">

                    <button onClick={this.continue}
                            className="button button-full button-brand ">

                        Continue
                    </button>
                </p>


            </div>
        }
    })
}
