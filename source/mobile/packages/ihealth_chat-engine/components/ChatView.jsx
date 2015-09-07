
var _defaultMessagesLimit = 30;
var _incrementalMessageLimit = 20;
var _initLoading = true;
var _currentScrollPosition = 0;

var incrementalScroll = function (e) {

  var scrollY = (this.y || window.pageYOffset) - window.pageYOffset;
  this.y = window.pageYOffset;
  _triggerLoadMore(scrollY, window.pageYOffset);
};

var _triggerLoadMore = function(scrollY, offsetY) {
  var directionY = !scrollY ? "NONE" : scrollY > 0 ? "UP" : "DOWN"
  if (directionY === "UP" && offsetY === 0 ) {
    console.log("window.scroll passed this line", offsetY)
    _resetMessageSubLimit()
  }
};

var _resetMessageSubLimit = function (){

  var before = Session.get("Message_Sub_Limit");
  var after = before + _incrementalMessageLimit;
  Session.set("Message_Sub_Limit", after)
};

IH.RC.ChatView = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState(){
    return {messageSubLimit: _defaultMessagesLimit}
  },
  getMeteorData() {
    var channelId = this.props.channelID || FlowRouter.getParam("slug");
    var messageLimit = Session.get("Message_Sub_Limit") || _defaultMessagesLimit;

    this.handle1 = Meteor.subscribe("ChatMessageList", channelId, messageLimit);
    this.handle2 =  Meteor.subscribe("ChatMessageUser", channelId)

    this.subscriptionsReady = this.handle1.ready() && this.handle2.ready();

    var query = {
      CHID: channelId
    };
    var options = {
      sort: {createdAt: 1}
    };

    var channel, messages;

    if (this.subscriptionsReady) {

      if (this.initialLoading) {
        IH.Action.ChatStatus.activateChannel(this.props.channelID);
        this.initialLoading = false;
      }

      channel = IH.Coll.ChatChannels.findOne(channelId);
      messages = IH.Coll.ChatMessages.find(query, options).map(function(m){
        user = Meteor.users.findOne(m.SID).profile;

        return {
          from: m.SID,
          msg: m.content,
          date: m.createdAt,
          type: m.type,
          avatar: user.avatar,
          name: user.name,
          gender: user.gender
        }
      });
    }

    return {
      channel: channel,
      messages: messages
    }
  },
  componentWillMount() {
    Session.set("Message_Sub_Limit", _defaultMessagesLimit);
    this.props.channelID = this.props.channelID || FlowRouter.getParam("slug");
    this.initialLoading = true;
  },
  componentDidMount() {
    window.addEventListener("scroll", incrementalScroll);
  },
  componentWillUpdate() {
    var node = this.refs.messageContainer.getDOMNode();
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
    //_currentScrollPosition = node.scrollHeight;
  },
  componentDidUpdate() {
    var node = this.refs.messageContainer.getDOMNode();

    if (this.handle1.ready() && this.handle2.ready() ) {
      if (this.shouldScrollBottom) {
        console.log("node.scrollHeight in update ", node.scrollHeight);
        if (_initLoading && this.data.messages) {
          window.scrollTo(0, 10000);
          _initLoading = false;
        } else {
          node.scrollTop = node.scrollHeight;
        }
      } else {
        //console.log("_currentScrollPosition", _currentScrollPosition, node.scrollHeight)

        node.scrollTop = _currentScrollPosition;   // why this doesn't work??
      }
      _currentScrollPosition = node.scrollHeight;
    }
  },
  componentWillUnmount() {

    // web should use a different approach,
    // e.g. remove from active channel list

    this.handle1.stop();
    this.handle2.stop();
    window.removeEventListener("scroll");

    IH.Action.ChatStatus.deActivateChannel(this.props.channelID);
    Session.set("ACTIVE_CHAT_CHANNEL", null);
  },
  sendNewMessage(msg) {
    let message = {
      type: "txt",
      content: msg,
      SID: Meteor.userId(),
      CHID: this.props.channelID
    };
    IH.Action.ChatMessages.createMessage(message, this.props.channelID)
  },
  takeNSendPhoto() {

    // TODO: added "camera" button

    if (Meteor.isCordova) {
      var msg;
      Camera.getPicture({}, function(e, pic){
        if (e) {
          Meteor.setTimeout(function() {
            alert("e.message)")
          }, 0);
        } else {
          msg = pic;
        }
      })

      let message = {
        type: "img",
        content: msg,
        SID: Meteor.userId(),
        CHID: this.props.channelID
      };
      IH.Action.ChatMessages.createMessage(message, this.props.channelID)

    } else {
      alert("Web camera is not supported yet.")
    }
  },
  getDataContent(){
    //return <IH.RC.ChatMessageList messages={this.data.messages} {...this.props}/>; // user props...

    var lastMsg = {}
    let userId = Meteor.userId();

    return <div>
      {
        _.map(this.data.messages, function(m, n){
          let first = n===0 ? true : !(h.nk(lastMsg, "m.name")==h.nk(m, "m.name"));
          let dateBreak = moment(m.date).format("MM/DD/YY");
          let lastBreak = n===0 || !lastMsg.date ? null : moment(lastMsg.date).format("MM/DD/YY");
          lastMsg = m;

          // TODO: use <img> for type=="img"

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
  },


  render() {
    var subscriptionsReady = this.subscriptionsReady;

    return <div ref="messageContainer">
      { subscriptionsReady? this.getDataContent() : <p>Loading...</p> }
    </div>
  }
})