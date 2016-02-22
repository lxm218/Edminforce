KUI.Family_add = class extends RC.CSS{

    constructor(p){
        super(p);

        this.state = {
            loading : false
        };
    }

    render(){
        return(
            <RC.Div>
                <h3>Add Family</h3>
                <hr/>
                <KUI.Family_add_comp ref="form" />
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

    sendEmailToCustomer(data, callback){
        KG.get('EF-Email').send({
            to : data.email,
            html : `<h3>Welcome ${data.name}</h3><p>Password : ${data.password}</p>`,
            subject : 'Come from EdiminFroce'
        }, function(flag, error){

            if(flag){
                callback();
            }

        })
    }
};