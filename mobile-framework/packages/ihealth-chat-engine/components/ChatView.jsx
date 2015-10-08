
var _defaultLimit = 20
var _msgIncrement = 10

IH.RC.ChatView = React.createClass({
  displayName: "IH_ChatView",
  mixins: [ReactMeteorData, RC.Mixins.PureRender, RC.Mixins.CSS],
  getMeteorData() {

    var channel = messages = users = []
    var channelId = this.props.channelID || FlowRouter.getParam("channelID")

    // Subscribe
    this.sub1 = Meteor.subscribe("ChatMessageList", channelId, this.state.msgLimit)
    this.sub2 = Meteor.subscribe("ChatMessageUser", channelId)

    // Subs Ready
    if (this.isReady || (this.sub1.ready() && this.sub2.ready())) {

      if (!!this.state.isLoading) {
        let self = this
        Meteor.clearTimeout(this.loadingTimeout)
        this.loadingTimeout = Meteor.setTimeout(function(){
          self.setState({ isLoading: false })
        }, 2000)
      }

      var query = {
        CHID: channelId,
        createdAt: { $exists: true }       // required for client insert
      }
      var options = { sort: { createdAt: 1 } }

      channel = IH.Coll.ChatChannels.findOne(channelId)
      var messages = IH.Coll.ChatMessages.find(query, options).fetch()

      this.isReady = true

      console.log("Querying with "+this.state.msgLimit+ " was " + messages.length)

      // Users List
      var users = Meteor.users.find({
        _id: { $in: _.uniq(_.map(messages, function(m){
          return m.SID
        })) }
      },{
        fields: {
          profile: 1
        }
      }).fetch()
      users = _.object( users.map(function(u){
        return [u._id, u.profile]
      }))
    }

    return {
      isReady: this.isReady,
      users: users,
      userId: Meteor.userId(),
      channel: channel,
      messages: messages
    }
  },
  getInitialState(){
    return {
      initLoading: true,
      isLoading: false,
      isInitialized: false,
      delayFinished: false,
      msgLimit: _defaultLimit,
      initAmount: 0,
      previousTop: null
    }
  },
  isReady: false,
  scrollTimeout: null,
  updateTimeout: null,
  loadingTimeout: null,
  incrementalScroll(e) {
    let self = this
    Meteor.clearTimeout(this.scrollTimeout)
    this.scrollTimeout = Meteor.setTimeout(function(){
      let node = React.findDOMNode(self.refs.container)
      if (node.scrollTop<=0 && self.state.isInitialized && !self.state.isLoading) {
        console.log("Loading")
        self.setState({
          isLoading: true,
          msgLimit: Math.max(_defaultLimit, self.data.messages.length+_msgIncrement),
          previousTop: self.data.messages.length ? self.data.messages[0]._id : null
        })
      }
    },250)
  },
  componentWillMount() {
    this.props.channelID = this.props.channelID || FlowRouter.getParam("channelID");
  },
  componentDidMount() {
    let self = this
    let node = React.findDOMNode(this.refs.container)
    node.addEventListener("scroll", this.incrementalScroll)

    Meteor.setTimeout(function(){
      self.setState({
        delayFinished: true
      })
    }, this.props.delay || 500)
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return !(this.state.initLoading && !nextState.initLoading)
  },
  componentWillUpdate() {
    let node = React.findDOMNode(this.refs.container)
    this.shouldScrollBottom = node && (node.scrollTop+node.offsetHeight)===node.scrollHeight
    this.scrollPos = node && node.scrollTop

  },
  componentDidUpdate() {
    let msgsLength = this.data.messages.length
    if (this.data.isReady && msgsLength!=this.state.initAmount) {
      let node = React.findDOMNode(this.refs.container)

      if (this.state.initLoading) {
        IH.Action.ChatStatus.activateChannel(this.props.channelID)
        this.setState({initLoading: false})
      }

      if (this.shouldScrollBottom || !this.state.isInitialized) {
        console.log(this.data.messages.length)
        this.setState({
          isInitialized: true,
          initAmount: this.data.messages.length
        })
        if (node)
          node.scrollTop = node.scrollHeight

      } else if (this.sub1.ready() && this.sub2.ready() && this.state.isLoading) {
        let self = this
        Meteor.clearTimeout(this.loadingTimeout)
        Meteor.clearTimeout(this.updateTimeout)
        this.updateTimeout = Meteor.setTimeout(function(){
          let more = React.findDOMNode(self.refs.moreMsgs)
          let moreHeight = more.offsetHeight

          self.setState({
            isLoading: false,
            initAmount: self.data.messages.length
          })
          if (node)
            node.scrollTop = self.scrollPos+moreHeight
        }, 1000)
      }
    }
  },
  componentWillUnmount() {

    // web should use a different approach,
    // e.g. remove from active channel list

    // Vivian, don't remove all scroll event handlers, Meteor sometimes may have its own scroll handlers that you do not want removed.
    let node = React.findDOMNode(this.refs.container)
    node.removeEventListener("scroll", this.incrementalScroll)

    IH.Action.ChatStatus.deActivateChannel(this.props.channelID)

    this.sub1.stop()
    this.sub2.stop()
  },
  sendNewMessage(msg) {
    if (_.isString(msg) && msg.length) {
      let message = {
        type: "txt",
        content: msg,
        SID: Meteor.userId(),
        CHID: this.props.channelID
      }
      IH.Action.ChatMessages.createMessage(message, this.props.channelID)
    }
  },
  takeNSendPhoto() {
    var self = this
    if (Meteor.isCordova) {
      IH.Camera.getPicture({}, function(e, pic){
        if (e) {
          Meteor.setTimeout(function() {
            //alert(e.message)
            console.log("camera error: ", e.error, e.message)
          }, 0);
        } else {
          let message = {
            type: "img",
            content: pic,
            SID: Meteor.userId(),
            CHID: self.props.channelID
          };
          IH.Action.ChatMessages.createMessage(message, self.props.channelID)
        }
      })
    } else {
      alert("Web camera is not supported yet.")
    }
  },
  renderMsgs(msgs){
    let userId = this.data.userId
    let users = this.data.users
    let lastMsg = {}
    let self = this

    return _.map( msgs, function(data, n){
      let user = users[data.SID] || {}
      let m = {
        from: data.SID,
        msg: data.content,
        date: data.createdAt,
        type: data.type,
        avatar: user.avatar,
        name: user.firstName+" "+user.lastName,
        gender: user.gender,
        wasTop: self.state.previousTop === data._id
      }

      let first = n===0 ? true : lastMsg.name!=m.name
      let dateBreak = moment(m.date).format("MM/DD/YY")
      let lastBreak = n===0 || !lastMsg.date ? null : moment(lastMsg.date).format("MM/DD/YY")
      lastMsg = m

      return <RC.ChatBubble
        key={n}
        isUser={userId==m.from}
        showDateBreak={dateBreak!=lastBreak || m.wasTop}
        firstOfGroup={first || m.wasTop}
        type={m.type}
        message={m.msg}
        date={m.date}
        avatar={m.avatar}
        name={m.name}
        gender={m.gender}
        bgColor={userId==m.from? "white":"brand1"}
        theme={m.type}
        />
    })
  },
  render() {

    let initMsgsLength = this.data.messages.length - this.state.initAmount
    let styles = this.css.styles

    return <div>
      <RC.Loading className="scroll abs-full overflow" style={styles.chatView} loadingClasses="abs-full" isReady={this.data.isReady} ref="container">
        {this.state.isLoading ? <RC.Loading theme="tiny" /> : null}
        <div ref="moreMsgs" style={this.state.isLoading ? {opacity: 0, position: "absolute"} : {}}>
          {this.renderMsgs( this.data.messages.slice(0, initMsgsLength) )}
        </div>
        {this.renderMsgs( this.data.messages.slice(initMsgsLength) )}
      </RC.Loading>
      {
        this.data.isReady && this.state.delayFinished
          ? <RC.ChatTextArea name="message" onSubmit={this.sendNewMessage} onPlus={this.takeNSendPhoto}/>
          : null
      }
    </div>
  },

  baseStyles(np,ns) {
    return {
      chatView: {
        WebkitOverflowScrolling: "touch",
        paddingBottom: "58px"
      }
    }
  },
})
