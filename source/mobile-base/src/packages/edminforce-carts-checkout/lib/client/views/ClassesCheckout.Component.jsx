{

    let {
        Table,
        TableHeaderColumn,
        TableRow,
        TableHeader,
        TableRowColumn,
        TableBody
        }=MUI;

    let _ = lodash;

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.ClassesCheckout = class extends RC.CSSMeteorData {

        constructor(p) {
            super(p);
        }

        getMeteorData() {

            let handler = null;

            //let programID =
            Tracker.autorun(function () {
                handler = Meteor.subscribe("EF-ShoppingCarts-Checkout");
            }.bind(this));

            let carts = EdminForce.Collections.shoppingCart.find({
                status: "pending"
            }, {
                sort: {
                    studentID: -1
                }
            }).fetch();

            let classes = EdminForce.Collections.class.find({}).fetch();

            let students = EdminForce.Collections.student.find({}).fetch();

            let filteredClasses = [], filteredStudents = [];
            for (let i = 0; i < carts.length; i++) {
                for (let j = 0; j < classes.length; j++) {
                    if (classes[j]["_id"] == carts[i].classID) {
                        filteredClasses.push(classes[j]);
                        break;
                    }
                }
            }

            let needClasses = [];
            for (let i = 0; i < carts.length; i++) {
                for (let j = 0; j < students.length; j++) {
                    if (students[j]["_id"] == carts[i].studentID) {
                        filteredStudents.push(students[j]);
                        break;
                    }
                }
            }

            return {
                isReady: true,
                carts: carts,
                students: filteredStudents,
                classes: filteredClasses
            }
        }

        deleteCartItem(cart) {
            console.log(cart)
            this.data.isReady = false;
            EdminForce.Collections.shoppingCart.remove({
                "_id": cart["_id"]
            }, function(err, res){
                this.data.isReady = true;
                if(err){
                    alert("Delete Fail!");
                }else{
                    EdminForce.Collections.classStudent.remove({
                        "_id": cart["classStudentID"]
                    }, function(err, res){
                        console.log("[Info]delete successful");
                    });
                }
            }.bind(this));
        }

        process() {
            FlowRouter.go("/payment");
        }

        render() {

            let style = {
                padding: '10px'
            };

            let total = 0;
            let self = this;

            let cartItems = this.data.carts.map(function (item, index) {
                let classData = _.find(this.data.classes, {"_id": item.classID}) || {};
                let studentData = _.find(this.data.students, {"_id": item.studentID}) || {};
                let price = _.toNumber(classData.tuition.money);

                total += price;

                return (
                    <TableRow key={item['_id']}>
                        <TableRowColumn>{studentData.name}</TableRowColumn>
                        <TableRowColumn>{classData.name}</TableRowColumn>
                        <TableRowColumn>{price}</TableRowColumn>
                        <TableRowColumn><i className="fa fa-trash" style={{"fontSize": "18px", "cursor":"pointer"}} onClick={self.deleteCartItem.bind(self, item)}></i></TableRowColumn>
                    </TableRow>
                )
            }.bind(this));

            // Fill with your UI
            return (
                <RC.Div style={style}>
                    <RC.VerticalAlign center={true} className="padding" height="300px">
                        <h2>
                            Registration for Winter 2016
                        </h2>
                    </RC.VerticalAlign>

                    <p>You booked classes</p>

                    <RC.Loading isReady={this.data.isReady}>
                        <Table selectable={false}>
                            <TableHeader displaySelectAll={false} enableSelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>Student</TableHeaderColumn>
                                    <TableHeaderColumn>Class</TableHeaderColumn>
                                    <TableHeaderColumn>Amount</TableHeaderColumn>
                                    <TableHeaderColumn></TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                {cartItems}
                            </TableBody>
                        </Table>

                        <RC.Checkbox name="use_school_credit" label="Use School Credit"/>
                        <RC.Input name="coupon" value="" label="Enter Coupon Code"/>

                        <RC.List>
                            <RC.Item title="Total" subtitle={_.toString(total)}></RC.Item>
                        </RC.List>

                        <RC.Button bgColor="brand2" bgColorHover="dark" onClick={this.process}>Process
                            Payment</RC.Button>
                    </RC.Loading>
                </RC.Div>
            );
        }
    };

}