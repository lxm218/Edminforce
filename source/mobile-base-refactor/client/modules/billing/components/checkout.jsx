let {
    Table,
    TableHeaderColumn,
    TableRow,
    TableHeader,
    TableRowColumn,
    TableBody
}=MUI;

let _ = lodash;

EdminForce.Components.Checkout = class extends RC.CSS {

    constructor(p) {
        super(p);

        this.couponId = null;
        this.hasMakeupClass = false;
        this.makeupOnly = true;

        this.state = {}

        this.process = this.process.bind(this);
        this.applyCoupon = this.applyCoupon.bind(this);
    }
    
    deleteCartItem(cartItem) {
        this.props.actions.deleteCartItem(cartItem._id);
    }

    applyCoupon() {
        let couponId = this.refs.counponInput.getValue();
        this.props.actions.validateCouponId(couponId);
    }

    insertOrder(order) {
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

        if (this.isNewUser()) {
            order.registrationFee = 25;
        } else {
            order.registrationFee = 0;
        }


        if (this.coupon) {
            order.couponID = this.coupon["_id"];
            order.discount = this.discount;

            // if this order used coupon need to insert a record to customerCoupon collection
            let customerCoupon = {
                customerID: Meteor.userId(),
                couponID: this.coupon['_id'],
                status: "checkouting",
                isValid: true
            };

            EdminForce.Collections.customerCoupon.insert(customerCoupon, function (err, id) {
                if (err) {
                    alert("Something wrong on server side, please try it again");
                } else {
                    console.log(id);
                    order.customerCouponID = id;
                    this.insertOrder(order);
                }
            }.bind(this));

        } else {
            this.insertOrder(order);
        }
    }

    render() {
        // show popup error
        let popupError = this.props.context.StateBag.checkout.popupError;
        this.props.context.StateBag.checkout.popupError = null;
        popupError && alert(popupError);

        let style = {
            padding: '10px'
        };

        this.hasMakeupClass = false;
        this.makeupOnly = true;
        let self = this;
        let numOfClasses = 0;
        let cartItems = [];

        this.props.students.forEach((s) => {

            s.classes.forEach((sc) => {
                if (sc.type === 'makeup')
                    this.hasMakeupClass = true;
                else
                    this.makeupOnly = false;

                numOfClasses++;
                cartItems.push((
                    <TableRow key={s._id + sc._id}>
                        <TableRowColumn>{s.name}</TableRowColumn>
                        <TableRowColumn>
                            <p>{sc.name}</p>
                            {sc.lessonDate ? <p style={{padding:"0"}}>
                                Time: {moment(sc.lessonDate).format("dddd, MMMM Do YYYY, h:mm a")}</p> : null}
                        </TableRowColumn>
                        <TableRowColumn>${sc.classFee}</TableRowColumn>
                        <TableRowColumn><i className="fa fa-trash" style={{"fontSize": "18px", "cursor":"pointer"}}
                                           onClick={self.deleteCartItem.bind(self, sc)}></i></TableRowColumn>
                    </TableRow>
                ));
            })
        });

        let processButtonStyle = {};
        let attributes = {};
        if (numOfClasses == 0) {
            processButtonStyle = {
                backgroundColor: "gray",
                cursor: "not-allowed"
            };

            attributes.disabled = "disabled";
        }

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

        this.props.registrationFee && cartItems.push((
            <TableRow key="_registrationfee_">
                <TableRowColumn colSpan="2"><span style={col1Style}>Registration Fee</span></TableRowColumn>
                <TableRowColumn colSpan="2"><span
                    style={col2Style}>${this.props.registrationFee}</span></TableRowColumn>
            </TableRow>
        ));

        this.props.discount && cartItems.push((
            <TableRow key="_discount_">
                <TableRowColumn colSpan="2"><span style={col1Style}>Coupon Discount</span></TableRowColumn>
                <TableRowColumn colSpan="2"><span
                    style={col2Style}>{"-$" + _.toString(this.props.discount)}</span></TableRowColumn>
            </TableRow>
        ));

        cartItems.push((
            <TableRow key="_grandTotal_">
                <TableRowColumn colSpan="2"><span style={col1Style}>Total</span></TableRowColumn>
                <TableRowColumn colSpan="2"><span
                    style={col2Style}>{"$" + _.toString(this.props.total - this.props.discount)}</span></TableRowColumn>
            </TableRow>
        ));

        return (
            <RC.Div style={style} className="carts-checkout">
                <RC.VerticalAlign center={true} className="padding" height="300px">
                    <h2>Checkout Summary</h2>
                </RC.VerticalAlign>

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
                <RC.Input ref="counponInput" style={{display:"inline-block", width:"80%"}} name="coupon" value=""
                          label="" placeholder="Enter Coupon Code"/>
                <RC.Button {... attributes} style={processButtonStyle} theme="inline" bgColor="brand2"
                                            onClick={this.applyCoupon}>Apply</RC.Button>
                <RC.Button {... attributes} style={processButtonStyle} bgColor="brand2" bgColorHover="dark"
                                            onClick={this.process}>Process Payment</RC.Button>
            </RC.Div>
        );
    }
};
