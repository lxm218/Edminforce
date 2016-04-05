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
        this.onChangeBirthday = this.onChangeBirthday.bind(this);
        this.changeGender = this.changeGender.bind(this);
    }

    onChangeBirthday(event) {
        let birthdayStr = event.target.value;
        let birthdayErrorText = "Please type correct birthday, mm/dd/yyyy";
        try {
            if (EdminForce.utils.isValidDate(birthdayStr)) {
                let birthday = new Date(birthdayStr);
                birthdayStr = moment(birthday).format("MM/DD/YYYY");
                birthdayErrorText = "";
            }
        } catch (e) {
        }
        
        this.editedStudent.birthday = birthdayStr;
        this.setState({
            studentVersion: this.state.studentVersion+1,
            birthdayErrorText
        });
    }

    changeGender(event, index, value){
        this.editedStudent.gender = value;
        this.setState({
            studentVersion: this.state.studentVersion+1
        });
    }

    onChange (event) {
        this.editedStudent[event.target.id] = event.target.value;
        this.setState({
            studentVersion: this.state.studentVersion+1
        });
    }
    
    onSave() {
        this.props.actions.upsertStudent({...this.props.student, ...this.editedStudent}, this.props.redirectUrl);
    }

    render() {
        let student = {...this.props.student, ...this.editedStudent};
        let isValid = student.name && student.gender && EdminForce.utils.isValidDate(student.birthday);
        
        return (
            <div>
                <RC.VerticalAlign center={true} className="padding" height="300px"></RC.VerticalAlign>
                {EdminForce.utils.renderError(this.props.error)}
                <div style={{padding: "20px"}}>
                    <TextField
                        id="name"
                        floatingLabelText="Student Name"
                        fullWidth={true}
                        value={student.name}
                        onChange={this.onChange} /><br/>
                    <SelectField
                        id="gender"
                        floatingLabelText="Gender"
                        fullWidth={true}
                        value={student.gender}
                        onChange={this.changeGender}>
                        <MenuItem value={"Male"} primaryText="Male"/>
                        <MenuItem value={"Female"} primaryText="Female"/>
                    </SelectField><br/>
                    <TextField
                        id="birthday"
                        floatingLabelText="Birthday"
                        hintText="mm/dd/yyyy"
                        fullWidth={true}
                        value={student.birthday}
                        onChange={this.onChangeBirthday}
                        errorText={this.state.birthdayErrorText}/><br/>
                    <TextField
                        id="school"
                        floatingLabelText="School"
                        fullWidth={true}
                        value={student.school}
                        onChange={this.onChange}/><br/>
                    <TextField
                        id="note"
                        floatingLabelText="Comments"
                        fullWidth={true}
                        value={student.note}
                        onChange={this.onChange}/><br/>
                </div>
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