

Cal.Test = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {

        var handle = Meteor.subscribe("accounts");

        var handle2 = Meteor.subscribe("swimmers");

        var handle3 = Meteor.subscribe("classes");


        Meteor.subscribe("account1");



        return {
            //currentUser: Meteor.user(),

            currentUser: Meteor.users.find({_id:'account1'}).fetch()[0],

            accounts:Meteor.users.find().fetch(),
            swimmers:DB.Swimmers.find().fetch(),
            classes:DB.Classes.find().fetch()
        };
    },

    render() {
        return <div className="transition" id="app-body">
            <div className="wrapper">
                <span>
                    Hello
                    <b>
                    {this.data.currentUser && this.data.currentUser.profile.name}
                    </b>!

                </span>

                <hr/>
                {this.data.accounts}

                <hr/>
                {this.data.swimmers}

                <hr/>

                {this.data.classes}

                <RC.Card>
                    hello
                </RC.Card>
            </div>
        </div>
    }
})