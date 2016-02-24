
KUI.Email_index = class extends KUI.Page{

    constructor(p){
        super(p);

        this.state = {
            email_template_id : null,
            filterQuery : {}
        };

        this.email_html = new ReactiveVar(null);
    }

    defineDepModule(){
        return {
            AdminUser : KG.get('EF-AdminUser'),
            Email : KG.get('EF-Email'),
            EmailTemplate : KG.get('EF-EmailTemplate'),
            Customer : KG.get('EF-Customer'),
            Session : KG.get('EF-Session')
        };
    }
    getMeteorData(){
        let {AdminUser, EmailTemplate, Customer, Session} = this.defineDepModule();

        let x = Meteor.subscribe('EF-EmailTemplate'),
            emailTemplateList = EmailTemplate.getDB().find({}, {sort:{updateTime:-1}}).fetch();

        let y = Meteor.subscribe('EF-AdminUser');

        let cx = Customer.subscribeByClassQuery(this.state.filterQuery);
        //console.log(cx.ready(), cx.data);

        let sx = Meteor.subscribe('EF-Session');

        return {
            ready : x.ready() && y.ready(),
            emailTemplateList,
            filterReady : cx.ready(),
            filterList : cx.data,

            filterBoxReady : sx.ready(),
            sessionList : Session.getDB().find().fetch()
        };
    }

    render(){
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
                    <RC.URL style={sy.url} href="/email/template/add">Add Email Template</RC.URL>
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

        let p = {
            session : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-9',
                ref : 'session',
                label : 'Session'
            }
        };

        let option = {
            session : this.data.sessionList
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
                    </RB.Col>
                    <RB.Col xs={6}>
                    </RB.Col>

                </RB.Row>
                <RC.Div style={{textAlign:'right'}}>
                    <KUI.YesButton onClick={this.search.bind(this)} label="Confirm Search"></KUI.YesButton>
                </RC.Div>
            </form>
        );
    }

    search(){
        let {session} = this.getRefs();

        let query = {
            sessionID : session.getValue()
        };

        this.setState({
            filterQuery : query
        });
    }

    renderFilterResult(){
        if(!this.data.filterReady){
            return util.renderLoading();
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
                    return <label style={sy}><input type="checkbox" name="sml" data-email={item.email} /></label>
                }
            }
        ];

        return (
            <KUI.Table
                style={{}}
                list={this.data.filterList}
                title={titleArray}
                ref="table"></KUI.Table>
        );
    }

    getRefs(){
        return {
            email_tpl : this.refs.email_tpl,
            session : this.refs.session
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
                </RC.Div>
            </form>
        );
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
        let {AdminUser, Email} = this.defineDepModule();
        let address = [];
        let o = util.getReactJQueryObject(this.refs.table).find('input[name="sml"]');
        console.log(o)
        o.each(function(){
            if($(this).prop('checked')){
                address.push($(this).data('email'));
            }
        });
        if(address.length < 1){
            util.toast.showError('Please select email you want send');
            return false;
        }

        Email.send({
            to : address.join(';'),
            html : this.email_html.get(),
            text : this.email_html.get(),
            subject : 'Test Email'
        }, (flag, error)=>{
            if(flag){
                util.toast.alert('Send Email Success');
                this.hideModal();
            }
        });

        this.setState({
            email_template_id : 'loading'
        });
    }
};