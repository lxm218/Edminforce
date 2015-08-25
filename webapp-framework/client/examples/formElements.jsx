
/**
 * TODO: Turn this into our own version of React-Schema Autoform
 */

/**
 * EXAMPLE
 * Data Setup
 * Imagine that all of this is from MONGO.
 */
let fakeUsersMongo = {
  abc1234567890: {
    username: "superdog",
    password: "mydadisthegreatest",
    profile: {
      fName: "Bruno",
      lName: "Lee",
      bio: "Hello everyone, I like long walks on the beach. I like to jump high in the air and catch frisbees.",
      gender: "Dog",
    }
  },
}

App.FormElements = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {

    // Do a Mongo Query and get user info
    // let usersFromMongo = Meteor.users.findOne("abc1234567890")
    let usersFromSession = Session.get("userSession") || {}

    return {
      user: usersFromSession.abc1234567890
    }
  },
  componentWillMount() {
    Session.set("userSession", fakeUsersMongo)
  },
  render() {

    let user = this.data.user || {}

    return <div className="padding">

      <h4 className="space-t">Basic Form Elements</h4>
      <RC.Input
        name="username"
        value={user.username} placeholder="Username" />
      <RC.Input
        name="password" type="password"
        placeholder="Enter Password" />

      <div className="clear">
        <RC.Input size="half" placeholder="Half Size" label="Label1" />
        <RC.Input size="half" placeholder="Half Size" label="With Error" error={true} />
      </div>

      <div className="clear">
        <RC.Input size="third" placeholder="One-Third" />
        <RC.Input size="third" placeholder="One-Third" />
        <RC.Input size="third" placeholder="One-Third" />
      </div>

      <RC.Input size="normal" placeholder="Normal Size" />
      <RC.Input size="full" placeholder="Full Size" />

      <RC.Input
        theme="label-inside" className="margin-t"
        name="fName" value={h.nk(user, "profile.fName")}
        label="First Name" />
      <RC.Input
        theme="label-inside"
        name="lName" value={h.nk(user, "profile.lName")}
        label="Last Name" />

      <RC.Textarea
        className="margin-t"
        name="bio" value={h.nk(user, "profile.bio")} placeholder="User Bio" />

      <RC.Button name="button" text="Button (Default)" />
      <RC.Button name="button" text="Button (White)" className="bg-white" />
      <RC.Button name="button" text="Button (Brand 1)" className="bg-brand" />
      <RC.Button name="button" text="Button (Brand 2)" className="bg-brand2" />
      <RC.Button name="button" text="Button (Brand 3)" className="bg-brand3" />
    </div>
  }
})
