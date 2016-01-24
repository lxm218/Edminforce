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

            Meteor.subscribe('waitingListByAccount')

            return {
                //currentSwimmer:PageStore.currentSwimmer.get(),
                //currentClass:PageStore.currentClass.get()
                waitingListInfo:DB.WaitingList.findOne({_id:this.props.id})
            }
        },
        ok(){


        },

        render() {
            let waitingListInfo= this.data.waitingListInfo
            let swimmer= waitingListInfo && waitingListInfo.swimmer
            let class1= waitingListInfo && waitingListInfo.class1

            return <div className="padding">

                <RC.Card title="Your Waiting List Info" >
                    <p className="padding">
                        Class <b>{class1 && class1.name}</b>
                        has been added on the waiting list
                        for <b>{swimmer && swimmer.name}</b>
                    </p>

                    <p className="padding"> We will call you once a space is possible</p>

                </RC.Card>



                <RC.URL href="/">
                    <RC.Button name="button" theme="full" bgColor="brand1" buttonColor="brand">
                        OK
                    </RC.Button>
                </RC.URL>


            </div>
        }
    })
}
