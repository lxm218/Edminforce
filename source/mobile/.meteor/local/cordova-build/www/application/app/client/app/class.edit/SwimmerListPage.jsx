(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.edit/SwimmerListPage.jsx                           //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Cal.CESwimmerListPage = React.createClass({                            // 1
    displayName: "CESwimmerListPage",                                  //
                                                                       //
    mixins: [ReactMeteorData],                                         // 3
    getMeteorData: function () {                                       // 4
                                                                       //
        //Meteor.subscribe("accountWithSwimmersAndClasses", 'account1');
                                                                       //
        Meteor.subscribe("swimmersByAccountId", Meteor.userId());      // 8
                                                                       //
        return {                                                       // 10
            swimmers: DB.Swimmers.find({ accountId: Meteor.userId() }).fetch()
        };                                                             //
    },                                                                 //
                                                                       //
    render: function () {                                              // 15
                                                                       //
        //return <div>                                                 //
        //                                                             //
        //    <RC.Card title="2015 Summer Session">                    //
        //                                                             //
        //    </RC.Card>                                               //
        //                                                             //
        //    <RC.List>                                                //
        //        {this.data.swimmers.map(function (swimmer, n) {      //
        //                                                             //
        //            return <RC.Item className="item-text-wrap">      //
        //                                                             //
        //                <div className="row">                        //
        //                                                             //
        //                    <div className="col">                    //
        //                        {swimmer.name}                       //
        //                    </div>                                   //
        //                                                             //
        //                    <div className="col-50 cal-text-wrap" >  //
        //                        <p className=" item-text-wrap">      //
        //                            {swimmer.name}sdfassdfassdfassdfassdfassdfas
        //                            sdfassdfassdfassdfassdfassdfassdfas
        //                            sdfassdfassdfassdfassdfas        //
        //                        </p>                                 //
        //                        <p className=" cal-text-wrap">       //
        //                            {swimmer.name}sdfassdfassdfassdfassdfas
        //                            sdfassdfassdfassdfassdfassdfassdfas
        //                            sdfassdfassdfassdfassdfassdfas   //
        //                        </p>                                 //
        //                                                             //
        //                    </div>                                   //
        //                                                             //
        //                                                             //
        //                    <div className="col cal-text-wrap">      //
        //                        {swimmer.name}                       //
        //                    </div>                                   //
        //                                                             //
        //                </div>                                       //
        //                                                             //
        //            </RC.Item>                                       //
        //        })}                                                  //
        //    </RC.List>                                               //
        //</div>                                                       //
                                                                       //
        //                                                             //
                                                                       //
        return React.createElement(                                    // 67
            "div",                                                     //
            null,                                                      //
            React.createElement(RC.Card, { title: "2015 Summer Session" }),
            React.createElement(                                       //
                RC.List,                                               // 73
                null,                                                  //
                this.data.swimmers.map(function (swimmer, n) {         //
                                                                       //
                    return React.createElement(Cal.ClassEditSwimmerItem, { swimmer: swimmer, key: n });
                })                                                     //
            )                                                          //
        );                                                             //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
