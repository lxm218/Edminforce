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
            this.cartIDs = FlowRouter.getParam("cartId");
            this.cartIDs = this.cartIDs.split(",");
        }

        getMeteorData() {
            return {
                isReady: Meteor.subscribe("EF-Cart-Detail-By-ID", this.cartIDs).ready() && Meteor.subscribe("EFCurrentCustomer").ready()
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
            // studentClass, student, class, session, customer, program
            let studentClasses = EdminForce.Collections.classStudent.find({_id:{$in:this.cartIDs}}).fetch();
            if (!studentClasses || studentClasses.length == 0) return null;

            _.forEach(studentClasses, (sc) => {
                let classData = EdminForce.Collections.class.find({_id:sc.classID}).fetch();
                classData = classData && classData[0];
                sc.class = classData;

                let session = EdminForce.Collections.session.find({_id:classData.sessionID}).fetch();
                sc.session = session && session[0];

                let program = EdminForce.Collections.program.find({_id:classData.programID}).fetch();
                sc.program = program && program[0];

                sc.classFee = EdminForce.Collections.class.calculateRegistrationFee(classData,session);
            })

            let student = EdminForce.Collections.student.find({_id:studentClasses[0].studentID}).fetch();
            student = student && student[0];

            let customer = EdminForce.Collections.Customer.find({_id:Meteor.userId()}).fetch();
            customer = customer && customer[0];

            return {
                studentClasses,
                studentData: student,
                registrationFee: (customer && !customer.hasRegistrationFee) ? 0 : 25
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

                    <RC.VerticalAlign center={true} className="padding">
                        <h4>{uiData.studentData.name}</h4>
                    </RC.VerticalAlign>

                    <RC.Loading isReady={this.data.isReady}>
                        <Table selectable={false}>
                            <TableHeader adjustForCheckbox={false} displaySelectAll={false} enableSelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>Class</TableHeaderColumn>
                                    <TableHeaderColumn>Amount</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                {
                                    uiData.studentClasses.map( (sc) => (
                                        <TableRow key={sc._id}>
                                            <TableRowColumn>{sc.program.name} {sc.session.name} {sc.class.schedule.day} {sc.class.schedule.time}</TableRowColumn>
                                            <TableRowColumn>{'$' + sc.classFee}</TableRowColumn>
                                        </TableRow>
                                    ))
                                }
                                {
                                    uiData.registrationFee > 0 && (
                                        <TableRow key="regFee">
                                            <TableRowColumn>Registration Fee:</TableRowColumn>
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
