let _ = lodash;
let {
    Tabs,
    Tab,
    Table,
    TableHeaderColumn,
    TableRow,
    TableHeader,
    TableRowColumn,
    TableBody
}=MUI;

function getClassName(cls) {
    return `${cls.program.name} ${cls.class.schedule.day} ${cls.class.schedule.time} ` + (cls.type == 'makeup' || cls.type=='trial' ? moment(cls.lessonDate).format("MMM D, YYYY") : '');
}
function getClassLink(cls, studentID) {
    let params = {
        studentID,
    };
    let query = {
        current: cls._id,
    }
    return FlowRouter.path("/studentClass/:studentID", params, query);
}

const StudentClassTable = (props) => (
    <Table selectable={false}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false} enableSelectAll={false}>
            <TableRow>
                <TableHeaderColumn>{props.categoryHeader}</TableHeaderColumn>
                <TableHeaderColumn>Class</TableHeaderColumn>
            </TableRow>
        </TableHeader>

        <TableBody displayRowCheckbox={false}>
            {
                props.categories.map( (c) => (
                    <TableRow key={c.category}>
                        <TableRowColumn style={{whiteSpace:"normal"}}>{c.category}</TableRowColumn>
                        <TableRowColumn style={{whiteSpace:"normal"}}>
                            {
                                c.classes.map( (cls,index) => (
                                    <p style={{paddingTop: index == 0 ? 6 : 0, paddingBottom: 6}}  key={cls._id}>
                                        {
                                            cls.current ? (<a href={getClassLink(cls, props.student)}>{getClassName(cls)}</a>) : getClassName(cls)
                                        }
                                    </p>
                                ))
                            }
                        </TableRowColumn>
                    </TableRow>
                ))
            }
        </TableBody>
    </Table>
)


EdminForce.Components.Students = class extends RC.CSS {

    constructor(p) {
        super(p);

        // for RC.Select
        _.forEach(this.props.students, (c) => {
            c.value = c._id;
            c.label = c.name;
        })

        this.state = {
            selectedStudent: this.props.students.length > 0 ? this.props.students[0]._id : null
        }

        this.onStudentChanged = this.onStudentChanged.bind(this);
    }

    onStudentChanged(event) {
        this.setState({
            selectedStudent: event.target.value
        })
    }

    groupClassByCategory(classes) {
        let trials = [];
        let makeups = [];
        let sessions = [];
        classes.forEach( (c) => {
            if (c.type == 'makeup')
                makeups.push(c);
            else
            if (c.type == 'trial')
                trials.push(c);
            else {
                let session = _.find(sessions, {category: c.session.name});
                if (!session) {
                    session = {
                        category: c.session.name,
                        startDate: c.session.startDate,
                        classes: []
                    }
                    sessions.push(session);
                }
                session.classes.push(c);
            }
        })
        // sort session by startDate in ascendaing order
        sessions.sort( (a,b) => (a.startDate.getTime() - b.startDate.getTime()));
        if (trials.length > 0) {
            sessions.push({
                category: 'Trial Class',
                classes: trials
            })
        }
        if (makeups.length > 0) {
            sessions.push({
                category: 'Make up Class',
                classes: makeups
            })
        }

        return sessions;
    }

    render() {
        // group student class by category
        let currentClassesByCategory = [];
        let historyClassesByCategory = [];
        if (this.state.selectedStudent) {
            let student = _.find(this.props.students, {_id:this.state.selectedStudent});
            if (student) {
                student.currentClasses.forEach( (c) => {
                    c.current = (c.type == 'register');
                });
                currentClassesByCategory = this.groupClassByCategory(student.currentClasses);
                historyClassesByCategory = this.groupClassByCategory(student.completedClasses);
            }
        }

        return (
            <RC.Div>
                <RC.Div style={{borderBottom:"1px solid #e0e0e0", paddingBottom:8}}>
                    <h3 style={{"textAlign": "center"}}>Class Records</h3></RC.Div>
                    {EdminForce.utils.renderError(this.props.error)}
                    <RC.Select options={this.props.students}
                               style={{borderBottom:'none'}}
                               value={this.state.selectedStudent}
                               label="Select Student"
                               labelColor="brand1"
                               onChange={this.onStudentChanged}/>
                    <Tabs>
                        <Tab key="current" label="Current or upcoming classes" value="current">
                            <StudentClassTable categoryHeader="Category/session" categories={currentClassesByCategory} student={this.state.selectedStudent}></StudentClassTable>
                        </Tab>
                        <Tab key="history" label="History classes" value="history">
                            <StudentClassTable categoryHeader="Session" categories={historyClassesByCategory} student={this.state.selectedStudent}></StudentClassTable>
                        </Tab>
                    </Tabs>
            </RC.Div>
        );
    }
};
