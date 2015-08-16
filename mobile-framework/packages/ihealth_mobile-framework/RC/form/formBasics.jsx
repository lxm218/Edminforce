
RC.Input = React.createClass({
  getTheme(){
    let theme = _.contains(["regular","label-inside"], this.props.theme)
      ? this.props.theme : "regular"
    return theme
  },
  getSize(){
    let size = _.contains(["full","normal","half","third"], this.props.size)
      ? this.props.size : "full"
    return size
  },
  getInitialState: function() {
    return {
      value: false
    }
  },
  changeHandler: function(e) {
    this.setState({value: e.target.value})
    if (_.isFunction(this.props.changeHandler))
      this.props.changeHandler(e)
  },
  render() {

    let inputId = this.props.id || h.random_string()
    let input = <input
      id={inputId}
      placeholder={this.props.placeholder}
      disabled={this.props.disabled}
      name={this.props.name}
      type={this.props.type || "text"}
      value={this.state.value!==false ? this.state.value : this.props.value}
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
        {this.props.label ? <RC.Label for={inputId} value={this.props.label} className={theme=="regular" ? "thick" : ""}/> : null}
        {input}
      </div>
    </div>
  }
})

RC.Label = React.createClass({
  render() {
    return <label className={this.props.className} htmlFor={this.props.for}>{this.props.value}</label>
  }
})

RC.Textarea = React.createClass({
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
        value={this.state.value!==false ? this.state.value : this.props.value}
        onChange={this.changeHandler}
      />
    </div>
  }
})

RC.Button = React.createClass({
  getTheme(){
    let theme = _.contains(["regular"], this.props.theme)
      ? this.props.theme : "regular"
    return theme
  },
  changeHandler: function(e) {
    this.setState({value: e.target.value})
  },
  render() {

    // Class List
    let theme = this.getTheme()
    let classList = ["thick", theme]
    if (this.props.className) classList.push(this.props.className)

    let buttonType = _.contains(["button","reset","submit"], this.props.type)
      ? this.props.type : "button"

    return <button
      id={this.props.id}
      name={this.props.name}
      type={buttonType}
      form={this.props.form}
      className={classList.join(" ")}
      onClick={this.props.clickHandler}>{this.props.text}</button>
  }
})
