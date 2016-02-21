{
    let {
        TextField,
        SelectField,
        MenuItem,
        RaisedButton,
        DatePicker
        } = MUI;

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.SettingsAddStudent = class extends RC.CSSMeteorData {

        constructor(p) {
            super(p);
            this.state = {
                errorTexts:{

                }
            }
        }

        getMeteorData() {

            let handler = null;

            let studentID = FlowRouter.getQueryParam("studentID");

            //let programID =
            Tracker.autorun(function () {
                handler = Meteor.subscribe("EF-UserData");
            }.bind(this));

            let student = EdminForce.Collections.student.find({
                _id: studentID
            }).fetch();

            return {
                isReady: handler.ready(),
                student: student
            }
        }

        changeBirthday(value) {
            console.log(value);
        }

        submitForm() {
            if (Session.get("BookTrialClassId")) {
                let params = {
                    programsId: Session.get("BookTrialProgramId"),
                    classId: Session.get("BookTrialClassId")
                }
                let path = FlowRouter.path("/programs/:programsId/:classId/confirm", params);
                FlowRouter.go(path);
                Session.set("BookTrialClassId", null);
                Session.set("BookTrialProgramId", null)
            } else {
                var student = {
                    name: "",
                    accountID: Meteor.userId(),
                    profile:{
                        birthday:null,
                        gender:""
                    },
                    status:"",
                    school:"",
                    note:""
                };

                if(this.refs.studentName.getValue()){
                    student.name =this.refs.studentName.getValue();
                    this.refs.studentName.setErrorText("");
                }else{
                    this.refs.studentName.setErrorText("Student name is required");
                }

                //if(this.refs.gender.value){
                //    student.profile.gender =this.refs.gender.value;
                //}else{
                //    this.refs.gender.setErrorText("Gender is required");
                //}
                //
                //if(this.refs.birthday.getValue()){
                //    student.profile.birthday =this.refs.birthday.getValue();
                //}else{
                //    this.refs.birthday.setErrorText("Birthday is required");
                //}
                //
                //if(this.refs.status.getValue()){
                //    student.status=this.refs.status.getValue();
                //}else{
                //    this.refs.status.setErrorText("Status is required");
                //}
                //
                //if(this.refs.school.getValue()){
                //    student.school=this.refs.school.getValue();
                //}else{
                //    //this.refs.school.setErrorText("School is required");
                //}
                //
                //if(this.refs.note.getValue()){
                //    student.note=this.refs.note.getValue();
                //}else{
                //    //this.refs.school.setErrorText("School is required");
                //}

                console.log(student);

                FlowRouter.go("/account");
            }
        }

        render() {

            let style = {
                padding: '10px'
            };

            // Fill with your UI
            return (
                <div>
                    <RC.VerticalAlign center={true} className="padding" height="300px">
                    </RC.VerticalAlign>

                    <div style={{padding: "20px"}}>
                        <TextField
                            floatingLabelText="Student Name"
                            fullWidth={true}
                            ref="studentName"

                            /><br/>
                        <SelectField
                            floatingLabelText="Gender"
                            value={"Male"}
                            fullWidth={true}
                            ref="gender"
                            >
                            <MenuItem value={"Male"} primaryText="Male"/>
                            <MenuItem value={"Female"} primaryText="Female"/>
                        </SelectField><br/>
                        <DatePicker
                            floatingLabelText="Birthday"
                            hintText="mm/dd/yyyy"
                            onChange={this.changeBirthday.bind(this)}
                            fullWidth={true}
                            ref="birthday"
                            />
                        <SelectField
                            floatingLabelText="Status"
                            value={"Active"}
                            fullWidth={true}
                            ref="status"
                            >
                            <MenuItem value={"Active"} primaryText="Active"/>
                            <MenuItem value={"Inactive"} primaryText="InActive"/>
                        </SelectField><br/>
                        <TextField
                            floatingLabelText="School"
                            fullWidth={true}
                            ref="school"
                            /><br/>
                        <TextField
                            floatingLabelText="Comments"
                            fullWidth={true}
                            ref="note"
                            /><br/>
                        <RaisedButton
                            label="Save"
                            primary={true}
                            fullWidth={true}
                            style={{marginTop:20}}
                            onMouseUp={this.submitForm.bind(this)}
                            onTouchEnd={this.submitForm.bind(this)}
                            />
                    </div>

                </div>

            );
        }
    };

}