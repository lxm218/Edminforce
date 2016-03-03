{
    let _ = lodash;
    let {
        Table,
        TableHeaderColumn,
        TableRow,
        TableHeader,
        TableRowColumn,
        TableBody
        }=MUI;

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.Students = class extends RC.CSSMeteorData {

        constructor(p) {
            super(p);
        }

        getMeteorData() {
            return {
                isReady: Meteor.subscribe("EFStudentsWithClasses").ready()
            }
        }

        selectClass(student, studentClass) {

            // it has class
            if(student && studentClass && studentClass.type !== 'trial'){

                let params = {
                    studentID:student._id
                };
                let query = {
                    current: studentClass._id,
                    programID: studentClass.programID,
                    completed: !!studentClass.completed
                }
                let path = FlowRouter.path("/students/:studentID", params, query);
                FlowRouter.go(path);
            }
        }

        selectStudent(student) {
            // update student
            if (!student) return;

            let path = FlowRouter.path("/account/addstudent",null,{studentID:student._id});
            FlowRouter.go(path);
        }

        createStudentListWithClasses() {
            if (!this.data.isReady) return [];

            // students
            let students = EdminForce.Collections.student.find({accountID: Meteor.userId()}).fetch();

            // get classes,programs,and sessions as lookup table
            let classes = EdminForce.Collections.class.find().fetch();
            let sessions = EdminForce.Collections.session.find().fetch();
            let programs = EdminForce.Collections.program.find().fetch();

            return students.map( (student) => {
                student.classes = [];

                let studentClasses =  EdminForce.Collections.classStudent.find({studentID: student._id}).fetch();

                // separate all classes into current & completed
                let currentTime = new Date().getTime();
                let currentClasses = [];
                let completedClasses = [];
                studentClasses.forEach((studentClass) => {
                        // find class session & program
                        studentClass.class = _.find(classes, {_id: studentClass.classID});
                        if (studentClass.class && studentClass.class.status == 'Active') {
                            studentClass.program = _.find(programs, {_id: studentClass.class.programID});
                            studentClass.session = _.find(sessions, {_id: studentClass.class.sessionID});
                            if (!studentClass.programID)
                                studentClass.programID = studentClass.class.programID;
                        }

                        if (studentClass.program && studentClass.class && studentClass.session) {
                            if (studentClass.session.endDate.getTime() < currentTime)
                                completedClasses.push(studentClass);
                            else
                                currentClasses.push(studentClass);
                        }
                });

                // only show current classes, if there is any
                if (currentClasses.length > 0) {
                    // show all current classes, by startDate in descending order
                    student.classes = currentClasses.length === 1 ? currentClasses :
                        _.sortBy(currentClasses, (c) => { return -c.session.startDate.getTime() });
                }
                else
                if (completedClasses.length > 0) {
                    // show the last completed class if there is not any current class
                    completedClasses.length > 1 &&
                    (completedClasses = _.sortBy(completedClasses, (c) => { return -c.session.endDate.getTime() }));

                    completedClasses[0].completed = true;
                    student.classes.push(completedClasses[0]);
                }

                return student;
            });
        }

        render() {

            let self = this;
            let students = this.createStudentListWithClasses();

            let currentTime = new Date().getTime();
            let studentElements = students.map( (student) => {
                // class records for this student
                let classElements = student.classes.map( (sc, index) => (
                        <RC.Div key={sc._id} onClick={self.selectClass.bind(self, student,sc)}>
                            <p style={{padding: 0, paddingTop: index == 0 ? 8 : 0}}>
                                {sc.program.name}
                            </p>
                            <p style={{padding: 0}}>
                                {sc.session.name} {sc.class.schedule && sc.class.schedule.day} {sc.class.schedule && sc.class.schedule.time}
                            </p>
                            {
                                !sc.completed && (
                                    <p style={{padding: 0}}>
                                        {
                                            sc.type === "trial" ? "Trial" : (sc.session.startDate.getTime()<currentTime ? "Current":"New Registration")
                                        }
                                    </p>
                                )
                            }
                            <p style={{padding: 0, paddingBottom: 8 }}>
                                {sc.completed ? "Completed" : (sc.createTime && "Registered on " + moment(sc.createTime).format("MMM D, YYYY"))}
                            </p>
                        </RC.Div>
                    ))

                if (classElements.length === 0) {
                    classElements.push(
                        <RC.Div><p style={{padding: 0, paddingBottom: 8, paddingTop: 8}}>No class registration record</p></RC.Div>
                    )
                }

                return (
                    <TableRow key={student._id}>
                        <TableRowColumn
                            style={{width: "25%", whiteSpace:"normal"}}>
                            <p onClick={self.selectStudent.bind(self, student)}>
                            {student && student.name}
                            </p>
                        </TableRowColumn>
                        <TableRowColumn style={{width: "60%", whiteSpace:"normal"}}>
                            {classElements}
                        </TableRowColumn>
                        <TableRowColumn style={{width: "15%", whiteSpace:"normal"}}>
                            <i onClick={self.selectStudent.bind(self, student)} className="fa fa-arrow-right" style={{display:'block'}}></i>
                        </TableRowColumn>
                    </TableRow>
                )
            })

            // Fill with your UI
            return (
                <RC.Div>
                    <RC.Div style={{borderBottom:"1px solid #e0e0e0", paddingBottom:8}}><h3 style={{"textAlign": "center"}}>Students</h3></RC.Div>
                    <RC.Loading isReady={this.data.isReady}>
                        <Table selectable={false} onRowSelection={self.selectStudent}>
                            <TableHeader displaySelectAll={false} enableSelectAll={false} style={{display:"none"}}>
                                <TableRow>
                                    <TableHeaderColumn>Student</TableHeaderColumn>
                                    <TableHeaderColumn>Class</TableHeaderColumn>
                                    <TableHeaderColumn>Go</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false} onRowSelection={self.selectStudent}>
                                {studentElements}
                            </TableBody>
                        </Table>
                    </RC.Loading>
                </RC.Div>
            );
        }
    };

}