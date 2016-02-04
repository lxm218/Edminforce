KUI.Header = KUI.Class.define('ui.Header', {


    getBeforeLogin : function(){

        return <RB.Nav pullRight>
            <RB.NavItem eventKey={2} href="/home/login">Login</RB.NavItem>
        </RB.Nav>;
    },
    getAfterLogin : function(user){
        var style = {
            marginLeft : '10px'
        };

        return <RB.Nav pullRight>
            <RB.Navbar.Text eventKey={1}>Welcome <b style={style}>{user.username}</b></RB.Navbar.Text>
            <RB.NavItem eventKey={2} onClick={this.logout}>Logout</RB.NavItem>
        </RB.Nav>;
    },

    logout : function(){

        Meteor.logout(function(){
            util.goPath('/home/login');
        });

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