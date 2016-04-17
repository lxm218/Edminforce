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

EdminForce.Components.StudentClasses = class extends RC.CSS {
    constructor(p) {
        super(p);
        this.state = {
            menuStyle: {
                display: "block"
            },
        };
    }

    clickMakeUp(currentClass) {
        let query = {
            classID: currentClass.classID,
            studentID: this.props.student._id,
            studentName: this.props.student.name
        }
        let path = FlowRouter.path("/makeupClasses", null, query);
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
        let currentTime = new Date().getTime(); 
        let student = this.props.student;
        if (student && student.currentClasses.length > 0) {
            let currentClass = student.currentClasses[0];
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
                                            {student.name}
                                        </p>
                                    </TableRowColumn>
                                    <TableRowColumn
                                        style={{width: "60%", whiteSpace:"normal"}}>
                                        <p style={{padding: 0}}>
                                            {currentClass.program.name}
                                        </p>

                                        <p style={{padding: 0}}>
                                            {currentClass.class.shortName}
                                        </p>

                                        <p style={{padding: 0}}>
                                            {"Registered on " + moment(currentClass.createTime).format("MMM D, YYYY")}
                                        </p>
                                    </TableRowColumn>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <div className="students-detail-menus" style={this.state.menuStyle}>
                            {
                                currentClass.session.startDate.getTime() < currentTime ?
                                    (<RC.Button bgColor="brand2" bgColorHover="dark"
                                                onClick={this.clickMakeUp.bind(this,currentClass)}>Make up Class</RC.Button>) :
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

        let historyClassElements = [];
        if (student && student.completedClasses.length > 0) {
            historyClassElements = student.completedClasses.map((sc, index) => (
                <RC.Div key={sc._id}>
                    <p style={{padding: 0, paddingTop: index == 0 ? 8 : 0}}>
                        {sc.program.name}
                    </p>
                    <p style={{padding: 0}}>
                        {sc.class.shortName}
                    </p>
                </RC.Div>
            ))
        }

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