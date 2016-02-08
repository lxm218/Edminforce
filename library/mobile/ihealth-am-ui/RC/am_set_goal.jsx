
let moveDistance = 35

IH.Device.ProfileAMGoal = React.createClass({
  displayName: "IH.Device.ProfileAMGoal",
  mixins: [ReactMeteorData, RC.Mixins.CSS],
  pureRender: false,
  getMeteorData() {
    let user = Meteor.user() || {}
    return {
      user: user.profile && user.profile.AMgoal // If you're not logged in, you shouldn't be here.
    }
  },
  // @@@@
  // @@@@
  // Prep
  // @@@@
  // @@@@
  getInitialState() {
    return {
      init: false,
    }
  },
  componentDidMount() {
    let self = this
    Meteor.setTimeout(function(){
      if (self.isMounted())
        self.setState({ init: true })
    }, 400)
  },
  submitForm(e) {
    e.preventDefault()

    let userId = Meteor.userId()
    let goal = this.refs.goal.getValue()
    let max = 100000
    let min = 1000

    if (!isNaN(goal) && goal <= max && goal >= min) {
      this.setState({msg: true})
      Meteor.setTimeout(function(){
        Meteor.users.update(userId, {
          $set: {
            "profile.AMgoal": goal,
          }
        })
      },250)
    } else if (goal < min)
      this.setState({msg: "Number is too low."})
    else if (goal > max)
      this.setState({msg: "Number is too high."})
  },
  removeMsg() {
    this.setState({
      msg: false
    })
  },
  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@
  render() {

    let self = this
    let styles = this.css.styles
    let goal = this.data.goal || 10000

    // ####
    // ####
    // Message
    // ####
    // ####
    let msg
    if (typeof this.state.msg==="string") {
      msg = <div style={styles.msg}>
        <div style={styles.msgInner}>
          <p>{this.state.msg}</p>
          <RC.Button onClick={this.removeMsg} theme="circle" bgColor="white" color="#222">OK</RC.Button>
        </div>
      </div>
    } else if (this.state.msg)
      msg = <RC.Loading theme="absFull" />

    let props = {
      theme: ["big","overlay"],
      borderColor: "white",
      color: "white",
      labelColorFocus: "#FF3",
      placeholder: 10000,
      type: "tel",
      ref: "goal",
      value: goal
    }

    return <div style={styles.area}>
      <RC.Animate transitionName="fade" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
        {msg}
      </RC.Animate>
      <RC.Form color="white" style={styles.form} onSubmit={this.submitForm}>
        <div style={styles.children}>
          What is your daily (number of steps) goal?
        </div>
        <div style={styles.formInner}>
          <RC.Input {... props} />
          <RC.Button bgColor="rgba(0,0,0,.5)" bgColorHover="#FFF" colorHover="#222" style={styles.button} disabled={this.state.msg}>Continue</RC.Button>
        </div>
      </RC.Form>
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchStates: ["init","msg"],
  baseStyles(np,ns) {
    return {
      // Form
      area: {
        textAlign: "center",
        width: "100%"
      },
      form: {
        opacity: !ns.init || ns.msg ? 0 : 1,
        transform: `translate(0, ${ns.init ? 0 : moveDistance}px)`,
        transition: "all .2s ease"
      },
      children: {
        maxWidth: 250, margin: "0 auto",
        padding: "15px 10px 30px",
        fontSize: RC.Theme.font.size+1,
        color: "rgba(255,255,255,.7)"
      },
      formInner: {
        maxWidth: 250, margin: "0 auto", padding: "0 0 15px"
      },

      // Msg
      msg: RC.cssMixins.absFull,
      msgInner: {
        height: 110, width: 250, margin: "-55px 0 0 -125px",
        position: "absolute", top: "50%", left: "50%"
      },
      button: {
        transition: "all .2s ease",
        opacity: ns.msg===true ? 0 : 1
      }
    }
  }
})
