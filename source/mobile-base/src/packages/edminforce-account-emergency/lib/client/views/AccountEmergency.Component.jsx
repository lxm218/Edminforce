{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.AccountEmergency = React.createClass({
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
                <RC.VerticalAlign center={true} className="padding" height="300px">
                    <h2>
                        Emergency Contact
                    </h2>
                </RC.VerticalAlign>
                <RC.Form onSubmit={this.submitForm.bind(this)} ref="form">
                    <RC.Input name="name" label="Name"/>
                    <RC.Input name="email" label="Email"/>
                    <RC.Input name="phone" label="Phone"/>
                    <RC.Input name="relative" label="Relative"/>
                    <RC.Checkbox name="receive" label="Receive Communications"/>

                    <RC.Button bgColor="brand2">Change Password</RC.Button>
                </RC.Form>
            </RC.Div>
        }
    });

}