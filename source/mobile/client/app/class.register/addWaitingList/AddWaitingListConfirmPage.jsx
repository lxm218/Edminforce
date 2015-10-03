/**
 * Created on 10/2/15.
 */

{
    let PageStore;
    Dependency.autorun(function () {
        PageStore = Dependency.get('classRegister.AddWaitingList.store');
    });

    Cal.AddWaitingListConfirmPage = React.createClass({

        mixins: [ReactMeteorData],
        getMeteorData() {
            return {
                currentSwimmer:PageStore.currentSwimmer.get(),
                currentClass:PageStore.currentClass.get()
            }
        },
        ok(){


        },

        render() {
            return <div className="padding">



                <RC.Card title="Your Waiting List Info" >
                    <p className="padding">
                        <b>{this.data.currentSwimmer && this.data.currentSwimmer.name}</b>
                         has been added on the waiting list
                         for Level:
                        <b>{this.data.currentClass && this.data.currentClass.level}</b>

                         and Time:

                        <b>{this.data.currentClass && App.num2time(this.data.currentClass.startTime)}-
                        {this.data.currentClass && App.num2time(this.data.currentClass.endTime)}</b>
                    </p>


                    <p className="padding"> We will call you once a space is possible</p>

                </RC.Card>



                <RC.URL href="/">
                    <RC.Button name="button" theme="full" buttonColor="brand">
                        OK
                    </RC.Button>
                </RC.URL>


            </div>
        }
    })
}
