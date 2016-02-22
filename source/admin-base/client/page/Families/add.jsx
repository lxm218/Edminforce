KUI.Family_add = class extends RC.CSS{

    render(){
        return(
            <RC.Div>
                <h3>Add Family</h3>
                <hr/>
                <KUI.Family_add_comp ref="form" />
                <RC.Div style={{textAlign:'right'}}>
                    <KUI.YesButton onClick={this.save.bind(this)} label="Save"></KUI.YesButton>
                </RC.Div>
            </RC.Div>
        );
    }

    save(){
        let param = this.refs.form.getValue();
        console.log(param);

        let pwd = Meteor.uuid().substring(0, 8);
        param.password = pwd;
        console.log(pwd);

        KG.get('EF-Customer').insert(param, function(rs){
            KG.result.handle(rs, {
                success : function(){
                    util.goPath('/family');
                },
                error : function(e){
                    util.toast.showError(e.reason);
                }
            });
        });

    }
};