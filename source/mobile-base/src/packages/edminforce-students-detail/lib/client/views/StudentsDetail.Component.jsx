{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.StudentsDetail = React.createClass({

        changeTab(num) {
            this.setStateObj({ tab: num })
        },

        renderTab() {
            let content
            switch (this.state.obj.get("tab")) {
                case 0:
                    content = <span style={{color: "#FFF"}}>This is current</span>
                    break
                case 1:
                    content = <span style={{color: RC.Theme.color.yellow}}>This is History</span>
                    break
            }
            return <div style={{textAlign: "center", padding: 20}}>
                {content}
            </div>
        },

        render: function () {

            // Fill with your UI
            return (
                <div>
                    <RC.URL href="/students">Students</RC.URL>
                    <RC.Div bgColor="brand1">
                        <RC.Tabs bgColor="brand1" initialTab={0} onChange={this.changeTab.bind(this)}>
                            <RC.URL>Current</RC.URL>
                            <RC.URL>History</RC.URL>
                        </RC.Tabs>
                        {this.renderTab()}
                    </RC.Div>
                </div>
            );
        }
    });

}