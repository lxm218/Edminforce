
App.FormEx1 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
  React.createClass({@br\
    submitForm(e) {@br\
      e.preventDefault();@br\
      let formData = this.refs.form.getFormData();@br\
      let msg = "Hello, my name is "+formData.fullName+". @br\
        My hair is "+formData.hair+" @br\
        and my eyes are "+formData.eye+". "@br\
        +formData.bio;@br\
      alert(msg);@br\
    },@br\
    render() {@br\
      let options = [@br\
        "Brown",@br\
        "Blue",@br\
        "Green",@br\
        "Yellow"@br\
      ]@br\
      return <RC.Form onSubmit={this.submitForm} ref="form">@br\
        <RC.Input name="fullName" value="John Doe" label="Full Name" />@br\
        <RC.Input name="hair" value="Black" label="Hair Color" />@br\
        <RC.Select name="eye" options={options} value="Brown" label="Eye Color" />@br\
        <RC.Textarea name="bio" label="Description">@br\
          And my favorite color is blue.@br\
        </RC.Textarea>@br\
@br\
        <RC.Button theme="inline" bgColor={this.props.platform=="mobile" ? "brand2" : "brand1"}>Submit</RC.Button>@br\
        <RC.Button theme="inline" type="reset">Reset</RC.Button>@br\
      </RC.Form>@br\
    },@br\
  })'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    renderSnippet() {
      let code = null
      switch (this.props.snippet) {
        case 0:
        code = `\
this.refs.NAME.getFormData();@br\
{@br\
  fullName: "John Doe",@br\
  hair: "Black",@br\
  eye: "Brown",@br\
  description: "And my favorite color is blue.",@br\
}`
        break
      }
      if (code)
        return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
      return null
    },
    submitForm(e) {
      e.preventDefault()
      let formData = this.refs.form.getFormData()
      let msg = `Hello, my name is ${formData.fullName}. My hair is ${formData.hair} and my eyes are ${formData.eye}. ${formData.bio}`
      alert(msg)
    },
    renderExample() {
      let options = [
        "Brown",
        "Blue",
        "Green",
        "Yellow"
      ]
      return <RC.Form onSubmit={this.submitForm} ref="form">
        <RC.Input name="fullName" value="John Doe" label="Full Name" />
        <RC.Input name="hair" value="Black" label="Hair Color" />
        <RC.Select name="eye" options={options} value="Brown" label="Eye Color" />
        <RC.Textarea name="bio" label="Description">
          And my favorite color is blue.
        </RC.Textarea>

        <RC.Button theme="inline" bgColor={this.props.platform=="mobile" ? "brand2" : "brand1"}>Submit</RC.Button>
        <RC.Button theme="inline" type="reset">Reset</RC.Button>
      </RC.Form>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
