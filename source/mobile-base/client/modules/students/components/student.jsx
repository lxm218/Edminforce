let {
    TextField,
    SelectField,
    MenuItem,
    RaisedButton,
    DatePicker   
} = MUI;

let _ = lodash;

EdminForce.Components.Student = class extends RC.CSS {

    constructor(p) {
        super(p);
        this.state = {
            studentVersion: 0,
            birthdayErrorText: ''
        };
        this.editedStudent = {}

        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onChange (event) {
        this.editedStudent[event.target.id] = event.target.value;
        this.setState({
            studentVersion: this.state.studentVersion+1,
            birthdayErrorText: ''
        });
    }
    
    onSave() {
        // validate birthday
        let student = {...this.props.student, ...this.editedStudent};
        let validBirthday = false;
        try {
            if (EdminForce.utils.isValidDate(student.birthday)) {
                let birthday = new Date(student.birthday);
                student.birthday = moment(birthday).format("MM/DD/YYYY");
                validBirthday = true;
            }
        } catch (e) {
        }

        if (!validBirthday) {
            this.setState({
                    birthdayErrorText: "Please type correct birthday, mm/dd/yyyy"
                });
            return;
        }

        this.props.actions.upsertStudent(student, this.props.redirectUrl);
    }

    render() {
        let student = {...this.props.student, ...this.editedStudent};
        let isValid = student.name && student.gender;
        
        return (
            <div>
                <RC.VerticalAlign center={true} className="padding" height="300px"></RC.VerticalAlign>
                {EdminForce.utils.renderError(this.props.error || this.state.birthdayErrorText)}
                <RC.Div style={{padding: "20px"}}>
                    <RC.Input style={{paddingLeft:6}} id="name" name="name" label="Student Name" value={student.name} onChange={this.onChange}/>
                    <RC.Select id="gender" name="gender" label="Gender" options={["", "Male","Female"]} value={student.gender} onChange={this.onChange}/>
                    <RC.Input style={{paddingLeft:6}} id="birthday" name="birthday" label="Birthday (mm/dd/yyyy)" value={student.birthday} onChange={this.onChange} />
                    <RC.Input style={{paddingLeft:6}} id="school" name="school" label="School" value={student.school} onChange={this.onChange}/>
                    <RC.Input style={{paddingLeft:6}} id="note" name="note" label="Comments" value={student.note} onChange={this.onChange}/>
                </RC.Div>
                <div style={{padding: "20px"}}>
                    <RaisedButton
                        label="Save"
                        primary={true}
                        fullWidth={true}
                        style={{marginTop:20}}
                        onTouchTap={this.onSave}
                        disabled = {!isValid} />
                </div>
            </div>
        );
    }
};