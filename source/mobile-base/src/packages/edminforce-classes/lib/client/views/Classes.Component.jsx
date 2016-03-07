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

    injectTapEventPlugin();

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.Classes = class extends RC.CSSMeteorData {

        constructor(p) {
            super(p);

            this.classes = new ReactiveVar(null);
            this.programs = new ReactiveVar(null);
            this.students = new ReactiveVar(null);
            this.sessions = new ReactiveVar(null);

            // selected programID
            this.programID = new ReactiveVar(null);

            // selected sessionID
            this.sessionID = new ReactiveVar(null);

            // selected StudentID
            this.studentID = new ReactiveVar(null);

            this.classID = new ReactiveVar(null);

            this.selectedClass = null;

            // special handling for first registration week
            this.firstRegistrationWeek = false;
            this.studentCurrentClasses = []

            this.state = {
                styles: [],
                weekDay: null
            };
        }

        getMeteorData() {

            let handler = Meteor.subscribe("EF-Classes-For-Register");

            this.getPrograms();

            this.getStudents();

            this.getClasses();

            this.getSessions();

            this.checkFirstRegistrationWeek();

            return {
                isReady: handler.ready()
            }
        }

        checkFirstRegistrationWeek() {
            // check if it's the first week of the selected session
            let selectedSession = EdminForce.Collections.session.find({_id:this.sessionID.get()}).fetch();
            selectedSession = selectedSession && selectedSession[0];
            this.firstRegistrationWeek = false;
            if (selectedSession) {
                let currentDate = new Date();
                this.firstRegistrationWeekEndDate = moment(selectedSession.registrationStartDate).add(7,"d").toDate();
                this.firstRegistrationWeek = (currentDate >= selectedSession.registrationStartDate && currentDate <= this.firstRegistrationWeekEndDate);
            }

            this.studentCurrentClasses = [];
            let selectedStudentID = this.studentID.get();
            if (this.firstRegistrationWeek && selectedStudentID) {
                let studentClasses = EdminForce.Collections.classStudent.find({studentID:selectedStudentID, type:'register', status:'checkouted'}).fetch();
                let classIDs = studentClasses.map( (sc) => sc.classID );
                let currentClasses = EdminForce.Collections.class.find({_id: {$in:classIDs}}).fetch();
                this.studentCurrentClasses = currentClasses.map((c) => ({
                            programID: c.programID,
                            schedule: c.schedule
                    }));
            }
        }



        getPrograms() {
            let programs = EdminForce.Collections.program.find({}).fetch();

            for (let i = 0; i < programs.length; i++) {
                programs[i].value = programs[i]["_id"];
                programs[i].label = programs[i].name;
            }


            this.programs.set(programs);

            // If this.programID didn't selected, default select first one
            if (!this.programID.get()) {
                this.programID.set(programs[0] && programs[0]["_id"]);
            }
        }

        getSessions() {
            let sessions = EdminForce.Collections.session.find({endDate:{$gt:new Date()}}).fetch();

            for (let i = 0; i < sessions.length; i++) {
                sessions[i].value = sessions[i]["_id"];
                sessions[i].label = sessions[i].name;
            }

            this.sessions.set(sessions);

            // If this.sessionID didn't selected, default select first one
            if (!this.sessionID.get()) {
                this.sessionID.set(sessions[0] && sessions[0]["_id"]);
            }
        }

        getStudents() {
            //console.log("getStudent, time: ", new Date().getTime());
            let students = EdminForce.Collections.student.find({
                accountID: Meteor.userId()
            }).fetch();

            // discuss with Ma Lan, she said same student can register multiple class in same program
            /*
             let registeredStudents = EdminForce.Collections.classStudent.find({
             programID: this.programID.get()
             }).fetch();

             let validStudents = [];

             for (let i = 0; i < students.length; i++) {
             let student = students[i];
             let find = false;
             for (let j = 0; j < registeredStudents.length; j++) {
             // This student already registered this program
             if (student["_id"] === registeredStudents[j].studentID) {
             find = true;
             break;
             }
             }

             // not registered before
             if (!find) {
             student.value = student["_id"];
             student.label = student.name;
             validStudents.push(student);
             }
             }
             */

            for (let i = 0; i < students.length; i++) {
                let student = students[i];
                student.value = student["_id"];
                student.label = student.name;
            }

            if (!this.studentID.get()) {
                this.studentID.set(students[0] && students[0]['_id']);
            }

            this.students.set(students);
        }

        getClasses() {

            // Available Class Condition
            // 1. based on select program
            // 2. If currently class has minage, maxage, need to check selected student (TODO)
            let classes = EdminForce.Collections.class.find({
                programID: this.programID.get(),
                sessionID: this.sessionID.get()
            }).fetch();

            if (this.state.weekDay) {
                classes = _.filter(classes, (c) => { return c.schedule && c.schedule.day == this.state.weekDay })
            }

            let validClasses = [];

            for (let i = 0; i < classes.length; i++) {
                let item = classes[i];

                // this class is available
                if (this.whetherClassAvailable(item)) {
                    validClasses.push(item);
                }
            }

            this.classes.set(validClasses);
        }

        /**
         * judge whether currently class is available, condition:
         * 1. class isn't full
         * 2. student meet required gender
         * 3. student meet required age
         * @param classInfo {Object}
         * @returns {boolean}
         */
        whetherClassAvailable(classInfo) {
            let bAvailable = true;

            // check if the current date is within registration date range
            let session = EdminForce.Collections.session.find({_id:classInfo.sessionID}).fetch();
            session = session && session[0];
            let currentDate = new Date();

            // skip classes that don't have valid registration start & end date
            if (!session || !session.registrationStartDate || !session.registrationEndDate)
                return false;
            if (currentDate < session.registrationStartDate || currentDate > session.registrationEndDate)
                return false;

            let students = this.students.get();

            let student = null;
            // find selected student information
            for (let i = 0; i < students.length; i++) {
                // if id is same, then this is the student we want to find
                if (students[i]['_id'] == this.studentID.get()) {
                    student = students[i];
                    break;
                }
            }


            // Get class register information
            let registeredStudents = EdminForce.Collections.classStudent.find({
                classID: classInfo['_id'],
                type: {
                    $in:['register']
                },
                status: {
                    $in: ['pending', 'checkouting', 'checkouted']
                }
            }).fetch();

            // this class isn't available
            if (classInfo.maxStudent <= registeredStudents.length) {
                //console.log("[Info]Class already full");
                bAvailable = false;
                return false;
            }

            if (!student) {
                return true;
            }

            // this student already registered
            let existedClass = EdminForce.Collections.classStudent.find({
                classID: classInfo["_id"],
                studentID: student["_id"],
                type: {
                    $in:['register']
                },
                status: {
                    $in: ['pending', 'checkouting', 'checkouted']
                }
            }).fetch();

            console.log("classID: ", classInfo["_id"], existedClass);

            if (existedClass && existedClass[0]) {
                return false;
            }

            // class required gender isn't same with student's
            if (classInfo.genderRequire && (classInfo.genderRequire.toLowerCase() !== 'all') && (classInfo.genderRequire.toLowerCase() !== student.profile.gender.toLowerCase())) {
                //console.log("[Info]gender didn't meet requirement");
                bAvailable = false;
                return false;
            }

            //console.log(student);

            // Get currently student's birthday
            let age = EdminForce.utils.calcAge(student.profile.birthday);

            // if class has min age, and currently student's age less than min age
            if (classInfo.minAgeRequire && classInfo.minAgeRequire > age) {
                //console.log("[Info]min age:", classInfo.minAgeRequire, "studnet's age: ", age);
                bAvailable = false;
                return false;
            }

            // if class has max age, and currently student's age bigger than max age
            if (classInfo.maxAgeRequire && classInfo.maxAgeRequire < age) {
                //console.log("[Info]max age:", classInfo.maxAgeRequire, "studnet's age: ", age);
                bAvailable = false;
                return false;
            }

            return bAvailable;
        }

        onSelectStudent(event) {
            this.studentID.set(event.target.value);
        }

        onSelectProgram(event) {
            this.programID.set(event.target.value);
        }

        onSelectSession(event) {
            this.sessionID.set(event.target.value);
        }

        onSelectClass(item, index) {

            this.selectedClass = item;
            this.classID.set(this.selectedClass["_id"]);

            let styles = [];
            styles[index] = {
                backgroundColor: "#e0e0e0"
            };

            this.setState({
                styles: styles
            });
        }

        onSelectDay(day) {
            this.setState({
                weekDay: day
            })
        }

        firstWeekRegistrationAlertMessage() {
            return "Registration is only available for current students before " + moment(this.firstRegistrationWeekEndDate).format("MMM D, YYYY");
        }

        book() {

            // you must select a class
            if (!this.selectedClass) {
                alert("Sorry, no class available in this program.");
                return;
            }

            if (!this.eligibleForFirstRegistrationWeek(this.selectedClass)) {
                alert(this.firstWeekRegistrationAlertMessage());
                return;
            }

            let insertData = [{
                accountID: Meteor.userId(),
                classID: this.selectedClass["_id"],
                programID: this.programID.get(),
                studentID: this.studentID.get(),
                status: "pending",
                type: 'register'
            }];

            // first insert it to classStudent cart
            EdminForce.Collections.classStudent.batchInsert(insertData, function (err, res) {
                if (err) {
                    alert("Insert Fail!");
                } else {

                    let params = {
                        cartId: res[0]
                    };

                    let path = FlowRouter.path("/carts/detail/:cartId", params);
                    FlowRouter.go(path);

                }
            }.bind(this));
        }

        eligibleForFirstRegistrationWeek(classData) {
            return !this.firstRegistrationWeek || _.find(this.studentCurrentClasses,(c) => {
                    return c.programID === classData.programID &&
                        c.schedule.day === classData.schedule.day &&
                        c.schedule.time === classData.schedule.time
                } );
        }

        render() {

            let session = TAPi18n.__("ef_classes_" + moment().quarter().toString());
            let year = moment().year();
            let title = TAPi18n.__("ef_classes_title", {"session": session, "year": year});

            let self = this;

            let firstWeekInfoMsg = this.firstWeekRegistrationAlertMessage();
            let classItems = this.classes.get().map(function (item, index) {
                let style = self.state.styles[index] ? self.state.styles[index] : {};
                let eligibleForFirstWeekRegistration = self.eligibleForFirstRegistrationWeek(item);

                console.log(item);

                return (
                    <RC.Item key={item['_id']} theme="divider"
                             onClick={self.onSelectClass.bind(self, item, index)} style={style}>
                        <h3>{item.name}</h3>

                        <p><strong>Teacher:</strong> {item.teacher}</p>

                        <p><strong>Length:</strong> {item.length}</p>

                        {
                            (!eligibleForFirstWeekRegistration) && (<p>{firstWeekInfoMsg}</p>)
                        }

                    </RC.Item>
                )
            });

            return (
                <RC.Div style={{"padding": "20px"}}>
                    <RC.Loading isReady={this.data.isReady}>
                        <RC.VerticalAlign center={true} className="padding" height="300px">
                            <h2>
                                {title}
                            </h2>
                        </RC.VerticalAlign>
                        <RC.Select options={this.students.get()} value={this.studentID}
                                   label={TAPi18n.__("ef_classes_students")} labelColor="brand1"
                                   onChange={this.onSelectStudent.bind(this)}/>
                        <RC.Select options={this.programs.get()} value={this.programID}
                                   label={TAPi18n.__("ef_classes_program")} labelColor="brand1"
                                   onChange={this.onSelectProgram.bind(this)}/>
                        <RC.Select options={this.sessions.get()} value={this.sessionID}
                            label="Session" labelColor="brand1"
                            onChange={this.onSelectSession.bind(this)}/>
                        <RC.Div>
                            <span style={{marginLeft: "6",color:"#0082ec"}}>Select Day:</span>
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
                        </RC.Div>
                        {
                            classItems
                        }
                        <RC.Button bgColor="brand2" bgColorHover="dark" isActive={false} onClick={self.book.bind(self)}>{TAPi18n.__("ef_classes_book")}</RC.Button>
                    </RC.Loading>
                </RC.Div>
            );
        }

    };

}
