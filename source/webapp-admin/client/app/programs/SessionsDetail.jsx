/**
 * Created on 10/23/15.
 */

Cal.SessionsDetail = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {

        var sessionId = this.props.sessionId
        Meteor.subscribe("admin/programs",sessionId)

        return {
            programs: DB.Classes.find().fetch({sessionId:sessionId})

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
        return <div>



            <RB.Panel >

                <RB.Tabs activeKey={this.state.key} onSelect={this.handleSelect}>
                    <RB.Tab eventKey={1} title="Progmams">
                        <div>
                            <RB.ButtonToolbar>

                                <RB.Button> New Class</RB.Button>

                            </RB.ButtonToolbar>
                        </div>


                        <Reactable.Table className="prop-table table table-striped table-bordered"
                                         data={this.data.programs}>

                        </Reactable.Table>

                    </RB.Tab>


                </RB.Tabs>

            </RB.Panel>


            <RB.Panel >
                <Reactable.Table className="prop-table table table-striped table-bordered"
                                 data={this.data.programs}>

                </Reactable.Table>
            </RB.Panel >


        </div>;
    }

});