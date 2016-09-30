KUI.Family_add_comp = class extends RC.CSS{

    getRefs(){

        return this.refs;
    }

    render(){

        let p = {
            name : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'name',
                label : 'Account Name'
            },
            email : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'email',
                label : 'Email'
            },
            phone : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'phone',
                label : 'Phone'
            },
            location : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'location',
                label : 'Location'
            },
            alternativeName : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'al_name',
                label : 'Name'
            },
            alternativePhone : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'al_phone',
                label : 'Phone'
            },
            emergencyName : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'em_name',
                label : 'Name'
            },
            emergencyPhone : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'em_phone',
                label : 'Phone'
            },
            credit : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                label : 'School Credit($)',
                ref : 'credit',
                disabled : true
            },

            alternativeEmail : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'al_email',
                label : 'Email'
            },
            alternativeShip : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'al_ship',
                label : 'Relation'
            },
            emergencyEmail : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'em_email',
                label : 'Email'
            },
            emergencyShip : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'em_ship',
                label : 'Relation'
            }
        };

        const sy = {
            rd : {
                textAlign : 'right'
            },
            p : {
                textAlign : 'right',
                marginTop : '65px'
            },
            checkout : {
                position : 'relative',
                left : '-15px',
                top : '-14px',
                textAlign : 'right'
            }
        };

        let type = this.props.type;

        return (
            <form className="form-horizontal">
                <RB.Row>
                    <RB.Col md={6} mdOffset={0}>
                        <RB.Input type="text" {... p.name} />
                        <RB.Input type="text" {... p.phone} />
                        {type===false?<RB.Input type="text" {... p.credit} />:null}

                        <p style={sy.rd}>Alternative Contact</p>
                        <RB.Input type="text" {... p.alternativeName} />
                        <RB.Input type="text" {... p.alternativeEmail} />
                        <RB.Input type="text" {... p.alternativePhone} />
                        <RB.Input type="text" {... p.alternativeShip} />

                        <div style={sy.checkout}>
                            <RB.Input onChange={this.changeCheckout} ref="receive" type="checkbox" label="Receive Communications" />
                        </div>
                    </RB.Col>
                    <RB.Col md={6} mdOffset={0}>
                        <RB.Input type="text" {... p.email} />
                        <RB.Input type="text" {... p.location} />

                        <p style={false?sy.p:sy.rd}>Emergency Contact</p>
                        <RB.Input type="text" {... p.emergencyName} />
                        <RB.Input type="text" {... p.emergencyEmail} />
                        <RB.Input type="text" {... p.emergencyPhone} />
                        <RB.Input type="text" {... p.emergencyShip} />
                    </RB.Col>
                </RB.Row>
            </form>
        );
    }

    changeCheckout(){

    }

    getValue(){
        let {
            name, email, phone, location,
            al_name, al_phone, al_email, al_ship,
            em_name, em_phone, em_email, em_ship,
            receive
            } = this.getRefs();

        return {
            name : name.getValue(),
            email : email.getValue(),
            phone : phone.getValue(),
            location : location.getValue(),
            alternativeContact : {
                name : al_name.getValue(),
                phone : al_phone.getValue(),
                email : al_email.getValue() || null,
                relation : al_ship.getValue(),
                receive : $(receive.getInputDOMNode()).prop('checked')
            },
            emergencyContact : {
                name : em_name.getValue(),
                phone : em_phone.getValue(),
                email : em_email.getValue() || null,
                relation : em_ship.getValue()
            }
        };
    }

    setDefaultValue(data){
        let {
            name, email, phone, location,
            al_name, al_phone, al_email, al_ship,
            em_name, em_phone, em_email, em_ship,
            receive
            } = this.getRefs();

        let al = data.alternativeContact || {},
            em = data.emergencyContact || {};
        name.getInputDOMNode().value = data.name || '';
        email.getInputDOMNode().value = data.email || '';
        phone.getInputDOMNode().value = data.phone || '';
        location.getInputDOMNode().value = data.location || '';
        al_name.getInputDOMNode().value = al.name || '';
        al_phone.getInputDOMNode().value = al.phone || '';
        em_name.getInputDOMNode().value = em.name || '';
        em_phone.getInputDOMNode().value = em.phone || '';

        al_email.getInputDOMNode().value = al.email || '';
        al_ship.getInputDOMNode().value = al.relation || '';

        em_email.getInputDOMNode().value = em.email || '';
        em_ship.getInputDOMNode().value = em.relation || '';

        $(receive.getInputDOMNode()).prop('checked', al.receive||false);

        //if(data.schoolCredit){
            //this.refs.credit.getInputDOMNode().value  = (data.schoolCredit||0);
        //}
    }



};

let BillingTable = class extends RC.CSS{
    constructor(p){
        super(p);

        this.m = KG.DataHelper.getDepModule();

        this.state = {
            list : null,

            detailReport : null
        };

        this.accountID = null;
        this.page = 1;
    }

    getStateData(accountID, page){
        if(accountID){
            this.accountID = accountID;
        }
        else{
            accountID = this.accountID;
        }

        if(page){
            this.page = page;
        }

        let self = this;
        this.m.Customer.callMeteorMethod('getOrderInfoByAccountID', [accountID, {
            pageSize : 10,
            pageNum : this.page
        }], {
            success : function(list){
                console.log(list);
                self.setState({
                    list : list
                });
            }
        });
    }

    render(){
        let self = this;
        if(!this.state.list){
            return null;
        }
        else if(this.state.list === 'loading'){
            return util.renderLoading();
        }


        let titleArray = [
            {
                title : 'Date',
                //key : 'dateline',
                reactDom(doc){
                    let sy = {
                        cursor : 'pointer',
                        fontWeight : 'normal',
                        textDecoration : 'underline'
                    };

                    let dateline = moment(doc.updateTime).format(KG.const.dateAllFormat);

                    let showDetailModal = function(){
                        self.setState({
                            detailReport : 'loading'
                        });

                        KG.DataHelper.callMeteorMethod('getFinanceDetailByOrderID', [doc._id, dateline], {
                            success : function(rs){
                                console.log(rs);
                                self.setState({
                                    detailReport : rs.list
                                });
                            }
                        });

                        self.refs.modal.show();
                    };

                    return <b style={sy} onClick={showDetailModal.bind(self)}>{dateline}</b>;
                }
            },
            {
                title : 'Type',
                key : 'type'
            },
            {
                title : 'Payment',
                key : 'paymentType'
            },
            {
                title : 'Total Amount($)',
                key : 'totalAmount'
            },
            {
                title : 'Registration Fee',
                key : 'registrationFee'
            },
            {
                title : 'School Credit',
                key : 'schoolCredit'
            },
            {
                title : 'Discount($)',
                reactDom : function(doc){
                    return doc.discount;
                }
            },
            {
                title : 'Coupon code',
                reactDom : function(doc){
                    return doc.couponID || doc.customerCouponID || '';
                }
            },
            {
                title : 'Actual Payment($)',
                key : 'actualPayment'
            },

            {
                title : 'Pay From',
                key : 'paymentSource'
            },
            {
                title : 'Note',
                reactDom : function(doc){
                    if(doc.note){
                        return doc.note.note || '';
                    }
                    return '';
                }
            }

        ];

        return (
            <RC.Div>
                <KUI.PageTable
                    total={this.state.list.count}
                    pagesize={10}
                    page={this.page}
                    onSelectPage={this.selectPage.bind(this)}
                    style={{}}
                    list={this.state.list.data}
                    title={titleArray}
                    ref="table">
                </KUI.PageTable>
                {this.renderDetailDialog()}
            </RC.Div>

        );
    }
    selectPage(page){

        this.getStateData(null, page);
    }

    renderDetailDialog(){
        let param = {
            title : `Detail Infomation`,
            YesFn : function(){

            },
            renderBody : function(){
                return (
                    <RC.Div>

                        {this.renderDetailBody()}
                    </RC.Div>
                );
            }
        };

        return util.dialog.render.call(this, 'modal', param);
    }

    renderDetailBody(){
        let self = this;
        if(!this.state.detailReport){
            return null;
        }
        else if('loading' === this.state.detailReport){
            return util.renderLoading();
        }

        let titleArray = [
            {
                title : 'Date',
                key : 'dateline'
            },
            {
                title : 'Student',
                key : 'student.name'
            },
            {
                title : 'Class',
                key : 'class.nickName'
            },
            {
                title : 'Type',
                reactDom(doc){
                    let rs = doc.order.type;
                    if(rs === 'mixed'){
                        rs = doc.type;
                    }
                    return rs;
                }
            },
            {
                title : 'Amount($)',
                reactDom(doc){
                    let rs = 0;
                    if(_.contains(['register class', 'makeup class'], doc.order.type)){
                        rs = Math.abs(doc.fee);
                    }
                    else{
                        rs = doc.order.amount;
                    }

                    if(rs < 0) rs = 0;
                    return rs;

                }
            }
        ];

        return (
            <KUI.Table
                style={{}}
                list={this.state.detailReport}
                title={titleArray}
                ref="table"></KUI.Table>
        );
    }

};


KUI.Family_profile = class extends KUI.Page{

    constructor(p){
        super(p);

        this.m = KG.DataHelper.getDepModule();
    }

    getMeteorData(){
        let id = FlowRouter.current().params.id;
        let x = Meteor.subscribe('EF-Customer', {
            query : {_id : id}
        });

        let y = Meteor.subscribe('EF-Student', {
            query : {
                accountID : id
            }
        });

        let profile = KG.get('EF-Customer').getAll(
            {
                _id : id
            }
        )[0];
        let list = KG.get('EF-Student').getAll({}, {
            sort : {
                updateTime : -1
            }
        });


        return {
            id : id,
            ready : x.ready(),
            listReady : y.ready(),
            profile : profile,
            list : list
        };
    }

    baseStyles(){
        return {
            rd : {
                textAlign : 'right',

            },
            ml : {
                marginLeft: '20px'
            }
        };
    }

    changeSchoolCredit(){
        let self = this;

        //check permission
        if(!util.user.checkPermission('schoolCreidt', 'edit')){
            swal(util.const.NoOperatorPermission, '', 'error');
            return false;
        }

        let param = {
            title : 'Change School Credit',
            text : [
                '<fieldset>',
                    '<input type="text" class="js_n" style="display:block;" tabindex="3" placeholder="School Credit">',
                    '<input type="text" class="js_r" style="display:block;" tabindex="3" placeholder="Note">',
                '</fieldset>'
            ].join(''),
            confirmButtonText : 'Confirm',
            cancelButtonText : 'Cancel',
            showCancelButton : true,
            confirmButtonColor : '#1ab394',
            html : true,
            closeOnConfirm : false,
            animation : 'slide-from-top'

        };

        swal(param, function(){
            console.log(arguments);
            let num = $('.js_n').val(),
                note = $('.js_r').val();
            console.log(num, note);

            num = parseFloat(num);
            if(!num){
                swal.showInputError('school credit must be a number');
                return false;
            }

            let old = self.getSchoolCreditNumber();
            //if(num+old < 0){
            //    swal.showInputError('school credit change error');
            //    return false;
            //}

            let orderData = {
                accountID : self.data.id,
                details : [],
                paymentType : 'school credit',
                type : 'change school credit',
                status : 'success',
                amount : 0,
                paymentTotal : 0,
                schoolCredit : num
            };
            let oid = self.m.Order.insert(orderData);
            if(oid.status){
                oid = oid.data;
                console.log(oid);
                self.m.Customer.callMeteorMethod('changeSchoolCredit', [{
                    schoolCredit : num,
                    orderID : oid,
                    note : note
                }, self.data.id], {
                    success : function(){
                        console.log(oid, arguments)
                        self.setSchoolCreditNumber(num+old);

                        //add to log
                        KG.RequestLog.addByType('change school credit', {
                            data : {
                                customer : self.data.profile,
                                credit : num,
                                note : note
                            }
                        });

                        self.refs.billingTable.getStateData(self.data.id, 1);

                        swal.close();
                    },
                    error : function(){
                        console.log(arguments)
                    }
                });
            }

        });
    }

    refundSchoolCredit(){
        let self = this;

        //check permission
        if(!util.user.checkPermission('schoolCreidt', 'edit')){
            swal(util.const.NoOperatorPermission, '', 'error');
            return false;
        }
        let old = self.getSchoolCreditNumber();
        if(old <= 0){
            swal('You have no school credit to refund.', '', 'info');
            return false;
        }

        let param = {
            title : 'Refund School Credit',
            text : [
                '<fieldset>',
                '<input class="form-control js_n1" type="text" disabled value="-'+old+'" style="display:block;" tabindex="3" placeholder="School Credit">',
                '<input class="form-control js_r1" type="text" disabled value="Refund School Credit" style="display:block;"' +
                ' tabindex="3"' +
                ' placeholder="Note">',
                '</fieldset>'
            ].join(''),
            confirmButtonText : 'Confirm',
            cancelButtonText : 'Cancel',
            showCancelButton : true,
            confirmButtonColor : '#1ab394',
            html : true,
            closeOnConfirm : false,
            animation : 'slide-from-top'

        };

        swal(param, function(){
            let num = $('.js_n1').val(),
                note = $('.js_r1').val();

            num = parseFloat(num);
            if(!num){
                swal.showInputError('school credit must be a number');
                return false;
            }


            //if(num+old < 0){
            //    swal.showInputError('school credit change error');
            //    return false;
            //}

            let orderData = {
                accountID : self.data.id,
                details : [],
                paymentType : 'school credit',
                type : 'change school credit',
                status : 'success',
                amount : 0,
                paymentTotal : 0,
                schoolCredit : num
            };
            let oid = self.m.Order.insert(orderData);
            if(oid.status){
                oid = oid.data;
                console.log(oid);
                self.m.Customer.callMeteorMethod('changeSchoolCredit', [{
                    schoolCredit : num,
                    orderID : oid,
                    note : note
                }, self.data.id], {
                    success : function(){
                        console.log(oid, arguments)
                        self.setSchoolCreditNumber(num+old);

                        //add to log
                        KG.RequestLog.addByType('change school credit', {
                            data : {
                                customer : self.data.profile,
                                credit : num,
                                note : note
                            }
                        });

                        self.refs.billingTable.getStateData(self.data.id, 1);

                        swal.close();
                    },
                    error : function(){
                        console.log(arguments)
                    }
                });
            }

        });
    }

    render(){

        let sy = this.css.get('styles');

        return (
            <RC.Div>
                <KUI.Family_add_comp type="edit" ref="form" />
                <RC.Div style={sy.rd}>
                    <KUI.YesButton style={sy.ml} onClick={this.save.bind(this)} label="Save"></KUI.YesButton>
                </RC.Div>
                <hr/>
                {this.renderSchoolCreditBox()}
                <RC.Div style={sy.rd}>
                    <KUI.YesButton style={sy.ml} onClick={this.changeSchoolCredit.bind(this)} label="Change School Credit"></KUI.YesButton>
                    <KUI.YesButton style={sy.ml} onClick={this.refundSchoolCredit.bind(this)} label="Refund School Credit"></KUI.YesButton>
                </RC.Div>
                <hr/>
                <h4>Students</h4>
                {this.renderStudentTable()}
                <RC.Div style={sy.rd}>
                    <KUI.YesButton style={sy.ml} onClick={this.toAdd.bind(this)} label="Add"></KUI.YesButton>
                </RC.Div>
                <hr/>
                <h4>Billing</h4>
                <BillingTable ref="billingTable"></BillingTable>

            </RC.Div>
        );
    }

    toAdd(){
        util.goPath('/student/add/under/'+this.data.id);
    }

    save(){

        //check permission
        if(!util.user.checkPermission('customer', 'edit')){
            swal(util.const.NoOperatorPermission, '', 'error');
            return false;
        }

        let param = this.refs.form.getValue();
        console.log(param);

        let rs = KG.get('EF-Customer').updateById(param, this.data.id);
        KG.result.handle(rs, {
            success : function(){
                util.goPath('/family');
            }
        });
    }

    runOnceAfterDataReady(){
        let data = this.data.profile;
        this.refs.form.setDefaultValue(data);
        this.setSchoolCreditNumber(data.schoolCredit);

        this.refs.billingTable.getStateData(this.data.id);
    }

    renderStudentTable(){

        if(!this.data.listReady){
            return util.renderLoading();
        }

        const titleArray = [
            {
                title : 'Name',
                reactDom(doc){
                    return <RC.URL href={`/student/${doc._id}`}>{doc.nickName}</RC.URL>
                }
            },
            {
                title : 'Birthday',
                reactDom : function(doc){
                    return moment(doc.profile.birthday).format(util.const.dateFormat);
                }
            },
            {
                title : 'Age',
                key : 'age'
            },
            {
                title : 'Gender',
                key : 'profile.gender'
            },
            {
                title : 'Status',
                key : 'status'
            }
        ];

        let list = this.data.list;

        return (
            <KUI.Table
                style={{}}
                list={list}
                title={titleArray}
                ref="table">
            </KUI.Table>
        );

    }

    renderSchoolCreditBox(){
        let p = {
            credit : {
                labelClassName : 'col-xs-2',
                wrapperClassName : 'col-xs-6',
                label : 'School Credit($)',
                ref : 'credit',
                disabled : true
            }
        };

        return (
            <form className="form-horizontal">
                <RB.Row>
                    <RB.Input type="text" {...p.credit} />
                </RB.Row>

            </form>
        );
    }

    setSchoolCreditNumber(num){
        this.refs.credit.getInputDOMNode().value = num||0;

    }
    getSchoolCreditNumber(){
        let n = this.refs.credit.getValue()||0;
        return  parseFloat(n);
    }


};
