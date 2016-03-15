const schemaConst = {
    day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
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

EdminForce.Components.ProgramsClasses = class extends RC.CSSMeteorData {

        constructor(p) {
            super(p);

            this.state = {
                selectedDay: null
            }
        }

        getMeteorData() {
        let programID = FlowRouter.getParam("programID");
        let classProgramIDHandler = Meteor.subscribe('EF-Class-programID', programID);
        return {
            lessons: this.getAvailableTrialLessons(),
            isReady: classProgramIDHandler.ready()
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
            let item = classes[i];

            // trialStudent === 0 means trial is not allowed
            if (item.trialStudent === 0) continue;

            // Following condition, skip this class
            // 1. class's status isn't Active
            if (lodash.lowerCase(item.status) !== lodash.lowerCase(schemaConst.status[0])) {
                continue;
            }

            // get number of regular student registrations
            let numRegularStudents = EdminForce.Collections.classStudent.find({
                    classID: item._id,
                    status: {$in:['pending', 'checkouting', 'checkouted']},
                    type: schemaConst.registrationStatus[1]       // register
                }).count();

            // check if the class is fully booked by regular students
            if (numRegularStudents >= item.maxStudent)
                continue;

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
                console.error("Didn't find session information");
                continue;
            }

            let classDate = this.getClassDate(item.schedule.day, item.schedule.time);

            if (!classDate) {
                continue;
            }

            // how many available lesson to show
            for (let j = 0; j < displayWeekNumber; j++) {

                let lessonDate = moment(classDate).toDate();
                if (lessonDate < classSession.startDate || lessonDate > classSession.endDate) continue;

                let trialNumber = EdminForce.Collections.classStudent.find({
                        classID: item.classID,
                        lessonDate: moment(classDate).toDate(),
                        type: 'trial'
                    }).count();

                // trial + regular <= maxStudent
                if (trialNumber + numRegularStudents>= item.maxStudent) continue;

                // check against maxTrialStudent, null means no limit
                if (item.trialStudent && trialNumber >= item.trialStudent) continue;

                // first clone it
                let lesson = lodash.cloneDeep(item);

                // available lesson
                lesson.key = btoa(lesson._id + ":" + j);
                lesson.lessonDate = lessonDate;

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

        // we must get this value, any of them is null or undefined, console error, and skip this class
        if (!lodash.isNumber(classHour) || !lodash.isNumber(classMin)) {
            console.error("The class time format isn't correct! Support format like 08:09 pm. Currently value: ", classTime);
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
            let date = moment(today);
            classDate.year = date.year();
            classDate.month = date.month();
            classDate.date = date.date();
        }

        return classDate;
    }

    bookClass(item) {

        let programID = FlowRouter.getParam("programID");

        // user login
        if (Meteor.user()) {
            //TODO if currently user not student, jump to add student page, after add successful then jump to confirm page
            console.log("User logged");

            let params = {
                programID: programID,
                classID: item._id,
                timestamp: item.lessonDate.getTime()
            }
            let path = FlowRouter.path("/programs/:programID/:classID/:timestamp", params);
            FlowRouter.go(path);

        } else {  // user not login
            console.log("User not logged");
            FlowRouter.go('/login');
            Session.set("BookTrialClassId", item._id);
            Session.set("BookTrialProgramId", programID);
            Session.set("BookTrialTimestamp", item.lessonDate.getTime());
        }
    }

    onSelectDay(day) {
        this.setState({selectedDay:day});
    }

    render() {
        let self = this;
        // Fill with your UI
        let col = {
            display: "inline-block",
            float: "left",
            width: "50%",
            padding: 0
        };

        let lessons = this.data.lessons || [];
        this.state.selectedDay && (lessons = _.filter(lessons,(lesson) => lesson.schedule && lesson.schedule.day === this.state.selectedDay));

        return (
            <div>
                <RC.Div>
                    <div style={{textAlign:"center"}}>
                        <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                            onClick={this.onSelectDay.bind(this, "Mon")}>Mon</RC.Button>
                        <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                            onClick={this.onSelectDay.bind(this, "Tue")}>Tue</RC.Button>
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
                </RC.Div>
                <RC.List>
                    <RC.Loading isReady={this.data.isReady}>
                        {
                            lessons.map(function (item) {
                                return (
                                    <RC.Item key={item.key} theme="divider"
                                             onClick={self.bookClass.bind(self, item)}>
                                        <h3>{item.name}</h3>
                                        <div>
                                            <br/>
                                            <p style={col}>Day: {moment(item.lessonDate).format("MMMM Do YYYY")}</p>
                                            <p style={col}>Length: {item.length}</p>
                                            <br/>
                                            <p>Teacher: {item.teacher}</p>
                                        </div>

                                    </RC.Item>
                                )
                            })
                        }
                    </RC.Loading>
                </RC.List>
            </div>
        );
    }
};
