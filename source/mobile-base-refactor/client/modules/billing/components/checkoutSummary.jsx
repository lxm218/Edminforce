EdminForce.Components.CheckoutSummary = class extends RC.CSS {
    constructor(p) {
        super(p);
    }

    render () {
        if (this.props.expiredRegistrations && this.props.expiredRegistrations.length > 0)
            return (
                <RC.Div>
                    <RC.VerticalAlign center={true} className="padding" height="300px">
                        <h2>The following registrations have expired</h2>
                    </RC.VerticalAlign>

                    <Table selectable={false}>
                        <TableHeader adjustForCheckbox={false} displaySelectAll={false} enableSelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>StudentName</TableHeaderColumn>
                                <TableHeaderColumn>ClassName</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {
                                this.props.expiredRegistrations.map((sc) => (
                                    <TableRow key={sc._id}>
                                        <TableRowColumn>{sc.studentName}</TableRowColumn>
                                        <TableRowColumn>{sc.className}</TableRowColumn>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </RC.Div>
            )

        return this.props.makeupOnly ?
            (
                <RC.Div style={{padding:"10px"}}>
                    <RC.VerticalAlign center={true} className="padding" height="300px">
                        <h2>Book Summary</h2>
                    </RC.VerticalAlign>
                    <RC.Div>
                        <p>You've booked a make up class successfully.</p>
                        <p>Contact us if you have more questions:</p>
                        <p>Email: <a href="mailto: calcoloracademy@gmail.com">calcoloracademy@gmail.com</a></p>
                        <p>Phone: 530-204-8869</p>
                    </RC.Div>
                </RC.Div>
            ) :
            (
                <RC.Div style={{padding: "20px"}}>
                    <p>
                        Thank for your registration. We have sent a confirmation email to you!
                    </p>

                    <p>
                        Please sign <a download="Waiver.pdf" href="/Waiver_and_Release_from_Liability.pdf"><b>New
                        Student Waiver Form</b></a> and hand it in before the first class. You don't need to re-sign
                        this form for returning student.
                    </p>
                </RC.Div>
            );
    }
}

// EdminForce.Components.CheckoutSummary = () => FlowRouter.getQueryParam("makeupOnly") === "true" ?
//     (
//         <RC.Div style={{padding:"10px"}}>
//             <RC.VerticalAlign center={true} className="padding" height="300px">
//                 <h2>Book Summary</h2>
//             </RC.VerticalAlign>
//             <RC.Div>
//                 <p>You've booked a make up class successfully.</p>
//                 <p>Contact us if you have more questions:</p>
//                 <p>Email: <a href="mailto: calcoloracademy@gmail.com">calcoloracademy@gmail.com</a></p>
//                 <p>Phone: 530-204-8869</p>
//             </RC.Div>
//         </RC.Div>
//     ) :
//     (
//         <RC.Div style={{padding: "20px"}}>
//             <p>
//                 Thank for your registration. We have sent a confirmation email to you!
//             </p>
//
//             <p>
//                 Please sign <a download="Waiver.pdf" href="/Waiver_and_Release_from_Liability.pdf"><b>New
//                 Student Waiver Form</b></a> and hand it in before the first class. You don't need to re-sign
//                 this form for returning student.
//             </p>
//         </RC.Div>
//     );
//