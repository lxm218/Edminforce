
KUI.Home_change_password = KUI.Class.define('ui.Home_change_password', {

    initStyle : function(){
        return {
            h3 : {
                position : 'relative',
                top : '-10px',
                textAlign : 'center',
                marginBottom : '50px'
            }
        };
    },

    submit : function(){
        var s1 = this.refs.oldPwd.getValue(),
            s2 = this.refs.pwd1.getValue(),
            s3 = this.refs.pwd2.getValue();
        var rs = KG.get('EF-AdminUser').changePassword({
            oldPassword : s1,
            newPassword : s2,
            newPassword2 : s3
        });

        KG.result.handle(rs, {
            success : function(data){
                alert(data);
            }
        });
    },

    getRender : function(style){

        return (
            <RB.Row>
                <RB.Col md={10} mdOffset={0}>
                    <form className="form-horizontal">
                        <h3 style={style.h3}>Change Password</h3>
                        <RB.Input ref="oldPwd" type="password" label="Old Password" labelClassName="col-xs-4" wrapperClassName="col-xs-8" />
                        <RB.Input ref="pwd1" type="password" label="New Password" labelClassName="col-xs-4" wrapperClassName="col-xs-8" />
                        <RB.Input ref="pwd2" type="password" label="Retype New Password" labelClassName="col-xs-4" wrapperClassName="col-xs-8" />

                        <KUI.YesButton onClick={this.submit} top="20px" float="right" label="Save Changes" />
                    </form>
                </RB.Col>
            </RB.Row>
        );
    }
}, 'Base');