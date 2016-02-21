{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.AccountAlternative = class extends RC.CSSMeteorData {

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
                alterContact: user&&user.alterContact
            }
        }
        submitForm(e) {
            e.preventDefault();
            // TODO change password

            var alterContact = this.refs.form.getFormData();

            if(alterContact.receive){
                alterContact.receive = true;
            }else{
                alterContact.receive = false;
            }

            console.log(alterContact);

            Meteor.call('SetAlternateContact', Meteor.userId(), alterContact, function(err, result){
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
                <RC.VerticalAlign center={true} className="padding" height="300px">
                    <h2>
                        Alternative Contact
                    </h2>
                </RC.VerticalAlign>
                <RC.Form onSubmit={this.submitForm.bind(this)} ref="form">
                    <RC.Input name="name" value={this.data.alterContact&&this.data.alterContact.name} label="Name"/>
                    <RC.Input name="email" value={this.data.alterContact&&this.data.alterContact.email} label="Email"/>
                    <RC.Input name="phone" value={this.data.alterContact&&this.data.alterContact.phone} label="Phone"/>
                    <RC.Input name="relation" value={this.data.alterContact&&this.data.alterContact.relation} label="Relative"/>
                    <RC.Checkbox name="receive" checked={this.data.alterContact&&this.data.alterContact.receive} label="Receive Communications"/>

                    <RC.Button bgColor="brand2">Change Password</RC.Button>
                </RC.Form>
            </RC.Div>
        }
    };

}