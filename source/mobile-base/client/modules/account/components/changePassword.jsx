/*
 * Change user password
 */

EdminForce.Components.AccountChangePassword = class extends RC.CSS {
    constructor(p) {
        super(p);

        this.state = {
            buttonActive: false
        }

        this.submitForm = this.submitForm.bind(this);
        this.checkButtonState = this.checkButtonState.bind(this);
    }

    submitForm(event) {
        event.preventDefault();
        let self = this;
        let form = this.refs.changePasswordForm.getFormData();
        this.props.actions.changePassword(form.oldPw, form.pw, form.pwRepeat);
    }

    checkButtonState(event) {
        var form = this.refs.changePasswordForm.getFormData() || {};
        let test = _.every(_.values(form), function (t) {
            return t.length && t.length > 0
        });
        this.setState({buttonActive: test});
    }

    render() {

        return (<RC.Div style={{padding:'10px'}}>
            <RC.Form onSubmit={this.submitForm} ref="changePasswordForm">
                {EdminForce.utils.renderError(this.props.error)}
                <RC.Input name="oldPw" type="password" label="Current Password" onChange={this.checkButtonState}/>
                <RC.Input name="pw" type="password" label="New Password" onChange={this.checkButtonState}/>
                <RC.Input name="pwRepeat" type="password" label="Repeat Password" onChange={this.checkButtonState}/>
                <RC.Button bgColor="brand2" disabled={this.props.waiting} active={this.state.buttonActive}>
                    {this.props.waiting ? <RC.uiIcon uiClass="circle-o-notch spin-slow"/> : "Change Password"}
                </RC.Button>
            </RC.Form>
        </RC.Div>)
    }
};
