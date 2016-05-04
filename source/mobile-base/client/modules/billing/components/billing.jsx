let {
    Tabs,
    Tab,
    Table,
    TableHeaderColumn,
    TableRow,
    TableHeader,
    TableRowColumn,
    TableBody
} = MUI;

let _ = lodash;


BillingOrderDetails = (props) => (
    <Table selectable={false}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false} enableSelectAll={false}>
            <TableRow>
                <TableHeaderColumn>Student</TableHeaderColumn>
                <TableHeaderColumn>Class</TableHeaderColumn>
                <TableHeaderColumn>Amount</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
            {
                [].concat(...props.students.map( (s) =>
                    s.classes.map( (sc) => (
                        <TableRow key={s._id + sc._id}>
                            <TableRowColumn>{s.name}</TableRowColumn>
                            <TableRowColumn>{sc.name}</TableRowColumn>
                            <TableRowColumn>${sc.classFee.toFixed(2)}</TableRowColumn>
                        </TableRow>
                    )))
                )
            }
            {
                props.registrationFee ? (
                    <TableRow key="_registrationfee_">
                        <TableRowColumn>Registration Fee</TableRowColumn>
                        <TableRowColumn></TableRowColumn>
                        <TableRowColumn>${props.registrationFee.toFixed(2)}</TableRowColumn>
                    </TableRow>
                ) : null
            }
            {
                props.discount ? (
                    <TableRow key="_discount_">
                        <TableRowColumn>Discount</TableRowColumn>
                        <TableRowColumn></TableRowColumn>
                        <TableRowColumn>-${props.discount.toFixed(2)}</TableRowColumn>
                    </TableRow>
                ) : null
            }
            {
                props.total ? (
                <TableRow key="_grandTotal_">
                    <TableRowColumn>Total</TableRowColumn>
                    <TableRowColumn></TableRowColumn>
                    <TableRowColumn>${(props.total - props.discount).toFixed(2)}</TableRowColumn>
                </TableRow>) : null
            }
        </TableBody>
    </Table>
)


BillingHistoryOrders = class extends RC.CSS {
    constructor(p) {
        super(p)
    }
    
    render () {
        return (
            <Table selectable={false}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false} enableSelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>Date</TableHeaderColumn>
                        <TableHeaderColumn>Amount</TableHeaderColumn>
                        <TableHeaderColumn>Status</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {
                        this.props.historyOrders.map( (order) => (
                            <TableRow>
                                <TableHeaderColumn>{moment(order.updateTime).format("MMM D, YYYY")}</TableHeaderColumn>
                                <TableHeaderColumn>{order.paymentTotal.toFixed(2)}</TableHeaderColumn>
                                <TableHeaderColumn>{order.status === 'success' ? 'Completed' : order.status}</TableHeaderColumn>
                            </TableRow>
                        ))
                    }
               </TableBody>
            </Table>
        )
    }
}

// EdminForce.Components.BillingOrder = class extends RC.CSS {
//     constructor(p) {
//         super(p)
//     }
//
//     render() {
//         let orderItems = [];
//
//         this.props.students.forEach((s) => {
//             s.classes.forEach((sc) => {
//                 orderItems.push((
//                     <TableRow key={s._id + sc._id}>
//                         <TableRowColumn>{s.name}</TableRowColumn>
//                         <TableRowColumn>{sc.name}</TableRowColumn>
//                         <TableRowColumn>${sc.classFee}</TableRowColumn>
//                     </TableRow>
//                 ));
//             })
//         });
//
//         this.props.registrationFee && orderItems.push((
//             <TableRow key="_registrationfee_">
//                 <TableRowColumn colSpan="2"><span style={col1Style}>Registration Fee</span></TableRowColumn>
//                 <TableRowColumn colSpan="2"><span
//                     style={col2Style}>${this.props.registrationFee}</span></TableRowColumn>
//             </TableRow>
//         ));
//
//         this.props.discount && orderItems.push((
//             <TableRow key="_discount_">
//                 <TableRowColumn>Discount</TableRowColumn>
//                 <TableRowColumn></TableRowColumn>
//                 <TableRowColumn>{"-$" + _.toString(this.props.discount)}</TableRowColumn>
//             </TableRow>
//         ));
//
//         orderItems.push((
//             <TableRow key="_grandTotal_">
//                 <TableRowColumn>Total</TableRowColumn>
//                 <TableRowColumn></TableRowColumn>
//                 <TableRowColumn>{"$" + _.toString(this.props.total - this.props.discount)}</TableRowColumn>
//             </TableRow>
//         ));
//
//         return (
//             <Table selectable={false}>
//                 <TableHeader adjustForCheckbox={false} displaySelectAll={false} enableSelectAll={false}>
//                     <TableRow>
//                         <TableHeaderColumn>Student</TableHeaderColumn>
//                         <TableHeaderColumn>Class</TableHeaderColumn>
//                         <TableHeaderColumn>Amount</TableHeaderColumn>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody displayRowCheckbox={false}>
//                     {orderItems}
//                 </TableBody>
//             </Table>
//         )
//     }
// }

EdminForce.Components.Billing = class extends RC.CSS {
    constructor(p) {
        super(p);
    }

    render() {
        return (
            <RC.Div style={{"padding": "20px"}}>
                <RC.VerticalAlign center={true} className="padding" height="300px" key="title" style={{marginBottom:20}}>
                    <h2>Billing & Payment</h2>
                </RC.VerticalAlign>
                <Tabs>
                    <Tab label="Current" value="current">
                        <BillingOrderDetails {...this.props.currentOrder}></BillingOrderDetails>
                    </Tab>
                    <Tab key="history" label="History" value="history">
                        <BillingHistoryOrders historyOrders={this.props.historyOrders}></BillingHistoryOrders>
                    </Tab>
                </Tabs>
            </RC.Div>
        )
    }
}
