/*
 * User account
 */

let {
    Table,
    TableHeaderColumn,
    TableRow,
    TableHeader,
    TableRowColumn,
    TableBody
    }=MUI;


EdminForce.Components.Account = class extends RC.CSS {
    constructor(p) {
        super(p);

        this.state = {
            bUpdateUsername: false
        }

        this.changeUsername = this.changeUsername.bind(this);
        this.saveChangeUsername = this.saveChangeUsername.bind(this);
        this.cancelChangeUsername = this.cancelChangeUsername.bind(this);
    }

    changeUsername() {
        this.setState({
            bUpdateUsername: true
        });
    }

    saveChangeUsername() {
        this.props.actions.updateUserName(this.refs.username.getValue());
        this.setState({
            bUpdateUsername: false
        });
    }

    cancelChangeUsername() {
        this.setState({
            bUpdateUsername: false
        });
    }

    changePassword() {
        FlowRouter.go("/account/changepassword");
    }

    updatePhone() {
        FlowRouter.go("/account/updatephone");
    }

    addStudent() {
        FlowRouter.go(FlowRouter.path('/student', null, {r:'/account'}));
    }

    updateStudent(studentID) {
        FlowRouter.go(FlowRouter.path('/student/:studentID', {studentID}, {r:'/account'}));
    }

    updateAlternateContact() {
        FlowRouter.go("/account/alternative");
    }

    updateEmergencyContact() {
        FlowRouter.go("/account/emergency");
    }

    render() {
        return (
            <RC.Div>
                <RC.VerticalAlign center={true} className="padding" height="300px">
                    <h1>
                    Account Settings
                    </h1>
                </RC.VerticalAlign>

                {EdminForce.utils.renderError(this.props.error)}

                <Table selectable={false} className="account-table">
                    <TableHeader style={{display: "none"}} displaySelectAll={false} enableSelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>Attribute</TableHeaderColumn>
                            <TableHeaderColumn>Value</TableHeaderColumn>
                            <TableHeaderColumn>Action</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>
                            {this.state.bUpdateUsername ?
                                (<div>
                                    <RC.Input theme="inline" name="username" ref="username" value={this.props.user.username}/>
                                </div>) :
                                (<div>
                                    <span style={{paddingRight: "10px"}}>{this.props.user.username}</span>
                                </div>)
                            }
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                            {this.state.bUpdateUsername ?
                                (<div>
                                    <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark" onClick={this.saveChangeUsername}>Save</RC.Button>
                                    <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark" onClick={this.cancelChangeUsername}>Cancel</RC.Button>
                                </div>) :
                                (<div>
                                    <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark" onClick={this.changeUsername}>Update</RC.Button>
                                </div>)
                            }
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn>Email</TableHeaderColumn>
                            <TableHeaderColumn>{this.props.user.emails && this.props.user.emails[0] && this.props.user.emails[0].address}</TableHeaderColumn>
                            <TableHeaderColumn/>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn>Password</TableHeaderColumn>
                            <TableHeaderColumn>
                                <span>******</span>
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark" onClick={this.changePassword}>Update</RC.Button>
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn>Phone</TableHeaderColumn>
                            <TableHeaderColumn>
                                <span>{this.props.customer && this.props.customer.phone}</span>
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark" onClick={this.updatePhone}>Update</RC.Button>
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn>Students</TableHeaderColumn>
                            <TableHeaderColumn>
                            {
                                this.props.students && this.props.students.map(function (student) {
                                    return <span key={student._id} className="account-person" onClick={this.updateStudent.bind(this, student._id)}>{student.name}</span>
                                }.bind(this))
                            }
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark" onClick={this.addStudent}>+</RC.Button>
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn>Alternative Contact</TableHeaderColumn>
                            <TableHeaderColumn>
                            {
                                this.props.customer &&
                                this.props.customer.alternativeContact &&
                                this.props.customer.alternativeContact.name ?
                                            <span className="account-person">{this.props.customer.alternativeContact.name}</span> : null
                            }
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark" onClick={this.updateAlternateContact}>Update</RC.Button>
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn>Emergency Contact</TableHeaderColumn>
                            <TableHeaderColumn>
                            {
                                this.props.customer &&
                                this.props.customer.emergencyContact &&
                                this.props.customer.emergencyContact.name ?
                                    <span className="account-person">{this.props.customer.emergencyContact.name}</span> : null
                            }
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark" onClick={this.updateEmergencyContact}>Update</RC.Button>
                            </TableHeaderColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </RC.Div>
        );
    }
}
;