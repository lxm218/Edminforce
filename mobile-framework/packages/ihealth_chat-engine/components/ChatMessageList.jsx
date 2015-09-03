IH.RC.ChatMessageList = React.createClass({

  sendNewMessage(msg) {
    let message = {
      type: "txt",
      content: msg,
      SID: Meteor.userId(),
      CHID: this.props.channelID   // ????
    };

    IH.Action.ChatMessages.createMessage(message)
  },

  componentWillMount() {
    this.shouldScrollBottom = true;
  },
  componentDidMount() {
    if (this.shouldScrollBottom) {
      var node = this.getDOMNode();
      node.scrollTop = node.scrollHeight
    }
  },
  componentWillUpdate() {
    var node = this.getDOMNode();
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  },
  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      var node = this.getDOMNode();
      node.scrollTop = node.scrollHeight
    }
  },
  componentWillUnmount() {
  },
  render() {

    var lastMsg = {}
    let userId = Meteor.userId();

    return <div>
      {
        _.map(this.props.messages, function(m, n){
          let first = n===0 ? true : !(h.nk(lastMsg, "m.name")==h.nk(m, "m.name"));
          let dateBreak = moment(m.date).format("MM/DD/YY");
          let lastBreak = n===0 || !lastMsg.date ? null : moment(lastMsg.date).format("MM/DD/YY");
          lastMsg = m;

          return <RC.ChatBubble
            key={n}
            isUser={userId==m.from}
            showDateBreak={dateBreak!=lastBreak}
            firstOfGroup={first}
            message={m.msg}
            date={m.date}
            avatar={m.avatar}
            name={m.name}
            gender={m.gender}
            />
        })
      }
      <RC.ChatTextArea name="message" onSubmit={this.sendNewMessage} />
    </div>
  }
})