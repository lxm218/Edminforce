/**
 * Created on 9/14/15.
 */

{
    //let classRegisterStore;
    //Dependency.autorun(function () {
    //    classRegisterStore = Dependency.get('ClassRegister.ViewControl.store');
    //});

    Cal.CRRegistraionInfoPage = React.createClass({

        mixins: [ReactMeteorData],
        getMeteorData() {

            //Meteor.subscribe('registerInfoByAccountId',Meteor.userId())

            return {}
        },
        continue(){
            console.log("Paced Program Register");
            Dispatcher.dispatch({
                actionType: "CRRegistraionInfoPage_CONTINUE"
            });

        },

        render() {

            return <div key={Math.random()}>


                <RC.Card key={Math.random()} title="Registration Information">

                    <RC.Item theme="body">

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

                        Bubbler -------------BUB<br/>
                        Crawler -------------CLR <br/>
                        Glider -------------GLD<br/>
                        Sprinter-------------SPR<br/>
                        Racer-------------RCR<br/>
                        Challenger-------------CHL<br/>
                        Master-------------MST<br/>

                    </p>


                    </RC.Item>


                </RC.Card>


                <RC.Div style={{margin: '10px'}}>
                    {
                        /*
                        * Don't know why click can be triggered directly in home page,and this page is skipped
                        * So add key={Math.random()}
                        * It will cause some underlying issues if data-react-id is the same in diffrent page ?
                        * */
                    }
                    <RC.Button bgColor="brand1"
                      onClick={this.continue}
                               key={Math.random()}>

                        Register
                    </RC.Button>
                </RC.Div>


            </div>
        }
    })
}
