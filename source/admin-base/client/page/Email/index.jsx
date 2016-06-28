
KUI.Email_index = class extends KUI.Page{

    constructor(p){
        super(p);

        this.state = {
            email_template_id : null,
            filterQuery : null,
            page : 1
        };

        this.email_html = new ReactiveVar(null);
    }

    defineDepModule(){
        return {
            AdminUser : KG.get('EF-AdminUser'),
            Email : KG.get('EF-Email'),
            EmailTemplate : KG.get('EF-EmailTemplate'),
            Customer : KG.get('EF-Customer'),
            Session : KG.get('EF-Session'),
            Class : KG.get('EF-Class')
        };
    }
    getMeteorData(){
        let {AdminUser, EmailTemplate, Customer, Session, Class} = this.defineDepModule();

        let x = Meteor.subscribe('EF-EmailTemplate'),
            emailTemplateList = EmailTemplate.getDB().find({}, {sort:{updateTime:-1}}).fetch();

        let y = Meteor.subscribe('EF-AdminUser');

        let cx = {
            ready : function(){return true;},
            data : []
        };
        if(this.state.filterQuery){
            cx = Customer.subscribeByClassQuery(this.state.filterQuery, {
                pageSize : 10,
                pageNum : this.state.page
            });

        }

        let sx = Meteor.subscribe('EF-Session');

        let clsx = {
            ready : function(){return true;},
            data : []
        };

        return {
            ready : x.ready() && y.ready() && clsx.ready() && sx.ready(),
            classList : clsx.data,
            emailTemplateList,
            filterReady : cx.ready(),
            filterList : cx.data,
            filterCount : cx.count,

            filterBoxReady : sx.ready(),
            sessionList : Session.getDB().find().fetch()
        };
    }

    render(){
        if(!util.user.checkPermission('email', 'view')){
            util.render.stop(this);
            return util.renderNoViewPermission();
        }

        if(!this.data.ready){
            return util.renderLoading();
        }

        let sy = {
            url : {
                float:'right',
                fontSize:'12px',
                fontWeight:'400',
                position : 'relative',
                top : '6px'
            }
        };

        return (
            <RC.Div>
                <h3>
                    Send Email
                </h3>
                <hr/>
                {this.renderFilterBox()}
                <hr/>

                {this.renderFilterResult()}
                <hr/>
                {this.renderFilterEmail()}

                {this.renderModal()}
            </RC.Div>
        );
    }

    renderFilterBox(){
        if(!this.data.filterBoxReady){
            return util.renderLoading();
        }

        let m = this.defineDepModule();

        let p = {
            session : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-9',
                ref : 'session',
                label : 'Session'
            },
            'class' : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-9',
                ref : 'cls',
                label : 'Class'
            },
            day : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-9',
                ref : 'day',
                label : 'Day of Class'
            },
            status : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-9',
                ref : 'status',
                label : 'Status'
            },
            teacher : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-9',
                ref : 'teacher',
                label : 'Teacher'
            }
        };

        let option = {
            session : this.data.sessionList,
            class : this.data.classList,
            day : m.Class.getDBSchema().schema('schedule.day').allowedValues,
            status : m.Class.getDBSchema().schema('status').allowedValues,
            teacher : m.AdminUser.getDB().find({role:'teacher'}).fetch()
        };

        return (
            <form className="form-horizontal">
                <RB.Row>
                    <RB.Col xs={6}>
                        <RB.Input type="select" {... p.session}>
                            {
                                _.map(option.session, (item, index)=>{
                                    return <option key={index} value={item._id}>{item.name}</option>;
                                })
                            }
                        </RB.Input>

                        <RB.Input type="select" {... p.day}>
                            <option key={-1} value="all">All</option>
                            {
                                _.map(option.day, (item, index)=>{
                                    return <option key={index} value={item}>{item}</option>;
                                })
                            }
                        </RB.Input>


                    </RB.Col>
                    <RB.Col xs={6}>
                        {/*<RB.Input type="select" {... p.class}>
                            {
                                _.map(option['class'], (item, index)=>{
                                    return <option key={index} value={item._id}>{item.nickName}</option>;
                                })
                            }
                        </RB.Input>*/}

                        <RB.Input type="select" {... p.teacher}>
                            <option key={-1} value="all">All</option>
                            {
                                _.map(option.teacher, (item, index)=>{
                                    return <option key={index} value={item.nickName}>{item.nickName}</option>;
                                })
                            }
                        </RB.Input>

                        <RB.Input type="select" {... p.status}>
                            {
                                _.map(option.status, (item, index)=>{
                                    return <option key={index} value={item}>{item}</option>;
                                })
                            }
                        </RB.Input>
                    </RB.Col>

                </RB.Row>
                <RC.Div style={{textAlign:'right'}}>
                    <KUI.YesButton onClick={this.search.bind(this)} label="Search"></KUI.YesButton>
                </RC.Div>
            </form>
        );
    }

    search(){
        let {session, cls, day, status, teacher} = this.getRefs();

        let query = {
            sessionID : session.getValue(),
            //classID : cls.getValue(),
            dayOfClass : day.getValue(),
            status : status.getValue(),
            teacher : teacher.getValue()
        };
        if(query.dayOfClass === 'all'){
            delete query.dayOfClass;
        }
        if(query.teacher === 'all'){
            delete query.teacher;
        }

        console.log(query);
        this.setState({
            filterQuery : query,
            page : 1
        });
    }

    runOnceAfterDataReady(){
        //this.search();
    }

    renderFilterResult(){
        if(!this.data.filterReady){
            return util.renderLoading();
        }
        console.log(this.data.filterList);
        if(!this.data.filterList){
            return null;
        }

        const titleArray = [
            {
                title : 'Name',
                key : 'name'
            },
            {
                title : 'Email',
                key : 'email'
            },
            {
                title : 'Select',
                style : {
                    textAlign : 'center'
                },
                reactDom(item){
                    let sy = {
                        textAlign : 'center',
                        display : 'block'
                    };

                    return <label style={sy}><input key={item._id} type="checkbox" onChange={function(){}} defaultChecked="true" name="sml" data-email={item.email} /></label>
                }
            }
        ];

        return (
            <RC.Div>
                <p>Search Result : {this.data.filterCount} matches</p>
                <KUI.PageTable
                    style={{}}
                    total={this.data.filterCount}
                    onSelectPage={(function(p){this.setState({page:p})}).bind(this)}
                    pagesize={10}
                    page={this.state.page}
                    list={this.data.filterList}
                    title={titleArray}
                    ref="table">
                </KUI.PageTable>
            </RC.Div>
        );
    }

    getRefs(){
        return {
            email_tpl : this.refs.email_tpl,
            session : this.refs.session,
            //cls : this.refs.cls,
            day : this.refs.day,
            status : this.refs.status,
            teacher : this.refs.teacher
        };
    }

    renderFilterEmail(){

        let p = {
            email_tpl : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-4',
                ref : 'email_tpl',
                label : 'Email Template'
            }
        };

        return (
            <form className="form-horizontal">
                <RB.Row>
                    <RB.Col md={12}>
                        <RB.Input type="select" {... p.email_tpl}>
                            {
                                _.map(this.data.emailTemplateList, (item, index)=>{
                                    return <option key={index} value={item._id}>{item.name}</option>;
                                })
                            }
                        </RB.Input>
                    </RB.Col>
                </RB.Row>
                <RC.Div style={{textAlign:'right'}}>
                    <KUI.YesButton onClick={this.preview.bind(this)} label="Preview Email"></KUI.YesButton>
                    <KUI.YesButton style={{marginLeft:'15px'}} href="/email/template/add" label="Add Email Template"></KUI.YesButton>
                    <KUI.YesButton style={{marginLeft:'15px'}} onClick={this.toEditPage.bind(this)} label="Edit Email Template"></KUI.YesButton>
                </RC.Div>
            </form>
        );
    }

    toEditPage(){
        let {email_tpl} = this.getRefs();
        let val = email_tpl.getValue();
        if(!val){
            util.toast.showError('Please selete email template');
            return false;
        }

        util.goPath('/email/template/edit/'+val);
    }

    preview(){
        let {email_tpl} = this.getRefs();

        this.setState({
            email_template_id: email_tpl.getValue()
        });
        this.openModal();
    }

    renderModal(){
        let email_id = this.state.email_template_id;

        if(email_id === 'loading'){
            //show loading state
            return (
                <KUI.Modal
                    title="Preview Email"
                    ref="modal" >
                    {util.renderLoading()}

                </KUI.Modal>
            );
        }

        let {EmailTemplate} = this.defineDepModule();
        let html = null;
        if(email_id){
            html = decodeURIComponent(EmailTemplate.getDB().findOne({_id : email_id}).html);
            this.email_html.set(html);
        }

        return (
            <KUI.Modal onHide={this.hideModal.bind(this)}
                       title="Preview Email"
                       YesText="Send"
                       onYes={this.sendEmail.bind(this)}
                       ref="modal" >
                <article className="kg-article" dangerouslySetInnerHTML={{__html:html}}></article>

            </KUI.Modal>
        );
    }

    openModal(){
        this.refs.modal.show();
    }

    hideModal(){
        this.email_html.set(null);
        this.refs.modal.hide();
    }

    sendEmail(){
        let self = this;
        let {AdminUser, Email, EmailTemplate} = this.defineDepModule();


        let address = [];
        let o = util.getReactJQueryObject(this.refs.table).find('input[name="sml"]');

        o.each(function(){
            let oo = $(this);
            if(oo.prop('checked')){

                let name = _.find(self.data.filterList, function(one){
                    return one.email === oo.data('email');
                }).name;

                address.push({
                    user : name,
                    address : oo.data('email')
                });
            }
        });
        if(address.length < 1){
            util.toast.showError('Please select email you want send');
            return false;
        }

        _.each(address, (item)=>{
            let html = EmailTemplate.getHtml(this.state.email_template_id, item);

            Email.send({
                to : item.address,
                html : html,
                subject : EmailTemplate.getDB().findOne({_id:this.state.email_template_id}).name
            }, (flag, error)=>{
                if(flag){

                }
            });
        });


        _.delay(()=>{
            util.toast.alert('Send Email Success');
            this.hideModal();
        }, 500*address.length);




        this.setState({
            email_template_id : 'loading'
        });
    }
};
