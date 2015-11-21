
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
  clickHandler(e) {
    if (_.isFunction(this.props.onSubmit)) {
      e.preventDefault()
      this.props.onSubmit(this.refs.msg.getDOMNode().value)
      this.refs.msg.getDOMNode().value = ""
    }
  },
  keyHandler(e) {
    if (e.which==13) this.clickHandler(e)
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

    return <div id={this.props.id}>
      <div className="chat-textarea-spacer"/>
      <div className={classList.join(" ")}>
        <textarea ref="msg" value={this.props.value} name={this.props.name} placeholder={this.props.placeholder} onKeyDown={this.keyHandler}/>
        <button onClick={this.clickHandler}><RC.uiIcon uiClass={this.props.uiClass || "paper-plane"} uiColor="white" /></button>
      </div>
    </div>
  }
})
