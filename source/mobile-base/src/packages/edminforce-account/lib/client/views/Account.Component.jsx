{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.Account = React.createClass({
        changePassword(){
          FlowRouter.go("/account/changepassword");
        },

        updatePhone(){
          FlowRouter.go("/account/updatephone");
        },

        addStudent(){
            FlowRouter.go("/account/addstudent");
        },

        updateAlternateContact(){
            FlowRouter.go("/account/alternative");
        },

        updateEmergencyContact(){
            FlowRouter.go("/account/emergency");
        },


        render: function () {

            // Fill with your UI
            return (
                <RC.Div>

                    <RC.VerticalAlign center={true} className="padding" height="300px">
                        <h1>
                            Account Settings
                        </h1>
                    </RC.VerticalAlign>

                    <RC.List>
                        <RC.Item theme="divider" title="Name" subtitle="Yan Lin"></RC.Item>
                        <RC.Item theme="divider" title="Email" subtitle="linyang@gmail.com"></RC.Item>
                        <RC.Item theme="divider" title="Password">
                            <RC.Button bgColor="brand2" bgColorHover="dark" onClick={this.changePassword}>Update</RC.Button>
                        </RC.Item>
                        <RC.Item theme="divider" title="Phone" subtitle="11111111111">
                            <RC.Button bgColor="brand2" theme="inline" bgColorHover="dark" onClick={this.updatePhone}>Update</RC.Button>
                        </RC.Item>
                        <RC.Item theme="divider" title="Students">
                            <RC.Button theme="inline" bgColorHover="dark">Allison Yu</RC.Button>
                            <RC.Button theme="inline" bgColorHover="dark">Mark Wang</RC.Button>
                            <RC.Button bgColor="brand2" theme="inline" bgColorHover="dark" onClick={this.addStudent}>+</RC.Button>
                        </RC.Item>
                        <RC.Item theme="divider" title="Alternative Contact" subtitle="Yan Lin">
                            <RC.Button bgColor="brand2" theme="inline" bgColorHover="dark" onClick={this.updateAlternateContact}>Update</RC.Button>
                        </RC.Item>
                        <RC.Item theme="divider" title="Emergency Contact" subtitle="Yan Lin">
                            <RC.Button bgColor="brand2" theme="inline" bgColorHover="dark" onClick={this.updateEmergencyContact}>Update</RC.Button>
                        </RC.Item>
                    </RC.List>

                </RC.Div>
            );
        }
    });

}