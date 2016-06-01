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
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.markAllAsPresent = this.markAllAsPresent.bind(this);
        this.clearAttendance = this.clearAttendance.bind(this);

        this.teachers = [];
        this.classes = [];
        this.students = [];
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

    setupDatePicker(){
        let classDateDomNode = this.refs.classDate ? this.refs.classDate.getInputDOMNode() : null;
        if (classDateDomNode) {
            $(classDateDomNode).datepicker({});
            $(classDateDomNode).bind('hide', this.onClassDateChange);
        }
    }

    getStudents(classIdx, cb) {
        let seletedClassID = null;
        if (classIdx < this.teacherClasses.length)
            seletedClassID = this.teacherClasses[classIdx]._id;

        if (seletedClassID) {

            !this.state.loading && this.setState({loading:true});
            Meteor.call('attendance.getStudents', seletedClassID, (function(err,result){
                this.students = result;
                // filter out trial/makeup students that are not on the selected date
                this.students = _.filter(this.students, (s) => {
                    return s.type == 'register' ||
                            (s.lessonDate.getFullYear() == this.state.selectedDate.getFullYear() &&
                            s.lessonDate.getMonth() == this.state.selectedDate.getMonth() &&
                            s.lessonDate.getDate() == this.state.selectedDate.getDate());
                })
                cb && cb();
            }).bind(this))
        }
        else {
            this.students = [];
            cb && cb();
        }
    }

    filterClassBySelectedTeacher(teacherIdx, selectedDate) {
        let weekDay = moment(selectedDate).format('ddd');
        let selectedTeacher = teacherIdx < this.teachers.length ? this.teachers[teacherIdx].nickName : '';
        this.teacherClasses = _.filter(this.classes, (c) => c.teacher == selectedTeacher && c.schedule.day == weekDay);
    }

    componentDidUpdate(prevProps, prevState) {
        super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState);
        this.setupDatePicker();
    }

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

    componentWillUnmount() {
        //alert("save")
    }

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

    onClassDateChange(e) {
        let  newDate = e.date;
        if (newDate.getFullYear() != this.state.selectedDate.getFullYear() ||
            newDate.getMonth() != this.state.selectedDate.getMonth() ||
            newDate.getDate() != this.state.selectedDate.getDate()) {

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

    save() {
        if (!this.state.dirtyCount || !this.students || !this.students.length) return;
        let studentsToUpdate = _.filter(this.students, "dirty");
        if (studentsToUpdate.length == 0) return;

        this.setState({loading:true});
        Meteor.call("attendance.updateStudentsAttendance", studentsToUpdate, (err, result) => {
            if (!err) {
                this.students.forEach( (s) => {
                    s.dirty = false;
                });
                this.setState({
                    dirtyCount: 0,
                    loading: false
                });
            }
            else {
                this.setState({
                    loading: false
                });
            }
        })
    }

    cancel() {
        if (!this.state.dirtyCount || !this.students || !this.students.length) return;

        this.students.forEach( (s) => {
            s.dirty = false;
        });
        this.setState({
            dirtyCount: 0
        });
    }

    render() {

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
            s.attendance = s.attendance || {};
            s.currentAttendance = s.attendance[currentDay] || "N/A";
        })

        return (
            <RC.Div>
                <h3 style={{"textAlign": "left"}}>Class Attendance</h3>
                <RB.Row >
                    <div className="form-horizontal">
                        <RB.Col md={6} mdOffset={0}>
                            <RB.Input type="select" {... p.teacher} onChange={this.onSelectTeacher}>
                                {
                                    this.teachers.map( (t) => (<option key={'t'+t._id} value={t._id}>{t.nickName}</option>))
                                }
                            </RB.Input>
                            <RB.Input type="select" {... p.class} onChange={this.onSelectClass} value={this.teacherClasses && this.teacherClasses.length > this.state.selectedClassIdx? this.teacherClasses[this.state.selectedClassIdx]._id : null}>
                                {
                                    this.teacherClasses.map( (c) => (<option key={'c'+c._id} value={c._id}>{c.name}</option>))
                                }
                            </RB.Input>
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
                        <KUI.YesButton style={{marginTop: 20,marginBottom: 20}} onClick={this.clearAttendance} label="Clear Attendance"></KUI.YesButton>
                    </RC.Div>
                </RB.Row>

                <KUI.Table
                    style={style.table}
                    list={this.students}
                    title={titleArray}
                    ref="table">
                </KUI.Table>


                <RC.Div style={{textAlign:'right'}}>
                    <KUI.YesButton style={{marginRight: 20}} onClick={this.save} label="Save"></KUI.YesButton>
                    <KUI.NoButton onClick={this.cancel} label="Cancel"></KUI.NoButton>
                </RC.Div>
            </RC.Div>
        );
    }
}