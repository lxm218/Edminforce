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

            // This is the amount before apply coupon
            this.originalAmount = 0;
            // This is the amount after apply coupon
            this.total = 0;
            // How much discount when apply coupon
            this.discount = 0;

            this.coupon = null;

            //
            this.hasMakeupClass = false;

            this.makeupOnly = true;

            this.state = {
                refresh: new Date().getTime()
            }

        }

        getMeteorData() {
            let ready = Meteor.subscribe("EF-ShoppingCarts-Checkout").ready() && Meteor.subscribe("EFCurrentCustomer").ready();
            let data = {
                isReady:ready
            }
            return ready ? _.merge(data, this.getUIData()) : data;
        }

        getUIData() {
            let carts = EdminForce.Collections.classStudent.find({
                accountID: Meteor.userId(),
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
                        let session = EdminForce.Collections.session.find({_id:classes[j].sessionID}).fetch();
                        classes[j].session = session && session[0];
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

            let orderCount = EdminForce.Collections.orders.find({accountID:Meteor.userId(),status:'success'}).count();

            let programs = EdminForce.Collections.program.find({}).fetch();
            let sessions = EdminForce.Collections.session.find({}).fetch();

            return {
                carts: carts,
                students: filteredStudents,
                classes: filteredClasses,
                isNewUser: orderCount == 0,
                programs,
                sessions
            }
        }

        deleteCartItem(cart) {
            console.log(cart)
            this.data.isReady = false;
            EdminForce.Collections.classStudent.remove({
                "_id": cart["_id"]
            }, function (err, res) {
                this.data.isReady = true;
                if (err) {
                    alert("Delete Fail!");
                } else {
                    console.log("[info]Delete successful");
                }
            }.bind(this));
        }

        isNewUser(){
            return this.data.isNewUser;
        }

        //TODO Coupon
        applyCoupon() {

            let couponId = this.refs.counponInput.getValue();

            if (!couponId) {
                alert("Please input coupon!");
                return;
            }

            Meteor.call("GetCouponInfoByID", couponId, function (err, result) {
                console.log(result);
                if (err) {
                    alert("Cannot verify this coupon, please make sure you typed correct coupon");
                } else {
                    let coupon = result && result[0];

                    if (!coupon) {
                        alert("Cannot verify this coupon, please make sure you typed correct coupon");
                        return;
                    }

                    let bValidCoupon = true;

                    //===========verify coupon=============

                    //===========================
                    // TODO [Coupon in make up class+registered class] when checkout has make up class, registered class, how to verify and apply coupon
                    // This is temp step
                    // When user has make up class, then cannot use coupon
                    //===========================
                    if (this.hasMakeupClass) {
                        bValidCoupon = false;
                        alert("This coupon cannot use together with make up class.");
                        return;
                    }

                    //===========================
                    // step 1, in valid time
                    //===========================
                    let couponStartTime = coupon.startDate && coupon.startDate.getTime() || 0;
                    let couponEndTime = coupon.endDate && coupon.endDate.getTime() || new Date('2200/1/1').getTime();
                    let currentTime = new Date().getTime();

                    // current time is not in the start and end range
                    if (currentTime < couponStartTime || currentTime > couponEndTime) {
                        bValidCoupon = false;
                        alert("This coupon isn't in valid time");
                        return;
                    }

                    //===========================
                    // step 2, verify whether this coupon is valid for new user
                    //===========================
                    // 1. check whether this user booked class before
                    // booked class means:
                    // a. type: register
                    // b. status: checkouted
                    let bNoneBooked = this.isNewUser();

                    // coupon not valid for none booked user, but currently user is none booked
                    if (!coupon.validForNoBooked && bNoneBooked) {
                        bValidCoupon = false;
                        alert("This coupon only for the user who booked class before!");
                        return;
                    }

                    //===========================
                    // step 3, Check whether currently amount is bigger than or equal Minimum Transaction Amount
                    //===========================
                    // Get the minimum transaction amount
                    if (Number(coupon.overRequire) && this.total < Number(coupon.overRequire)) {
                        bValidCoupon = false;
                        alert("This coupon only valid when you buy more than " + coupon.overRequire);
                        return;
                    }

                    //===========================
                    // step 4, make sure user use it less or equal to Maximum usage per account
                    //===========================
                    // Get this coupon used information
                    // currently, except 'expired', other we assume this coupon is used. So this means if a coupon is 'checkouting', we also think it is used. After pay successful, then it will change to 'checkouted', otherwise it will expired
                    let usedCoupons = EdminForce.Collections.customerCoupon.find({
                        customerID: Meteor.userId(),
                        couponID: coupon["_id"],
                        status:{
                            $nin:['expired']
                        }
                    }).fetch();
                    // This coupon used more than Maximum usage
                    if (Number(coupon.maxCount) && usedCoupons.length >= Number(coupon.maxCount)) {
                        bValidCoupon = false;
                        alert("This coupon can only be used " + coupon.maxCount + " times");
                        return;
                    }

                    //===========================
                    // TODO This step need to update when we change the implement of [Coupon in make up class+registered class]
                    // step 5: make sure all the class in this coupon program and time
                    //===========================
                    let passProgram = false, passWeekday = false;
                    if (_.find(coupon.useFor || [], function (item) {
                            return item.toLowerCase() === 'all'
                        })) {
                        // this coupon can use for any program
                        passProgram = true;
                    }


                    if (_.find(coupon.weekdayRequire || [], function (item) {
                            return item.toLowerCase() === 'all'
                        })) {
                        // this coupon can use for any program
                        passWeekday = true;
                    }

                    let valid = true;

                    for (let i = 0; i < this.data.carts.length; i++) {
                        let item = this.data.carts[i];
                        //console.log("cart: ", item);
                        if (!passProgram) {
                            let findProgram = _.find(coupon.useFor, function (programID) {
                                return programID === item.programID;
                            });

                            if (!findProgram) {
                                valid = false;
                                break;
                            }
                        }

                        if (!passWeekday) {
                            let classData = _.find(this.data.classes, {"_id": item.classID}) || {};
                            let classWeekday = classData.schedule && classData.schedule.day && classData.schedule.day.toLowerCase() || '';
                            let findWeekday = _.find(coupon.weekdayRequire, function (weekday) {
                                return weekday.toLowerCase() === classWeekday;
                            });

                            if (!findWeekday) {
                                valid = false;
                                break;
                            }
                        }
                    }

                    if (!valid) {
                        bValidCoupon = false;
                        alert("Make sure your selected classes' program and day is in Coupon");
                        return;
                    }

                    // Finish valid
                    // This coupon is valid for this checkout, need to re-calculate price
                    this.coupon = coupon;
                    this.setState({
                        refresh: new Date().getTime()
                    });

                }
            }.bind(this))

        }

        insertOrder(order){
            let makeupOnlyFlag = this.makeupOnly;
            EdminForce.Collections.orders.insert(order, function (err, res) {
                if (err) {
                    console.error("Insert order error, error: ", err);
                    alert("Process fail!");
                    return
                } else {

                    let orderID = res;
                    if (!orderID) {
                        alert("Process fail!");
                        return;
                    }

                    FlowRouter.go("/payment?order=" + orderID + "&makeupOnly=" + makeupOnlyFlag);
                }
            });
        }

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
            this.data.carts.forEach((value, key)=> {
                classStudentsID.push(value['_id']);
            });

            let order = {
                accountID: Meteor.userId(),
                details: classStudentsID,
                status: "checkouting",
                amount: this.total
            };

            if(this.coupon){
                order.couponID = this.coupon["_id"];

                // if this order used coupon need to insert a record to customerCoupon collection
                let customerCoupon = {
                    customerID: Meteor.userId(),
                    couponID: this.coupon['_id'],
                    status: "checkouting",
                    isValid: true
                };

                EdminForce.Collections.customerCoupon.insert(customerCoupon, function(err, id){
                    if(err){
                        alert("Something wrong on server side, please try it again");
                    }else{
                        console.log(id);
                        order.customerCouponID = id;
                        this.insertOrder(order);
                    }
                }.bind(this));

            }else{
                this.insertOrder(order);
            }
        }

        calculatePrice() {

        }

        render() {

            if (!this.data.isReady)
                return (
                    <RC.Loading isReady={this.data.isReady}></RC.Loading>
                )

            let uiData = this.getUIData();
            if (!uiData)
                return (
                    <div>An error has occurred</div>
                )

            let style = {
                padding: '10px'
            };

            this.total = 0;
            this.originalAmount = 0;
            this.discount = 0;
            this.hasMakeupClass = false;
            let self = this;

            let cartItems = this.data.carts.map(function (item, index) {
                let classData = _.find(this.data.classes, {"_id": item.classID}) || {};
                let studentData = _.find(this.data.students, {"_id": item.studentID}) || {};
                let programData = _.find(this.data.programs, {_id:classData.programID});
                let sessionData = _.find(this.data.sessions, {_id:classData.sessionID});

                let price = 0;
                this.makeupOnly = true;
                if (item.type === "makeup") {
                    price = classData.makeupClassFee || 5;
                    this.hasMakeupClass = true;
                } else {
                    price = EdminForce.Collections.class.calculateRegistrationFee(classData,classData.session)
                    this.makeupOnly = false;
                }

                this.total += price;

                return (
                    <TableRow key={item['_id']}>
                        <TableRowColumn>{studentData.name}</TableRowColumn>
                        <TableRowColumn>
                            <p>{programData && programData.name} {sessionData && sessionData.name} {classData.schedule && classData.schedule.day} {classData.schedule && classData.schedule.time}</p>
                            {item.lessonDate ? <p style={{padding:"0"}}>
                                Time: {moment(item.lessonDate).format("dddd, MMMM Do YYYY, h:mm a")}</p> : ""}
                        </TableRowColumn>
                        <TableRowColumn>${price}</TableRowColumn>
                        <TableRowColumn><i className="fa fa-trash" style={{"fontSize": "18px", "cursor":"pointer"}}
                                           onClick={self.deleteCartItem.bind(self, item)}></i></TableRowColumn>
                    </TableRow>
                )
            }.bind(this));

            // new family first time register class, add $25 registration fee into payment. one family only pay this fee once, no matter how many students under this account.
            if(this.isNewUser()){
                this.total += 25;
            }

            this.originalAmount = this.total;

            if (this.coupon) {
                let discount = this.coupon.discount;
                let reg = /^\s*([\d]*[\.]?[\d]*)\s*([%$])\s*$/;
                let result = discount.match(reg);
                if (result) {
                    let value = Number(result[1]) || 0;
                    // $ or %
                    let unit = result[2];

                    if (unit == "$") {
                        this.discount = value;
                        this.total = this.originalAmount - this.discount;
                    } else if (unit == '%') {
                        this.discount = this.originalAmount * value / 100;
                        this.total = this.originalAmount - this.discount;
                    }

                    console.log("discount: ", this.discount);
                    console.log("origian: ", this.originalAmount);
                    console.log("totoal: ", this.total);
                }
            }

            let processButtonStyle = {
            };

            let attributes = {};

            let col1Style = {
                display: "inline-block",
                float: "left",
                width: "30%"
            };

            let col2Style = {
                display: "inline-block",
                float: "left",
                width: "70%"
            };

            if (!this.data.carts || this.data.carts.length == 0) {
                processButtonStyle = {
                    backgroundColor: "gray",
                    cursor: "not-allowed"
                };

                attributes.disabled = "disabled";
            }

            this.isNewUser() && cartItems.push((
                    <TableRow key="_registrationfee_">
                        <TableRowColumn colSpan="2"><span style={col1Style}>Registration Fee</span></TableRowColumn>
                        <TableRowColumn colSpan="2"><span style={col2Style}>$25</span></TableRowColumn>
                    </TableRow>
                ));

            this.discount && cartItems.push((
                    <TableRow key="_discount_">
                        <TableRowColumn colSpan="2"><span style={col1Style}>Total Save</span></TableRowColumn>
                        <TableRowColumn colSpan="2"><span style={col2Style}>{"$" + _.toString(this.discount)}</span></TableRowColumn>
                    </TableRow>
                ));

            cartItems.push((
                    <TableRow key="_grandTotal_">
                        <TableRowColumn colSpan="2"><span style={col1Style}>Total</span></TableRowColumn>
                        <TableRowColumn colSpan="2"><span style={col2Style}>{"$" + _.toString(this.total)}</span></TableRowColumn>
                    </TableRow>
            ));

            // Fill with your UI
            return (
                <RC.Div style={style} className="carts-checkout">
                    <RC.VerticalAlign center={true} className="padding" height="300px">
                        <h2>
                            Checkout Summary
                        </h2>
                    </RC.VerticalAlign>



                    <RC.Loading isReady={this.data.isReady}>
                        <Table selectable={false}>
                            <TableHeader adjustForCheckbox={false} displaySelectAll={false} enableSelectAll={false}>
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
                        <RC.Input ref="counponInput" style={{display:"inline-block", width:"80%"}} name="coupon" value="" label="" placeholder="Enter Coupon Code"/>
                        <RC.Button {... attributes} style={processButtonStyle} theme="inline" bgColor="brand2" onClick={this.applyCoupon.bind(this)}>Apply</RC.Button>
                        <RC.Button {... attributes} style={processButtonStyle} bgColor="brand2" bgColorHover="dark" onClick={this.process.bind(this)}>Process Payment</RC.Button>
                    </RC.Loading>
                </RC.Div>
            );
        }
    };

}
