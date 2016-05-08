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
        this.state = {
            orderDetail: null
        }
        this.onTableCellClick = this.onTableCellClick.bind(this);
        this.backToOrderList = this.backToOrderList.bind(this);
    }

    onTableCellClick(rowIndex, columnIndex) {
        let orderId = this.props.historyOrders[rowIndex]._id;
        this.props.actions.getHistoryOrderDetails(orderId, (err,result) =>{
            !err && this.setState({
                orderDetail: result
            })
        });
    }

    backToOrderList() {
        this.setState({
            orderDetail: null
        })
    }

    render () {
        if (this.state.orderDetail) {
            return (
                <RC.Div>
                    <BillingOrderDetails {...this.state.orderDetail}></BillingOrderDetails>
                    <RC.Button bgColor="brand2" bgColorHover="dark" onClick={this.backToOrderList}>Back to order list</RC.Button>
                </RC.Div>
            )
        }

        return (
            <Table selectable={false} onCellClick={this.onTableCellClick}>
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
                                <TableRowColumn>{moment(order.updateTime).format("MMM D, YYYY")}</TableRowColumn>
                                <TableRowColumn>{order.paymentTotal.toFixed(2)}</TableRowColumn>
                                <TableRowColumn>{order.status === 'success' ? 'Completed' : order.status}</TableRowColumn>
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

    checkout() {
        FlowRouter.go("/checkout");
    }

    render() {
        let hasCurrentOrders = _.find(this.props.currentOrder.students, (s) => s.classes && s.classes.length > 0);
        return (
            <RC.Div style={{"padding": "20px"}} className="carts-checkout">
                <RC.VerticalAlign center={true} className="padding" height="300px" key="title" style={{marginBottom:20}}>
                    <h2>Billing & Payment</h2>
                    {EdminForce.utils.renderError(this.props.error)}
                </RC.VerticalAlign>
                <Tabs>
                    <Tab label="Current" value="current">
                        {hasCurrentOrders ? (<BillingOrderDetails {...this.props.currentOrder}></BillingOrderDetails>) : (<RC.Div><p style={{textAlign:'center'}}>No current billing information</p></RC.Div>)}
                        {hasCurrentOrders ? (<RC.Button bgColor="brand2" bgColorHover="dark" onClick={this.checkout}>Pay Now</RC.Button>) : null}
                    </Tab>
                    <Tab key="history" label="History" value="history">
                        {
                            this.props.historyOrders && this.props.historyOrders.length > 0 ?
                                (<BillingHistoryOrders historyOrders={this.props.historyOrders} actions={this.props.actions}></BillingHistoryOrders>) :
                                (<RC.Div><p style={{textAlign:'center'}}>No history billing information</p></RC.Div>)
                        }
                    </Tab>
                </Tabs>
            </RC.Div>
        )
    }
}
