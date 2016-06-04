KUI.Family_add_comp = class extends RC.CSS{

    getRefs(){

        return {
            name : this.refs.name,
            email : this.refs.email,
            phone : this.refs.phone,
            location : this.refs.location,
            al_name : this.refs.al_name,
            al_phone : this.refs.al_phone,
            em_name : this.refs.em_name,
            em_phone : this.refs.em_phone
        };
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
            }
        };

        const sy = {
            rd : {
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
                        {type==='edit'?<RB.Input type="text" {... p.credit} />:null}
                        <p style={sy.rd}>Alternative Contact</p>
                        <RB.Input type="text" {... p.alternativeName} />
                        <RB.Input type="text" {... p.alternativePhone} />
                    </RB.Col>
                    <RB.Col md={6} mdOffset={0}>
                        <RB.Input type="text" {... p.email} />
                        <RB.Input type="text" {... p.location} />
                        <p style={sy.rd}>Emergency Contact</p>
                        <RB.Input type="text" {... p.emergencyName} />
                        <RB.Input type="text" {... p.emergencyPhone} />
                    </RB.Col>
                </RB.Row>
            </form>
        );
    }

    getValue(){
        let {name, email, phone, location, al_name, al_phone, em_name, em_phone} = this.getRefs();

        return {
            name : name.getValue(),
            email : email.getValue(),
            phone : phone.getValue(),
            location : location.getValue(),
            alternativeContact : {
                name : al_name.getValue(),
                phone : al_phone.getValue()
            },
            emergencyContact : {
                name : em_name.getValue(),
                phone : em_phone.getValue()
            }
        };
    }

    setDefaultValue(data){
        let {name, email, phone, location, al_name, al_phone, em_name, em_phone} = this.getRefs();

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

        //if(data.schoolCredit){
            this.refs.credit.getInputDOMNode().value  = (data.schoolCredit||0);
        //}
    }

    setSchoolCreditNumber(num){

        this.refs.credit.getInputDOMNode().value = num||0;

    }
    getSchoolCreditNumber(){
        let n = this.refs.credit.getValue()||0;
        return  parseFloat(n);
    }

};

let BillingTable = class extends RC.CSS{
    constructor(p){
        super(p);

        this.m = KG.DataHelper.getDepModule();

        this.state = {
            list : null
        };
    }

    getStateData(accountID){
        let self = this;
        this.m.Customer.callMeteorMethod('getOrderInfoByAccountID', [accountID], {
            success : function(list){
                console.log(list);
            }
        });
    }

    render(){
        if(!this.state.list){
            return null;
        }
        else if(this.state.list === 'loading'){
            return util.renderLoading();
        }


        const titleArray = [
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
                key : 'order.type'
            },
            {
                title : 'Payment',
                key : 'order.paymentType'
            },
            {
                title : 'Amount ($)',
                reactDom : function(doc){
                    if(!_.isUndefined(doc.fee)){
                        return doc.fee;
                    }

                    return doc.order.paymentTotal;

                }
            },
            {
                title : 'Coupon code',
                reactDom : function(doc){
                    return doc.order.couponID || doc.order.customerCouponID || '';
                }
            },
            {
                title : 'Discount($)',
                reactDom : function(doc){
                    try{
                        return doc.fee - doc.discounted;
                    }catch(e){
                        return doc.order.discount;
                    }
                }
            },
            {
                title : 'School Credit',
                key : 'order.schoolCredit'
            },
            {
                title : 'Registration Fee',
                key : 'order.registrationFee'
            },
            {
                title : 'Pay From',
                key : 'order.paymentSource'
            },
            {
                title : 'Date',
                key : 'dateline'
            }
        ];

        return (
            <KUI.Table
                style={{}}
                list={this.state.list}
                title={titleArray}
                ref="table">
            </KUI.Table>
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

            let old = self.refs.form.getSchoolCreditNumber();
            if(num+old < 0){
                swal.showInputError('school credit change error');
                return false;
            }

            self.m.Customer.getDB().update({_id : self.data.id}, {
                '$set' : {
                    schoolCredit : parseFloat(num+old)
                }
            });
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
            self.m.Order.insert(orderData);

            self.refs.form.setSchoolCreditNumber(num+old);

            //add to log
            KG.RequestLog.addByType('change school credit', {
                data : {
                    customer : self.data.profile,
                    credit : num,
                    note : note
                }
            });

            swal.close();
        });
    }

    render(){

        let sy = this.css.get('styles');

        return (
            <RC.Div>
                <KUI.Family_add_comp type="edit" ref="form" />
                <RC.Div style={sy.rd}>
                    <KUI.YesButton style={sy.ml} onClick={this.changeSchoolCredit.bind(this)} label="Change School Credit"></KUI.YesButton>
                    <KUI.YesButton style={sy.ml} onClick={this.save.bind(this)} label="Save"></KUI.YesButton>
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


};