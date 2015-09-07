/*


//
//var _incrementalMessageLimit = 20;
//
//var incrementalScroll = function (e) {
//
//  var scrollY = (this.y || window.pageYOffset) - window.pageYOffset;
//  this.y = window.pageYOffset;
//
//  _triggerLoadMore(scrollY, window.pageYOffset);
//};
//
//var _triggerLoadMore = function(scrollY, offsetY) {
//  var directionY = !scrollY ? "NONE" : scrollY > 0 ? "UP" : "DOWN"
//  if (directionY === "UP" && offsetY <= 20 ) {
//    console.log("window.scroll passed this line", directionY, offsetY, typeof offsetY)
//
//    _resetMessageSubLimit()
//  }
//};
//
//var _resetMessageSubLimit = function (){
//
//  console.log("_resetMessageSubLimit")
//
//  var before = Session.get("Message_Sub_Limit");
//  var after = before + _incrementalMessageLimit;
//  Session.set("Message_Sub_Limit", after)
//};


IH.RC.ChatMessageList = React.createClass({

  //sendNewMessage(msg) {
  //  let message = {
  //    type: "txt",
  //    content: msg,
  //    SID: Meteor.userId(),
  //    CHID: this.props.channelID   // ????
  //  };
  //  IH.Action.ChatMessages.createMessage(message, this.props.channelID)
  //},

  //componentWillMount() {
  //  this.shouldScrollBottom = true;
  //},
  //componentDidMount() {
  //
  //  var node = this.refs.messageContainer.getDOMNode();
  //  self = this;
  //
  //  window.addEventListener("scroll", incrementalScroll);
  //
  //  console.log("walalalalallalalalallall")
  //  //window.scrollTo(0, node.scrollHeight);
  //},
  //componentWillUpdate() {
  //  var node = this.refs.messageContainer.getDOMNode();
  //  this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  //},
  //componentDidUpdate() {
  //  if (this.shouldScrollBottom) {
  //    var node = this.refs.messageContainer.getDOMNode();
  //
  //    console.log("node.scrollHeight in update ", node.scrollHeight);
  //    node.scrollTop = node.scrollHeight
  //  }
  //},
  componentWillUnmount() {
    window.removeEventListener("scroll")
  },
  render() {

    var lastMsg = {}
    let userId = Meteor.userId();

    return <div ref="messageContainer">
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

  */