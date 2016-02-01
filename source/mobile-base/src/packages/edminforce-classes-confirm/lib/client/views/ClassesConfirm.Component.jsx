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
    EdminForce.Components.ClassesConfirm = React.createClass({
        registerMore(){
            FlowRouter.go("/classes");
        },

        checkout(){
            let params = {
                cartId: "111"
            };
            let path = FlowRouter.path("/classes/:cartId/checkout", params);
            FlowRouter.go(path);
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
                        </TableBody>
                    </Table>

                    <RC.Button bgColor="brand2" bgColorHover="dark" onClick={this.registerMore}>Register More</RC.Button>
                    <RC.Button bgColor="brand2" bgColorHover="dark" onClick={this.checkout}>Check Out</RC.Button>
                </RC.Div>
            );
        }
    });

}