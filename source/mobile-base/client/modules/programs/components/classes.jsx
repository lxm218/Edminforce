// class registration
let _ = lodash;
let {
    Table,
    TableHeaderColumn,
    TableRow,
    TableHeader,
    TableRowColumn,
    TableBody
}=MUI;

const SessionInfoBackdrop = ({session}) => (
    <RC.Div>
        <Table selectable={false}>
            <TableBody displayRowCheckbox={false}>
                <TableRow>
                    <TableRowColumn colSpan="2">
                        <RC.VerticalAlign center={true}>
                            <h3>{session.name}</h3>
                        </RC.VerticalAlign>
                    </TableRowColumn>
                </TableRow>
                <TableRow>
                    <TableRowColumn>Starts:</TableRowColumn>
                    <TableRowColumn>{moment(session.startDate).format('MM/DD/YYYY')}</TableRowColumn>
                </TableRow>
                <TableRow>
                    <TableRowColumn>Ends:</TableRowColumn>
                    <TableRowColumn>{moment(session.endDate).format('MM/DD/YYYY')}</TableRowColumn>
                </TableRow>
                <TableRow>
                    <TableRowColumn style={{whiteSpace:"normal"}}>Registration starts:</TableRowColumn>
                    <TableRowColumn>{moment(session.registrationStartDate).format('MM/DD/YYYY')}</TableRowColumn>
                </TableRow>
                <TableRow>
                    <TableRowColumn style={{whiteSpace:"normal"}}>Registration ends:</TableRowColumn>
                    <TableRowColumn>{moment(session.registrationEndDate).format('MM/DD/YYYY')}</TableRowColumn>
                </TableRow>
                {session.blockOutDay && session.blockOutDay.length > 0 ? (
                    <TableRow>
                        <TableRowColumn style={{whiteSpace:"normal"}}>No class on the following dates:</TableRowColumn>
                        <TableRowColumn style={{whiteSpace:"normal"}}>{session.blockOutDay.map(bd => moment(bd).format('MM/DD/YYYY')).join(', ')}</TableRowColumn>
                    </TableRow>
                ) : null}
            </TableBody>
        </Table>
    </RC.Div>
)

EdminForce.Components.Classes = class extends RC.CSS {

    constructor(p) {
        super(p);

        this.classes = [];
        this.selectedClasses = [];

        this.state = {
            weekDay: null,
            backdropSessionInfo: null
        };

        this.onSelectDay = this.onSelectDay.bind(this);
        this.book = this.book.bind(this);
        this.onSelectSession = this.onSelectSession.bind(this);
        this.onSelectStudent = this.onSelectStudent.bind(this);
        this.onSelectProgram = this.onSelectProgram.bind(this);
        this.onTableRowSelection = this.onTableRowSelection.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.showSessionInfo = this.showSessionInfo.bind(this);
        this.closeBackdrop = this.closeBackdrop.bind(this);

        this.stateBag = this.props.context.StateBag.classes;
    }

    onSelectStudent(event) {
        this.stateBag.studentID = event.target.value
        this.props.context.LocalState.set('state.classes', new Date().getTime());
    }

    onSelectProgram(event) {
        this.stateBag.programID = event.target.value;
        this.props.context.LocalState.set('state.classes', new Date().getTime());
    }

    onSelectSession(event) {
        this.stateBag.sessionID = event.target.value;
        this.props.context.LocalState.set('state.classes', new Date().getTime());
    }

    onTableRowSelection(selectedRowIndice) {
        this.selectedClasses = selectedRowIndice.map((idx) => this.classes[idx]);
    }

    onSelectDay(day) {
        this.selectedClasses = [];
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
        this.props.actions.bookClass(this.stateBag.studentID, this.selectedClasses.map( (c) => c._id ));
    }

    addStudent() {
        let redirectQueryParams = {
            r: `/${EdminForce.sid}/classes`
        };

        FlowRouter.go(FlowRouter.path(`/${EdminForce.sid}/student`, null, redirectQueryParams));
    }

    showSessionInfo(event) {
        event.preventDefault();
        this.setState({
            backdropSessionInfo:<SessionInfoBackdrop session={_.find(this.stateBag.sessions, {_id:this.stateBag.sessionID})} />
        })
    }

    closeBackdrop() {
        this.setState({
            backdropSessionInfo:null
        })
    }

    render() {
        let self = this;
        let classTable;

        let {
            classes,
            firstRegistrationWeekSession,
            firstRegistrationWeekAlert
        } = this.props.registration;

        this.stateBag = this.props.context.StateBag.classes;

        // filter by weekday
        if (this.state.weekDay && !firstRegistrationWeekSession) {
            classes = _.filter(classes, (c) => c.schedule.day == this.state.weekDay);
        }

        if (classes.length > 0) {
            //selected by default
            firstRegistrationWeekSession && (this.selectedClasses = classes);
            let classItems = classes.map(function (item, index) {
                return (
                    <TableRow key={item._id} selected={!!_.find(self.selectedClasses, {_id:item._id})}>
                        <TableRowColumn style={{width: "100%", whiteSpace:"normal"}}>
                            <h3>{item.name}</h3>
                            <p><strong>Available:</strong> {item.maxStudent-item.numberOfRegistered}</p>
                            <p><strong>Teacher:</strong> {item.teacher}</p>
                            <p><strong>Length:</strong> {item.length}</p>
                        </TableRowColumn>
                    </TableRow>
                )
            });

            classTable = (
                <Table selectable={true} multiSelectable={true} onRowSelection={this.onTableRowSelection}
                       key="classTbl">
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
            if (firstRegistrationWeekAlert)
                classTable = (
                    <RC.Div style={{"padding": "20px"}} key="priorityAlert">
                        <p><b>The first week registration only opens to current students to renew the same classes
                            they're currently taking. Please come back next week for registration.</b></p>
                    </RC.Div>
                )
            else
                classTable = (
                    <RC.Div style={{"padding": "20px"}} key="noClssMsg">
                        <p><b>No class found for your selection.</b></p>
                    </RC.Div>
                )
        }

        let renderBodyElements = [];

        if (firstRegistrationWeekSession) {
            classes.length > 0 && renderBodyElements.push(
                (<RC.Div style={{"padding": "20px"}} key="renewMsg"><p>You're renewing the following classes:</p>
                </RC.Div>)
            );

            renderBodyElements.push(classTable);

            renderBodyElements.push(
                (<RC.Button bgColor="brand2" bgColorHover="dark" isActive={false} onClick={this.book} key="bookBtn">Confirm</RC.Button>)
            );
        }
        else {
            // program selection is only available in regular registration
            renderBodyElements.push((
                <RC.Select options={this.stateBag.programs} value={this.stateBag.programID}
                           label="Program" labelColor="brand1"
                           onChange={this.onSelectProgram} key="programList"/>
            ));

            // week day filter
            renderBodyElements.push(
                (<RC.Div key="dayFilter">
                    <span style={{marginLeft: "6",color:"#0082ec"}}>Select Day:</span>
                    <EdminForce.Components.WeekDaySelector onSelectDay={this.onSelectDay}/>
                </RC.Div>)
            );

            renderBodyElements.push(classTable);

            renderBodyElements.push(
                (
                    <RC.Button bgColor="brand2" bgColorHover="dark" isActive={false} onClick={this.book} key="bookBtn">Book</RC.Button>)
            );
        }

        // we need to save this, because table.OnRowSelection event references class by row index
        this.classes = classes;

        return (
            <RC.Div style={{"padding": "20px"}}>
                <RC.VerticalAlign center={true} className="padding" height="300px" key="title">
                    <h2>Registration</h2>
                </RC.VerticalAlign>
                {
                    this.stateBag.students && this.stateBag.students.length > 0 ?
                        (<RC.Select options={this.stateBag.students} value={this.stateBag.studentID} key="studentList"
                                   label="Students" labelColor="brand1"
                                   onChange={this.onSelectStudent}/>) :
                        (
                            <RC.Button bgColor="brand2" theme="inline" bgColorHover="dark" onClick={this.addStudent} key="addStudentBtn">Add Student</RC.Button>
                        )
                }
                <a onClick={this.showSessionInfo}><i className="fa fa-info-circle" style={{float:"right"}}></i></a>
                <RC.Select options={this.stateBag.sessions} value={this.stateBag.sessionID} key="sessionList"
                           label="Session" labelColor="brand1"
                           onChange={this.onSelectSession}/>
                <RC.BackDropArea onClick={this.closeBackdrop}>
                    {this.state.backdropSessionInfo}
                </RC.BackDropArea>
                {renderBodyElements}
            </RC.Div>
        );
    }
};