{
    let {
        TextField,
        SelectField,
        MenuItem,
        RaisedButton,
        DatePicker
        } = MUI;
    let AccountAddStudentForm = EdminForce.Components.AccountAddStudentForm;

    let _ = lodash;

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.SettingsAddStudent = class extends RC.CSSMeteorData {

        constructor(p) {
            super(p);
            this.state = {
                disabled: true
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

            if(_.isArray(student)){
                student = student[0];
            }

            return {
                isReady: handler.ready(),
                student: student
            }
        }

        update(value){
            console.log("update: ", value)
            this.setState({
                disabled: value
            });
        }

        submitForm() {
            let data = this.refs.studentForm.getData();
            let student = {
                name: data.name,
                accountID: Meteor.userId(),
                profile:{
                    gender:data.gender,
                    birthday:new Date(data.birthday)
                },
                school:data.school,
                note:data.note
            };

            let studentID = FlowRouter.getQueryParam("studentID");
            if(studentID){
                EdminForce.Collections.student.update({_id: studentID},{$set:student}, function(err){
                    if(err){
                        alert("Add student error");
                    }else{
                        if (Session.get("BookTrialClassId")){
                            let params = {
                                programID: Session.get("BookTrialProgramId"),
                                classID: Session.get("BookTrialClassId"),
                                timestamp: Session.get("BookTrialTimestamp")
                            };
                            let path = FlowRouter.path('/programs/:programID/:classID/:timestamp', params);
                            FlowRouter.go(path);
                            Session.set("BookTrialClassId", null);
                            Session.set("BookTrialProgramId", null);
                            Session.set("BookTrialTimestamp", null);
                        }else{
                            FlowRouter.go("/account");
                        }
                    }
                });
            }else{
                student.status = 'Active';
                EdminForce.Collections.student.insert(student, function(err){
                    if(err){
                        alert("Add student error");
                    }else{
                        if (Session.get("BookTrialClassId")){
                            let params = {
                                programID: Session.get("BookTrialProgramId"),
                                classID: Session.get("BookTrialClassId"),
                                timestamp: Session.get("BookTrialTimestamp")
                            };
                            let path = FlowRouter.path('/programs/:programID/:classID/:timestamp', params);
                            FlowRouter.go(path);
                            Session.set("BookTrialClassId", null);
                            Session.set("BookTrialProgramId", null);
                            Session.set("BookTrialTimestamp", null);
                        }else{
                            FlowRouter.go("/account");
                        }
                    }
                });
            }
        }

        render() {

            return (
                <div>
                    <RC.VerticalAlign center={true} className="padding" height="300px">
                    </RC.VerticalAlign>

                    <div style={{padding: "20px"}}>

                        <AccountAddStudentForm student={this.data.student} ref="studentForm" update={this.update.bind(this)}></AccountAddStudentForm>

                        <RaisedButton
                            label="Save"
                            primary={true}
                            fullWidth={true}
                            style={{marginTop:20}}
                            onTouchTap={this.submitForm.bind(this)}
                            disabled = {this.state.disabled}
                        />
                    </div>

                </div>

            );
        }
    };

}