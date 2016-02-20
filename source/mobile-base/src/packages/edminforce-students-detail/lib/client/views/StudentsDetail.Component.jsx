{
    let {
        Tabs,
        Tab,
        Table,
        TableHeaderColumn,
        TableRow,
        TableHeader,
        TableRowColumn,
        TableBody
        } = MUI;

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.StudentsDetail = class extends RC.CSSMeteorData {
        constructor(p) {
            super(p);
            this.state = {
                value: "current",
                programID: ""
            };
        }

        getMeteorData() {
            let handler = null;

            let studentID = FlowRouter.getParam("studentID");
            let classStudentID = FlowRouter.getQueryParam("current");
            let programID = FlowRouter.getQueryParam("programID");

            Tracker.autorun(function () {
                handler = Meteor.subscribe("EF-Students-details", studentID, classStudentID, programID);
            }.bind(this));

            let student = EdminForce.Collections.student.find({
                _id: studentID
            }).fetch();

            student = student&&student[0];

            //console.log("student: ", student);

            let classStudent = EdminForce.Collections.classStudent.find({
                _id: classStudentID
            }).fetch();

            classStudent = classStudent&&classStudent[0];

            //console.log("classStudent: ", classStudent);

            let classData = EdminForce.Collections.class.find({
                _id: classStudent&&classStudent.classID
            }).fetch();

            classData = classData&&classData[0];

            //console.log("classData: ", classData);

            let current = {
                studentName: student&&student.name,
                className: classData&&classData.name,
                classDay: classData&&classData.schedule&&classData.schedule.day,
                classTime: classData&&classData.schedule&&classData.schedule.time,
                registered: classStudent&&classStudent.createTime
            };

            return {
                isReady: handler.ready(),
                current: current
            }
        }

        handleChange(value) {
            this.setState({
                value: value
            });
        }

        render() {

            // Fill with your UI
            return (
                <RC.Div>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange.bind(this)}
                        >
                        <Tab label="Current" value="current">
                            <RC.Loading isReady={this.data.isReady}>
                                <RC.Div style={{marginTop:"10px"}}>
                                    <Table selectable={false}>
                                        <TableHeader displaySelectAll={false} enableSelectAll={false}
                                                     style={{display:"none"}}>
                                            <TableRow>
                                                <TableHeaderColumn>Student</TableHeaderColumn>
                                                <TableHeaderColumn>Class</TableHeaderColumn>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody displayRowCheckbox={false}>
                                            <TableRow key={new Date().getTime()}>
                                                <TableRowColumn
                                                    style={{width: "25%", whiteSpace:"normal"}}>
                                                    <p>
                                                        {this.data.current&&this.data.current.studentName}
                                                    </p>
                                                </TableRowColumn>
                                                <TableRowColumn
                                                    style={{width: "75%", whiteSpace:"normal"}}>
                                                    <p style={{padding: 0}}>
                                                        {this.data.current && this.data.current.className}
                                                    </p>

                                                    <p style={{padding: 0}}>
                                                        {this.data.current&&this.data.current.classDay} {this.data.current&&this.data.current.classTime}
                                                    </p>

                                                    <p style={{padding: 0}}>
                                                        {this.data.current&&this.data.current.registered && "Registered on " + moment(this.data.current.registered).format("MMM D, YYYY")}
                                                    </p>
                                                </TableRowColumn>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </RC.Div>
                                <RC.Div className="students-detail-menus">
                                    <RC.Button bgColor="brand2" bgColorHover="dark" disabled="disabled">Make up Class</RC.Button>
                                </RC.Div>
                                <RC.Div className="students-detail-make-up">

                                </RC.Div>
                            </RC.Loading>
                        </Tab>
                        <Tab label="History" value="history">
                            <RC.Loading isReady={this.data.isReady}>
                                <RC.Div>
                                    <p>Coming soon...</p>
                                </RC.Div>
                            </RC.Loading>
                        </Tab>
                    </Tabs>
                </RC.Div>
            );
        }
    };

}