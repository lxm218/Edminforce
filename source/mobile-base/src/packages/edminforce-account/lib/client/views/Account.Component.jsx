{
    let {
        Table,
        TableHeaderColumn,
        TableRow,
        TableHeader,
        TableRowColumn,
        TableBody
        }=MUI;

    let _ = lodash;

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.Account = class extends RC.CSSMeteorData {

        constructor(p) {
            super(p);
        }

        getMeteorData() {

            let handler = null;

            //let programID =
            Tracker.autorun(function () {
                handler = Meteor.subscribe("EF-UserData");
            }.bind(this));

            let user = Meteor.user();

            let students = EdminForce.Collections.student.find({
                accountID: Meteor.userId()
            }).fetch();

            return {
                isReady: handler.ready(),
                user: user,
                students: students
            }
        }

        changePassword() {
            FlowRouter.go("/account/changepassword");
        }

        updatePhone() {
            FlowRouter.go("/account/updatephone");
        }

        addStudent() {
            FlowRouter.go("/account/addstudent");
        }

        updateAlternateContact() {
            FlowRouter.go("/account/alternative");
        }

        updateEmergencyContact() {
            FlowRouter.go("/account/emergency");
        }


        render() {

            // Fill with your UI
            return (
                <RC.Div>

                    <RC.VerticalAlign center={true} className="padding" height="300px">
                        <h1>
                            Account Settings
                        </h1>
                    </RC.VerticalAlign>

                    <RC.Loading isReady={this.data.isReady}>
                        <Table selectable={false} className="account-table">
                            <TableHeader style={{display:"none"}} displaySelectAll={false} enableSelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>Attribute</TableHeaderColumn>
                                    <TableHeaderColumn>Value</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                <TableRow>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                    <TableHeaderColumn>{this.data.user.username}</TableHeaderColumn>
                                </TableRow>
                                <TableRow>
                                    <TableHeaderColumn>Email</TableHeaderColumn>
                                    <TableHeaderColumn>{this.data.user.emails && this.data.user.emails[0] && this.data.user.emails[0].address}</TableHeaderColumn>
                                </TableRow>
                                <TableRow>
                                    <TableHeaderColumn>Password</TableHeaderColumn>
                                    <TableHeaderColumn>
                                        <span>******</span>
                                        <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark" onClick={this.changePassword.bind(this)}>Update</RC.Button>
                                    </TableHeaderColumn>
                                </TableRow>
                                <TableRow>
                                    <TableHeaderColumn>Phone</TableHeaderColumn>
                                    <TableHeaderColumn>
                                        <span>{this.data.user&&this.data.user.profile&&this.data.user.profile.phone}</span>
                                        <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark" onClick={this.updatePhone.bind(this)}>Update</RC.Button>
                                    </TableHeaderColumn>
                                </TableRow>
                                <TableRow>
                                    <TableHeaderColumn>Students</TableHeaderColumn>
                                    <TableHeaderColumn>
                                        {
                                            this.data.students&&this.data.students.map(function(student, index){
                                                return (
                                                    <span className="account-person">{student.name}</span>
                                                )
                                            })
                                        }
                                        <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark" onClick={this.addStudent.bind(this)}>+</RC.Button>
                                    </TableHeaderColumn>
                                </TableRow>
                                <TableRow>
                                    <TableHeaderColumn>Alternative Contact</TableHeaderColumn>
                                    <TableHeaderColumn>
                                        <span className="account-person">{this.data.user&&this.data.user.alterContact&&this.data.user.alterContact.name}</span>
                                        <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark" onClick={this.updateAlternateContact.bind(this)}>Update</RC.Button>
                                    </TableHeaderColumn>
                                </TableRow>
                                <TableRow>
                                    <TableHeaderColumn>Emergency Contact</TableHeaderColumn>
                                    <TableHeaderColumn>
                                        <span className="account-person">{this.data.user&&this.data.user.emergencyContact&&this.data.user.emergencyContact.name}</span>
                                        <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark" onClick={this.updateEmergencyContact.bind(this)}>Update</RC.Button>
                                    </TableHeaderColumn>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </RC.Loading>

                </RC.Div>
            );
        }
    };

}