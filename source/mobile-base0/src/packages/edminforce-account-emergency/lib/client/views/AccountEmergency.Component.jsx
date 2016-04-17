{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.AccountEmergency = class extends RC.CSSMeteorData {

        constructor(p) {
            super(p);
        }

        getMeteorData() {

            let handler = null;

            //let programID =
            Tracker.autorun(function () {
                handler = Meteor.subscribe("EF-UserData");
            }.bind(this));

            let user = EdminForce.Collections.Customer.find({
                _id : Meteor.userId()
            }).fetch();

            if(_.isArray(user)){
                user = user[0];
            }

            return {
                isReady: handler.ready(),
                emergencyContact: user&&user.emergencyContact
            }
        }
        submitForm(e) {
            e.preventDefault();
            // TODO change password

            var emergencyContact = this.refs.form.getFormData();

            if(emergencyContact.receive){
                emergencyContact.receive = true;
            }else{
                emergencyContact.receive = false;
            }

            Meteor.call('SetEmergencyContact', Meteor.userId(), emergencyContact, function(err, result){
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
                        Emergency Contact
                    </h2>
                </RC.VerticalAlign>
                <RC.Form onSubmit={this.submitForm.bind(this)} ref="form">
                    <RC.Input name="name" value={this.data.emergencyContact&&this.data.emergencyContact.name} label="Name"/>
                    <RC.Input name="email" value={this.data.emergencyContact&&this.data.emergencyContact.email} label="Email"/>
                    <RC.Input name="phone" value={this.data.emergencyContact&&this.data.emergencyContact.phone} label="Phone"/>
                    <RC.Input name="relation" value={this.data.emergencyContact&&this.data.emergencyContact.relation} label="Relation"/>
                    

                    <RC.Button bgColor="brand2">Update</RC.Button>
                </RC.Form>
            </RC.Div>
        }
    };

}
