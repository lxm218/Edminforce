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
                            {this.data.currentUser.username
                                ? this.data.currentUser.username : 'User Name Not Set'}
                        </div>
                        <div className="col">

                            <a className="button button-block" href="/account/resetUserName">
                                Change
                            </a>
                        </div>
                    </div>
                </RC.Item>

                <RC.Item className="item-text-wrap">
                    <div className="row">
                        <div className="col">
                            Email
                        </div>

                        <div className="col">
                            {this.data.currentUser ?
                                this.data.currentUser.emails[0].address : ''}
                        </div>
                    </div>
                </RC.Item>

                <RC.Item className="item-text-wrap">
                    <div className="row">
                        <div className="col">
                            Password
                        </div>
                        <div className="col">
                        </div>
                        <div className="col">
                            <a className="button button-block" href="/account/resetPassword">
                                Change
                            </a>
                        </div>
                    </div>
                </RC.Item>

                <RC.Item className="item-text-wrap">
                    <div className="row">
                        <div className="col">
                            Emergency Contact
                        </div>
                        <div className="col">
                            {this.data.currentUser.emergencyContact
                                ? this.data.currentUser.emergencyContact.name : 'Emergency Contact Not Set'}
                        </div>

                        <div className="col">
                            <a className="button button-block" href="/account/emergencyContact">
                                Update
                            </a>
                        </div>

                    </div>
                </RC.Item>

                <RC.Item className="item-text-wrap">
                    <div className="row">
                        <div className="col">
                            Alternate Contact
                        </div>
                        <div className="col">
                            {this.data.currentUser.alterContact
                                ? this.data.currentUser.alterContact.name : 'Alternate Contact Not Set'}
                        </div>

                        <div className="col">
                            <a className="button button-block" href="/account/alternateContact">
                                Update
                            </a>
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
                                    this.data.swimmers.map(function (swimmer) {

                                        let href = '/account/SwimmerProfile/' + swimmer._id;

                                        return <a key={swimmer._id}
                                                  className="button button-block button-small"
                                                  href={href}>
                                            {swimmer.name}
                                        </a>

                                    })

                                }
                            </p>
                            <p>
                                <a className="button button-block"
                                   href="/account/AddSwimmer">Add</a>
                            </p>

                        </div>
                    </div>

                </RC.Item>


            </RC.List>


        </div>
    }
})