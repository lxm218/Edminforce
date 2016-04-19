let _ = lodash;
let {
    Checkbox
    } = MUI;

EdminForce.Components.AccountAlternative = class extends RC.CSS {

    constructor(p) {
        super(p);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e) {
        e.preventDefault();
        var alterContact = this.refs.form.getFormData();
        alterContact.receive = !!alterContact.receive;
        this.props.actions.updateAlternative(alterContact);
    }

    render() {
        let style = {
            padding: '10px'
        };
        let checked = (this.props.alternativeContact.receive.toString() === 'true');

        //{checked ? <RC.Checkbox name="receive" checked label="Receive Communications"/> : <RC.Checkbox name="receive" label="Receive Communications"/>}
        return <RC.Div style={style}>
            <RC.VerticalAlign center={true} className="padding" height="300px">
                <h2>Alternative Contact</h2>
            </RC.VerticalAlign>
            <RC.Form onSubmit={this.submitForm} ref="form">
                {EdminForce.utils.renderError(this.props.error)}
                <RC.Input name="name" value={this.props.alternativeContact.name} label="Name"/>
                <RC.Input name="email" value={this.props.alternativeContact.email} label="Email"/>
                <RC.Input name="phone" value={this.props.alternativeContact.phone} label="Phone"/>
                <RC.Input name="relation" value={this.props.alternativeContact.relation} label="Relation"/>
                <RC.Checkbox name="receive" checked={checked} label="Receive Communications"/>
                <RC.Button bgColor="brand2">Update</RC.Button>
            </RC.Form>
        </RC.Div>
    }
};