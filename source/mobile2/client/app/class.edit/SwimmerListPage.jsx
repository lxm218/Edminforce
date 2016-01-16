Cal.CESwimmerListPage = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {

        //Meteor.subscribe("accountWithSwimmersAndClasses", 'account1');

        Meteor.subscribe("swimmersByAccountId", Meteor.userId());

        return {
            swimmers: DB.Swimmers.find({accountId: Meteor.userId()}).fetch()
        };
    },

    render() {



        //return <div>
        //
        //    <RC.Card title="2015 Summer Session">
        //
        //    </RC.Card>
        //
        //    <RC.List>
        //        {this.data.swimmers.map(function (swimmer, n) {
        //
        //            return <RC.Item className="item-text-wrap">
        //
        //                <div className="row">
        //
        //                    <div className="col">
        //                        {swimmer.name}
        //                    </div>
        //
        //                    <div className="col-50 cal-text-wrap" >
        //                        <p className=" item-text-wrap">
        //                            {swimmer.name}sdfassdfassdfassdfassdfassdfas
        //                            sdfassdfassdfassdfassdfassdfassdfas
        //                            sdfassdfassdfassdfassdfas
        //                        </p>
        //                        <p className=" cal-text-wrap">
        //                            {swimmer.name}sdfassdfassdfassdfassdfas
        //                            sdfassdfassdfassdfassdfassdfassdfas
        //                            sdfassdfassdfassdfassdfassdfas
        //                        </p>
        //
        //                    </div>
        //
        //
        //                    <div className="col cal-text-wrap">
        //                        {swimmer.name}
        //                    </div>
        //
        //                </div>
        //
        //            </RC.Item>
        //        })}
        //    </RC.List>
        //</div>




        //

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