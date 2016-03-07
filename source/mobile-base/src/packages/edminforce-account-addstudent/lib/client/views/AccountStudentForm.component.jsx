{
    let {
        TextField,
        SelectField,
        MenuItem,
        RaisedButton,
        DatePicker
        } = MUI;

    let _ = lodash;

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.AccountAddStudentForm = class extends RC.CSS {

        constructor(p) {
            super(p);
            this.state = {
                name: "",
                accountID: Meteor.userId(),
                birthday:null,
                gender:"",
                status:"",
                school:"",
                note:""
            };
        }

        componentDidMount(){
            console.log(this.props.student);
            if(this.props.student){
                this.props.student.birthday = moment(this.props.student.profile.birthday).format("MM/DD/YYYY");
                this.props.student.gender = this.props.student.profile.gender;
                this.setState(this.props.student);
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
                        birthdayErrorText:"Please type correct birthday, mm/dd/yyyy"
                    });
                }else{
                    this.setState({
                        birthdayErrorText: "",
                        birthday: moment(birthday).format("MM/DD/YYYY")
                    });
                }

            }catch(e){
                this.setState({
                    birthdayErrorText:"Please type correct birthday, mm/dd/yyyy"
                });
            }
        }

        changeName(event){
            this.setState({
                name: event.target.value
            });
        }

        changeGender(event, index, value){
            this.setState({
                gender: value
            });
        }

        changeStatus(event, index, value){
            this.setState({
                status: value
            });
        }

        changeSchool(event){
            this.setState({
                school: event.target.value
            });
        }

        changeNote(event){
            this.setState({
                note : event.target.value
            });
        }

        validate(){
            console.log(this.state);
            if(this.state.name&&this.state.gender&&this.state.birthday&&this.state.status){
                return false;
            }

            return true;
        }

        getData(){
            return this.state;
        }

        render() {

            //console.log(this.state);
            this.props.update(this.validate());
            return (
                <div>
                    <RC.VerticalAlign center={true} className="padding" height="300px">
                    </RC.VerticalAlign>

                    <div style={{padding: "20px"}}>
                        <TextField
                            floatingLabelText="Student Name"
                            fullWidth={true}
                            value={this.state.name}
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
                            value={this.state.birthday}
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
                    </div>

                </div>

            );
        }
    };

}