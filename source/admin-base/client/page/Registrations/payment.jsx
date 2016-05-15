KUI.Registration_payment = class extends KUI.Page{

    constructor(p){
        super(p);

        this.state = {
            step : 'step1',

            schoolCredit : false,
            coupon : false
        };

        this.currentUseSchoolCredit = new ReactiveVar(0);

        this.total = new ReactiveVar(0);
    }

    getMeteorData(){
        let id = FlowRouter.getParam('id');

        let s1 = Meteor.subscribe('EF-ClassStudent', {
            query : {
                _id : id
            }
        });

        let one = KG.get('EF-ClassStudent').getDB().findOne();

        if(!s1.ready()){
            return {
                ready : false
            };
        }


        let s2 = Meteor.subscribe('EF-Class', {
            query : {
                _id : one.classID
            }
        });
        let s3 = Meteor.subscribe('EF-Student', {
            query : {
                _id : one.studentID
            }
        });

        let student = KG.get('EF-Student').getDB().findOne();
        let s4 = null;


        if(s3.ready() && student){
            console.log(student.accountID)
            s4 = Meteor.subscribe('EF-Customer', {
                query : {
                    _id : student.accountID
                }
            });
        }

        let csd = KG.get('EF-Class').getAll()[0];
//        console.log(student, csd);

        return {
            id : id,
            data : one,
            'class' : csd,
            student : student,
            ready : s2.ready() && csd && s3.ready() && s4.ready()
        };
    }
//http://localhost:8000/registration/payment/cWckGjpfLAwpsiL6t
    baseStyles(){
        return {
            ml : {
                marginLeft : '20px'
            }
        };
    }

    getDepModule(){
        return {
            Customer : KG.get('EF-Customer'),
            Coupon : KG.get('EF-Coupon')
        };
    }

    render(){
        if(!this.data.ready || !this.data.class){
            return util.renderLoading();
        }

        let m = this.getDepModule();
console.log(m.Customer.getAll()[0])
        let customer = m.Customer.getAll()[0],
            registrationFee = customer.hasRegistrationFee ? customer.hasRegistrationFee*m.Customer.getRegistrationFee():0;
        let student = this.data.student,
            cls = this.data.class,
            one = this.data.data;

        let C = {
            credit : customer.schoolCredit || 0,
            classFee : cls.tuition.type==='class'?cls.tuition.money*cls.leftOfClass : cls.tuition.money,
            registrationFee : registrationFee
        };

        let total = C.classFee;


        let list = [
            {
                item : cls.nickName,
                amount : '$'+C.classFee
            }
        ];

        if(this.state.coupon){
            let tmp = total;


            total = m.Coupon.calculateDiscountResult(this.state.coupon.discount, total);
            console.log(tmp, total);
            list.push({
                item : 'Coupon',
                amount : '-$'+(tmp-total).toFixed(2)
            });
        }



        if(C.registrationFee > 0){
            list.push({
                item : 'Registration Fee',
                amount : '$'+C.registrationFee
            });

            total = total + C.registrationFee;
        }

        //school credit
        if(this.state.schoolCredit){
            this.currentUseSchoolCredit.set(C.credit);
            list.push({
                item : 'Credit',
                amount : C.credit>0?('-$'+C.credit):0
            });

            if(C.credit > total){
                this.currentUseSchoolCredit.set(total);
                total = 0;
            }
            else{
                total = total - C.credit;
            }

        }




        this.total.set(total);
        list.push({
            item : 'Total',
            amount : '$'+total.toFixed(2)
        });


        return (
            <RC.Div>
                <h3>Register Class</h3>
                <hr/>
                <p>Student : {student.name}</p>
                <p>Class : {cls.nickName}</p>
                {this.renderTable(list)}
                {this.renderStep1()}
                {this.renderStep2()}
            </RC.Div>
        );
    }

    renderTable(list){
        const titleArray = [
            {
                title : 'Item',
                key : 'item'
            },
            {
                title : 'Amount',
                key : 'amount'
            }
        ];


        return (
            <KUI.Table
                style={{}}
                list={list}
                title={titleArray}
                ref="table"></KUI.Table>
        );
    }

    renderStep1(){
        let dsp = {
            display : 'block'
        };
        if(this.state.step !== 'step1'){
            dsp.display = 'none';
        }

        let sy = this.css.get('styles');
        let lab = 'Next';
        if(this.total.get()===0){
            lab = 'Confirm';
        }
        return (
            <RC.Div style={dsp}>
                <RB.Input wrapperClassName="">
                    {this.state.coupon?
                        null:
                        <RB.Row>
                            <RB.Col xs={8}>
                                <input ref="cpcode" placeholder="Enter Coupon Code" type="text" className="form-control" />
                            </RB.Col>
                            <RB.Col xs={4}>
                                <button type="button" onClick={this.applyCouponCode.bind(this)} className="btn btn-w-m btn-primary">Apply</button>
                            </RB.Col>
                        </RB.Row>
                    }
                </RB.Input>

                <RB.Input onChange={this.checkSchoolCredit.bind(this)} ref="s11" type="checkbox" label="Apply school credit" />
                {/*<RB.Input onChange={function(){}} ref="s12" type="checkbox" label="New Customer Coupon" />*/}
                <RC.Div style={{textAlign:'right'}}>
                    {/*<KUI.NoButton onClick={} label="Cancel"></KUI.NoButton>*/}
                    <KUI.YesButton onClick={this.toStep2.bind(this)} style={sy.ml} label={lab}></KUI.YesButton>
                </RC.Div>
            </RC.Div>
        );
    }
    checkSchoolCredit(e){
        let b = $(e.target).prop('checked');
        this.setState({
            schoolCredit:b
        });
    }

    applyCouponCode(){
        let self = this;
        let m = this.getDepModule();

        let code = util.getReactJQueryObject(this.refs.cpcode).val();
        if(!code){
            util.toast.showError('Please enter coupon code');
            return;
        }

        //check coupon code
        let param = {
            accountID : this.data.student.accountID,
            couponCode : code,
            overRequire : this.total.get(),
            programID : this.data.class.programID,
            weekdayRequire : this.data.class.schedule.day
        };
        console.log(param);
        m.Coupon.callMeteorMethod('checkCouponCodeValidByCustomerID', [param], {
            context : this,
            success : function(rs){
                KG.result.handle(rs, {
                    success : function(d){
                        console.log(d);
                        self.setState({
                            coupon : d
                        });
                    },
                    error : function(err){
                        util.toast.showError(err.reason);
                    }
                });
            }
        });
    }


    renderStep2(){
        let dsp = {
            display : 'block'
        };
        if(this.state.step !== 'step2'){
            dsp.display = 'none';
        }
        let sy = this.css.get('styles');


        return (
            <RC.Div style={dsp}>
                <RB.Input onChange={function(){}} ref="s21" name="cgroup" type="radio" label="Credit Card/Debit Card" />
                <RB.Input onChange={function(){}} ref="s24" name="cgroup" type="radio" label="E-Check" />
                {<RB.Input onChange={function(){}} ref="s22" name="cgroup" type="radio" label="Cash" />}
                {<RB.Input onChange={function(){}} ref="s23" name="cgroup" type="radio" label="Check" />}

                <RB.Input onChange={function(){}} ref="s_unpaid" name="cgroup" type="radio" label="Unpaid" />

                {/*<RB.Input onChange={function(){}} ref="s25" type="checkbox" label="Gift Card" />*/}
                <RC.Div style={{textAlign:'right'}}>
                    {<KUI.NoButton onClick={this.toStep1.bind(this)} label="Cancel"></KUI.NoButton>}
                    <KUI.YesButton onClick={this.toPaymentPage.bind(this)} style={sy.ml} label="Next"></KUI.YesButton>
                </RC.Div>
            </RC.Div>
        );
    }

    toStep2(){
        if(this.total.get() === 0){
            this.toPaymentPage();
        }
        else{
            this.setState({
                step : 'step2'
            });
        }

    }
    toStep1(){
        this.setState({
            step : 'step1'
        });
    }

    toPaymentPage(){
        let self = this;
        let s21 = $(this.refs.s21.getInputDOMNode()).prop('checked'),
            s24 = $(this.refs.s24.getInputDOMNode()).prop('checked'),
            s22 = $(this.refs.s22.getInputDOMNode()).prop('checked'),
            s23 = $(this.refs.s23.getInputDOMNode()).prop('checked');

        let s_np = $(this.refs.s_unpaid.getInputDOMNode()).prop('checked');

        Session.set('_register_class_money_total_', this.total.get());

        if(this.total.get() === 0){
            s22 = true;
        }

        let path = null,
            flag = true;
        let orderData = {
            accountID : this.data.student.accountID,
            studentID : this.data.student._id,
            details : [this.data.id],
            amount : this.total.get(),
            schoolCredit : this.currentUseSchoolCredit.get()
        };
        if(this.state.coupon){
            let cid = this.state.coupon._id;
            if(this.state.coupon.validForNoBooked){
                orderData.customerCouponID = cid;
            }
            else{
                orderData.couponID = cid;
            }
        }

        if(s21){
            path = '/payment/creditcard';
            orderData.paymentType = 'credit card';
            orderData.status = 'waiting';
            orderData.poundage = App.config.poundage.credit;
        }
        else if(s24){
            path = '/payment/echeck';
            orderData.paymentType = 'echeck';
            orderData.status = 'waiting';
            orderData.poundage = App.config.poundage.echeck;
        }
        else if(s22){
            path = '/registration/success/'+this.data.id;
            orderData.paymentType = 'cash';
            orderData.status = 'success';
            orderData.poundage = App.config.poundage.cash;
        }
        else if(s23){
            path = '/registration/success/'+this.data.id;
            orderData.paymentType = 'check';
            orderData.status = 'success';
            orderData.poundage = App.config.poundage.check;
        }
        else if(s_np){
            //TODO unpaid
            path = '/student/'+this.data.student._id;
            orderData.paymentType = 'holding';
            orderData.status = 'waiting';

            this.m.ClassStudent.getDB().update({_id : this.data.id}, {
                $set : {pendingFlag : true}
            })
        }
        else{
            flag = false;
            util.toast.showError('Please select the mode of payment')
        }

        if(flag){
            this.changeCustomerRegistrationFee();


            let total = 0;
            if(s24){
                total = parseFloat(this.total.get())+(parseFloat(orderData.poundage||0));
            }
            else{
                total = parseFloat(this.total.get())*(1+(parseFloat(orderData.poundage||0)));
            }
            total = total.toFixed(2);
            if(orderData.poundage){
                orderData.poundage = orderData.poundage.toString();
            }

            orderData.paymentTotal = total;

            let orderRs = KG.get('EF-Order').insert(orderData);
            KG.result.handle(orderRs, {
                success : function(id){
                    KG.get('EF-ClassStudent').updateOrderID(id, self.data.id);

                    if(s21||s24){
                        path += '/'+id;
                    }
                    util.goPath(path);
                }
            });
        }
    }


    changeCustomerRegistrationFee(){

        //TODO

        let self = this,
            cid = self.data.student.accountID;
        //change customer registration fee
        KG.get('EF-Customer').callMeteorMethod('changeRegistrationFeeStatusById', [cid], {
            context : self,
            success : function(){},
            error : function(){}
        });
    }


};