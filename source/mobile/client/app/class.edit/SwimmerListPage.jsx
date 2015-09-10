

Cal.ClassEditSwimmerListPage = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {

        Meteor.subscribe("account1"); //for test
        Meteor.subscribe("swimmers");
        Meteor.subscribe("classes");

        return {
            currentUser: Meteor.users.find({_id:'account1'}).fetch()[0],
            swimmers:DB.Swimmers.find().fetch(),
            classes:DB.Classes.find().fetch()
        };
    },

    render() {
        return <div className="transition" id="app-body">
            <div className="wrapper">

                <RC.Card>
                    hello
                </RC.Card>
            </div>
        </div>
    }
})