let _ = lodash;
let {
    RadioButton,
    RadioButtonGroup
} = MUI;

EdminForce.Components.BookTrial = class extends RC.CSS {

    constructor(p) {
        super(p)
        this.state = {
            msg: null
        }

        this.classDateTime = parseInt(FlowRouter.getQueryParam("timestamp"));
        this.classDateTime = new Date(this.classDateTime);
        this.selectedStudent = null;

        this.registration = this.registration.bind(this);
        this.confirm = this.confirm.bind(this);
        this.selectStudent = this.selectStudent.bind(this);
        this.addStudent = this.addStudent.bind(this);
    }

    confirm() {
        if (!this.selectedStudent) {
            alert("Please select a student.");
            return;
        }

        let {
            classItem
        } = this.props.trialStudents;

        this.props.actions.bookTrial(this.selectedStudent._id, classItem._id, classItem.name, this.classDateTime);
    }

    registration() {
        FlowRouter.go("/classes");
    }

    selectStudent(event, studentId) {
        this.selectedStudent = _.find(this.props.trialStudents.students, {_id: studentId});
    }

    addStudent() {
        let redirectQueryParams = {
            r: '/bookTrial',
            classID: FlowRouter.getQueryParam("classID"),
            timestamp: FlowRouter.getQueryParam("timestamp")
        };

        FlowRouter.go(FlowRouter.path('/student', null, redirectQueryParams));
    }

    render() {
        let {
            classItem,
            program,
            students
        } = this.props.trialStudents;

        let studentItems = students.map((item, index) =>
            <RadioButton value={item._id}
                         key={item._id}
                         label={item.name}
                         style={index === students.length-1 ? {borderBottom:'none'}:null}
            />
        );

        let confirmButton = students.length === 0 ?
            null:
            (<RC.Button bgColor="brand2" onClick={this.confirm}>Confirm</RC.Button>);

        let errorMessage = students.length === 0 ?
            (<p className='font_8'>You don’t have any student eligible for the selected class. Please add new student or try another class.</p>):
            null;

        return (
            <RC.Div style={{padding:"10px"}}>
                {EdminForce.utils.renderError(this.props.error)}
                <RC.VerticalAlign center={true} className="padding" height="300px">
                    <h2>Trial Class Booking</h2>
                </RC.VerticalAlign>
                <RC.List>
                    <RC.Item>{errorMessage}</RC.Item>
                    <RC.Item title="Student">
                        <RadioButtonGroup name="selectStudent" onChange={this.selectStudent}>
                            {studentItems}
                        </RadioButtonGroup>
                        {students.length === 0 ?
                            <RC.Button bgColor="brand2" key='_add_button_' theme="inline"
                                       onClick={this.addStudent}>Add</RC.Button> : null}
                    </RC.Item>
                    <RC.Item title="Selected Class">
                        {program.name}
                    </RC.Item>
                    <RC.Item title="Selected Date">
                        {moment(this.classDateTime).format("dddd, MMMM Do YYYY, h:mm a")}
                    </RC.Item>
                </RC.List>
                {confirmButton}
            </RC.Div>
        );
    }
};
