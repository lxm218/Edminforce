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
        if(num){
            this.refs.credit.getInputDOMNode().value  = num;
        }
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

        let profile = KG.get('EF-Customer').getAll()[0];
        let list = KG.get('EF-Student').getAll({}, {
            sort : {
                updateTime : -1
            }
        });

        let x1 = {
            ready : function(){ return false; }
        };
        if(y.ready()){
            let sl = _.map(list, (d)=>{
                return d._id;
            });
            console.log(sl);

            x1 = Meteor.subscribe('EF-Order', {
                query : {
                    studentID : {
                        '$in' : sl
                    },
                    status : 'success'
                }
            });
        }

        return {
            id : id,
            ready : x.ready(),
            listReady : y.ready(),
            profile : profile,
            list : list,
            orderReady : x1.ready()
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

            self.m.Customer.getDB().update({_id : self.data.id}, {
                '$set' : {
                    schoolCredit : parseFloat(num)
                }
            });
            self.refs.form.setSchoolCreditNumber(num);

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
                {this.renderOrderTable()}
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

    renderOrderTable(){
        if(!this.data.orderReady){
            return util.renderLoading();
        }

        let list = this.m.Order.getDB().find({}, {
            sort : {
                updateTime : -1
            }
        }).fetch();

        list = _.map(list, (item)=>{
            let st = this.m.Student.getDB().findOne({
                _id : item.studentID
            });
            item.student = st;
            return item;
        });


        const titleArray = [
            {
                title : 'Date',
                reactDom(doc){
                    return moment(doc.updateTime).format(util.const.dateFormat)
                }
            },
            {
                title : 'Name',
                key : 'student.name'
            },
            {
                title : 'Type',
                key : 'type'
            },
            {
                title : 'Amount($)',
                key : 'paymentTotal'
            },
            {
                title : 'Payment Type',
                key : 'paymentType'
            },
            {
                title : 'Status',
                key : 'status'
            }
        ];

        return (
            <KUI.Table
                style={{}}
                list={list}
                title={titleArray}
                ref="table1">
            </KUI.Table>
        );
    }

};