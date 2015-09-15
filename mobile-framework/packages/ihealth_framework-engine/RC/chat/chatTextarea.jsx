
RC.ChatTextArea = React.createClass({
  getTheme(name){
    let theme = _.contains(["regular","opacity","flat"], name)
      ? name : "regular"
    return theme
  },
  getInitialState() {
    return {
      selected: null
    }
  },
  submitHandler(e) {
    if (_.isFunction(this.props.onSubmit)) {
      e.preventDefault()
      this.props.onSubmit(this.refs.msg.getDOMNode().value)
      this.refs.msg.getDOMNode().value = ""
    }
  },
  plusHandler(e) {
    if (_.isFunction(this.props.onPlus)) {
      e.preventDefault()
      this.props.onPlus()
      this.refs.msg.getDOMNode().value = ""
    }
  },
  keyHandler(e) {
    if (e.which==13) this.submitHandler(e)
  },
  // getTheme(name){
  //   let theme = _.contains(["regular","chat"], name)
  //     ? name : "regular"
  //   return theme
  // },
  render() {

    let classList = [
      "chat-textarea",
      this.getTheme(this.props.theme),
      this.props.className || "",
    ]

    return <div className={classList.join(" ")} id={this.props.id}>
      <textarea ref="msg" value={this.props.value} name={this.props.name} placeholder={this.props.placeholder} onKeyDown={this.keyHandler}/>

      <button className="submit-plus" onClick={this.plusHandler} />
      <button className="submit-msg" onClick={this.submitHandler}><RC.uiIcon uiClass={this.props.uiClass || "paper-plane"} uiColor="white" /></button>
    </div>
  }
})
