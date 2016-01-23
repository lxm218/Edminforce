
KUI.Home_index = KUI.Class.define('ui.Home_index', {

    initStyle : function(){


        return {

        };
    },

    getTableBody : function(){
        var user = KG.user.current;

        return (
            <tbody>
                <tr>
                    <td>Name</td>
                    <td>{user.userProfile.nickName}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{user.userID}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Title</td>
                    <td>{user.userProfile.title}</td>
                    <td></td>
                </tr>

            </tbody>
        );
    },

    toChangePassword : function(){
        FlowRouter.go('/home/changepassword');
    },



    getRender : function(style){

        return (
            <div>
                <RB.Table striped bordered condensed hover>

                    {
                        this.getTableBody()
                    }
                </RB.Table>

                <RB.ButtonToolbar>
                    <RB.Button onClick={this.toChangePassword} bsStyle="primary">Change Password</RB.Button>
                </RB.ButtonToolbar>
            </div>
        );

    }

}, 'Base');