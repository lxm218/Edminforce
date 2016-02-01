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
                <RC.Div style={{padding:"10px"}}>
                    <RC.VerticalAlign center={true} className="padding" height="300px">
                        <h2>
                            {TAPi18n.__("bookSummary")}
                        </h2>
                    </RC.VerticalAlign>
                    <RC.List>
                        <RC.Item title={TAPi18n.__("student")}>
                            <span>Mick Wang</span>
                            <RC.Button bgColor="brand2" theme="inline" onClick={this.addStudent}>
                                <$translate label="addStudent"/>
                            </RC.Button>
                        </RC.Item>
                        <RC.Item title={TAPi18n.__("date")}>
                            Jan 17, 2016
                        </RC.Item>
                        <RC.Item title={TAPi18n.__("time")}>
                            4:45pm - 6:00pm
                        </RC.Item>

                        <RC.Item title={TAPi18n.__("className")}>
                            Beginning
                        </RC.Item>
                    </RC.List>
                    <RC.Button bgColor="brand2" onClick={this.confirm}>
                        <$translate label="confirm"/>
                    </RC.Button>
                </RC.Div>
            );
        }
    });

}