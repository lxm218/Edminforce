
KUI.Home_login = KUI.Class.define('ui.Home_login', {

    initStyle : function(){


        return {
            h3 : {
                position : 'relative',
                top : '-10px',
                textAlign : 'center',
                marginBottom : '50px'
            },
            a : {
                marginTop : '50px'
            }
        };
    },

    login : function(e){
        var s = this.refs.school.getValue(),
            s1 = this.refs.user.getValue(),
            s2 = this.refs.pwd.getValue();

        alert(s+' - '+s1+' - '+s2);
    },

    getRender : function(style){

        return (
            <RB.Row>
                <RB.Col md={8} mdOffset={0}>
                    <form className="form-horizontal">
                        <h3 style={style.h3}>Employee Login</h3>
                        <RB.Input ref="school" type="text" label="School ID" labelClassName="col-xs-3" wrapperClassName="col-xs-9" />
                        <RB.Input ref="user" type="text" label="User ID" labelClassName="col-xs-3" wrapperClassName="col-xs-9" />
                        <RB.Input ref="pwd" type="password" label="Password" labelClassName="col-xs-3" wrapperClassName="col-xs-9" />

                        <KUI.YesButton onClick={this.login} top="50px" float="right" label="Login" />
                    </form>
                </RB.Col>
            </RB.Row>

        );

    }

}, 'Base');