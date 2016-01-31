{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.AccountUpdatePhone = React.createClass({

        submitForm(e) {
            e.preventDefault();
            // TODO change password

            FlowRouter.go('/account');
        },
        render() {

            let style = {
                padding: '10px'
            };

            return <RC.Div style={style}>
                <RC.Form onSubmit={this.submitForm.bind(this)} ref="form">
                    <RC.Input name="phone" label="New Phone Number"/>
                    <RC.Button bgColor="brand2">Update</RC.Button>
                </RC.Form>
            </RC.Div>
        }
    });

}