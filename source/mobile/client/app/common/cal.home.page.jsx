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
        return <div className="padding">


            <RC.Card title={title}>

            </RC.Card>


            <div className="row">
                <div className="col">
                    <RC.Button name="button" buttonColor="dark" className="button-clear">
                        Paced Program
                    </RC.Button>
                </div>
                <div className="col">
                    <RC.Button name="button" buttonColor="brand" href="/classRegister/registraionInfoPage">
                        Register
                    </RC.Button>
                </div>

            </div>

            <div className="row">
                <div className="col">
                    <RC.Button name="button" buttonColor="dark" className="button-clear">
                        Intense Program
                    </RC.Button>
                </div>
                <div className="col">
                    <RC.Button name="button" buttonColor="brand" >
                        Register
                    </RC.Button>
                </div>

            </div>

            <div className="row">
                <div className="col">
                    <RC.Button name="button" buttonColor="dark" className="button-clear">
                        Little Star Program
                    </RC.Button>
                </div>
                <div className="col">
                    <RC.Button name="button" buttonColor="brand" >
                        Register
                    </RC.Button>
                </div>

            </div>

            <div className="row">
                <div className="col">
                    <RC.Button name="button" buttonColor="dark" className="button-clear">
                        Fasttrack Program
                    </RC.Button>
                </div>
                <div className="col">
                    <RC.Button name="button" buttonColor="brand">
                        Register
                    </RC.Button>
                </div>

            </div>


        </div>

    }
})
