
KUI.Email_index = class extends KUI.Page{

    constructor(p){
        super(p);

        this.state = {
            email_template_id : null
        };

        this.email_html = new ReactiveVar(null);
    }

    defineDepModule(){
        return {
            AdminUser : KG.get('EF-AdminUser'),
            Email : KG.get('EF-Email'),
            EmailTemplate : KG.get('EF-EmailTemplate')
        };
    }
    getMeteorData(){
        let {AdminUser, EmailTemplate} = this.defineDepModule();

        let x = Meteor.subscribe('EF-EmailTemplate'),
            emailTemplateList = EmailTemplate.getDB().find({}, {sort:{updateTime:-1}}).fetch();

        let y = Meteor.subscribe('EF-AdminUser');

        return {
            ready : x.ready() && y.ready(),
            emailTemplateList
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

                {this.renderModal()}
            </RC.Div>
        );
    }

    getRefs(){
        return {
            email_tpl : this.refs.email_tpl
        };
    }

    renderFilterBox(){

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
        let address = AdminUser.getAll({_id : Meteor.userId()})[0].email;
        console.log(address);

        Email.send({
            to : address,
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