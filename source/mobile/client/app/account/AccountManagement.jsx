/**
 * Created on 9/26/15.
 */

Cal.AccountManagement = React.createClass({

    mixins: [ReactMeteorData],


    getMeteorData() {

        Meteor.subscribe("swimmersByAccountId", Meteor.userId());

        return {
            currentUser: Meteor.user(),
            swimmers: DB.Swimmers.find({accountId: Meteor.userId()}).fetch()
        };
    },

    render() {
        this.data
        debugger

        return <div>
            <RC.Card title="Manage My Account">

            </RC.Card>

            <RC.List>
                <RC.Item className="item-text-wrap">
                    <div className="row">
                        <div className="col">
                            User Name
                        </div>
                        <div className="col">
                            {this.data.currentUser
                                ? this.data.currentUser.username :''}
                        </div>
                    </div>
                </RC.Item>

                <RC.Item className="item-text-wrap">
                    <div className="row">
                        <div className="col">
                            Email
                        </div>
                        <div className="col">
                            {this.data.currentUser?
                                this.data.currentUser.emails[0].address:''}
                        </div>
                    </div>
                </RC.Item>

                <RC.Item className="item-text-wrap">
                    <div className="row">
                        <div className="col">
                            Password
                        </div>
                        <div className="col">
                            change
                        </div>
                    </div>

                </RC.Item>

                <RC.Item className="item-text-wrap">

                    <div className="row">
                        <div className="col">
                            swimmers
                        </div>
                        <div className="col">
                            <p>
                                {
                                    this.data.swimmers.map(function(swimmer){

                                        return <div key={swimmer._id}>
                                            {swimmer.name}
                                        </div>

                                    })

                                }
                            </p>
                            <p>
                                <a href="/account/AddSwimmer">Add</a>
                            </p>

                        </div>
                    </div>

                </RC.Item>


            </RC.List>



        </div>
    }
})