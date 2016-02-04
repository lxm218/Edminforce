
KUI.Home_login = class extends KUI.Page{

    getMeteorData(){

        return {
            data : ''
        };
    }


    baseStyles(){


        return {
            h3 : {
                position : 'relative',
                top : '-10px',
                textAlign : 'center',
                marginBottom : '50px'
            },
            a : {
                marginTop : '50px'
            },
            ml : {
                marginLeft : '20px'
            }
        };
    }

    login(e){
        let s1 = this.refs.username.getValue(),
            s2 = this.refs.pwd.getValue();

        KG.Account.login({
            username : s1,
            password : s2,
            success : function(user){
                console.log(user);

                let url = Session.get(KG.const.CACHELOGINPATH);
                util.goPath(url || '/home');
            }
        });


    }

    render(){

        let style = this.css.get('styles');

        let p = {
            username : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-9',
                ref : 'username',
                label : 'User ID'
            },
            password : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-9',
                ref : 'pwd',
                label : 'Password'
            }
        };

        const sy = {
            a : {
                cursor : 'pointer'
            }
        };

        return (
            <RC.Div>
                <h3>Employee Login</h3>
                <hr/>
                <RB.Row>
                    <RB.Col md={8} mdOffset={0}>
                        <form className="form-horizontal">
                            <RB.Input type="text" {... p.username} />
                            <RB.Input type="password" {... p.password} />

                        </form>
                        <RC.Div style={{textAlign:'right'}}>
                            <RC.URL style={sy.a}><p>Forgot password?</p></RC.URL>
                            <KUI.YesButton style={style.ml} onClick={this.login.bind(this)} label="Login"></KUI.YesButton>
                        </RC.Div>
                    </RB.Col>
                </RB.Row>


            </RC.Div>
        );


    }

};