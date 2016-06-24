const DismissibleInfo = React.createClass({
    dismiss() {
        this.props.onDismiss && this.props.onDismiss();
    },

    render() {
        if (!this.props.messages || this.props.messages.length == 0)
            return (<div/>);

        let messages = this.props.messages.map( (msg,idx) => {
            return <p key={idx}>{msg}</p>
        });

        return (
            <div style={{position:"relative"}}>
                <div style={{position:"absolute", zIndex:100, top: "10px", maxWidth:"500px", right:"10px"}}>
                    <div className="alert alert-info alert-dismissible" role="alert">
                        <button type="button" className="close" aria-label="Close" onClick={this.dismiss}><span aria-hidden="true">&times;</span></button>
                        {messages}
                    </div>
                </div>
            </div>
        )
    }
});


KUI.Teachers_index = class extends RC.CSS {

    constructor(p) {
        super(p);

        this.state = {
            loading:false,
            selectedTeacherIdx:0,
            selectedClassIdx: 0,
            selectedDate: new Date(),
            dirtyCount: 0
        };

        this.onSelectClass = this.onSelectClass.bind(this);
        this.onSelectTeacher = this.onSelectTeacher.bind(this);
        this.onClassDateChange = this.onClassDateChange.bind(this);
        this.filterClassBySelectedTeacher = this.filterClassBySelectedTeacher.bind(this);
        this.getStudents = this.getStudents.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.markAllAsPresent = this.markAllAsPresent.bind(this);
        this.clearAttendance = this.clearAttendance.bind(this);
        this.dismissMessages = this.dismissMessages.bind(this);

        this.teachers = [];
        this.classes = [];
        // all regular students, and trial/makeup students on the selected date
        this.students = [];
        // a complete list of students of a class, including all trial/makeup students
        this.completeStudents = [];
        this.programs = [];
        this.teacherClasses = [];

        this.attendanceOptions = [
            "N/A",
            "Present",
            "Absent",
            "Excused",
            "Tardy",
            "Left Early"
        ]
    }

    // set up bootstrap datepicker control
    setupDatePicker(){
        let classDateDomNode = this.refs.classDate ? this.refs.classDate.getInputDOMNode() : null;
        if (classDateDomNode) {
            $(classDateDomNode).datepicker({});
            $(classDateDomNode).bind('hide', this.onClassDateChange);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState);
        this.setupDatePicker();
    }

    // load initial data from server
    componentDidMount() {
        super.componentDidMount && super.componentDidMount();

        this.setState({loading:true});
        Meteor.call('attendance.getInitialData', (function(err,result){
            this.teachers = result.teachers;
            this.classes = result.classes;
            this.programs = result.programs;
            this.currentSession = result.currentSession;

            // class name
            this.classes.forEach( (c) => {
                let p = _.find(this.programs, {_id: c.programID});
                p && (c.name = p.name + " " + c.schedule.day + " " + c.schedule.time);
            })

            this.filterClassBySelectedTeacher(this.state.selectedTeacherIdx, this.state.selectedDate);
            this.getStudents(this.state.selectedClassIdx, () => {
                this.setState({loading:false});
            });
        }).bind(this))
    }

    // when navigating away, if there are unsaved changes, prompt user to save
    componentWillUnmount() {
        this.promptSave();
    }

    // call meteor method to save changed attendance
    save(studentsToUpdate, cb) {
        Meteor.call("attendance.updateStudentsAttendance", studentsToUpdate, (err, result) => {
            err || studentsToUpdate.forEach( (s) => {
                s.dirty = false;
            });
            cb && cb(err, result);
        })
    }

    // when leaving the page or changing to another class, check if there are any unsaved changes
    // and prompt the user to save
    promptSave(cb) {
        let saveChanges = false;
        let studentsToUpdate = [];
        if (this.state.dirtyCount > 0) {
            studentsToUpdate = _.filter(this.completeStudents, "dirty");
            if (studentsToUpdate.length > 0 && window.confirm("Do you want to save the updated attendance ?")) {
                saveChanges = true;
            }
        }

        if (saveChanges) {
            this.save(studentsToUpdate, cb);
        }
        else {
            cb && cb();
        }
    }

    filterTrialMakeupStudentsByDate(dt) {
        this.students = _.filter(this.completeStudents, (s) => {
            return s.type == 'register' ||
                (s.lessonDate.getFullYear() == dt.getFullYear() &&
                s.lessonDate.getMonth() == dt.getMonth() &&
                s.lessonDate.getDate() == dt.getDate());
        })
    }

    // get students for the selected class
    getStudents(classIdx, cb) {
        let seletedClassID = null;
        if (classIdx < this.teacherClasses.length)
            seletedClassID = this.teacherClasses[classIdx]._id;

        if (seletedClassID) {
            !this.state.loading && this.setState({loading:true});
            // prompt user for unsaved changes
            this.promptSave( (err,result) => {
                Meteor.call('attendance.getStudents', seletedClassID, (function(err,result){
                    this.completeStudents = result;

                    // save attendance, so we can restore in cancel
                    this.completeStudents.forEach( (s) => {
                        s.attendance = s.attendance || {};
                        s.savedAttendance = {...s.attendance};
                    });

                    // filter out trial/makeup students that are not on the selected date
                    this.filterTrialMakeupStudentsByDate(this.state.selectedDate);

                    cb && cb();
                }).bind(this))
            })
        }
        else {
            this.completeStudents = [];
            this.students = [];
            cb && cb();
        }
    }

    // filter class by selected teacher
    filterClassBySelectedTeacher(teacherIdx, selectedDate) {
        let weekDay = moment(selectedDate).format('ddd');
        let selectedTeacher = teacherIdx < this.teachers.length ? this.teachers[teacherIdx].nickName : '';
        this.teacherClasses = _.filter(this.classes, (c) => c.teacher == selectedTeacher && c.schedule.day == weekDay);
    }

    // change teacher
    onSelectTeacher(event) {
        let teacherIdx = event.target.selectedIndex;
        let classIdx = 0;
        this.filterClassBySelectedTeacher(teacherIdx, this.state.selectedDate);
        this.getStudents(classIdx, () => {
            this.setState({
                selectedTeacherIdx:teacherIdx,
                selectedClassIdx: classIdx,
                dirtyCount: 0,
                loading:false
            });
        });
    }

    // change class
    onSelectClass(e) {
        let classIdx = e.target.selectedIndex;
        this.getStudents(classIdx, () => {
            this.setState({
                selectedClassIdx: classIdx,
                dirtyCount: 0,
                loading:false
            });
        });
    }

    // change date
    onClassDateChange(e) {
        let  newDate = e.date;
        if (newDate.getFullYear() != this.state.selectedDate.getFullYear() ||
            newDate.getMonth() != this.state.selectedDate.getMonth() ||
            newDate.getDate() != this.state.selectedDate.getDate()) {

            // check if the currently selected class is available on the new date
            // if not, we need to switch to a different class
            let currentClass = this.teacherClasses.length > this.state.selectedClassIdx? this.teacherClasses[this.state.selectedClassIdx] : null;
            let weekDay = moment(newDate).format('ddd');
            if (!currentClass || weekDay.toLowerCase() != currentClass.schedule.day.toLowerCase() ||
                    newDate < this.currentSession.startDate ||
                    newDate > moment(this.currentSession.endDate).endOf('d').toDate()) {
                let classIdx = 0;
                this.filterClassBySelectedTeacher(classIdx, newDate);
                this.getStudents(classIdx, () => {
                    this.setState({
                        selectedDate: newDate,
                        selectedClassIdx: classIdx,
                        dirtyCount: 0,
                        loading:false
                    });
                })
            }
            else {
                this.filterTrialMakeupStudentsByDate(newDate);
                this.setState({
                    selectedDate: newDate
                });
            }
        }
    }

    updateAllAttendance(option) {
        if (!this.students || !this.students.length) return;

        let currentDay = "d" + moment(this.state.selectedDate).format("YYYYMMDD");
        this.students.forEach( (s) => {
            s.currentAttendance = s.attendance[currentDay] = option;
            s.dirty = true;
        });

        this.setState({dirtyCount: this.state.dirtyCount+1})
    }
    markAllAsPresent() {
        this.updateAllAttendance("Present");
    }

    clearAttendance() {
        this.updateAllAttendance("N/A");
    }

    onSave() {
        if (!this.state.dirtyCount || !this.completeStudents || !this.completeStudents.length) {
            this.setState({messages: ["No changes"]});
            return;
        }
        let studentsToUpdate = _.filter(this.completeStudents, "dirty");
        if (studentsToUpdate.length == 0) {
            this.setState({messages: ["No changes"]});
            return;
        }

        this.save(studentsToUpdate, (err,result) => {
            let newState = {
                loading:false,
                messages:[]
            }
            if (err) {
                newState.messages.push("Error saving attendance.");
            }
            else {
                newState.dirtyCount = 0;
                newState.messages.push("Successfully saved.");
            }
            this.setState(newState);
            setTimeout((function(){ 
                this.dismissMessages();
            }).bind(this), 3000);
        });
    }

    onCancel() {
        let messages = []
        if (this.state.dirtyCount && this.completeStudents && this.completeStudents.length>0) {
            this.completeStudents.forEach( (s) => {
                s.dirty = false;
                s.attendance = {...s.savedAttendance};
            });
            messages.push('Cancelled');
        }
        else {
            messages.push('No changes');
        }


        this.setState({
            messages,
            dirtyCount: 0
        });
    }

    dismissMessages() {
        this.state.messages && this.state.messages.length > 0 && this.setState({messages:null});
    }

    render() {

        if(!util.user.checkPermission('teacher', 'view')){
            util.render.stop(this);
            return util.renderNoViewPermission();
        }

        if (this.state.loading)
            return util.renderLoading();

        let style = this.css.get('styles');

        let p = {
            teacher : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'teacher',
                label : 'Teacher'
            },

            classDate: {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'classDate',
                label : 'Date'
            },

            class : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'class',
                label : 'Class'
            }
        };

        let self = this;
        const titleArray = [
            {
                title : 'Student',
                key : 'name',
                style : {
                }
            },
            {
                title : 'Gender',
                key : 'gender',
                style : {
                }
            },
            {
                title : 'Age',
                key : 'age',
                style : {
                }
            },
            {
                title : 'Type',
                key : 'type',
                style : {

                }
            },
            {
                title : 'Attendance',
                style : {
                    textAlign : 'center'
                },
                reactDom : function(item){
                    let changeAttendance = function(e) {
                        let currentDay = "d" + moment(self.state.selectedDate).format("YYYYMMDD");
                        item.currentAttendance = item.attendance[currentDay] = e.target.value;
                        item.dirty = true;
                        self.setState({dirtyCount:self.state.dirtyCount+1});
                    }
                    
                    return (
                        <div style={{textAlign:"center"}}>
                            <select value={item.currentAttendance} onChange={changeAttendance}>
                                {
                                    self.attendanceOptions.map( (t) => (<option key={t} value={t}>{t}</option>))
                                }
                            </select>
                        </div>
                    );
                }
            }
        ];

        let currentDay = "d" + moment(this.state.selectedDate).format("YYYYMMDD");
        this.students.forEach( (s) => {
            s.currentAttendance = s.attendance[currentDay] || "N/A";
        })

        return (
            <RC.Div>
                <h3 style={{"textAlign": "left"}}>Class Attendance</h3>
                <RB.Row >
                    <div className="form-horizontal">
                        <RB.Col md={6} mdOffset={0}>
                            <RB.Input type="select" {... p.teacher} onChange={this.onSelectTeacher} value={this.teachers.length > this.state.selectedTeacherIdx ? this.teachers[this.state.selectedTeacherIdx]._id : null}>
                                {
                                    this.teachers.map( (t) => (<option key={'t'+t._id} value={t._id}>{t.nickName}</option>))
                                }
                            </RB.Input>
                            {
                                this.teacherClasses.length > 0 ?
                                    (
                                        <RB.Input type="select" {... p.class} onChange={this.onSelectClass} value={this.teacherClasses && this.teacherClasses.length > this.state.selectedClassIdx? this.teacherClasses[this.state.selectedClassIdx]._id : null}>
                                            {
                                                this.teacherClasses.map( (c) => (<option key={'c'+c._id} value={c._id}>{c.name}</option>))
                                            }
                                        </RB.Input>
                                    ) :
                                    (
                                        <RB.Input type="text" readOnly {... p.class} value={"No class"}></RB.Input>
                                )
                            }
                        </RB.Col>
                        <RB.Col md={6} mdOffset={0}>
                            <RB.Input type="text" {... p.classDate} value={moment(this.state.selectedDate).format("MM/DD/YYYY")}>
                            </RB.Input>
                        </RB.Col>
                    </div>
                </RB.Row>
                <RB.Row>
                    <RC.Div style={{textAlign:'left'}}>
                        <KUI.YesButton style={{margin: 20}} onClick={this.markAllAsPresent} label="Mark all as Present"></KUI.YesButton>
                        <KUI.YesButton style={{marginTop: 20,marginBottom: 20, marginRight:20}} onClick={this.clearAttendance} label="Clear Attendance"></KUI.YesButton>
                        <RC.Div style={{float:"right"}}>
                            <DismissibleInfo onDismiss={this.dismissMessages} messages={this.state.messages}></DismissibleInfo>
                        </RC.Div>
                    </RC.Div>
                </RB.Row>

                <KUI.Table
                    style={style.table}
                    list={this.students}
                    title={titleArray}
                    ref="table">
                </KUI.Table>

                <RC.Div style={{textAlign:'right'}}>
                    <KUI.YesButton style={{marginRight: 20}} onClick={this.onSave} label="Save"></KUI.YesButton>
                    <KUI.NoButton onClick={this.onCancel} label="Cancel"></KUI.NoButton>
                </RC.Div>
            </RC.Div>
        );
    }
}