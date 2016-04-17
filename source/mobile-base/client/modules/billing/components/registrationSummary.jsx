let {
    Table,
    TableHeaderColumn,
    TableRow,
    TableHeader,
    TableRowColumn,
    TableBody
}=MUI;

EdminForce.Components.RegistrationSummary = class extends RC.CSS {

    constructor(p) {
        super(p);

        this.registerMore = this.registerMore.bind(this);
        this.checkout = this.checkout.bind(this);
    }

    registerMore() {
        FlowRouter.go("/classes");
    }

    checkout() {
        let path = FlowRouter.path("/checkout");
        FlowRouter.go(path);
    }
    render() {
        let style = {
            padding: '10px'
        };
        
        let student = this.props.students[0] || {classes:[]}

        return (
            <RC.Div style={style} className="carts-detail">
                <RC.VerticalAlign center={true} className="padding" height="300px">
                    <h2>Registration Summary</h2>
                </RC.VerticalAlign>

                <RC.VerticalAlign center={true} className="padding">
                    <h4>{student.name}</h4>
                </RC.VerticalAlign>

                <Table selectable={false}>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false} enableSelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>Class</TableHeaderColumn>
                            <TableHeaderColumn>Amount</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {
                            student.classes.map((sc) => (
                                <TableRow key={sc._id}>
                                    <TableRowColumn>{sc.name}</TableRowColumn>
                                    <TableRowColumn>{'$' + sc.classFee}</TableRowColumn>
                                </TableRow>
                            ))
                        }
                        {
                            (student.classes.length > 0 && this.props.registrationFee > 0) ? (
                                <TableRow key="regFee">
                                    <TableRowColumn>Registration Fee:</TableRowColumn>
                                    <TableRowColumn>{'$' + this.props.registrationFee}</TableRowColumn>
                                </TableRow>
                            ) : null
                        }
                    </TableBody>
                </Table>

                <RC.Button bgColor="brand2" bgColorHover="dark" onClick={this.registerMore}>Register More</RC.Button>
                <RC.Button bgColor="brand2" bgColorHover="dark" onClick={this.checkout}>Check Out</RC.Button>
            </RC.Div>
        );
    }
};