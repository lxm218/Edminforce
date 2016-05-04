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
                <TableHeaderColumn><p>Student</p></TableHeaderColumn>
                <TableHeaderColumn><p>Class</p></TableHeaderColumn>
                <TableHeaderColumn><p>Amount</p></TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
            {
                [].concat(...props.students.map( (s) =>
                    s.classes.map( (sc) => (
                        <TableRow key={s._id + sc._id}>
                            <TableRowColumn><p>{s.name}</p></TableRowColumn>
                            <TableRowColumn><p>{sc.name}</p></TableRowColumn>
                            <TableRowColumn><p>${sc.classFee.toFixed(2)}</p></TableRowColumn>
                        </TableRow>
                    )))
                )
            }
            {
                props.registrationFee ? (
                    <TableRow key="_registrationfee_">
                        <TableRowColumn><p>Registration Fee</p></TableRowColumn>
                        <TableRowColumn></TableRowColumn>
                        <TableRowColumn><p>${props.registrationFee.toFixed(2)}</p></TableRowColumn>
                    </TableRow>
                ) : null
            }
            {
                props.discount ? (
                    <TableRow key="_discount_">
                        <TableRowColumn><p>Discount</p></TableRowColumn>
                        <TableRowColumn></TableRowColumn>
                        <TableRowColumn><p>-${props.discount.toFixed(2)}</p></TableRowColumn>
                    </TableRow>
                ) : null
            }
            {
                props.total ? (
                <TableRow key="_grandTotal_">
                    <TableRowColumn><p>Total</p></TableRowColumn>
                    <TableRowColumn></TableRowColumn>
                    <TableRowColumn><p>${(props.total - props.discount).toFixed(2)}</p></TableRowColumn>
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
                        <TableHeaderColumn><p>Date</p></TableHeaderColumn>
                        <TableHeaderColumn><p>Amount</p></TableHeaderColumn>
                        <TableHeaderColumn><p>Status</p></TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {
                        this.props.historyOrders.map( (order) => (
                            <TableRow>
                                <TableRowColumn><p>{moment(order.updateTime).format("MMM D, YYYY")}</p></TableRowColumn>
                                <TableRowColumn><p>{order.paymentTotal.toFixed(2)}</p></TableRowColumn>
                                <TableRowColumn><p>{order.status === 'success' ? 'Completed' : order.status}</p></TableRowColumn>
                            </TableRow>
                        ))
                    }
               </TableBody>
            </Table>
        )
    }
}

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
