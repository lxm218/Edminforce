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

        registrationStatus: ['trial', 'register', 'wait', 'makeup']
    };

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.StudentsDetail = class extends RC.CSSMeteorData {
        constructor(p) {
            super(p);

            this.selectedLesson = null;

            this.state = {
                value: "current",
                studentStyle: {
                    marginTop: "10px",
                    display: "block"
                },
                menuStyle: {
                    display: "block"
                },
                makeUpStep1Style: {
                    display: "none"
                },
                makeUpStep2Style: {
                    display: "none"
                },
                lessonsStyles: []
            };
        }

        getMeteorData() {

            console.log("rerun getMeteorData");

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

            student = student && student[0];

            //console.log("student: ", student);

            let classStudent = EdminForce.Collections.classStudent.find({
                _id: classStudentID
            }).fetch();

            classStudent = classStudent && classStudent[0];

            //console.log("classStudent: ", classStudent);

            let classData = EdminForce.Collections.class.find({
                _id: classStudent && classStudent.classID
            }).fetch();

            classData = classData && classData[0];

            let session = EdminForce.Collections.session.find({
                _id: classData && classData.sessionID
            }).fetch();

            session = session && session[0];

            let now = new Date();

            let inProgressing = false;

            // currently time is between session's start and end time
            if (session && (now >= session.startDate && now <= session.endDate)) {
                inProgressing = true;
            } else {
                inProgressing = false;
            }

            //console.log("classData: ", classData);

            let current = {
                studentID: student && student["_id"],
                studentName: student && student.name,
                className: classData && classData.name,
                classDay: classData && classData.schedule && classData.schedule.day,
                classTime: classData && classData.schedule && classData.schedule.time,
                registered: classStudent && classStudent.createTime,
                inProgressing: inProgressing
            };
            let lessons = [], filteredLessons=[];
            if (inProgressing) {
                lessons = this.getAvailableTrialLessons();

                let day = this.state.selectedDay;
                filteredLessons = _.filter(lessons, function(item){
                    return day ? item&&item.schedule&&item.schedule.day.toLowerCase() == day.toLowerCase():true;
                });
            }

            //console.log(lessons);

            return {
                isReady: handler.ready(),
                current: current,
                originalLessons: lessons,
                lessons: filteredLessons
            }
        }

        getAvailableTrialLessons() {

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

            let classStudent = EdminForce.Collections.classStudent.find({}, {
                sort: {
                    lessonDate: 1
                }
            }).fetch();


            let availableLessons = [];

            // find all available lessons for each class
            for (let i = 0; i < classes.length; i++) {
                //if(classes.max)
                let item = classes[i];

                // Following condition, skip this class
                // 1. class's status isn't Active
                //console.log(item.status);
                //console.log(schemaConst.status[0]);

                if (lodash.lowerCase(item.status) !== lodash.lowerCase(schemaConst.status[0])) {
                    continue;
                }

                // get regular register students number
                let regularRegisterStudents = EdminForce.Collections.classStudent.find({
                        classID: item._id,
                        status: schemaConst.registrationStatus[1]       // register
                    }, {
                        sort: {
                            lessonDate: 1
                        }
                    }).fetch() || [];

                // Get the student who register
                let trialRegisterStudents = EdminForce.Collections.classStudent.find({
                        classID: item._id,
                        status: schemaConst.registrationStatus[0]       // trial

                    }, {
                        sort: {
                            lessonDate: 1
                        }
                    }).fetch() || [];

                // if trial student is 0, and class already full, then skip this class
                if (item.trialStudent == 0 && (item.maxStudent === regularRegisterStudents.length)) {
                    //console.log("[info]class is full, and not all trial");
                    continue;
                }


                let availableNumber = item.maxStudent - regularRegisterStudents.length + item.trialStudent;
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

                //console.log(item);
                //console.log(classSession);

                let classDate = this.getClassDate(item.schedule.day, item.schedule.time);

                if (!classDate) {
                    continue;
                }

                //console.log("[info] classDate: ", classDate);

                // how many available lesson to show
                for (let j = 0; j < displayWeekNumber; j++) {

                    let trialNumber = EdminForce.Collections.classStudent.find({
                            classID: item.classID,
                            lessonDate: moment(classDate).toDate()
                        }, {
                            sort: {
                                startDate: 1
                            }
                        }).fetch() || [];

                    // most of case should just equal
                    // no trial available for this date
                    if (trialNumber >= availableNumber) {
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

        handleChange(value) {
            this.setState({
                value: value
            });
        }

        clickMakeUp() {
            this.setState({
                studentStyle: {
                    marginTop: "10px",
                    display: "block"
                },
                menuStyle: {
                    display: "none"
                },
                makeUpStep1Style: {
                    display: "block"
                },
                makeUpStep2Style: {
                    display: "none"
                },
                lessonsStyles: []
            });
        }

        cancelMakeUp() {
            this.setState({
                studentStyle: {
                    marginTop: "10px",
                    display: "block"
                },
                menuStyle: {
                    display: "block"
                },
                makeUpStep1Style: {
                    display: "none"
                },
                makeUpStep2Style: {
                    display: "none"
                },
                lessonsStyles: []
            });
        }

        onSelectDay(day) {
            //this.data.lessons = _.filter(this.data.originalLessons, function(item){
            //    return item&&item.schedule&&item.schedule.day.toLowerCase() == day.toLowerCase();
            //});
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

        makeupClass() {

            var data = {
                accountID: Meteor.userId(),
                classID: this.selectedLesson._id,
                studentID: this.data.current.studentID,
                programID: this.selectedLesson.programID,
                lessonDate: new Date(this.selectedLesson.lessonDate.getTime()),
                status: "pending",
                type: "makeup",
                createTime: new Date()
            };

            EdminForce.Collections.classStudent.insert(data, function (err, res) {
                if (err) {
                    alert("Insert Fail!");
                } else {
                    this.setState({
                        studentStyle: {
                            marginTop: "10px",
                            display: "none"
                        },
                        menuStyle: {
                            display: "none"
                        },
                        makeUpStep1Style: {
                            display: "none"
                        },
                        makeUpStep2Style: {
                            display: "block"
                        }
                    });

                    $(window).scrollTop(0);
                }
            }.bind(this));
        }

        renderClassItes() {
            let lessons = this.data.lessons.map(function (item, index) {
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

        checkout() {
            let path = FlowRouter.path("/carts/checkout");
            FlowRouter.go(path);
        }

        render() {

            let self = this;

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

            // Fill with your UI
            return (
                <div>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange.bind(this)}
                        >
                        <Tab label="Current" value="current">
                            <RC.Loading isReady={this.data.isReady}>
                                <div style={this.state.studentStyle}>
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
                                                        {this.data.current && this.data.current.studentName}
                                                    </p>
                                                </TableRowColumn>
                                                <TableRowColumn
                                                    style={{width: "75%", whiteSpace:"normal"}}>
                                                    <p style={{padding: 0}}>
                                                        {this.data.current && this.data.current.className}
                                                    </p>

                                                    <p style={{padding: 0}}>
                                                        {this.data.current && this.data.current.classDay} {this.data.current && this.data.current.classTime}
                                                    </p>

                                                    <p style={{padding: 0}}>
                                                        {this.data.current && this.data.current.registered && "Registered on " + moment(this.data.current.registered).format("MMM D, YYYY")}
                                                    </p>
                                                </TableRowColumn>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className="students-detail-menus" style={this.state.menuStyle}>

                                    {this.data.current && this.data.current.inProgressing ?
                                        <RC.Button bgColor="brand2" bgColorHover="dark"
                                                   onClick={this.clickMakeUp.bind(this)}>Make up Class</RC.Button> :
                                        <p style={{textAlign:"center"}}>You don't have in progress class, cannot make up
                                            class.</p>}

                                </div>
                                <div className="students-detail-make-up">
                                    <div className="make-up-step-1" style={this.state.makeUpStep1Style}>
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
                                            <RC.Button bgColor="brand2" bgColorHover="dark"
                                                       onClick={this.cancelMakeUp.bind(this)}>Cancel</RC.Button>
                                        </div>
                                    </div>
                                    <div className="make-up-step-2" style={this.state.makeUpStep2Style}>
                                        <div style={{margin: "20px 20px"}}>
                                            <p>Make up class
                                                for {this.data.current && this.data.current.studentName}:</p>

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
                                </div>
                            </RC.Loading>
                        </Tab>
                        <Tab label="History" value="history">
                            <RC.Loading isReady={this.data.isReady}>
                                <div>
                                    <p>Coming soon...</p>
                                </div>
                            </RC.Loading>
                        </Tab>
                    </Tabs>
                </div>
            );
        }
    };

}