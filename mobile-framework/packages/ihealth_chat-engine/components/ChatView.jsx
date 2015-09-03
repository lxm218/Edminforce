
var _defaultMessagesLimit = 20;

IH.RC.ChatView = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    //var channelId = Session.get("ACTIVE_CHAT_CHANNEL");  // TODO: use this.props.channelID
    var channelId = this.props.channelID;

    console.log("channelId ", channelId)

    this.handle1 = Meteor.subscribe("ChatMessageList", channelId, _defaultMessagesLimit),
    this.handle2 =  Meteor.subscribe("ChatMessageUser", channelId)

    this.subscriptionsReady = this.handle1.ready() && this.handle2.ready()

    var query = {
      CHID: channelId
    };
    var options = {
      sort: {createdAt: -1}
    };

    var channel, messages;

    if (this.subscriptionsReady) {

      channel = IH.Coll.ChatChannels.findOne(channelId);
      messages = IH.Coll.ChatMessages.find(query, options).map(function(m){
        user = Meteor.users.findOne(m.SID).profile;

        return {
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

  getDataContent(){
    var channelID = this.props.channelID;
    return <IH.RC.ChatMessageList messages={this.data.messages} channelID={channelID}/>; // user props...
  },
  componentDidMount() {
    this.statusID = IH.Coll.ChatStatus.findOne({UID: Meteor.userId(), CHID:this.props.channelID})._id;
    IH.Action.ChatStatus.activateChannel(this.statusID, this.props.channelID);
  },
  componentWillUnmount() {

    // web should use a different approach,
    // e.g. remove from active channel list

    this.handle1.stop();
    this.handle2.stop();

    IH.Action.ChatStatus.deActivateChannel(this.statusID, this.props.channelID);
    Session.set("ACTIVE_CHAT_CHANNEL", null);
  },

  render() {
    var subscriptionsReady = this.subscriptionsReady;

    //console.log(this.data.channel, this.data.messages)
    return <div>
      {subscriptionsReady? this.getDataContent() : <p>Loading...</p>}
    </div>
  }
})