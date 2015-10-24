/**
 * Created on 10/23/15.
 */

Cal.FamiliesDetail = React.createClass({

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
                                <RB.Button bsStyle="primary" bsSize="small">Add Swimmer</RB.Button>
                                <RB.Button bsSize="small">Small button</RB.Button>
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
                </RB.Tabs>

            </RB.Panel>


        </div>;
    }

});