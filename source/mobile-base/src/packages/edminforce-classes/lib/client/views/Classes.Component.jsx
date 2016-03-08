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

            this.classes = [];
            this.programs = [];
            this.students = [];
            this.sessions = [];

            // selected programID
            this.programID = null;

            // selected sessionID
            this.sessionID = null;

            // selected StudentID
            this.studentID = null;

            this.classID = null;

            this.selectedClasses = [];

            // special handling for first registration week
            this.firstRegistrationWeekSession = null;
            this.studentCurrentClasses = [];
            this.firstRegistrationWeekAlert;

            this.selectedClassStyle = { backgroundColor: "#e0e0e0" }

            this.state = {
                styles: [],
                weekDay: null,

                studentID: null,
                programID: null,
                sessionID: null
            };
        }

        getMeteorData() {

            let handler = Meteor.subscribe("EF-Classes-For-Register");

            if (handler.ready()) {
                this.getStudents();

                this.getSessions();

                this.getPrograms();

                this.getClasses();
            }

            return {
                isReady: handler.ready()
            }
        }

        setSelectedID(idName, idOptions) {
            this[idName] = null;
            if (idOptions.length >0) {
                if (this.state[idName] && _.find(idOptions, {_id:this.state[idName]}))
                    this[idName] = this.state[idName];
                else
                    this[idName] = idOptions[0]._id;
            }
        }

        getPrograms() {
            let programs = EdminForce.Collections.program.find({}).fetch();

            for (let i = 0; i < programs.length; i++) {
                programs[i].value = programs[i]["_id"];
                programs[i].label = programs[i].name;
            }

            this.programs = programs;
            this.setSelectedID('programID',programs);
        }

        getSessions() {
            let currentDate = new Date();
            let sessions = EdminForce.Collections.session.find({registrationStartDate:{$lt:currentDate}, registrationEndDate:{$gt:currentDate}}).fetch();

            for (let i = 0; i < sessions.length; i++) {
                sessions[i].value = sessions[i]["_id"];
                sessions[i].label = sessions[i].name;
            }

            this.sessions = sessions;

            // check if current date is within the first registration week of any session
            this.firstRegistrationWeekSession = _.find(this.sessions, (s) => {
                return (currentDate >= s.registrationStartDate && currentDate <= moment(s.registrationStartDate).add(7,"d").toDate());
            });
            // for the case of first week registration, we need to get current classes of the selected student
            // so we can find out which classes are available for first week registration.
            this.studentCurrentClasses = [];
            if (this.firstRegistrationWeekSession && this.studentID) {
                let studentClasses = EdminForce.Collections.classStudent.find({studentID:this.studentID, type:'register', status:'checkouted'}).fetch();
                let classIDs = studentClasses.map( (sc) => sc.classID );
                // we may need to filter out history classes that are finished long time ago.
                let currentClasses = EdminForce.Collections.class.find({_id: {$in:classIDs}}).fetch();
                this.studentCurrentClasses = currentClasses.map((c) => ({
                    programID: c.programID,
                    sessionID: c.sessionID,
                    schedule: c.schedule
                }));
            }

            if (this.firstRegistrationWeekSession) {
                this.sessionID = this.firstRegistrationWeekSession._id;
                this.state.weekDay = null;
            }
            else {
                this.setSelectedID('sessionID', sessions);
            }
        }

        getStudents() {
            let students = EdminForce.Collections.student.find({
                accountID: Meteor.userId()
            }).fetch();

            // discuss with Ma Lan, she said same student can register multiple class in same program
            /*
             let registeredStudents = EdminForce.Collections.classStudent.find({
             programID: this.programID
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

            this.students = students;
            this.setSelectedID('studentID', students);
        }

        eligibleForFirstRegistrationWeek(classData) {
            return _.find(this.studentCurrentClasses,(c) => {
                    return c.programID === classData.programID &&
                        c.schedule.day === classData.schedule.day &&
                        c.schedule.time === classData.schedule.time
                });
        }

        getClasses() {
            // Available Class Condition
            this.firstRegistrationWeekAlert = false;
            let classes
            if (this.firstRegistrationWeekSession) {
                // for first week registration, program list is hidden, so we are not filtering by program
                classes = EdminForce.Collections.class.find({
                    sessionID: this.sessionID
                }).fetch();

                let numClasses = classes.length;
                numClasses > 0 && (classes = _.filter(classes, (c) => this.eligibleForFirstRegistrationWeek(c)));
                this.firstRegistrationWeekAlert = (numClasses != classes.length);
            }
            else {
                classes = EdminForce.Collections.class.find({
                    programID: this.programID,
                    sessionID: this.sessionID
                }).fetch();
            }

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

            this.classes = validClasses;
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
                return false;
            }

            // find selected student information
            let student = _.find(this.students, {_id:this.studentID});

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

            if (existedClass && existedClass[0]) {
                return false;
            }

            // class required gender isn't same with student's
            if (classInfo.genderRequire && (classInfo.genderRequire.toLowerCase() !== 'all') && (classInfo.genderRequire.toLowerCase() !== student.profile.gender.toLowerCase())) {
                return false;
            }

            // Get currently student's birthday
            let age = EdminForce.utils.calcAge(student.profile.birthday);

            // if class has min age, and currently student's age less than min age
            if (classInfo.minAgeRequire && classInfo.minAgeRequire > age) {
                return false;
            }

            // if class has max age, and currently student's age bigger than max age
            if (classInfo.maxAgeRequire && classInfo.maxAgeRequire < age) {
                return false;
            }

            return true;
        }

        onSelectStudent(event) {
            this.selectedClasses = [];
            this.setState({
                studentID:event.target.value
            })
        }

        onSelectProgram(event) {
            this.selectedClasses = [];
            this.setState({
                programID:event.target.value
            })
        }

        onSelectSession(event) {
            this.selectedClasses = [];
            this.setState({
                sessionID: event.target.value
            })
        }

        onSelectClass(item, index) {
            this.selectedClasses = [item];

            let styles = [];
            styles[index] = this.selectedClassStyle;

            this.setState({
                styles: styles
            });
        }

        onSelectDay(day) {
            this.setState({
                weekDay: day
            })
        }

        book() {

            // you must select a class
            if (this.selectedClasses.length == 0) {
                alert("Sorry, no class available in this program.");
                return;
            }

            let insertData = this.selectedClasses.map( (c) => ({
                accountID: Meteor.userId(),
                classID: c["_id"],
                programID: c.programID,
                studentID: this.studentID,
                status: "pending",
                type: 'register'
            }));

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

        renderRegularRegistration() {

            let session = TAPi18n.__("ef_classes_" + moment().quarter().toString());
            let year = moment().year();
            let title = TAPi18n.__("ef_classes_title", {"session": session, "year": year});

            let self = this;

            let classItems = this.classes.map(function (item, index) {
                let style = self.state.styles[index] ? self.state.styles[index] : {};
                return (
                    <RC.Item key={item['_id']} theme="divider"
                             onClick={self.onSelectClass.bind(self, item, index)} style={style}>
                        <h3>{item.name}</h3>

                        <p><strong>Teacher:</strong> {item.teacher}</p>

                        <p><strong>Length:</strong> {item.length}</p>
                    </RC.Item>
                )
            });

            return (
                <RC.Div style={{"padding": "20px"}}>
                    <RC.Loading isReady={this.data.isReady}>
                        <RC.VerticalAlign center={true} className="padding" height="300px">
                            <h2>{title}</h2>
                        </RC.VerticalAlign>
                        <RC.Select options={this.students} value={this.studentID}
                                   label={TAPi18n.__("ef_classes_students")} labelColor="brand1"
                                   onChange={this.onSelectStudent.bind(this)}/>
                        <RC.Select options={this.programs} value={this.programID}
                                   label={TAPi18n.__("ef_classes_program")} labelColor="brand1"
                                   onChange={this.onSelectProgram.bind(this)}/>
                        <RC.Select options={this.sessions} value={this.sessionID}
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

        onTableRowSelection(selectedRowIndice) {
            this.selectedClasses = selectedRowIndice.map( (idx) => this.classes[idx] );
        }

        renderFirstWeekRegistration() {
            let session = TAPi18n.__("ef_classes_" + moment().quarter().toString());
            let year = moment().year();
            let title = TAPi18n.__("ef_classes_title", {"session": session, "year": year});

            let self = this;
            let renderBody;
            if (this.classes.length > 0) {
                //selected by default
                this.selectedClasses = this.classes;
                let classItems = this.classes.map(function (item, index) {
                    return (
                        <TableRow key={item._id} selected={true}>
                            <TableRowColumn style={{width: "100%", whiteSpace:"normal"}}>
                                <h3>{item.name}</h3>
                                <p><strong>Teacher:</strong> {item.teacher}</p>
                                <p><strong>Length:</strong> {item.length}</p>
                            </TableRowColumn>
                        </TableRow>
                    )
                });

                renderBody = (
                    <Table selectable={true} multiSelectable={true} onRowSelection={self.onTableRowSelection.bind(self)}>
                        <TableHeader displaySelectAll={false} enableSelectAll={false}
                            style={{display:"none"}}>
                            <TableRow>
                                <TableHeaderColumn>Class</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={true} deselectOnClickaway={false}>
                            {classItems}
                        </TableBody>
                    </Table>
                )
            }
            else {
                if (this.firstRegistrationWeekAlert)
                    renderBody = (
                        <RC.Div style={{"padding": "20px"}}>
                            <p><b>The first week registration only opens to current students to renew the same classes they're currently taking. Please come back next week for registration.</b></p>
                        </RC.Div>
                    )
                else
                    renderBody = (
                        <RC.Div style={{"padding": "20px"}}>
                            <p><b>No class available for registration.</b></p>
                        </RC.Div>
                    )
            }

            return (
                <RC.Div style={{"padding": "20px"}}>
                    <RC.Loading isReady={this.data.isReady}>
                        <RC.VerticalAlign center={true} className="padding" height="300px">
                            <h2>{title}</h2>
                        </RC.VerticalAlign>
                        <RC.Select options={this.students} value={this.studentID}
                            label={TAPi18n.__("ef_classes_students")} labelColor="brand1"
                            onChange={this.onSelectStudent.bind(this)}/>
                            {renderBody}
                        {
                            this.classes.length > 0 && (<RC.Button bgColor="brand2" bgColorHover="dark" isActive={false} onClick={self.book.bind(self)}>Confirm</RC.Button>)
                        }
                    </RC.Loading>
                </RC.Div>
            );
        }

        render() {
            return this.firstRegistrationWeekSession ? this.renderFirstWeekRegistration() : this.renderRegularRegistration();
        }
    };

}
