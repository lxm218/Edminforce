
IH.RC.Form.SignIn = React.createClass({
  mixins: [RC.Mixins.PureRender, RC.Mixins.CSS, ReactMeteorData],
  displayName: "IH-SignIn",

  propTypes: {
    fullHeight: React.PropTypes.bool,
    noHeader: React.PropTypes.bool,
    alignTop: React.PropTypes.bool,
    bgColor: React.PropTypes.string,
    //registerCallback: React.PropTypes.func,

    onSubmit: React.PropTypes.func,
    onSuccess: React.PropTypes.func,

    // Common Props
    theme: React.PropTypes.string,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
  },

  getMeteorData() {
    let formInstance = IH.Accounts.Form.SignIn;

    // Tracker?


    return {
      fields: formInstance.getAllFields(),

    }
  },

  checkButtonState() {
    return
  },

  resetForm() {
    this.refs.form.resetForm();
  },

  onSubmit() {
    if (_.isFunction(this.props.onSubmit))
      this.props.onSubmit()




  },

  renderMsg() {

  },

  renderForm() {

    let inputProps = {
      theme: ["stacked-label","overlay"],
      //borderColor: this.color.textColor,
      labelColor: this.color.isDark ? "rgba(255,255,255,.5)" : "rgba(15,15,15,.5)",
      labelColorFocus: this.color.textColor,
      borderColor: this.color.isDark ? "rgba(255,255,255,.5)" : "rgba(15,15,15,.5)",
      color: this.color.textColor,
      autoCapitalize: "off", autoCorrect: "off",
      inputStyle: this.css.styles.input
    };

    let buttonProps = {
      name: "button",
      bgColor: this.color.isDark ? "rgba(0,0,0,.2)" : "rgba(0,0,0,.15)",
      bgColorHover: this.color.isDark ? RC.Theme.color.white : RC.Theme.color.dark,
      color: this.color.textColor,
      colorHover: this.color.isDark ? RC.Theme.color.dark : RC.Theme.color.white,
      disabled: this.state.waiting
    };


    let formSchema = this.data.schema;
    let formFields = this.data.fields;
    let formData = this.getFormData();  // Tracker ?

    return <RC.Form onSubmit={this.onSubmit} onKeyUp={this.checkButtonState} ref="form">
      {
        _.map(formFields, function(field) {
          let extendedProps = {
            name: field,
            label: formSchema.label(field),
            //type: formSchema.inputType(field)

            validations() {
              return this.validateOneField(formData, field)
            }
          };

          return <RC.Input {... Object.assign({}, inputProps, extendedProps)} />
        })
      }


      <RC.Input {... Object.assign({}, inputProps, {name: "username", label: "Username"})} />
      <RC.Input {... Object.assign({}, inputProps, {name: "email", label: "E-Mail"})} />
      <RC.Input {... Object.assign({}, inputProps, {name: "pw", label: "Password", type: "password"})} />
      <RC.Input {... Object.assign({}, inputProps, {name: "pwRepeat", label: "Repeat Password", type: "password"})} />

      <RC.Button {... buttonProps} ref="button">
        {this.state.waiting ? <RC.uiIcon uiClass="circle-o-notch spin-slow" uiSize={24} uiColor={this.color.hex} theme="absCenter" /> : "Sign Up"}
      </RC.Button>
    </RC.Form>
  },



  render() {
    return <div>
      {
      // no animation
      }
      <RC.Div {... this.props} bgColor={this.props.bgColor || "white"} theme="abs-full">
        <div style={styles.vo}>
          <div style={styles.vi}>
            <div style={styles.form}>

              <div style={styles.content}>
                {this.props.children}
              </div>

              {this.renderForm()}
              {
                this.props.disableSwitch ? null :
                  <p style={{textAlign: "center"}}>
                    <RC.URL style={styles.url} color={linkColor} colorHover={linkColorHover} onClick={this.switchAction}>
                      {this.state.action=="register" ? "Log-in with an existing account" : "Create a new account"}
                    </RC.URL>
                  </p>
              }
            </div>
          </div>
        </div>
      </RC.Div>
    </div>

  },

  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchProps: ["noHeader"],
  baseStyles(np,ns) {
    let navSize = RC.headerNavHeight || RC.Theme.size.topNavHeight || 0
    return {
      vo: RC.cssMixins.verticalAlignOuter,
      vi: RC.cssMixins.verticalAlignInner,
      msg: Object.assign({}, RC.cssMixins.absFull, RC.cssMixins.verticalAlignOuter, {
        minHeight: "100vh",
        zIndex: 1000,
        backgroundColor: this.color.hex, color: this.color.textColor
      }),
      msgInner: Object.assign({}, RC.cssMixins.verticalAlignInner, {textAlign: "center"}),
      form: {
        maxWidth: 300, margin: "0 auto", padding: 10,
      },
      content: {
        maxWidth: 230, padding: "0 0 50px", margin: "0 auto"
      },
      url: {
        fontSize: RC.Theme.font.size-2,
        display: "inline-block", padding: 5,
      },
      input: {
        padding: "5px 0",
      }
    }
  },



});
