EdminForce.Components.AccountEmergency = class extends RC.CSS {
    constructor(p) {
        super(p);
        
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e) {
        e.preventDefault();
        var emergencyContact = this.refs.form.getFormData();
        this.props.actions.updateEmergency(emergencyContact);
    }
    
    render() {
        let style = {
            padding: '10px'
        };
        return <RC.Div style={style}>
            <RC.VerticalAlign center={true} className="padding" height="300px">
                <h2>Emergency Contact</h2>
            </RC.VerticalAlign>
            <RC.Form onSubmit={this.submitForm} ref="form">
                {EdminForce.utils.renderError(this.props.error)}
                <RC.Input name="name" value={this.props.emergencyContact.name} label="Name"/>
                <RC.Input name="email" value={this.props.emergencyContact.email} label="Email"/>
                <RC.Input name="phone" value={this.props.emergencyContact.phone} label="Phone"/>
                <RC.Input name="relation" value={this.props.emergencyContact.relation} label="Relation"/>
                <RC.Button bgColor="brand2">Update</RC.Button>
            </RC.Form>
        </RC.Div>
    }
};
