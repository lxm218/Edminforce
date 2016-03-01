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
/*
            let handler = null;

            Tracker.autorun(function () {
                handler = Meteor.subscribe("EF-Students");
            }.bind(this));

            let classStudents = EdminForce.Collections.classStudent.find({
                accountID: Meteor.userId(),
                type: {
                    $in: ['register', 'wait']
                },
                status: {
                    $in: ["checkouted"]
                }
            }).fetch();

            // get current user's students
            let students = EdminForce.Collections.student.find({
                accountID: Meteor.userId()
            }).fetch();

            // get all classes
            let classes = EdminForce.Collections.class.find({}).fetch();

            let sessions = EdminForce.Collections.session.find({}).fetch();

            let bookClasses = [];

            // Merge all information together
            for (let i = 0; i < classStudents.length; i++) {
                //for(let i = 0; i< 0; i++){
                let bookClass = classStudents[i];

                if (!bookClass) {
                    continue;
                }

                let classID = bookClass.classID;
                let classData = _.find(classes, function (item) {
                    return item["_id"] === classID;
                });

                if (!classData) {
                    continue;
                }

                let sessionData = _.find(sessions, function (item) {
                    return item["_id"] === classData.sessionID;
                });

                if (!sessionData) {
                    continue;
                }

                let studentData = _.find(students, function (item) {
                    return item["_id"] === bookClass.studentID;
                });

                if (!studentData) {
                    continue;
                }

                bookClass.className = classData.name;
                bookClass.classStudentID = bookClass["_id"];
                bookClass.studentName = studentData.name;
                bookClass.schedule = classData.schedule;
                bookClass.classType = classData.type;

                let now = new Date();

                // currently time is between session's start and end time
                if (now >= sessionData.startDate && now <= sessionData.endDate) {
                    bookClass.inProgressing = true;
                } else {
                    bookClass.inProgressing = false;
                }

                bookClasses.push(bookClass);
            }

            //console.log(bookClasses);

            let studentLists = [];

            // generate student list
            for (let i = 0; i < students.length; i++) {

                // this is the rules, after discuss with Lan Ma
                // 1. If this student has class in progress show all the class he/she has now
                // 2. If this student has class in waitinglist show it
                // 3. If this student has completed class, show the last completed class
                // 4. If this student don't registered before, show student, but the middle content is empty

                let student = students[i];
                let studentID = student["_id"];

                let bookClassesThisStudent = _.filter(bookClasses, function (item) {
                    return item.studentID == studentID;
                });

                console.log(bookClassesThisStudent);

                let inProgress = false, inWaiting = false, hasCompleted = false;
                let inProgressClasses = [], inWaitingClasses = [], completedClasses = [];
                for (let j = 0; j < bookClassesThisStudent.length; j++) {
                    let bookedClass = bookClassesThisStudent[j];
                    bookedClass.studentID = studentID;

                    // student has in progress class
                    if (bookedClass.inProgressing) {
                        console.log("=====inProgress");
                        inProgress = true;
                        bookedClass.name = student.name;
                        inProgressClasses.push(bookedClass);
                    } else if (bookedClass.classType === 'wait') {
                        // don't has in progress class, but has class in waiting list
                        inWaiting = true;
                        if (!inProgress) {
                            console.log("=====wait");
                            bookedClass.name = student.name;
                            inWaitingClasses.push(bookedClass);
                        }
                    } else {
                        // don't has in progress class, don't has waiting class, but has class before
                        if (!inWaiting && !inProgress) {
                            console.log("=====completed");
                            hasCompleted = true;
                            bookedClass.name = student.name;
                            completedClasses.push(bookedClass);
                        }
                    }
                }

                // User don't have class
                if (inProgress) {
                    studentLists = studentLists.concat(inProgressClasses);
                } else if (inWaiting) {
                    studentLists = studentLists.concat(inWaitingClasses);
                } else if (hasCompleted) {
                    studentLists = studentLists.concat(completedClasses);
                } else {
                    let studentData = {
                        name: student.name
                    }
                    studentLists.push(studentData);
                }
                ;

                //console.log(bookClassesThisStudent);
                //studentLists = studentLists.concat(bookClassesThisStudent);
            }

            return {
                isReady: handler.ready(),
                students: studentLists
            }*/
        }

        selectStudent(student) {

            // it has class
            if(student.className){

                let params = {
                    studentID:student.studentID
                };
                let query = {
                    current: student.classStudentID,
                    programID: student.programID
                }
                let path = FlowRouter.path("/students/:studentID", params, query);
                FlowRouter.go(path);
            }
        }

        createStudentList() {
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
                    if (studentClass.type === 'register' || studentClass.status === 'checkouted') {
                        // find class session & program
                        studentClass.program = _.find(programs, {_id: studentClass.programID});
                        studentClass.class = _.find(classes, {_id: studentClass.classID});
                        studentClass.class && (studentClass.session = _.find(sessions, {_id: studentClass.class.sessionID}));

                        if (studentClass.program && studentClass.class && studentClass.session) {
                            if (studentClass.session.endDate.getTime() < currentTime)
                                completedClasses.push(studentClass);
                            else
                                currentClasses.push(studentClass);
                        }
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

                    student.classes.push(completedClasses[0]);
                }

                return student;
            });
        }

        render() {

            let self = this;
            let students = this.createStudentList();

            let studentElements = students.map( (student) => {
                // class records for this student
                let classElements = student.classes.map( (sc, index) => (
                        <RC.Div key={sc._id} onClick={self.selectStudent.bind(self, student)}>
                            <p style={{padding: 0, paddingTop: index == 0 ? 8 : 0}}>
                                    {sc.program.name}
                            </p>
                            <p style={{padding: 0}}>
                                    {sc.class.schedule && sc.class.schedule.day} {sc.class.schedule && sc.class.schedule.time}
                            </p>
                            <p style={{padding: 0, paddingBottom: 8 }}>
                                    {sc.createTime && "Registered on " + moment(sc.createTime).format("MMM D, YYYY")}
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