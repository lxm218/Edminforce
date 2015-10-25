/**
 * Created on 10/23/15.
 */

Cal.FamiliesDetail = React.createClass({
    propTypes: {

        //this.props.accountId

    },
    mixins: [ReactMeteorData],
    getMeteorData() {

        Meteor.subscribe("swimmersByAccountId",this.props.accountId)

        return {
            children: DB.Swimmers.find({accountId:this.props.accountId}).fetch()

        }
    },
    getInitialState() {
        return {
            key: 1
        };
    },

    handleSelect(key) {
        //alert('selected ' + key);
        this.setState({key});
    },

    render: function () {

        return <div className="padding-wrap">

            <RB.Breadcrumb>
                <RB.BreadcrumbItem href="/adminFamilies">
                    Families
                </RB.BreadcrumbItem>
                <RB.BreadcrumbItem active>
                    Detail
                </RB.BreadcrumbItem>

            </RB.Breadcrumb>


            <RB.Panel >

                <RB.Tabs activeKey={this.state.key} onSelect={this.handleSelect}>
                    <RB.Tab eventKey={1} title="swimmers">
                        <div>
                            <RB.ButtonToolbar>

                                <Cal.AddNewSwimmerMButton />

                            </RB.ButtonToolbar>
                        </div>

                        <Reactable.Table
                            className="prop-table table "
                            data={this.data.children}>

                        </Reactable.Table>

                    </RB.Tab>
                    <RB.Tab eventKey={2} title="billing">

                        Tab 2 content

                    </RB.Tab>

                    <RB.Tab eventKey={3} title="Profile">

                        <br/><br/>

                        <Cal.FamiliesProfile  accountId={this.props.accountId} />

                    </RB.Tab>
                </RB.Tabs>

            </RB.Panel>


        </div>;
    }

});