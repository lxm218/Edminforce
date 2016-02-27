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
                status: "",
                gender: "",
                disabled: true
            };

            this.student = {
                name: "",
                accountID: Meteor.userId(),
                profile:{
                    birthday:null,
                    gender:""
                },
                status:"",
                school:"",
                note:""
            }
            console.log("add student");
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

        changeBirthday(event) {
            let birthdayStr = event.target.value;
            //console.log(birthdayStr);
            try{
                let birthday = new Date(birthdayStr);
                let regex = /^\s*[0,1]{0,1}[0-9]\/[0,1,2,3]{0,1}[0-9]\/[1,2][0,9][0-9]{2}\s*$/;
                if(!regex.test(birthdayStr) || birthday.toString() == "Invalid Date"){
                    this.setState({
                        disabled:this.validate(),
                        birthdayErrorText:"Please type correct birthday, mm/dd/yyyy"
                    })
                }else{
                    this.student.profile.birthday = birthday;
                    this.setState({
                        disabled:this.validate(),
                        birthdayErrorText:""
                    })
                }

            }catch(e){
                this.setState({
                    disabled:this.validate(),
                    birthdayErrorText:"Please type correct birthday, mm/dd/yyyy"
                })
            }
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

                EdminForce.Collections.student.insert(this.student, function(err){
                    if(err){
                        alert("Add student error");
                    }else{
                        let params = {
                            programID: Session.get("BookTrialProgramId"),
                            classID: Session.get("BookTrialClassId"),
                            timestamp: Session.get("BookTrialTimestamp")
                        }
                        let path = FlowRouter.path('/programs/:programID/:classID/:timestamp', params);
                        FlowRouter.go(path);
                        Session.set("BookTrialClassId", null);
                        Session.set("BookTrialProgramId", null);
                        Session.set("BookTrialTimestamp", null);
                    }
                });

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

                        <TextField
                            floatingLabelText="Birthday"
                            hintText="mm/dd/yyyy"
                            fullWidth={true}
                            onChange={this.changeBirthday.bind(this)}
                            ref="birthday"
                            errorText={this.state.birthdayErrorText}
                        /><br/>

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