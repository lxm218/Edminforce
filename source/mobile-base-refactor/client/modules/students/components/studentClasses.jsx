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

// Don't forget to change `SomeName` to correct name
EdminForce.Components.StudentClasses = class extends RC.CSS {
    constructor(p) {
        super(p);
        this.state = {
            menuStyle: {
                display: "block"
            },
        };
    }

    clickMakeUp() {
        let params = {
            studentID: this.props.student._id
        };
        let query = {
            classID: this.props.student.currentClass.classID,
            programID: this.props.student.currentClass.programID,
            programName: this.props.student.currentClass.program.name,
            dob: this.props.student.profile && this.props.student.profile.birthday.getTime(),
            gender: this.props.student.profile && this.props.student.profile.gender,
            name: this.props.student.name
        }
        let path = FlowRouter.path("/makeupClass/:studentID", params, query);
        FlowRouter.go(path);
    }

    clickChangeClass() {
        // Not implemented yet
    }

    render() {

        if (this.props.error) {
            return (<div>
                {EdminForce.utils.renderError(this.props.error)}
            </div>)
        }

        let tabs = [];
        if (this.props.student.currentClass) {
            tabs.push((
                <Tab key="current" label="Current" value="current">
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
                                            {this.props.student.name}
                                        </p>
                                    </TableRowColumn>
                                    <TableRowColumn
                                        style={{width: "60%", whiteSpace:"normal"}}>
                                        <p style={{padding: 0}}>
                                            {this.props.student.currentClass.program.name}
                                        </p>

                                        <p style={{padding: 0}}>
                                            {this.props.student.currentClass.session && this.props.student.currentClass.session.name} {this.props.student.currentClass.class.schedule.day} {this.props.student.currentClass.class.schedule.time}
                                        </p>

                                        <p style={{padding: 0}}>
                                            {"Registered on " + moment(this.props.student.currentClass.createTime).format("MMM D, YYYY")}
                                        </p>
                                    </TableRowColumn>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <div className="students-detail-menus" style={this.state.menuStyle}>
                            {
                                this.props.student.currentClass.started ?
                                    (<RC.Button bgColor="brand2" bgColorHover="dark"
                                                onClick={this.clickMakeUp.bind(this)}>Make up Class</RC.Button>) :
                                    (<RC.Button bgColor="brand2" bgColorHover="dark"
                                                onClick={this.clickChangeClass.bind(this)}>Change Class</RC.Button>)
                            }
                            <RC.Button bgColor="brand2" bgColorHover="dark">Comments</RC.Button>
                            <RC.Button bgColor="brand2" bgColorHover="dark">Make an Appointment</RC.Button>
                        </div>
                    </div>
                </Tab>
            ));
        }

        let historyClassElements = this.props.student.completedClasses.map((sc, index) => (
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
                <RC.Div><p style={{textAlign:"center", padding: 0, paddingBottom: 8, paddingTop: 8}}>No history class
                    record</p></RC.Div>
            )
        }

        tabs.push((
            <Tab key="history" label="History" value="history">
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