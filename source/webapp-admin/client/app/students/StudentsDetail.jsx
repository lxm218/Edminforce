/**
 * Created on 10/25/15.
 */

Cal.StudentsDetail = React.createClass({

    propTypes: {},
    mixins: [ReactMeteorData],
    getMeteorData() {

        return {}
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
                <RB.BreadcrumbItem href="/adminStudents">
                    Students
                </RB.BreadcrumbItem>
                <RB.BreadcrumbItem active>
                    {this.props.studentId}
                </RB.BreadcrumbItem>

            </RB.Breadcrumb>


            <RB.Panel >

                <RB.Tabs activeKey={this.state.key} onSelect={this.handleSelect}>
                    <RB.Tab eventKey={1} title="Registered Classes">
                        <div>
                            <RB.ButtonToolbar>

                                <Cal.RegisterNewClassMButton />

                            </RB.ButtonToolbar>
                        </div>

                        classes

                    </RB.Tab>

                    <RB.Tab eventKey={2} title="Current Classes">

                        <br/><br/>
                        Current Classes

                    </RB.Tab>
                    <RB.Tab eventKey={3} title="History Classes">

                        <br/><br/>
                        HistoryClasses

                    </RB.Tab>
                </RB.Tabs>

            </RB.Panel>

        </div>;
    }

});