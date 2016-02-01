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
    EdminForce.Components.ClassesCheckout = React.createClass({
        process(){
            FlowRouter.go("/payment");
        },

        render: function () {

            let style = {
                padding: '10px'
            };

            // Fill with your UI
            return (
                <RC.Div style={style}>
                    <RC.VerticalAlign center={true} className="padding" height="300px">
                        <h2>
                            Registration for Winter 2016
                        </h2>
                    </RC.VerticalAlign>

                    <p>You booked this class for Mick</p>

                    <Table selectable={false}>
                        <TableHeader displaySelectAll={false} enableSelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>Student</TableHeaderColumn>
                                <TableHeaderColumn>Class</TableHeaderColumn>
                                <TableHeaderColumn>Amount</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            <TableRow>
                                <TableRowColumn>Mick Zhao</TableRowColumn>
                                <TableRowColumn>Beginning</TableRowColumn>
                                <TableRowColumn>$240.00</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Allison Yu</TableRowColumn>
                                <TableRowColumn>Beginning</TableRowColumn>
                                <TableRowColumn>$240.00</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <RC.Checkbox name="use_school_credit" label="Use School Credit"/>
                    <RC.Input name="coupon" value="" label="Enter Coupon Code"/>

                    <RC.List>
                        <RC.Item title="Total" subtitle="$480.00"></RC.Item>
                    </RC.List>

                    <RC.Button bgColor="brand2" bgColorHover="dark" onClick={this.process}>Process Payment</RC.Button>
                </RC.Div>
            );
        }
    });

}