/**
 * Created on 10/24/15.
 */

Cal.FamiliesProfile = React.createClass({

    propTypes: {},
    mixins: [ReactMeteorData],
    getMeteorData() {

        let accountId = this.props.accountId

        Meteor.subscribe("adminAccountById",accountId)

        return {
            accountInfo:Meteor.users.findOne({_id:accountId})
        }
    },

    render: function () {

        let accountInfo = this.data.accountInfo;

        return <div>

            <RB.Panel header="Basic">

                <RB.Table >
                    <thead>
                    <tr>

                        <th>property</th>
                        <th>value</th>
                        <th>actions</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>name</td>
                        <td>{
                            this.data.accountInfo
                            && this.data.accountInfo.profile.name
                        }</td>
                        <td>Edit</td>
                    </tr>

                    <tr>
                        <td>Email</td>
                        <td>
                            {accountInfo && accountInfo.emails? (accountInfo.emails[0] && accountInfo.emails[0].address):''}
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </RB.Table>

            </RB.Panel>

            <RB.Panel header="AlterContact">


            </RB.Panel>

            <RB.Panel header="EmergencyContact">


            </RB.Panel>


        </div>;
    }

});