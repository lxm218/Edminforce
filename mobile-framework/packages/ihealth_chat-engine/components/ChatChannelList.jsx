
IH.RC.ChatChannelList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    //var contacts = Meteor.user().profile.contacts;

    let channelList = [];
    this.handle = Meteor.subscribe("ChatChannelList");
    if (this.handle.ready()){
      var userId = Meteor.userId();
      channelList = IH.Coll.ChatStatus.find({UID: userId}).map(function(s){
        var ch = IH.Coll.ChatChannels.findOne({_id: s.CHID});

        var contactID = ch.DID === userId? ch.PID : ch.DID;
        var user = Meteor.users.findOne(contactID).profile;
        var latestMsg = ch.lastMsg; //

        return {
          _id: ch._id,
          name: user.name,
          avatar: user.avatar,
          href: "/chat_channel/" + ch._id,
          msg: latestMsg
        }
      })
    }

    return {
      channelList: channelList
    }
  },
  //getDataContent() {
  //  return <RC.List>
  //    { _.map(this.data.channelList, function(c){
  //      return <RC.Item
  //        href = {c.href}
  //        avatar = {c.avatar}
  //        title = {c.name}
  //        subtitle = {c.msg}
  //        />
  //    })
  //    }
  //  </RC.List>
  //},
  componentWillUnmount() {
    this.handle.stop();
  },
  render() {
    return <div>
      <RC.List>
        { _.map(this.data.channelList, function(c,n){
          console.log(c)

          return <RC.Item
            theme = "avatar"
            href = {c.href}
            avatar = {c.avatar}
            title = {c.name}
            subtitle = {c.msg? c.msg.content : null}
            note = {c.msg ? c.msg.createdAt: null}
            key = {n}
            />
        })
        }
      </RC.List>

    </div>
  }
});
//{this.data.channelList? this.getDataContent(): <p>Loading...</p>}