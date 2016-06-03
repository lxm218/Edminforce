let _ = lodash;
let {
    Table,
    TableHeaderColumn,
    TableRow,
    TableHeader,
    TableRowColumn,
    TableBody
}=MUI;

EdminForce.Components.Students = class extends RC.CSS {

    constructor(p) {
        super(p);
    }

    selectClass(student, studentClass) {
        // it has class
        if (student && studentClass && studentClass.type !== 'trial' && studentClass.type !== 'makeup' ) {

            let params = {
                studentID: student._id
            };
            let query = {
                current: studentClass._id,
            }
            let path = FlowRouter.path("/studentClass/:studentID", params, query);
            FlowRouter.go(path);
        }
    }

    selectStudent(student) {
        // update student
        if (!student) return;

        let path = FlowRouter.path("/student/:studentID", {studentID: student._id}, {r:'/students'});
        FlowRouter.go(path);
    }

    render() {

        let self = this;

        let currentTime = new Date().getTime();
        let studentElements = this.props.students.map((student) => {

            // show all current classes, and one most recent completed class, if any.
            let classes = student.currentClasses;
            if (student.completedClasses.length > 0) {
                student.completedClasses[0].completed = true;
                classes = student.currentClasses.concat([student.completedClasses[0]]);
            }

            // class records for this student
            let classElements = classes.map((sc, index) => (
                <RC.Div key={student.id + sc._id} onClick={self.selectClass.bind(self, student,sc)}>
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
                                    (sc.type === "trial" || sc.type==='makeup') ? (sc.type === "trial" ? "Trial on " : "Make up on ") + moment(sc.lessonDate).format("MMM D, YYYY") : (sc.session.startDate.getTime() < currentTime ? "Current" : "New Registration")
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
                    <RC.Div key={student._id+"noclass"}>
                        <p style={{padding: 0, paddingBottom: 8, paddingTop: 8}}>No class registration record</p>
                    </RC.Div>
                )
            }

            return (
                <TableRow key={student._id}>
                    <TableRowColumn style={{width: "25%", whiteSpace:"normal"}}>
                        <p onClick={self.selectStudent.bind(self, student)}>
                            {student.name}
                        </p>
                    </TableRowColumn>
                    <TableRowColumn style={{width: "60%", whiteSpace:"normal"}}>
                        {classElements}
                    </TableRowColumn>
                    <TableRowColumn style={{width: "15%", whiteSpace:"normal"}}>
                        <i onClick={self.selectStudent.bind(self, student)} className="fa fa-arrow-right"
                           style={{display:'block'}}></i>
                    </TableRowColumn>
                </TableRow>
            )
        })

        return (
            <RC.Div>
                <RC.Div style={{borderBottom:"1px solid #e0e0e0", paddingBottom:8}}>
                    <h3 style={{"textAlign": "center"}}>Students</h3></RC.Div>
                    <RC.VerticalAlign center={true} className="padding"><h6>Click current class to book makeup class</h6></RC.VerticalAlign>
                    {EdminForce.utils.renderError(this.props.error)}
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

            </RC.Div>
        );
    }
};
