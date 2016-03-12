{

    let {
        Table,
        TableHeaderColumn,
        TableRow,
        TableHeader,
        TableRowColumn,
        TableBody
        }=MUI;

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.CartsDetail = class extends RC.CSSMeteorData {
        constructor(p) {
            super(p);
            this.cartID = FlowRouter.getParam("cartId");
        }

        getMeteorData() {
            return {
                isReady: Meteor.subscribe("EF-Cart-Detail-By-ID", this.cartID).ready() && Meteor.subscribe("EFCurrentCustomer").ready()
            }
        }

        registerMore() {
            FlowRouter.go("/classes");
        }

        checkout() {
            let path = FlowRouter.path("/carts/checkout");
            FlowRouter.go(path);
        }

        getUIData() {
            // the two subscriptions return data from the following mongo collections:
            // studentClass, student, class, session, customer, orders
            let studentClass = EdminForce.Collections.classStudent.find({_id:this.cartID}).fetch();
            studentClass = studentClass && studentClass[0];
            if (!studentClass) return null;

            let classData = EdminForce.Collections.class.find({_id:studentClass.classID}).fetch();
            classData = classData && classData[0];
            if (!classData) return null;

            let session = EdminForce.Collections.session.find({_id:classData.sessionID}).fetch();
            session = session && session[0];
            if (!session) return null;
            classData.session = session;

            let program = EdminForce.Collections.program.find({_id:classData.programID}).fetch();
            program = program && program[0];
            if (!program) return null;
            classData.program = program;

            let student = EdminForce.Collections.student.find({_id:studentClass.studentID}).fetch();
            student = student && student[0];

            let customer = EdminForce.Collections.Customer.find({_id:Meteor.userId()}).fetch();
            customer = customer && customer[0];

            return {
                classData,
                studentData: student,
                registrationFee: (customer && !customer.hasRegistrationFee) ? 0 : 25,
                classFee: EdminForce.Collections.class.calculateRegistrationFee(classData,session)
            }
        }

        render() {
            if (!this.data.isReady)
                return (
                    <RC.Loading isReady={this.data.isReady}></RC.Loading>
                )

            let uiData = this.getUIData();
            if (!uiData)
                return (
                    <div>An error has occurred</div>
                )


            let style = {
                padding: '10px'
            };

            // Fill with your UI
            return (
                <RC.Div style={style} className="carts-detail">
                    <RC.VerticalAlign center={true} className="padding" height="300px">
                        <h2>
                            Registration Summary
                        </h2>
                    </RC.VerticalAlign>

                    <RC.Loading isReady={this.data.isReady}>

                      

                        <Table selectable={false}>
                            <TableHeader adjustForCheckbox={false} displaySelectAll={false} enableSelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>Student</TableHeaderColumn>
                                    <TableHeaderColumn>Class</TableHeaderColumn>
                                    <TableHeaderColumn>Amount</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                <TableRow>
                                    <TableRowColumn>{uiData.studentData && uiData.studentData.name}</TableRowColumn>
                                    <TableRowColumn>{uiData.classData.program.name} {uiData.classData.session.name} {uiData.classData.schedule && uiData.classData.schedule.day} {uiData.classData.schedule && uiData.classData.schedule.time}</TableRowColumn>
                                    <TableRowColumn>{'$' + uiData.classFee}</TableRowColumn>
                                </TableRow>
                                {
                                    uiData.registrationFee > 0 && (
                                        <TableRow>
                                            <TableRowColumn colSpan="2">Registration Fee:</TableRowColumn>
                                            <TableRowColumn>{'$' + uiData.registrationFee}</TableRowColumn>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>

                        <RC.Button bgColor="brand2" bgColorHover="dark" onClick={this.registerMore}>Register More</RC.Button>
                        <RC.Button bgColor="brand2" bgColorHover="dark" onClick={this.checkout}>Check Out</RC.Button>
                    </RC.Loading>
                </RC.Div>
            );
        }
    };

}
