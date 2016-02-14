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
    EdminForce.Components.ClassesConfirm = class extends RC.CSSMeteorData {
        constructor(p) {
            super(p);

            this.cartID = new ReactiveVar(FlowRouter.getParam("cartId"));
            this.classID = new ReactiveVar(null);
            this.studentID = new ReactiveVar(null);

        }

        getMeteorData() {
            let handler = null;
            let ready = false;

            //let programID =
            Tracker.autorun(function () {
                handler = Meteor.subscribe("EF-Cart-Detail-By-ID", this.cartID.get(), this.classID.get(), this.studentID.get());
            }.bind(this));

            let cart = EdminForce.Collections.shoppingCart.find({
                _id: this.cartID.get()
            }).fetch();

            cart = cart && cart[0];

            this.classID.set(cart && cart.classID);
            this.studentID.set(cart && cart.studentID);

            let classData = EdminForce.Collections.class.find({
                _id: this.classID.get()
            }).fetch();

            let studentData = EdminForce.Collections.student.find({
                _id: this.studentID.get()
            }).fetch();

            console.log(handler.ready());

            // Temp solve, don't know why if book class from classes page, the handler.ready() always false
            if(studentData && studentData[0]){
                ready = true;
            }

            return {
                classData: classData && classData[0],
                studentData: studentData && studentData[0],
                isReady: ready
            }

        }

        registerMore() {
            FlowRouter.go("/classes");
        }

        checkout() {
            let path = FlowRouter.path("/carts/checkout");
            FlowRouter.go(path);
        }

        render() {

            //console.log(this.data.studentData.name);
            console.log(this.data.classData);

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

                    <RC.Loading isReady={this.data.isReady}>

                        <p>You booked this class for {this.data.studentData && this.data.studentData.name}</p>

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
                                    <TableRowColumn>{this.data.studentData && this.data.studentData.name}</TableRowColumn>
                                    <TableRowColumn>{this.data.classData && this.data.classData.name}</TableRowColumn>
                                    <TableRowColumn>{this.data.classData && this.data.classData.tuition.money}</TableRowColumn>
                                </TableRow>
                            </TableBody>
                        </Table>

                        <RC.Button bgColor="brand2" bgColorHover="dark" onClick={this.registerMore}>Register
                            More</RC.Button>
                        <RC.Button bgColor="brand2" bgColorHover="dark" onClick={this.checkout}>Check Out</RC.Button>
                    </RC.Loading>
                </RC.Div>
            );
        }
    };

}