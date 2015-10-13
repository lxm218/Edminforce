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
                        <div className="col col-33">
                            <b>1st week</b>:
                        </div>
                        <div className="col">
                             Current students who want the same day and time
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-33">
                            <b>2nd week</b>:
                        </div>
                        <div className="col">
                             Current students who want to change their schedule
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-33">
                            <b>3rd week</b>:
                        </div>
                        <div className="col">
                            Returning students
                        </div>
                    </div>
                    <div className="row">

                        <div className="col col-33">
                            <b>4th week</b>:
                        </div>
                        <div className="col">
                             Open enrollment
                        </div>
                    </div>

                    <p className="padding-left padding-right">
                        Calphin will still have the right to make changes. Schedules are not confirmed until
                        confirmation emails are sent out.
                    </p>


                    <p className="padding-left padding-right">
                        Paced Program Level Abbreviation<br/>

                        Crawler -------------CLR <br/>
                        Bubbler -------------BUB<br/>
                        Glider -------------GLD<br/>
                        Sprinter-------------SPR<br/>
                        Racer-------------RCR<br/>
                        Challenger-------------CHL<br/>
                        Master-------------MST<br/>

                    </p>





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
