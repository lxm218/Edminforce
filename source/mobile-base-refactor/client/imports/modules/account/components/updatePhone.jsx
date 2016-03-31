/*
 * Update user phone number
 */
EdminForce.Components.AccountUpdatePhone = class extends RC.CSS {

    constructor(p) {
        super(p);

        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e) {
        e.preventDefault();
        this.props.actions.updatePhone(this.refs.form.getFormData().phone);
    }

    render() {
        return (<RC.Div style={{padding:'10px'}}>
                    <RC.Form onSubmit={this.submitForm} ref="form">
                        {EdminForce.utils.renderError(this.props.error)}
                        <RC.Input name="phone" value={this.props.customer && this.props.customer.phone && this.props.customer.phone} label="New Phone Number" />
                        <RC.Button bgColor="brand2">Update</RC.Button>
                    </RC.Form>
                </RC.Div>)
    }
};
