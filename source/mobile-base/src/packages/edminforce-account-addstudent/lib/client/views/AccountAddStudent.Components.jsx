{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.SettingsAddStudent = React.createClass({

        save(){
            if(Session.get("BookTrialClassId")){
                let params = {
                    programsId: Session.get("BookTrialProgramId"),
                    classId: Session.get("BookTrialClassId")
                }
                let path = FlowRouter.path("/programs/:programsId/:classId/confirm", params);
                FlowRouter.go(path);
                Session.set("BookTrialClassId", null);
                Session.set("BookTrialProgramId", null)
            }else{
                FlowRouter.go("/account");
            }
        },

        render: function () {

            // Fill with your UI
            return (
                <RC.Div >
                    <h3>Add Student</h3>
                    <ul>
                        <li>Add student from Account page</li>
                        <li>When book trial, user don't have student</li>
                    </ul>

                    <RC.Button bgColor="brand2" bgColorHover="dark" onClick={this.save}>Save</RC.Button>
                </RC.Div>
            );
        }
    });

}