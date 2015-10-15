Cal.Home = React.createClass({


    mixins: [ReactMeteorData],
    getMeteorData(){

        Meteor.subscribe("accountCurrent");

        return{
            account: Meteor.users.findOne()
        }
    },
    render() {

        let title = 'Welcome To Our '+ (this.data.account && this.data.account.profile.location)+' Facility'

        console.log(title)
        return <div className="padding">


            <RC.Card title={title}>

            </RC.Card>

            <RC.List theme="inset">
                <RC.Item theme="body">

                    <RC.URL href="/classRegister/registraionInfoPage">
                        <RC.Button name="button" theme="full" buttonColor="brand">
                            Register Class
                        </RC.Button>
                    </RC.URL>
                </RC.Item>

            </RC.List>

        </div>

    }
})
