{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.Students = React.createClass({

        selectStudent(){
            let params = {
                studentId: "111"
            }
            let path = FlowRouter.path("/students/:studentId", params);
            FlowRouter.go(path);
        },

        render: function () {

            // Fill with your UI
            return (
                <RC.Div>
                    <h3>Students</h3>
                    <RC.List>
                        <RC.Item theme="divider" onClick={this.selectStudent}>Student1</RC.Item>
                        <RC.Item theme="divider" onClick={this.selectStudent}>Student2</RC.Item>
                        <RC.Item theme="divider" onClick={this.selectStudent}>Student3</RC.Item>
                    </RC.List>
                </RC.Div>
            );
        }
    });

}