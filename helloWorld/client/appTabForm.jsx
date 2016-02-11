

AppTabForm = React.createClass({
    submitForm(e) {
        e.preventDefault()
        let formData = this.refs.form.getFormData()
        let msg = `Hello, my name is ${formData.fullName}. My hair is ${formData.hair} and my eyes are ${formData.eye}. ${formData.bio}`
        alert(msg)
    },

    formReset(e) {
        e.preventDefault()
        this.refs.input1.reset()
        this.refs.input2.reset()
        this.refs.input3.reset()
        this.refs.input4.reset()
    },

    render() {
        let options = [
            "Brown",
            "Blue",
            "Green",
            "Yellow"
        ]

        return (
            <RC.Div>
                <RC.Form onSubmit={this.submitForm} onReset={this.formReset} ref="form">
                    <RC.Input name="fullName" value="John Doe" label="Full Name" ref="input1" />
                    <RC.Input name="hair" value="Black" label="Hair Color" ref="input2" />
                    <RC.Select name="eye" options={options} value="Brown" label="Eye Color" ref="input3" />
                    <RC.Textarea name="bio" label="Description" ref="input4">
                    And my favorite color is blue.
                    </RC.Textarea>
                    <RC.Button theme="inline" bgColor="brand1">Submit</RC.Button>
                    <RC.Button theme="inline" type="reset">Reset</RC.Button>
                </RC.Form>
            </RC.Div>
        )
    }
})
