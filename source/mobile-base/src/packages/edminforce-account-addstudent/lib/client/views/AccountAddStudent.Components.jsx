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

            this.state = {
                status: "Active",
                gender: "Male",
                disabled: true
            };

            this.student = {
                name: "",
                accountID: Meteor.userId(),
                profile:{
                    birthday:null,
                    gender:"Male"
                },
                status:"Active",
                school:"",
                note:""
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

        changeBirthday(event, date) {
            //console.log(date);
            this.student.profile.birthday = date;
            this.setState({
                disabled:this.validate()
            })
        }

        changeName(event){
            this.student.name = event.target.value;
            this.setState({
                disabled:this.validate()
            })
        }

        changeGender(event, index, value){
            //console.log(arguments);
            this.setState({
                gender: value
            });
            this.student.profile.gender = value;
            this.setState({
                disabled:this.validate()
            })
        }

        changeStatus(event, index, value){
            //console.log(arguments);
            this.setState({
                status: value
            });
            this.student.status = value;
            this.setState({
                disabled:this.validate()
            })
        }

        changeSchool(event){
            this.student.school = event.target.value;
            this.setState({
                disabled:this.validate()
            })
        }

        changeNote(event){
            this.student.note = event.target.value;
            this.setState({
                disabled:this.validate()
            })
        }

        validate(){
            //console.log(this.student);
            if(this.student.name&&this.student.profile.gender&&this.student.profile.birthday&&this.student.status){
                return false;
            }

            return true;
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
                console.log(this.student);
                EdminForce.Collections.student.insert(this.student, function(err){
                    if(err){
                        alert("Add student error");
                    }else{
                        FlowRouter.go("/account");
                    }
                });
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
                            onChange={this.changeName.bind(this)}
                            ref="studentName"

                            /><br/>
                        <SelectField
                            floatingLabelText="Gender"
                            fullWidth={true}
                            ref="gender"
                            value={this.state.gender}
                            onChange={this.changeGender.bind(this)}
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
                            fullWidth={true}
                            value={this.state.status}
                            ref="status"
                            onChange={this.changeStatus.bind(this)}
                            >
                            <MenuItem value={"Active"} primaryText="Active"/>
                            <MenuItem value={"Inactive"} primaryText="InActive"/>
                        </SelectField><br/>
                        <TextField
                            floatingLabelText="School"
                            fullWidth={true}
                            ref="school"
                            onChange={this.changeSchool.bind(this)}
                            /><br/>
                        <TextField
                            floatingLabelText="Comments"
                            fullWidth={true}
                            ref="note"
                            onChange={this.changeNote.bind(this)}
                            /><br/>
                        <RaisedButton
                            label="Save"
                            primary={true}
                            fullWidth={true}
                            style={{marginTop:20}}
                            onMouseUp={this.submitForm.bind(this)}
                            onTouchEnd={this.submitForm.bind(this)}
                            disabled = {this.state.disabled}
                            />
                    </div>

                </div>

            );
        }
    };

}