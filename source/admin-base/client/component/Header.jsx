KUI.Header = KUI.Class.define('ui.Header', {


    getBeforeLogin : function(){
        let sy = {
            marginTop : '8px',
            marginLeft : '15px'
        };

        return <RB.Nav pullRight>
            <KUI.NoButton style={sy} onClick={function(){}} label="Login"></KUI.NoButton>
        </RB.Nav>;
    },
    getAfterLogin : function(user){
        var style = {
            marginLeft : '10px'
        };
        let sy = {
            marginTop : '8px',
            marginLeft : '15px'
        };

        return <RB.Nav pullRight>
            <RB.Navbar.Text eventKey={1}>Welcome <b style={style}>{user.username}</b></RB.Navbar.Text>
            <KUI.NoButton onClick={this.toSetting} style={sy} label="Settings"></KUI.NoButton>
            <KUI.NoButton style={sy} onClick={this.logout} label="Logout"></KUI.NoButton>
        </RB.Nav>;
    },

    logout : function(){

        let user = Meteor.user();

        Meteor.logout(function(){

            //add log
            KG.RequestLog.addByType('logout', {
                operatorID : user._id,
                operatorName : user.username
            });

            util.goPath('/home/login');
        });

    },

    toSetting(){
        util.goPath('/setting');
    },

    getRender : function(){

        var user = KG.Account.checkIsLogin();

        return (<RB.Navbar>
            <RB.Navbar.Header>
                <RB.Navbar.Brand>
                    <a href="/home">Edmin Force</a>
                </RB.Navbar.Brand>
                <RB.Navbar.Toggle />

            </RB.Navbar.Header>
            <RB.Navbar.Collapse>
                {user?this.getAfterLogin(user):this.getBeforeLogin()}
            </RB.Navbar.Collapse>
        </RB.Navbar>);
    }
}, 'Base');