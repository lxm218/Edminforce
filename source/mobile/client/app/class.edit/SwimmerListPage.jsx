Cal.ClassEditSwimmerListPage = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {

        //Meteor.subscribe("accountWithSwimmersAndClasses", 'account1');

        Meteor.subscribe("swimmersByAccountId", 'account1');

        return {
            swimmers: DB.Swimmers.find({accountId: 'account1'}).fetch()
        };
    },

    render() {

        //debugger

        return <div>

            <RC.Card title="2015 Summer Session">

            </RC.Card>

            <RC.List>
                {this.data.swimmers.map(function (swimmer, n) {

                    return <Cal.ClassEditSwimmerItem swimmer={swimmer} key={n}>
                    </Cal.ClassEditSwimmerItem>
                })}
            </RC.List>
        </div>

    }
})