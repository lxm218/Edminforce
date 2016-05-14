let {
    Table,
    TableHeaderColumn,
    TableRow,
    TableHeader,
    TableRowColumn,
    TableBody,
}=MUI;

let _ = lodash;

EdminForce.Components.Checkout = class extends RC.CSS {

    constructor(p) {
        super(p);

        this.couponId = null;
        this.hasMakeupClass = false;
        this.makeupOnly = true;

        this.state = {
            applySchoolCredit: false
        }

        this.process = this.process.bind(this);
        this.applyCoupon = this.applyCoupon.bind(this);
        this.toggleSchoolCredit = this.toggleSchoolCredit.bind(this);
    }
    
    deleteCartItem(cartItem) {
        this.props.actions.deleteCartItem(cartItem._id);
    }

    applyCoupon() {
        let couponId = this.refs.counponInput.getValue();
        this.props.actions.validateCouponId(couponId);
    }

    process() {
        let studentClassIDs = [];
        this.props.students.forEach( (s) => {
            s.classes.forEach( (sc) => {
                studentClassIDs.push(sc._id);
            })
        });
        
        if (this.state.applySchoolCredit && this.props.schoolCredit > this.props.total - this.props.discount) {
            this.props.actions.payWithSchoolCredit({
                details: studentClassIDs,
                amount: this.props.total - this.props.discount,
                discount: this.props.discount,
                registrationFee: this.props.registrationFee,
                couponID: this.props.appliedCouponId
            }, this.makeupOnly);
        } 
        else {

            this.props.actions.prepareOrder({
                details: studentClassIDs,
                amount: this.props.total - this.props.discount,
                discount: this.props.discount,
                registrationFee: this.props.registrationFee,
                couponID: this.props.appliedCouponId,
                schoolCredit: this.state.applySchoolCredit ? this.props.schoolCredit : 0,
            }, this.makeupOnly);
        }
    }

    toggleSchoolCredit(event, checked) {
        this.setState({
            applySchoolCredit: checked
        })
    }

    render() {

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

        numOfClasses > 0 && this.props.registrationFee && cartItems.push((
            <TableRow key="_registrationfee_">
                <TableRowColumn colSpan="2"><span style={col1Style}>Registration Fee</span></TableRowColumn>
                <TableRowColumn colSpan="2"><span
                    style={col2Style}>${this.props.registrationFee.toFixed(2)}</span></TableRowColumn>
            </TableRow>
        ));

        numOfClasses > 0 && this.props.discount && cartItems.push((
            <TableRow key="_discount_">
                <TableRowColumn colSpan="2"><span style={col1Style}>Coupon Discount ({this.props.appliedCouponId})</span></TableRowColumn>
                <TableRowColumn colSpan="2"><span
                    style={col2Style}>-${this.props.discount.toFixed(2)}</span></TableRowColumn>
            </TableRow>
        ));

        let orderTotal = this.props.total - this.props.discount;
        cartItems.push((
            <TableRow key="_grandTotal_">
                <TableRowColumn colSpan="2"><span style={col1Style}>Total</span></TableRowColumn>
                <TableRowColumn colSpan="2"><span
                    style={col2Style}>${orderTotal.toFixed(2)}</span></TableRowColumn>
            </TableRow>
        ));

        if (numOfClasses > 0 && this.props.schoolCredit > 0) {
            let schoolCreditInfo;
            if (this.props.schoolCredit > orderTotal) {
                schoolCreditInfo = "$" + orderTotal.toFixed(2) + " of $" + this.props.schoolCredit.toFixed(2);
            }
            else {
                schoolCreditInfo = "$" + this.props.schoolCredit.toFixed(2);
            }

            cartItems.push((
                <TableRow key="_schoolCredit_">
                    <TableRowColumn colSpan="2"><RC.Checkbox style={{borderBottom:'none'}}
                                                             label="Apply School Credit"
                                                             onClick={this.toggleSchoolCredit} checked={this.state.applySchoolCredit}/>
                    </TableRowColumn>
                    <TableRowColumn colSpan="2"><span
                        style={col2Style}>{schoolCreditInfo}</span></TableRowColumn>
                </TableRow>
            ));
        }

        return (
            <RC.Div style={style} className="carts-checkout">
                <RC.VerticalAlign center={true} className="padding" height="300px">
                    <h2>Checkout Summary</h2>
                </RC.VerticalAlign>

                {EdminForce.utils.renderError(this.props.error)}

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
