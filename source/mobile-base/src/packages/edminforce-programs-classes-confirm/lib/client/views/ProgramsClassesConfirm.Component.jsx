{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.ProgramsClassesConfirm = React.createClass({

        confirm(){
            let params = {
                programsId: "111",
                classId: "class_11"
            };
            let path = FlowRouter.path("/programs/:programsId/:classId/summary", params);
            FlowRouter.go(path);
        },

        addStudent(){
            FlowRouter.go('/account/addstudent');
            Session.set("BookTrialClassId", "class_11");
            Session.set("BookTrialProgramId", "111");
        },

        render: function () {

            // Fill with your UI
            return (
                <div>
                    <h3>Confirm</h3>
                    <RC.Button onClick={this.addStudent}>Add Student</RC.Button>
                    <RC.Button onClick={this.confirm}>Confirm</RC.Button>
                </div>
            );
        }
    });

}