{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.AccountUpdatePhone = class extends RC.CSSMeteorData {

        constructor(p) {
            super(p);
        }

        getMeteorData() {

            let handler = null;

            //let programID =
            Tracker.autorun(function () {
                handler = Meteor.subscribe("EF-UserData");
            }.bind(this));

            let user = Meteor.user();

            return {
                isReady: handler.ready(),
                user: user
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
                    <RC.Input name="phone" value={this.data.user&&this.data.user.profile&&this.data.user.profile.phone} label="New Phone Number"/>
                    <RC.Button bgColor="brand2">Update</RC.Button>
                </RC.Form>
            </RC.Div>
        }
    };

}