
KUI.Setting_changePassword = class extends RC.CSS{

    render(){
        return(
            <RC.Div>
                <h3>Change Password</h3>
                <hr/>
                {this.renderForm()}
            </RC.Div>
        );
    }

    getRefs(){
        return {
            oldPwd : this.refs.oldPwd,
            newPwd : this.refs.newPwd1,
            confirmPwd : this.refs.newPwd2
        };
    }

    renderForm(){
        let p = {
            old : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'oldPwd',
                label : 'Old Password'
            },
            new1 : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'newPwd1',
                label : 'New Password'
            },
            new2 : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'newPwd2',
                label : 'Retype New Password'
            }
        };

        return (
            <form className="form-horizontal">
                <RB.Row>
                    <RB.Col md={10} mdOffset={0}>
                        <RB.Input type="password" {... p.old} />
                        <RB.Input type="password" {... p.new1} />
                        <RB.Input type="password" {... p.new2} />

                        <RC.Div style={{textAlign:'right'}}>
                            <KUI.YesButton onClick={this.save.bind(this)} label="Save Change"></KUI.YesButton>
                        </RC.Div>
                    </RB.Col>
                </RB.Row>
            </form>
        );
    }

    save(){
        let {oldPwd, newPwd, confirmPwd} = this.getRefs();
        let opts = {
            oldPassword : oldPwd.getValue(),
            newPassword : newPwd.getValue(),
            confirmPassword : confirmPwd.getValue(),

            success : function(){
                util.toast.alert('Change Password Success');
                util.goPath('/setting');
            },
            error : function(error){
                util.toast.showError(error.reason);
            }
        };

        KG.Account.changePassword(opts);
    }
};