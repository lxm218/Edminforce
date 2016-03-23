let {
    Table,
    TableHeaderColumn,
    TableRow,
    TableHeader,
    TableRowColumn,
    TableBody
    }=MUI;


EdminForce.Components.Account = class extends RC.CSSMeteorData
{
    constructor(p) {
        super(p);
        this.state = {
            bUpdateUsername: false
        }
    }

    getMeteorData()
    {

        let handler = null;

        //let programID =
        Tracker.autorun(function () {
            handler = Meteor.subscribe("EF-UserData");
        }.bind(this));

        let user = Meteor.user();
        let customer = EdminForce.Collections.Customer.find({
            _id: Meteor.userId()
        }).fetch();

        if (_.isArray(customer)) {
            customer = customer[0];
        }

        let students = EdminForce.Collections.student.find({
            accountID: Meteor.userId()
        }).fetch();

        console.log(customer);

        return {
            isReady: handler.ready(),
            user: user,
            students: students,
            customer: customer
        }
    }

    changeUsername()
    {
        this.setState({
            bUpdateUsername: true
        });
    }

    saveChangeUsername()
    {

        let username = this.refs.username.getValue();

        console.log(username);

        Meteor.call('UpdateUsername', Meteor.userId(), username, function (err, result) {
            if (err) {
                console.error(err);
            } else {
            }
        });

        this.setState({
            bUpdateUsername: false
        });
    }

    cancelChangeUsername()
    {
        this.setState({
            bUpdateUsername: false
        });
    }

    changePassword()
    {
        FlowRouter.go("/account/changepassword");
    }

    updatePhone()
    {
        FlowRouter.go("/account/updatephone");
    }

    addStudent()
    {
        FlowRouter.go("/account/addstudent");
    }

    updateStudent(studentID)
    {
        FlowRouter.go("/account/addstudent?studentID=" + studentID);
    }

    updateAlternateContact()
    {
        FlowRouter.go("/account/alternative");
    }

    updateEmergencyContact()
    {
        FlowRouter.go("/account/emergency");
    }


    render()
    {

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
                        <TableHeader style={{display: "none"}} displaySelectAll={false} enableSelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>Attribute</TableHeaderColumn>
                                <TableHeaderColumn>Value</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>Name</TableHeaderColumn>
                                <TableHeaderColumn>
                                        {this.state.bUpdateUsername ?
                                            <div>
                                                <RC.Input theme="inline" name="username" ref="username"
                                                    value={this.data.user.username}/>
                                                <RC.Button
                                                    theme="inline" bgColor="brand2" bgColorHover="dark"
                                                    onClick={this.saveChangeUsername.bind(this)}>Save</RC.Button>
                                                <RC.Button
                                                    theme="inline" bgColor="brand2" bgColorHover="dark"
                                                    onClick={this.cancelChangeUsername.bind(this)}>Cancel</RC.Button>
                                            </div> :
                                            <div>
                                                <span style={{paddingRight: "10px"}}>{this.data.user.username}</span>
                                                <RC.Button theme="inline"
                                                    bgColor="brand2"
                                                    bgColorHover="dark"
                                                    onClick={this.changeUsername.bind(this)}>Update</RC.Button>
                                            </div>}
                                </TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                <TableHeaderColumn>Email</TableHeaderColumn>
                                <TableHeaderColumn>{this.data.user.emails && this.data.user.emails[0] && this.data.user.emails[0].address}</TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                <TableHeaderColumn>Password</TableHeaderColumn>
                                <TableHeaderColumn>
                                    <span>******</span>
                                    <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                                        onClick={this.changePassword.bind(this)}>Update</RC.Button>
                                </TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                <TableHeaderColumn>Phone</TableHeaderColumn>
                                <TableHeaderColumn>
                                    <span>{this.data.customer && this.data.customer.phone}</span>
                                    <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                                        onClick={this.updatePhone.bind(this)}>Update</RC.Button>
                                </TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                <TableHeaderColumn>Students</TableHeaderColumn>
                                <TableHeaderColumn>
                                        {
                                        this.data.students && this.data.students.map(function (student, index) {
                                            return (
                                                <span key={student._id} className="account-person" onClick={this.updateStudent.bind(this, student._id)}>{student.name}</span>
                                            )
                                        }.bind(this))
                                            }
                                    <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                                        onClick={this.addStudent.bind(this)}>+</RC.Button>
                                </TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                <TableHeaderColumn>Alternative Contact</TableHeaderColumn>
                                <TableHeaderColumn>
                                        {this.data.customer && this.data.customer.alternativeContact && this.data.customer.alternativeContact.name ?
                                            <span
                                                className="account-person">{this.data.customer.alternativeContact.name}</span> : ""}
                                    <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                                        onClick={this.updateAlternateContact.bind(this)}>Update</RC.Button>
                                </TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                <TableHeaderColumn>Emergency Contact</TableHeaderColumn>
                                <TableHeaderColumn>
                                        {this.data.customer && this.data.customer.emergencyContact && this.data.customer.emergencyContact.name ?
                                            <span
                                                className="account-person">{this.data.customer.emergencyContact.name}</span> : ""}
                                    <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                                        onClick={this.updateEmergencyContact.bind(this)}>Update</RC.Button>
                                </TableHeaderColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </RC.Loading>

            </RC.Div>
        );
    }
};