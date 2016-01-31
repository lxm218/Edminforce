{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.AccountChangePassword = React.createClass({

        submitForm(e) {
            e.preventDefault();
            // TODO change password

            FlowRouter.go('/account');
        },
        render() {

            let style={
                padding: '10px'
            };

            return <RC.Div style={style}>
                <RC.Form onSubmit={this.submitForm.bind(this)} ref="form">
                    <RC.Input name="current" label="Current Password"/>
                    <RC.Input name="new" label="New Password"/>
                    <RC.Input name="repeat" label="Repeat Password"/>
                    <RC.Button bgColor="brand2">Change Password</RC.Button>
                </RC.Form>
            </RC.Div>
        }
    });

}