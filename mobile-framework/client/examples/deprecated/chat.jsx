
/**
 * EXAMPLE
 * Data Setup
 * Imagine that all of this is from MONGO.
 */
let fakeUsersMongo = {
  abc1234567890: {
    avatar: "/assets/examples/avatar2.jpg",
    name: "Bruno Lee",
    gender: "male",
  },
  xyz44445555: {
    avatar: "/assets/examples/avatar7.jpg",
    name: "Bear Alagatharam",
    gender: "male",
  }
}

let fakeChatSession = [{
  sender: "abc1234567890",
  message: "Hi Bear, how are you?",
  date: new Date("Wed Jul 01 2015 10:54:07 GMT-0700 (PDT)"),
},{
  sender: "abc1234567890",
  message: "Yesterday I ran across the field and jumped into the lake.",
  date: new Date("Wed Jul 01 2015 11:55:30 GMT-0700 (PDT)"),
},{
  sender: "abc1234567890",
  message: "Today I ate dinner in an all-you-can-eat dog buffet.",
  date: new Date("Wed Jul 01 2015 14:10:17 GMT-0700 (PDT)"),
},{
  sender: "xyz44445555",
  message: "Hi Bruno, why wasn't I invited?",
  date: new Date("Wed Jul 01 2015 14:24:24 GMT-0700 (PDT)"),
},{
  sender: "xyz44445555",
  message: "Today I cuddled with my owner and lazed around the house for hours. You should have joined me.",
  date: new Date("Wed Jul 01 2015 15:31:11 GMT-0700 (PDT)"),
},{
  sender: "xyz44445555",
  message: "Do you want to go play ball with me?",
  date: new Date("Wed Jul 01 2015 15:34:49 GMT-0700 (PDT)"),
},{
  sender: "abc1234567890",
  message: "Sure Bear, but I get all the balls, you get nothing.",
  date: new Date("Wed Jul 02 2015 17:11:11 GMT-0700 (PDT)"),
},{
  sender: "xyz44445555",
  message: "That's no fair, Bruno. I want to chase balls too.",
  date: new Date("Wed Jul 02 2015 17:24:31 GMT-0700 (PDT)"),
}]

/**
 * EXAMPLE
 * App example using the fake "imaginary" mongo data above.
 */
App.Chat = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {

    // Step 1: Do a Mongo Query and get chat session
    // let chatSession = Mongo.find( CONDITION ).fetch()
    var chatSession = Session.get("chatSession") || []
    var users = {}

    _.map(chatSession, function(c){
      /**
       * Step 2: Get user info from Mongo
       * Remember to specify which fields to return from your query or publication
       *
       * if (_.isUndefined(users[c.sender]))
       *   users[c.sender] = Meteor.users.findOne(c.sender, {
       *     fields: {
       *       avatar: 1,
       *       name: 1,
       *       gender: 1,
       *       message: 1,
       *      }
       *   })
       */
      if (_.isUndefined(users[c.sender])) users[c.sender] = fakeUsersMongo[c.sender]
      c.user = users[c.sender]

      return c
    })

    return {
      // Step 3: Find current user Id
      // userId: Meteor.userId(),
      userId: "abc1234567890",
      chatSession: chatSession
    }
  },
  submitChat(msg) {
    let chatList = Session.get("chatSession") || []
    let chatInsert = {
      // sender: Meteor.userId(),
      sender: "abc1234567890",
      message: msg,
      date: new Date(),
    }

    // Mongo.insert(chatInsert)
    chatList.push(chatInsert)

    Session.set("chatSession", chatList)
  },
  componentWillMount() {
    Session.set("chatSession", fakeChatSession)
  },
  render() {

    var lastMsg = {}
    let userId = this.data.userId

    return <div className="bg-brand-light">
      {
      _.map(this.data.chatSession, function(c,n){

        let user = c.user || {}
        let first = n===0 ? true : !(h.nk(lastMsg, "user.name")==h.nk(c, "user.name"))
        let dateBreak = moment(c.date).format("MM/DD/YY")
        let lastBreak = n===0 || !lastMsg.date ? null : moment(lastMsg.date).format("MM/DD/YY")
        lastMsg = c

        return <RC.ChatBubble
          key={n}
          isUser={userId==c.sender}
          showDateBreak={dateBreak!=lastBreak}
          firstOfGroup={first}
          message={c.message}
          date={c.date}
          avatar={user.avatar}
          name={user.name}
          gender={user.gender}
        />
      })
      }
      <RC.ChatTextArea theme="flat" name="message" onSubmit={this.submitChat} />
    </div>
  }
})
