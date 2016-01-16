/**
 * Created on 9/11/15.
 */
{

    let PageStore;
    Dependency.autorun(function () {
        PageStore = Dependency.get('classEdit.ChangeClass.store');
    });


    Cal.ChangeClassBillingPage = React.createClass({

        mixins: [ReactMeteorData],
        getMeteorData() {
            return {
                swimmer: PageStore.swimmer.get(),
                class: PageStore.class.get(),
                newClass: PageStore.currentClass.get()
            }
        },

        ///actions

        confirm(){

            Dispatcher.dispatch({
                actionType: "ChangeClassPage_BILLING_CONFIRM"
            });
        },

        render() {
            return <div className="padding">


                <RC.Card key={Math.random()} title="Class Change Confirm">

                    <div className="row">
                        <div className="col">
                            <b>
                                {this.data.swimmer && this.data.swimmer.name}
                            </b>
                        </div>

                        <div className="col">

                            {
                                this.data.class && this.data.swimmer ?
                                    <p>
                                        {this.data.class.name}

                                        <br/>
                                            <b>is Changed to</b>
                                        <br/>

                                        {this.data.newClass.name}
                                    </p> :

                                    'class change detail'
                            }
                        </div>

                    </div>

                </RC.Card>


                <div className="row">
                    <div className="col">
                        Due
                    </div>
                    <div className="col">
                        0
                    </div>

                </div>
                <div className="row">
                    <div className="col">
                        Refund
                    </div>
                    <div className="col">
                        0
                    </div>

                </div>

                <RC.Button name="button"
                           onClick={this.confirm}
                           theme="full" buttonColor="brand">
                    Confirm
                </RC.Button>


            </div>

        }
    })

}
