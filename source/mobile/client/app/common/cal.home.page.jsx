Cal.Home = React.createClass({


    mixins: [ReactMeteorData],
    getMeteorData(){

        Meteor.subscribe("appInfo");
        Meteor.subscribe("accountCurrent");

        return {
            appInfo : DB.App.findOne(),
            account: Meteor.users.findOne(),

            selectableSessions:Session.get('selectableSessions'),
            selectedSession:Session.get('selectedSession')
        }
    },

    tabClick(index){

        console.log('tabClick',this.data.selectableSessions[index])

        Session.set('selectedSession',this.data.selectableSessions[index])
    },
    render() {

        let title = 'Welcome To Our ' + (this.data.account && this.data.account.profile.location) + ' Facility'



        let Programs=(
            <div>
                <div className="row">
                    <RC.Button className="item-button" name="button" buttonColor="brand"
                               href="/classRegister/info">
                        Paced Program
                    </RC.Button>
                </div>

                <div className="row">
                    <RC.Button className="item-button" name="button" buttonColor="brand" href="/intense/info">
                        Intense Program
                    </RC.Button>
                </div>

                <div className="row">
                    <RC.Button className="item-button"  name="button" buttonColor="brand" href="/littlestar/info">
                        Little Star Program
                    </RC.Button>
                </div>

                <div className="row">
                    <RC.Button className="item-button"  name="button" buttonColor="brand" href="/fastrack/info">
                        Fastrack Program
                    </RC.Button>
                </div>
            </div>

        )

        return <div className="padding home">


            <RC.Card title={title}>

            </RC.Card>


            {
                this.data.selectableSessions.length==2?
                    <RC.Tabs className="bg-white" tab={this.data.selectableSessions[0]._id == this.data.selectedSession._id?0:1}>
                        <div label={this.data.selectableSessions[0].name} className="padding" onClick={this.tabClick}>
                            {Programs}
                        </div>
                        <div label={this.data.selectableSessions[1].name} className="padding" onClick={this.tabClick}>
                            {Programs}
                        </div>
                    </RC.Tabs>:''
            }

            {
                this.data.selectableSessions.length==1? {Programs}:''
            }






            <div className="row">
                <RC.Button className="item-button"  name="button" buttonColor="brand" href="/payment/test">
                    Payment
                </RC.Button>
            </div>

        </div>

    }
})
