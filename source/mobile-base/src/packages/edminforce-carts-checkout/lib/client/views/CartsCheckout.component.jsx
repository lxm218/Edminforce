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
    EdminForce.Components.CartsCheckout = class extends RC.CSSMeteorData {

        constructor(p) {
            super(p);

            this.total = 0;
        }

        getMeteorData() {

            let handler = null;

            //let programID =
            Tracker.autorun(function () {
                handler = Meteor.subscribe("EF-ShoppingCarts-Checkout");
            }.bind(this));

            let carts = EdminForce.Collections.classStudent.find({
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
            EdminForce.Collections.classStudent.remove({
                "_id": cart["_id"]
            }, function(err, res){
                this.data.isReady = true;
                if(err){
                    alert("Delete Fail!");
                }else{
                    console.log("[info]Delete successful");
                }
            }.bind(this));
        }

        //TODO Coupon
        //TODO School Credit

        process() {

            // when user click process
            // 1. Insert an order, and update the status of selected book classes
            // 2.1 Insert and update successful, jump to /payment?orderId=sfdsfsfdsfsf
            // 2.2 Insert and update fail, stay on this page, alert user
            console.group("Process")
            console.log(this.data.carts);
            console.log(this.total);
            console.groupEnd();

            let classStudentsID = [];
            this.data.carts.forEach((value, key)=>{
                classStudentsID.push(value['_id']);
            });

            let order = {
                accountID: Meteor.userId(),
                details:classStudentsID,
                status: "checkouting",
                amount:this.total
            };

            EdminForce.Collections.orders.insert(order, function(err, res){
                if(err){
                    console.error("Insert order error, error: ",err);
                    alert("Process fail!");
                    return
                }else{

                    let orderID = res;
                    if(!orderID){
                        alert("Process fail!");
                        return;
                    }

                    console.log("orderID = ", orderID);

                    FlowRouter.go("/payment?order="+orderID);

                    //let now = new Date();
                    //
                    //let classes = EdminForce.Collections.classStudent.find({
                    //    status: "pending",
                    //    "_id":{
                    //        $in: classStudentsID
                    //    }
                    //}).fetch()
                    //
                    //console.log(classes);

                    // update classStudent
                    //EdminForce.Collections.classStudent.update({
                    //    status: "pending",
                    //    "_id":{
                    //        $in: classStudentsID
                    //    }
                    //}, {
                    //    $set:{
                    //        status: "checkouting",
                    //        updateTime:now
                    //    }
                    //}, function(err, res){
                    //    // if update error, remove insert order
                    //    if(err){
                    //        EdminForce.Collections.orders.remove({
                    //            "_id": orderID
                    //        }, function(err, res){
                    //            // if still error,
                    //            if(err){
                    //                alert("Process fail!");
                    //                return;
                    //            }
                    //            alert("Process fail!");
                    //        })
                    //    }else{
                    //        // everything is correct, jump to payment page
                    //
                    //        FlowRouter.go("/payment?order="+orderID);
                    //    }
                    //});
                }
            });

        }

        render() {

            let style = {
                padding: '10px'
            };

            this.total = 0;
            let self = this;

            let cartItems = this.data.carts.map(function (item, index) {
                let classData = _.find(this.data.classes, {"_id": item.classID}) || {};
                let studentData = _.find(this.data.students, {"_id": item.studentID}) || {};
                let price = _.toNumber(classData.tuition.money);

                this.total += price;

                return (
                    <TableRow key={item['_id']}>
                        <TableRowColumn>{studentData.name}</TableRowColumn>
                        <TableRowColumn>{classData.name}</TableRowColumn>
                        <TableRowColumn>{price}</TableRowColumn>
                        <TableRowColumn><i className="fa fa-trash" style={{"fontSize": "18px", "cursor":"pointer"}} onClick={self.deleteCartItem.bind(self, item)}></i></TableRowColumn>
                    </TableRow>
                )
            }.bind(this));

            let processButtonStyle = {
            };

            let attributes = {

            };

            if(!this.data.carts||this.data.carts.length == 0){
                processButtonStyle = {
                    backgroundColor: "gray",
                    cursor:"not-allowed"
                };

                attributes.disabled= "disabled";
            }

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
                            <RC.Item title="Total" subtitle={_.toString(this.total)}></RC.Item>
                        </RC.List>

                        <RC.Button {... attributes} style={processButtonStyle} bgColor="brand2" bgColorHover="dark" onClick={this.process.bind(this)} >Process Payment</RC.Button>
                    </RC.Loading>
                </RC.Div>
            );
        }
    };

}