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

    let _ = lodash;

    const schemaConst = {
        day: ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'],
        weekDay: {
            "mon": 1,
            "tues": 2,
            "wed": 3,
            "thu": 4,
            "fri": 5,
            "sat": 6,
            "sun": 7
        },
        tuitionType: ['each', 'total'],
        status: ['Active', 'Inactive'],
        level: ['Beginner', 'Intermediate', 'Advanced'],
        genderRequire: ['All', 'Male', 'Female'],
        //length : ['30 min', '45 min', '1 hr', '1.5 hr', '2 hr']

        registrationStatus: ['trial', 'register', 'wait', 'makeup'],

        maxMakeupStudentsPerClass: 2
    };

    EdminForce.Components.MakeupClass = class extends RC.CSSMeteorData {
        constructor (p) {
            super(p);

            this.studentID = FlowRouter.getParam("studentID");
            this.classID = FlowRouter.getQueryParam("classID");
            this.programID = FlowRouter.getQueryParam("programID");
            this.studentDOB = FlowRouter.getQueryParam("dob");
            this.studentDOB && (this.studentDOB = new Date(parseInt(this.studentDOB)));
            this.studentGender = FlowRouter.getQueryParam("gender");
            this.studentName = FlowRouter.getQueryParam("name");

            this.selectedLesson = null;

            this.state = {
                lessonsStyles: [],
                step: 1
            };

        }

        /**
         * get an object can used by [moment](http://momentjs.com/docs/#/parsing/object/)
         * @param day
         * @param time
         * @returns {*}
         */
        getClassDate(day, time) {
            // which week day this class has in every week
            let classWeekDay = day;
            // The time of this class
            let classTime = time;

            let today = new Date();

            // regular expression to get hour, min, am/pm
            let reg = /^(\d{1,2})\s*:\s*(\d{1,2})\s*(\w{2})$/;

            let result = reg.exec(classTime);

            let classHour = lodash.toNumber(result[1]);
            let classMin = lodash.toNumber(result[2]);
            let class12Clock = result[3];
            // if class 12 clock is pm, then need to plus 12
            if (lodash.lowerCase(class12Clock) == 'pm') {
                classHour += 12;
            }

            // we must get this value, any of them is null or undefined,//console error, and skip this class
            if (!lodash.isNumber(classHour) || !lodash.isNumber(classMin)) {
                //console.error("The class time format isn't correct! Support format like 08:09 pm. Currently value: ", classTime);
                return null;
            }

            classWeekDay = schemaConst.weekDay[lodash.lowerCase(classWeekDay)];

            // the week day of today
            let todayWeekDay = today.getDay();

            // next class date object
            let classDate = {
                year: null,
                month: null,
                date: null,
                hour: classHour,
                minute: classMin,
                second: 0,
                millisecond: 0
            };
            if (todayWeekDay >= classWeekDay) {  // if today's week day is big than or equal class week day, so it need to be next week
                let date = moment(today).add(7 - todayWeekDay + classWeekDay, 'days');
                classDate.year = date.year();
                classDate.month = date.month();
                classDate.date = date.date();
            } else if (todayWeekDay < classWeekDay) {    // if today's week day is less than class week day, so it should be in this week
                let date = moment(today).add(classWeekDay - todayWeekDay, 'days');
                classDate.year = date.year();
                classDate.month = date.month();
                classDate.date = date.date();
                //classDate
            } else {                                  // For this version, didn't let use to select today's trial class
                let date = moment(today).toDate();
                classDate.year = date.year();
                classDate.month = date.month();
                classDate.date = date.date();
            }

            return classDate;
        }

        getAvailableMakeupLessons(dataIsReady) {
            if (!dataIsReady) return [];

            let displayWeekNumber = 4;

            let classes = EdminForce.Collections.class.find({}, {
                sort: {
                    createTime: 1
                }
            }).fetch();

            let sessions = EdminForce.Collections.session.find({}, {
                sort: {
                    startDate: 1
                }
            }).fetch();

            let availableLessons = [];

            let studentAge = moment().diff(this.studentDOB, 'years')

            // find all available lessons for each class
            for (let i = 0; i < classes.length; i++) {
                //if(classes.max)
                let item = classes[i];

                // skip current class
                if (item._id == this.classID) continue;

                // check age
                if (item.minAgeRequire && studentAge < item.minAgeRequire ||
                    item.maxAgeRequire && studentAge > item.maxAgeRequire)
                    continue;

                // check gender
                if (item.genderRequire && item.genderRequire !== 'All' && item.genderRequire != this.studentGender)
                    continue;


                // Following condition, skip this class
                // 1. class's status isn't Active
                //console.log(item.status);
                //console.log(schemaConst.status[0]);
                if (lodash.lowerCase(item.status) !== lodash.lowerCase(schemaConst.status[0])) {
                    continue;
                }

                // get regular register students number
                let numRegularRegisterStudents = EdminForce.Collections.classStudent.find({
                        classID: item._id,
                        status: schemaConst.registrationStatus[1]       // register
                    }, {
                        sort: {
                            lessonDate: 1
                        }
                    }).count();

                // if trial student is 0, and class already full, then skip this class
                if (numRegularRegisterStudents >= item.maxStudent) {
                    //console.log("[info]class is full, and not all trial");
                    continue;
                }

                let classSession = EdminForce.Collections.session.find({
                        _id: item.sessionID
                    }, {
                        sort: {
                            startDate: 1
                        }
                    }).fetch() || [];

                classSession = classSession[0];

                // cannot find class relative session, then skip this class
                if (!classSession) {
                    //console.error("Didn't find session information");
                    continue;
                }

                let classDate = this.getClassDate(item.schedule.day, item.schedule.time);

                if (!classDate) {
                    continue;
                }

                // how many available lesson to show
                for (let j = 0; j < displayWeekNumber; j++) {
                    // check the total students for the class date, including make up, trial and regular
                    let makeupAndTrialNumber = EdminForce.Collections.classStudent.find({
                            classID: item.classID,
                            lessonDate: moment(classDate).toDate()
                        }).count();

                    if (makeupAndTrialNumber + numRegularRegisterStudents >= item.maxStudent)
                        continue;

                    // check to make sure total makeup students is less than the limit
                    let makeupNumber = EdminForce.Collections.classStudent.find({
                        classID: item.classID,
                        lessonDate: moment(classDate).toDate(),
                        type: schemaConst.registrationStatus[3]
                    }).count();
                    if (makeupNumber >= schemaConst.maxMakeupStudentsPerClass) {
                        continue;
                    }

                    // first clone it
                    let lesson = lodash.cloneDeep(item);

                    // available lesson
                    lesson.key = btoa(lesson._id + ":" + j);
                    lesson.lessonDate = moment(classDate).toDate();

                    availableLessons.push(lesson);

                    let tmpDate = moment(classDate).add(7, 'days');
                    classDate.year = tmpDate.year();
                    classDate.month = tmpDate.month();
                    classDate.date = tmpDate.date();
                }
            }

            return availableLessons;
        }

        getMeteorData() {
            // TODO: this should be changed to using Meteor method. The subscription loads too much data to client.
            let subHandle = Meteor.subscribe('EF-Class-programID', this.programID);
            return {
                isReady: subHandle.ready(),
                lessons: this.getAvailableMakeupLessons(subHandle.ready())
            }
        }

        onSelectDay(day) {
            this.setState({
                selectedDay: day
            })
        }

        onSelectLesson(classData, index) {

            this.selectedLesson = classData;

            let styles = [];
            styles[index] = {
                backgroundColor: "#e0e0e0"
            };

            this.setState({
                lessonsStyles: styles
            });
        }

        renderClassItes() {
            if (this.data.lessons.length == 0)
                return (
                    <RC.Div><p style={{textAlign:"center", padding: 0, paddingBottom: 8, paddingTop: 8}}>No class available for make up</p></RC.Div>
                )

            let lesseonsFilteredByDay = this.data.lessons;
            if (this.state.selectedDay) {
                lesseonsFilteredByDay = _.filter(this.data.lessons, (item) => {
                    return item.schedule && item.schedule.day.toLowerCase() == this.state.selectedDay.toLowerCase();
                });

                if (lesseonsFilteredByDay.length == 0)
                    return (
                        <RC.Div><p style={{textAlign:"center", padding: 0, paddingBottom: 8, paddingTop: 8}}>No class available on selected day</p></RC.Div>
                    )
            }

            let lessons = lesseonsFilteredByDay.map(function (item, index) {
                let style = this.state.lessonsStyles[index] ? this.state.lessonsStyles[index] : {};
                return (
                    <RC.Item key={item.key} theme="divider"
                        onClick={this.onSelectLesson.bind(this, item, index)} style={style}>
                        <h3>{item.name}</h3>

                        <p>
                        Day: {moment(item.lessonDate).format("dddd, MMMM Do YYYY, h:mm a")}</p>

                        <p>Length: {item.length}</p>
                    </RC.Item>
                )
            }.bind(this))

            return lessons;
        }

        cancelMakeUp() {
            this.setState({
                step: 1,
                lessonsStyles: []
            });
        }

        makeupClass() {
            this.setState({step:2});
            $(window).scrollTop(0);
        }

        checkout() {
            var data = {
                accountID: Meteor.userId(),
                classID: this.selectedLesson._id,
                studentID: this.studentID,
                programID: this.programID,
                lessonDate: new Date(this.selectedLesson.lessonDate.getTime()),
                status: "pending",
                type: "makeup",
                createTime: new Date()
            };

            EdminForce.Collections.classStudent.insert(data, function (err, res) {
                if (err) {
                    alert("Insert Fail!");
                } else {
                    let path = FlowRouter.path("/carts/checkout");
                    FlowRouter.go(path);
                }
            }.bind(this));
        }

        render() {
            if (!this.data.isReady) {
                return (
                    <RC.Loading isReady={this.data.isReady}>
                    </RC.Loading>
                );
            }

            let attributes = {
            };

            if(!this.selectedLesson){
                processButtonStyle = {
                    backgroundColor: "gray",
                    cursor:"not-allowed"
                };

                attributes.disabled= "disabled";
            }else{
                processButtonStyle = {
                    backgroundColor: "rgb(255, 121, 40)"
                };
            }

            return (
                <RC.Div>
                    <RC.Div style={{borderBottom:"1px solid #e0e0e0", paddingBottom:8}}><h3 style={{"textAlign": "center"}}>Make up Class</h3></RC.Div>
                    {
                        this.state.step == 1 ?
                            (
                                <div className="students-detail-make-up">
                                    <div className="make-up-step-1" style={{display: "block"}}>
                                        <div>
                                            <p style={{marginLeft: "20px"}}>Select Day:</p>

                                            <div style={{textAlign:"center"}}>
                                                <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                                                    onClick={this.onSelectDay.bind(this, "Mon")}>Mon</RC.Button>
                                                <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                                                    onClick={this.onSelectDay.bind(this, "Tues")}>Tues</RC.Button>
                                                <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                                                    onClick={this.onSelectDay.bind(this, "Wed")}>Wed</RC.Button>
                                                <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                                                    onClick={this.onSelectDay.bind(this, "Thu")}>Thu</RC.Button>
                                                <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                                                    onClick={this.onSelectDay.bind(this, "Fri")}>Fri</RC.Button>
                                                <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                                                    onClick={this.onSelectDay.bind(this, "Sat")}>Sat</RC.Button>
                                                <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                                                    onClick={this.onSelectDay.bind(this, "Sun")}>Sun</RC.Button>
                                            </div>

                                        </div>
                                        { this.renderClassItes.bind(this)() }
                                        <div style={{margin:"0 20px"}}>
                                            <RC.Button {... attributes} style={processButtonStyle} bgColor="brand2" bgColorHover="dark"
                                                onClick={this.makeupClass.bind(this)}>Continue</RC.Button>
                                        </div>
                                    </div>
                                </div>

                            ):
                            (
                                <div className="make-up-step-2" style={{display: "block"}}>
                                    <div style={{margin: "20px 20px"}}>
                                        <p>Make up class
                                        for {this.studentName}:</p>

                                        <p style={{padding:"0"}}>{moment(this.selectedLesson && this.selectedLesson.lessonDate).format("dddd, MMMM Do YYYY, h:mm a")}</p>

                                        <p>Please pay $5 to confirm your make up class</p>

                                        <p style={{padding: 0, margin:"10px 0 0 0"}}>
                                            <span
                                                style={{display:"inline-block", paddingLeft:"20px", height: "40px", lineHeight:"40px", width:"80%", border:"1px solid gray"}}>Make up class fee</span>
                                            <span
                                                style={{display:"inline-block", paddingLeft:"20px", height: "40px", lineHeight:"40px", width:"20%", borderBottom:"1px solid gray", borderTop:"1px solid gray", borderRight:"1px solid gray"}}>$5</span>
                                        </p>
                                    </div>

                                    <RC.Button bgColor="brand2" bgColorHover="dark"
                                        onClick={this.checkout.bind(this)}>Pay Now</RC.Button>
                                    <RC.Button bgColor="brand2" bgColorHover="dark"
                                        onClick={this.cancelMakeUp.bind(this)}>Cancel</RC.Button>
                                </div>
                            )
                    }
                </RC.Div>
            );
        }
    }

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.StudentsDetail = class extends RC.CSSMeteorData {
        constructor(p) {
            super(p);
            this.state = {
                menuStyle: {
                    display: "block"
                },
            };
        }

        createUIData(subscriptionReady) {
            if (!subscriptionReady) return null;

            let studentID = FlowRouter.getParam("studentID");
            let classStudentID = FlowRouter.getQueryParam("current");
            let programID = FlowRouter.getQueryParam("programID");
            let completed = FlowRouter.getQueryParam("completed");
            completed = (completed === "true");

            let currentTime = new Date().getTime();

            let student = EdminForce.Collections.student.find({_id:studentID}).fetch();
            student = student && student[0];
            if (!student) return null;

            let classes = EdminForce.Collections.class.find().fetch();
            let sessions = EdminForce.Collections.session.find().fetch();
            let programs = EdminForce.Collections.program.find().fetch();

            if (!completed) {
                let currentClass = EdminForce.Collections.classStudent.find({_id:classStudentID}).fetch();
                currentClass = currentClass && currentClass[0];
                if (currentClass) {
                    currentClass.class = _.find(classes, {_id: currentClass.classID});
                    if (currentClass.class) {
                        currentClass.program = _.find(programs, {_id: currentClass.class.programID});
                        currentClass.session = _.find(sessions, {_id: currentClass.class.sessionID});

                        if (!currentClass.programID)
                            currentClass.programID = currentClass.class.programID;

                        currentClass.started = (currentClass.session && currentClass.session.startDate.getTime() < currentTime);
                    }
                }
                student.currentClass = currentClass;
            }

            let studentClasses =  EdminForce.Collections.classStudent.find({studentID: studentID}).fetch();
            student.completedClasses = [];
            studentClasses.forEach((studentClass) => {
                if (studentClass.type !== 'trial') {
                    // find class session & program
                    studentClass.class = _.find(classes, {_id: studentClass.classID});
                    if (studentClass.class) {
                        studentClass.program = _.find(programs, {_id: studentClass.class.programID});
                        studentClass.session = _.find(sessions, {_id: studentClass.class.sessionID});
                        if (!studentClass.programID)
                            studentClass.programID = studentClass.class.programID;
                    }

                    if (studentClass.program && studentClass.class && studentClass.session) {
                        if (studentClass.session.endDate.getTime() < currentTime)
                            student.completedClasses.push(studentClass);
                    }
                }
            });

            return student;
        }


        getMeteorData() {
            let subHandle = Meteor.subscribe("EFStudentsWithClasses", FlowRouter.getParam("studentID"));
            return {
                isReady: subHandle.ready(),
                student: this.createUIData(subHandle.ready())
            }
        }

        clickMakeUp() {
            let params = {
                studentID:this.data.student._id
            };
            let query = {
                classID: this.data.student.currentClass.classID,
                programID: this.data.student.currentClass.programID,
                dob: this.data.student.profile && this.data.student.profile.birthday.getTime(),
                gender: this.data.student.profile && this.data.student.profile.gender,
                name: this.data.student.name
            }
            let path = FlowRouter.path("/makeupClass/:studentID", params, query);
            FlowRouter.go(path);
        }

        clickChangeClass() {
            // Not implemented yet
        }

        render() {
            if (!this.data.isReady) {
                return (
                    <RC.Loading isReady={this.data.isReady}>
                    </RC.Loading>
                );
            }

            if (!this.data.student) {
                return <div>An error has occurred</div>
            }

            let tabs = [];
            if (this.data.student.currentClass) {
                tabs.push((
                    <Tab label="Current" value="current">
                        <div style={{marginTop:"10px",display:"block"}}>
                            <Table selectable={false}>
                                <TableHeader displaySelectAll={false} enableSelectAll={false}
                                    style={{display:"none"}}>
                                    <TableRow>
                                        <TableHeaderColumn>Student</TableHeaderColumn>
                                        <TableHeaderColumn>Class</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    <TableRow>
                                        <TableRowColumn
                                            style={{width: "40%", whiteSpace:"normal"}}>
                                            <p>
                                                        {this.data.student.name}
                                            </p>
                                        </TableRowColumn>
                                        <TableRowColumn
                                            style={{width: "60%", whiteSpace:"normal"}}>
                                            <p style={{padding: 0}}>
                                                        {this.data.student.currentClass.program.name}
                                            </p>

                                            <p style={{padding: 0}}>
                                                        {this.data.student.currentClass.class.schedule.day} {this.data.student.currentClass.class.schedule.time}
                                            </p>

                                            <p style={{padding: 0}}>
                                                        {"Registered on " + moment(this.data.student.currentClass.createTime).format("MMM D, YYYY")}
                                            </p>
                                        </TableRowColumn>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <div className="students-detail-menus" style={this.state.menuStyle}>
                                {
                                    this.data.student.currentClass.started ?
                                        (<RC.Button bgColor="brand2" bgColorHover="dark" onClick={this.clickMakeUp.bind(this)}>Make up Class</RC.Button>) :
                                        (<RC.Button bgColor="brand2" bgColorHover="dark" onClick={this.clickChangeClass.bind(this)}>Change Class</RC.Button>)
                                }
                                <RC.Button bgColor="brand2" bgColorHover="dark" >Comments</RC.Button>
                                <RC.Button bgColor="brand2" bgColorHover="dark" >Make an Appointment</RC.Button>
                            </div>
                        </div>
                    </Tab>
                ));
            }

            let historyClassElements = this.data.student.completedClasses.map( (sc, index) => (
                <RC.Div key={sc._id}>
                    <p style={{padding: 0, paddingTop: index == 0 ? 8 : 0}}>
                        {sc.program.name}
                    </p>
                    <p style={{padding: 0}}>
                        {sc.session.name} {sc.class.schedule && sc.class.schedule.day} {sc.class.schedule && sc.class.schedule.time}
                    </p>
                </RC.Div>
            ))

            if (historyClassElements.length === 0) {
                historyClassElements.push(
                    <RC.Div><p style={{textAlign:"center", padding: 0, paddingBottom: 8, paddingTop: 8}}>No history class record</p></RC.Div>
                )
            }

            tabs.push((
                <Tab label="History" value="history">
                {historyClassElements}
                </Tab>
            ));

            return (
                <div>
                    <Tabs>{tabs}</Tabs>
                </div>
            )
        }
    };

}