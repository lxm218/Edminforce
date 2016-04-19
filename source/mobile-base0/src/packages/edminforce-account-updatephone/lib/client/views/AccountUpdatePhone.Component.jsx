{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.AccountUpdatePhone = class extends RC.CSSMeteorData {

        constructor(p) {
            super(p);
        }

        getMeteorData() {

            let handler = Meteor.subscribe("EF-UserData");
            let customer = EdminForce.Collections.Customer.find({
                _id : Meteor.userId()
            }).fetch();
            customer = customer && customer[0];

            return {
                isReady: handler.ready(),
                user: customer
            }
        }

        submitForm(e) {
            e.preventDefault();
            // TODO change password

            var phone = this.refs.form.getFormData().phone;

            Meteor.call('SetPhone', Meteor.userId(), phone, function(err, result){
                if(err){

                }else{
                    FlowRouter.go('/account');
                }
            });
        }

        render() {

            let style = {
                padding: '10px'
            };

            return <RC.Div style={style}>
                <RC.Form onSubmit={this.submitForm.bind(this)} ref="form">
                    <RC.Input name="phone" value={this.data.user&&this.data.user.phone&&this.data.user.phone} label="New Phone Number"/>
                    <RC.Button bgColor="brand2">Update</RC.Button>
                </RC.Form>
            </RC.Div>
        }
    };

}