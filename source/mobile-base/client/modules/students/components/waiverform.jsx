let {
    TextField,
    SelectField,
    MenuItem,
    RaisedButton,
    DatePicker   
} = MUI;

let _ = lodash;

EdminForce.Components.Waiverform = class extends RC.CSS {

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
        // validate signedDate
        let student = {...this.props.student, ...this.editedStudent};
        let validSignedDate = false;
        try {
            if (EdminForce.utils.isValidDate(student.signedDate)) {
                let signedDate = new Date(student.signedDate);
                student.signedDate = moment(signedDate).format("MM/DD/YYYY");
                validSignedDate = true;
            }
        } catch (e) {
        }

        if (!validSignedDate) {
            this.setState({
                    birthdayErrorText: "Please type correct signedDate, mm/dd/yyyy"
                });
            return;
        }

        this.props.actions.upsertStudent(student, this.props.redirectUrl);
    }

    render() {
        let student = {...this.props.student, ...this.editedStudent};
        let isValid = student.signedDate && student.signedBy;
        let waiverformLink = "waiverform/" + student._id ;
        
        return (
            <div>
                <RC.VerticalAlign center={true} className="padding" height="300px"></RC.VerticalAlign>
                {EdminForce.utils.renderError(this.props.error || this.state.birthdayErrorText)}
                <RC.Div style={{padding: "20px"}}>
                    <RC.Input style={{paddingLeft:6}} id="name" name="name" label="Student Name" value={student.name} disabled readonly />
                    <RC.Input style={{paddingLeft:6}} id="signedDate" name="signedDate" label="signedDate (mm/dd/yyyy)" value={student.signedDate} onChange={this.onChange} />
                    <RC.Input style={{paddingLeft:6}} id="signedBy" name="signedBy" label="signedBy" value={student.signedBy} onChange={this.onChange}/>
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
                <div>
                    <h2>Waver Form</h2>
                    <p><pre> ABCDEFG \n
                       ... \n
                       ... \n
                       ...
                    </pre></p>
                </div>
            </div>
        );
    }
};