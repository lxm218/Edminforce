
IH.RC.ChatChannelList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    //var contacts = Meteor.user().profile.contacts;

    this.subs = Meteor.subscribe("ChatChannelList")
    let userId = Meteor.userId()
    let isReady = this.subs.ready()

    var channels = []
    var self = this;

    if (isReady) {
      channels = IH.Coll.ChatStatus.find({UID: userId}).map(function(s){
        let ch = IH.Coll.ChatChannels.findOne({_id: s.CHID})
        if (!ch) return undefined

        let contactID = ch.DID===userId ? ch.PID : ch.DID
        let user = Meteor.users.findOne(contactID).profile;

        let channelProps = {
          _id: ch._id,
          href: "/chat_channel/" + ch._id,
        }

        if (self.props.contactsOnly)
          _.extend(channelProps, {
            firstName: user.firstName,
            lastName: user.lastName
          })
        else
          _.extend(channelProps, {
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            msg: ch.lastMsg
          })
        return channelProps
      })
    }

    return {
      isReady: isReady,
      channels: h.filterUndefined(channels)
    }
  },
  componentWillUnmount() {
    this.subs.stop()
  },
  render() {
    let self = this

    var lastLetter = null
    var channels = this.data.channels

    if (this.props.contactsOnly)
      channels = _.sortBy(channels, "lastName")

    return <RC.List {... this.props}>
      {this.props.children}
      <RC.Loading isReady={this.data.isReady}>
        {
        channels.map(function(c,n) {

          if (self.props.contactsOnly) {
            var header = null
            var newLastLetter = (c.lastName).charAt(0)

            if (lastLetter!=newLastLetter)
              header = <RC.Item theme="divider">{newLastLetter}</RC.Item>
            lastLetter = newLastLetter

            return <div key={n}>
              {header}
              <RC.Item {... c}>{c.firstName} <strong>{c.lastName}</strong></RC.Item>
            </div>

          } else {
            c.theme = "avatar";
            c.uiClass = "chevron-right";
            c.uiColor = "gray";
            c.title = c.firstName+" "+c.lastName;

            if (c.msg)
              c.subtitle = h.getDateFromProps(c.msg.createdAt)+" - "+c.msg.content
            return <RC.Item {... c} key = {n} />
          }
        })
        }
      </RC.Loading>
    </RC.List>
  }
});
