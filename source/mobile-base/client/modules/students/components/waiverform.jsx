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
        let yesNo = <form><input type="radio" name="signed" value="Y"/> Yes <input type="radio" name="signed" value="N"/> No </form>
        
        return (
            <div>
                <div>
                    <h2>Waiver and Release from Liability/ Assumption of Risk</h2>
                    <p><span> 
                       I acknowledge, with my electronic signature, that I wish to participate in the activities conducted by CalColor Academy.<br/><br/>
CalColor Academy takes all possible precautions to reduce risk and provide safe, healthy, and enjoyable experiences. I acknowledge that risks from participation in activities exist. In consideration of my participation in the Activity, I knowingly and voluntarily assume ass risks arising therefrom, and on behalf of myself, my heirs and assignees release CalColor Academy, its officers, agents, employees and volunteers from any and all claims, liens, damages, lawsuits or liability for property damage, injury or death, resulting from, arising out of, or in any way connected with my participation in the Activity.<br/><br/>
I agree and acknowledge that this Waiver and Release From Liability/ Assumption of Risk shall apply even in the event that I suffer death, personal injury, or property damage as the result of negligent acts or omissions (other than sole, active negligence) on the part of CalColor Academy, its officers, agents, employees and volunteers. In the event that the individual participating in the Activity is a minor, I certify that I am his/her parent or legal guardian and I give my permission for him/her to participate in the Activity. I understand my signature is a legal and binding signature and will be considered original if signed electronically.<br/><br/>
Photographs: CalColor Academy is granted permission to use group or individual photographs or photo images taken during class for publicity or promotional purposes. I understand that the pictures taken will be used by CalColor Academy only and will not be distributed to other parties. <br /><br/>
                    </span></p>
                    {yesNo}
                </div>
                <RC.VerticalAlign center={true} className="padding" height="300px"></RC.VerticalAlign>
                {EdminForce.utils.renderError(this.props.error || this.state.birthdayErrorText)}
                <RC.Div style={{padding: "20px"}}>
                    <RC.Input style={{paddingLeft:6}} id="name" name="name" label="Student Name" value={student.name} disabled readonly />
                    <RC.Input style={{paddingLeft:6}} id="signedDate" name="signedDate" label="signedDate (mm/dd/yyyy)" value={student.signedDate} onChange={this.onChange} />
                    <RC.Input style={{paddingLeft:6}} id="signedBy" name="signedBy" label="signedBy(Parent/Guardian)" value={student.signedBy} onChange={this.onChange}/>
                </RC.Div>
                <div style={{padding: "20px"}}>
                    <RaisedButton
                        label="Submit"
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