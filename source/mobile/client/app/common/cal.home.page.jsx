Cal.Home = React.createClass({


    mixins: [ReactMeteorData],
    getMeteorData(){

        Meteor.subscribe("accountCurrent");

        return {
            account: Meteor.users.findOne()
        }
    },
    render() {

        let title = 'Welcome To Our ' + (this.data.account && this.data.account.profile.location) + ' Facility'

        console.log(title)
        return <div className="padding home">


            <RC.Card title={title}>

            </RC.Card>


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

    }
})
