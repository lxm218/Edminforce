
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
        let s1 = this.refs.user.getValue(),
            s2 = this.refs.pwd.getValue();

        let md = KG.get('EF-AdminUser'),
            rs = md.login({
                userID : s1,
                password : s2
            });
        KG.result.handle(rs, {
            success : function(data){
                console.log(data.userProfile);
            },
            error : function(data, err){
                alert(err.statusText);
            }
        });
    },

    getRender : function(style){

        return (
            <RB.Row>
                <RB.Col md={8} mdOffset={0}>
                    <form className="form-horizontal">
                        <h3 style={style.h3}>Employee Login</h3>
                        <RB.Input ref="user" type="text" label="User ID" labelClassName="col-xs-3" wrapperClassName="col-xs-9" />
                        <RB.Input ref="pwd" type="password" label="Password" labelClassName="col-xs-3" wrapperClassName="col-xs-9" />

                        <KUI.YesButton onClick={this.login} top="50px" float="right" label="Login" />
                    </form>
                </RB.Col>
            </RB.Row>

        );

    }

}, 'Base');