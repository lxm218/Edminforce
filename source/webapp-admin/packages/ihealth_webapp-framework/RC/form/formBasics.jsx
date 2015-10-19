
let getSizeFunc = function() {
  let size = _.contains(["full","normal","half","third"], this.props.size)
    ? "size-"+this.props.size : "size-full"
  return size
}

RC.Form = React.createClass({
  getFormData() {
    var $formEl = $(React.findDOMNode(this.refs.rcForm))
    var form = h.serializeForm($formEl)
    return form
  },
  render() {
    return <form {...this.props} ref="rcForm">
      {this.props.children}
    </form>
  }
})

RC.Input = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    theme: React.PropTypes.string,
    size: React.PropTypes.string,
    value: React.PropTypes.string,
    name: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    className: React.PropTypes.string,
    label: React.PropTypes.string,
    error: React.PropTypes.bool,
    style: React.PropTypes.object,
    disabled: React.PropTypes.bool,
  },
  getTheme(){
    let theme = _.contains(["regular","label-inside"], this.props.theme)
      ? this.props.theme : "regular"
    return theme
  },
  getSize: getSizeFunc,
  getInitialState(){
    return {
      value: false
    }
  },
  getValue(){
    return (this.state.value!==false ? this.state.value : this.props.value) || ""
  },
  changeHandler: function(e) {
    this.setState({value: e.target.value})
    if (_.isFunction(this.props.changeHandler))
      this.props.changeHandler(e)
  },
  render() {

    let inputName = this.props.label && !this.props.name ? h.random_string() : this.props.name
    let inputProps = _.pick(this.props, "placeholder", "disabled", "id")
    let input = <input
      {...inputProps}
      name={inputName}
      type={this.props.type || "text"}
      value={this.getValue()}
      onChange={this.changeHandler}
    />

    if (!this.props.label && !this.props.theme && !this.props.size && !this.props.error) return input

    // Class List
    let theme = this.getTheme()
    let size = this.getSize()
    let classList = ["input-form", theme, size]
    if (this.props.label) classList.push("with-label")
    if (this.props.error) classList.push("has-error")
    if (this.props.className) classList.push(this.props.className)

    return <div className={classList.join(" ")}>
      <div className="inner">
        {this.props.label ? <RC.Label for={inputName} value={this.props.label} className={theme=="regular" ? "thick" : ""}/> : null}
        {input}
      </div>
    </div>
  }
})

RC.Label = React.createClass({
  propTypes: {
    value: React.PropTypes.string,
    className: React.PropTypes.string,
    for: React.PropTypes.string,
  },
  render() {
    return <label className={this.props.className} htmlFor={this.props.for}>{this.props.value}</label>
  }
})

RC.Textarea = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    theme: React.PropTypes.string,
    value: React.PropTypes.string,
    name: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    className: React.PropTypes.string,
    label: React.PropTypes.string,
    error: React.PropTypes.bool,
    style: React.PropTypes.object,
    disabled: React.PropTypes.bool,
  },
  getTheme(){
    let theme = _.contains(["regular"], this.props.theme)
      ? this.props.theme : "regular"
    return theme
  },
  getInitialState: function() {
    return {
      value: false
    }
  },
  getValue(){
    return (this.state.value!==false ? this.state.value : this.props.value) || ""
  },
  changeHandler: function(e) {
    this.setState({value: e.target.value})
    if (_.isFunction(this.props.changeHandler))
      this.props.changeHandler()
  },
  render() {

    // Class List
    let theme = this.getTheme()
    let classList = ["textarea-form", theme]
    if (this.props.error) classList.push("has-error")
    if (this.props.className) classList.push(this.props.className)

    return <div className={classList.join(" ")} style={this.props.style}>
      <textarea
        id={this.props.id}
        name={this.props.name}
        disabled={this.props.disabled}
        placeholder={this.props.placeholder}
        value={this.getValue()}
        onChange={this.changeHandler}
      />
    </div>
  }
})

RC.Button = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    theme: React.PropTypes.string,
    size: React.PropTypes.string,
    type: React.PropTypes.string,
    form: React.PropTypes.string,
    name: React.PropTypes.string,
    className: React.PropTypes.string,
    clickHandler: React.PropTypes.func,
  },
  getTheme(){
    let theme = _.contains(["regular"], this.props.theme)
      ? this.props.theme : "regular"
    return theme
  },
  getSize: getSizeFunc,
  render() {

    // Class List
    let classList = ["thick", this.getTheme(), this.getSize()]
    if (this.props.className) classList.push(this.props.className)

    let buttonType = _.contains(["button","reset","submit"], this.props.type)
      ? this.props.type : "submit"

    return <button
      id={this.props.id}
      name={this.props.name}
      type={buttonType}
      form={this.props.form}
      className={classList.join(" ")}
      onClick={this.props.clickHandler}>{this.props.text}</button>
  }
})

RC.Select = React.createClass({
  propTypes: {
    theme: React.PropTypes.string,
    size: React.PropTypes.string,
    value: React.PropTypes.string,
    name: React.PropTypes.string,
    changeHandler: React.PropTypes.func,
    error: React.PropTypes.bool,
    label: React.PropTypes.string,
  },
  getTheme(){
    let theme = _.contains(["regular","label-inside"], this.props.theme)
      ? this.props.theme : "regular"
    return theme
  },
  getSize: getSizeFunc,
  getInitialState(){
    return {
      value: false
    }
  },
  getValue(){
    return (this.state.value!==false ? this.state.value : this.props.value) || ""
  },
  changeHandler: function(e) {
    this.setState({value: e.target.value})
    if (_.isFunction(this.props.changeHandler)) {
      this.state.value = e.target.value // This may seem unnecessary, but it's needed. Consult me if you need to know why.
      this.props.changeHandler(e)
    }
  },
  render() {

    let self = this
    let selectProps = _.pick(this.props, "id", "defaultValue", "disabled")
    let selectName = this.props.name || h.random_string()
    let select = <div className="select">
      <select {...selectProps} name={selectName} onChange={this.changeHandler} value={this.getValue()} ref="select">
      {
      this.props.options.map(function(o,n){
        if (_.isString(o)) o = { value: o }
        o = _.isObject(o) && o.value ? o : { value: undefined }
        return <option value={o.value} key={n}>{o.text || o.value}</option>
      })
      }
      </select>
    </div>

    if (!this.props.label && !this.props.theme && !this.props.size && !this.props.error)
      return select

    // Class List
    let theme = this.getTheme()
    let size = this.getSize()
    let classList = ["input-form", theme, size]
    if (this.props.label) classList.push("with-label")
    if (this.props.error) classList.push("has-error")
    if (this.props.className) classList.push(this.props.className)

    return <div className={classList.join(" ")}>
      <div className="inner">
        {this.props.label ? <RC.Label for={selectName} value={this.props.label} className={theme=="regular" ? "thick" : ""}/> : null}
        {select}
      </div>
    </div>
  }
})
