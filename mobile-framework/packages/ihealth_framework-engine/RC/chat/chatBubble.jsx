
RC.ChatBubble = React.createClass({
  // getInitialState(){
  //   return {
  //     selected: null
  //   }
  // },
  getTheme(name){
    let theme = _.contains(["regular"], name)
      ? name : "regular"
    return theme
  },
  renderMsg(){
    switch(this.props.type){
      case "img":
        return <img src={this.props.message} />
      default:
        // "txt"
        return _.isString(this.props.message)
        ? <p>{this.props.message}</p>
        : this.props.message
    }
  },
  render() {
    // let curState = this.state.selected // Currently unused
    let classList = [
      "chat-bubble",
      this.props.className || "",
      this.props.isUser ? "to" : "from",
      this.props.firstOfGroup ? "first" : "",
      this.getTheme(this.props.theme),
      this.props.type || "text"
    ]
    let date = _.isDate(this.props.date) ? this.props.date : false

    return <div className={classList.join(" ")} id={this.props.id}>
      {this.props.showDateBreak && date ? <div className="date-break"><span className="inline-block">{moment(date).format("dddd, MMM D, YYYY")}</span></div> : null}
      {
      !this.props.firstOfGroup || this.props.isUser ? null
      : <div className="author alt-thick">
          <RC.Avatar src={this.props.avatar} uiClass={_.contains(["male","female"], this.props.gender) ? this.props.gender : "male"} />
          {this.props.name}
        </div>
      }
      <div className="inner normal" data-time={date ? moment(date).format("h:mm a") : ""}>
        {this.renderMsg()}
      </div>
    </div>
  }
})
