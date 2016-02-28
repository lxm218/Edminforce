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

                    <Cal.Grid
                        flexWrap="nowrap"
                        justifyContent="space-between"
                    >
                        <Cal.GridItem
                            flexGrow="0"
                            flexShrink="0"
                            flexBasis="25%"
                            maxWidth="25%"
                        >User Name</Cal.GridItem>
                        <Cal.GridItem

                        >
                            {this.data.currentUser.username
                                ? this.data.currentUser.username : 'User Name Not Set'}
                        </Cal.GridItem>

                        <Cal.GridItem

                        >
                            <a className="button button-block" href="/account/resetUserName">
                                Change
                            </a>
                        </Cal.GridItem>

                    </Cal.Grid>


                </RC.Item>

                <RC.Item className="item-text-wrap">
                    <Cal.Grid
                        flexWrap="nowrap"
                        justifyContent="space-between"
                    >
                        <Cal.GridItem
                            flexGrow="0"
                            flexShrink="0"
                            flexBasis="25%"
                            maxWidth="25%"
                        >Email</Cal.GridItem>

                        <Cal.GridItem

                        >
                            {this.data.currentUser ?
                                this.data.currentUser.emails[0].address : ''}
                        </Cal.GridItem>

                        <Cal.GridItem></Cal.GridItem>

                    </Cal.Grid>

                </RC.Item>

                <RC.Item className="item-text-wrap">

                    <Cal.Grid
                        flexWrap="nowrap"
                        justifyContent="space-between"
                    >
                        <Cal.GridItem
                            flexGrow="0"
                            flexShrink="0"
                            flexBasis="25%"
                            maxWidth="25%"
                        >Password</Cal.GridItem>

                        <Cal.GridItem>

                        </Cal.GridItem>
                        <Cal.GridItem>
                            <a className="button button-block" href="/account/resetPassword">
                                Change
                            </a>
                        </Cal.GridItem>

                    </Cal.Grid>

                </RC.Item>

                <RC.Item className="item-text-wrap">

                    <Cal.Grid
                        flexWrap="nowrap"
                        justifyContent="space-between"
                    >
                        <Cal.GridItem
                            flexGrow="0"
                            flexShrink="0"
                            flexBasis="25%"
                            maxWidth="25%"
                        >Emergency Contact</Cal.GridItem>

                        <Cal.GridItem>
                            {this.data.currentUser.emergencyContact
                                ? this.data.currentUser.emergencyContact.name : 'Emergency Contact Not Set'}
                        </Cal.GridItem>
                        <Cal.GridItem>
                            <a className="button button-block" href="/account/emergencyContact">
                                Update
                            </a>
                        </Cal.GridItem>

                    </Cal.Grid>

                </RC.Item>

                <RC.Item className="item-text-wrap">
                    <Cal.Grid
                        flexWrap="nowrap"
                        justifyContent="space-between"
                    >
                        <Cal.GridItem
                            flexGrow="0"
                            flexShrink="0"
                            flexBasis="25%"
                            maxWidth="25%"
                        >Alternate Contact</Cal.GridItem>

                        <Cal.GridItem>
                            {this.data.currentUser.alterContact
                                ? this.data.currentUser.alterContact.name : 'Alternate Contact Not Set'}
                        </Cal.GridItem>
                        <Cal.GridItem>
                            <a className="button button-block" href="/account/emergencyContact">
                                Update
                            </a>
                        </Cal.GridItem>

                    </Cal.Grid>


                </RC.Item>

                <RC.Item className="item-text-wrap">
                    <Cal.Grid
                        flexWrap="nowrap"
                        justifyContent="space-between"
                        alignContent="flex-start"
                        alignItems="center"
                    >
                        <Cal.GridItem
                            flexGrow="0"
                            flexShrink="0"
                            flexBasis="25%"
                            maxWidth="25%"
                        >
                            Swimmers
                        </Cal.GridItem>


                        <Cal.GridItem
                            flexGrow="0"
                            flexShrink="0"
                            flexBasis="50%"
                            maxWidth="50%"
                        >
                            <p>
                                {
                                    this.data.swimmers.map(function (swimmer) {

                                        let href = '/account/SwimmerProfile/' + swimmer._id;

                                        return <RC.URL href={href}>
                                            <RC.Button key={swimmer._id}
                                                       >
                                                {swimmer.name}
                                            </RC.Button>
                                            </RC.URL>


                                    })

                                }
                            </p>


                        </Cal.GridItem>
                        <Cal.GridItem>
                            <p>
                                <a className="button button-block"
                                   href="/account/AddSwimmer">Add</a>
                            </p>
                        </Cal.GridItem>


                    </Cal.Grid>

                </RC.Item>


            </RC.List>


        </div>
    }
})