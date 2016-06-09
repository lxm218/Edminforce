
IH.RC.ChatChannelList = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    contactsOnly: React.PropTypes.bool,
    activeOnly: React.PropTypes.bool,
    subscribe: React.PropTypes.bool
  },

  getInitialState() {
    return {
      displayStyle: null
    }
  },

  componentWillMount() {
    let style = ""
    if (this.props.activeOnly)
      style = "active"
    else
      style = "all"

    /*
    if (this.userRole === "doctor") {
      console.log("doctor ******")
      style = "active"
    } else if (this.userRole === "patient") {
    if (this.props.activeOnly)
      style = "active"
    else
      style = "all"
    }
    */

    this.setState({displayStyle: style})
  },


  getMeteorData() {
    // TODO: if not logged in

    try {
      this.userRole = Meteor.user().roles || Meteor.user().profile.roles
    } catch(e) {
      this.userRole = "nobody"
    }
    let activeOnly = this.state.displayStyle === "active"
    let doSubscribe = _.isBoolean(this.props.subscribe)? this.props.subscribe : true

    if (doSubscribe) {
      switch (this.userRole) {
        case "patient":
          this.subs = Meteor.subscribe("ChatChannelListPatient", activeOnly)
          break;
        case "doctor":
          this.subs = Meteor.subscribe("ChatChannelListDoctor")
          break;
        default:
          console.log("You are " + this.userRole + " and can't view this page.")
      }
    }

    let userId = Meteor.userId()
    let isReady = doSubscribe ? this.subs && this.subs.ready() : true

    var channels = []
    var self = this;

    if (isReady) {

      let query = activeOnly ? {lastMsg: {$exists: true}} : {}
      let sortOps = activeOnly ? {"lastMsg.createdAt": -1} : {}
      _.extend(sortOps, {updatedAt: -1})

      let options = {
        sort: sortOps
      }

      channels = IH.Coll.ChatChannels.find(query, options).map(function(ch) {
        if (!ch) return undefined

        let contactID = ch.DID===userId ? ch.PID : ch.DID
        let user = Meteor.users.findOne(contactID).profile;

        let channelProps = {
          _id: ch._id,
          href: "/" + self.userRole + "/chat_channel/" + ch._id,
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
    this.subs && this.subs.stop()
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
                header = <RC.Item theme={["divider","short"]}>{newLastLetter}</RC.Item>
              lastLetter = newLastLetter

              return <div key={n}>
                {header}
                <RC.Item {... c} theme={["body","short"]}>{c.firstName} <strong>{c.lastName}</strong></RC.Item>
              </div>

            } else {
              c.uiClass = "chevron-right";
              c.uiColor = "gray";
              c.title = c.firstName+" "+c.lastName;

              if (c.msg)
                c.subtitle = h.getDateFromProps(c.msg.createdAt)+" - "+c.msg.content
              return <RC.ItemAvatar {... c} key={n} />
            }
          })
        }
      </RC.Loading>
    </RC.List>
  }
});
