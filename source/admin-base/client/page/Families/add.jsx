KUI.Family_add = class extends RC.CSSMeteorData{

    constructor(p){
        super(p);

        this.state = {
            loading : false
        };
    }

    getMeteorData(){
        let x = Meteor.subscribe('EF-School');

        return {
            ready : x.ready()
        };
    }

    render(){

        if(!util.user.checkPermission('customer', 'view')){
            return util.renderNoViewPermission();
        }


        return(
            <RC.Div>
                <h3>Add Family</h3>
                <hr/>
                <KUI.Family_add_comp type="add" ref="form" />
                <RC.Div style={{textAlign:'right'}}>
                    <KUI.YesButton ref="addBtn" onClick={this.save.bind(this)} label="Save"></KUI.YesButton>
                </RC.Div>
            </RC.Div>
        );
    }

    save(){
        let self = this;
        let param = this.refs.form.getValue();
        console.log(param);

        let pwd = Meteor.uuid().substring(0, 8);
        param.password = pwd;
        console.log(pwd);

        self.refs.addBtn.loading(true);
        KG.get('EF-Customer').insert(_.clone(param), function(rs){
            KG.result.handle(rs, {
                success : function(){

                    self.sendEmailToCustomer(param, function(){
                        util.toast.alert('Insert Success, and send password to ['+param.email+']');
                        self.refs.addBtn.loading(false);
                        util.goPath('/family');
                    });

                },
                error : function(e){
                    self.refs.addBtn.loading(false);
                    util.toast.showError(e.reason);
                }
            });
        });

    }

    getRegisterConfirmEmailTemplate(data){
        let school = KG.get('EF-School').getInfo();

        let tpl = [
            '<h3>Welcome ',data.name,'</h3>',
            '<p>Thank for creating an account. Your Login ID is your email and password is <b>',data.password,'</b></p>',
            '<p>Now it is a good time to login and change your password and update your profile.</p>',
            '<h4><a href="http://www.classforth.com" target="_blank">Login Your Account</a></h4>',

            '<br/><br/>',
            '<b>',school.name,'</b>'
        ].join('');

        return tpl;
    }

    sendEmailToCustomer(data, callback){
        let school = KG.get('EF-School').getInfo();
        let html = this.getRegisterConfirmEmailTemplate(data);

        let domain = school.domain || util.email.getDomain(school.email);
        //console.log(html);
        KG.get('EF-Email').send({
            from : `${school.email}`,
            to : data.email,
            html : html,
            subject : 'Thank for Creating an Account'
        }, function(flag, error){

            if(flag){

            }
            callback();

        })
    }
};
