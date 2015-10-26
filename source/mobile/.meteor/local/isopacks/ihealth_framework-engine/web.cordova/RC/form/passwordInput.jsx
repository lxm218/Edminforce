let themes_input = ["stacked-label","small-label","overlay-light","overlay-dark"]
RC.PasswordInput = React.createClass({
  mixins: [RC.Mixins.Theme],
  themeGroup: "item",
  themes: themes_input,

  propTypes: {
    id: React.PropTypes.string,
    theme: React.PropTypes.string,
    value: React.PropTypes.string,
    name: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    className: React.PropTypes.string,
    changeHandler: React.PropTypes.func,
    label: React.PropTypes.string,
    labelColor: React.PropTypes.string,
    error: React.PropTypes.bool,
    style: React.PropTypes.object,
    disabled: React.PropTypes.bool,
  },
  reset(){
    this.setState({ 
      value: this.props.value || false,
      showPWGuide: false
    })
  },

  getInitialState(){
    return {
      showPWGuide: false,
      value: false
    }
  },

  getValue(){
    let val = (this.state.value!==false ? this.state.value : this.props.value) || ""
    return h.ltrim(val)
  },
  changeHandler: function(e) {
    this.setState({value: e.target.value})
    if (_.isFunction(this.props.changeHandler))
      this.props.changeHandler(e)
  },
  showPasswordGuide(e){
    e.preventDefault()
    this.setState({showPWGuide: true});
  },
  showQuestionMark(e){
    e.preventDefault()
    this.setState({showPWGuide: false});
  },

  passwordGuide(){
    //if (this.state.showPWGuide) {
    //
    //  return 'Password shoud have at least 8 characters, containing Capital Letters AND Numbers.'
    //
    //
    //} else
    {

      return <span className="password-guide-wrap">
          <img   style={{margin:0}}
               border="0" src="/assets/help.png" align="middle" width="16" height="16"/>
           this.state.showPWGuide?<span className="password-guide cal-text-wrap">Password shoud have at least 8 characters, containing Capital Letters AND Numbers.</span>:''
      </span>
    }
  },

  render() {
    
    // var passwordGuide = 'FORMAT?'
    // if (this.state.showPWGuide)
    //   passwordGuide = 'Password shoud have at least 8 characters, containing Capital Letters AND Numbers.'

    let inputProps = _.omit(this.props, ["changeHandler","value","type","labelColor"])
    var classes = this.getTheme() + (this.props.error ? " has-error" : "") + " item-input"

    return <label className={classes}>
      {this.props.label ? <span onMouseOver={this.showPasswordGuide}
                                onMouseOut={this.showQuestionMark}
                                className={"input-label inline-block"+(h.checkColorClass(this.props.labelColor) ? " colored "+this.props.labelColor
                                : "")} >
      {this.props.label}{this.passwordGuide()}

      </span> : null}

      <input {... inputProps} type={this.props.type || "text"} value={this.getValue()} onChange={this.changeHandler} />
    </label>
  }
})