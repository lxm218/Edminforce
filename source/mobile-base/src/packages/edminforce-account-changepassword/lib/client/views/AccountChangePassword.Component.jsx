{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.AccountChangePassword = class extends RC.CSSMeteorData {

        constructor(p) {
            super(p);

            this.state = {
                buttonActive: false,
                waiting: false,
                msg: null
            }
        }

        getMeteorData() {

            return {
                isReady: true
            }
        }

        submitForm(event) {
            console.log("submiteForm");
            event.preventDefault();
            // TODO change password

            let self = this
            let form = this.refs.changePasswordForm.getFormData()

            if (form.pw == form.pwRepeat) {
                //if (!App.checkPassword(form.pw)) {
                //    this.setState({
                //        msg: "Password shoud have at least 8 characters, containing Capital Letters AND Numbers.",
                //        waiting: false
                //    })
                //    return
                //};
                // Reset Account Password using token
                this.setState({waiting: true})
                Accounts.changePassword(
                    form.oldPw,
                    form.pw,
                    function (err) {
                        let passedMsg = err && err.error ? err.reason : <p>Password Changed Successfully!</p>
                        if (!err) {
                            //self.clearForm()
                            FlowRouter.go('/account');
                            return;
                        }
                        self.setState({
                            msg: passedMsg
                        });
                        self.setState({waiting: false})
                    })
            } else {
                this.setState({msg: "Your passwords did not match, please try again."})
                this.setState({waiting: false})
            }

        }

        printMsg() {
            console.log("printMsg is called")
            let currentMessages = this.state.msg ? [this.state.msg] : []
            return <div>
                {
                    currentMessages.map(function (m, n) {
                        return <div className="center" key={n}>
                            <div className="bigger inline-block invis-70 red">
                                {_.isString(m) ? <div>{m}</div> : m}
                            </div>
                        </div>
                    })
                }
            </div>
        }

        checkButtonState(event) {
            var form = this.refs.changePasswordForm && this.refs.changePasswordForm.getFormData() || {}
            let test = _.every(_.values(form), function (t) {
                return t.length && t.length > 0
            })
            let pwMatch = form.pw == form.pwRepeat
            if (test && pwMatch) {
                this.setState({msg: null, waiting: false, buttonActive: true})
            } else if (test && !pwMatch) {
                this.setState({
                    msg: "Your passwords did not match, please try again.",
                    waiting: false,
                    buttonActive: false
                })
            } else {
                this.setState({buttonActive: false})
            }
        }

        render() {

            let style = {
                padding: '10px'
            };

            return <RC.Div style={style}>
                <RC.Form onSubmit={this.submitForm.bind(this)} onKeyUp={this.checkButtonState.bind(this)} ref="changePasswordForm">
                    {this.printMsg()}
                    <RC.Input name="oldPw" label="Current Password"/>
                    <RC.Input name="pw" label="New Password"/>
                    <RC.Input name="pwRepeat" label="Repeat Password"/>
                    <RC.Button bgColor="brand2" disabled={this.state.waiting} active={this.state.buttonActive}>
                        {this.state.waiting ? <RC.uiIcon uiClass="circle-o-notch spin-slow"/> : "Change Password"}
                    </RC.Button>
                </RC.Form>
            </RC.Div>
        }
    };

}