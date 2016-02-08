
let moveDistance = 35

IH.Device.ProfileName = React.createClass({
  displayName: "IH.Device.ProfileName",
  mixins: [ReactMeteorData, RC.Mixins.CSS],
  pureRender: false,
  getMeteorData() {
    return {
      user: Meteor.user() || {} // If you're not logged in, you shouldn't be here.
    }
  },
  // @@@@
  // @@@@
  // Prep
  // @@@@
  // @@@@
  getProfile() {
    let self = this
    let dataProfile = this.data.user.profile || {}
    let stateProfile = this.state.profile
    let allowedKeys = _.keys(this.profileTmpl)

    return _.object( allowedKeys.map(function(key){
      if (stateProfile[key])
        return [key, stateProfile[key]]
      return [key, null]
    }))
  },
  getInitialState() {
    return {
      init: false,
      profile: _.object( _.keys(this.profileTmpl).map( function(p){
        return [p, null]
      }))
    }
  },
  profileTmpl: {
    firstName: 1,
    lastName: 1,
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
    let fName = this.refs.fName.getValue()
    let lName = this.refs.lName.getValue()

    if (fName && lName) {
      if (fName.length < 2)
        this.setState({msg: "Your first name is too short."})
      else if (lName.length < 2)
        this.setState({msg: "Your last name is too short."})
      else {
        this.setState({msg: true})
        Meteor.setTimeout(function(){
          Meteor.users.update(userId, {
            $set: {
              "profile.firstName": fName,
              "profile.lastName": lName
            }
          })
        },250)
      }
    } else
      this.setState({msg: "Please fill in all fields."})
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
    let profile = this.getProfile()

    // ####
    // ####
    // Form Prep
    // ####
    // ####
    let form = [{
      placeholder: "First Name", name: "firstName",
      value: profile.firstName,
      ref: "fName"
    },{
      placeholder: "Last Name", name: "lastName",
      value: profile.lastName,
      ref: "lName"
    // },{
    //   label: "Metrics", name: "metricsUnit",
    //   value: this.profileTmpl.metricsUnit[_.isNumber(profile.metricsUnit) ? profile.metricsUnit : profile.metricsUnit],
    //   disableFocus: true,
    //   onClick: this.chooseMetrics,
    //   style: {paddingRight: 19}
    }]

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

    return <div style={styles.area}>
      <RC.Animate transitionName="fade" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
        {msg}
      </RC.Animate>
      <RC.Form color="white" style={styles.form} onSubmit={this.submitForm}>
        <div style={styles.children}>
          Hello! Before we connect,<br />
          what is your name?
        </div>
        <div style={styles.formInner}>
          {
          form.map( function(props, n){
            // props.inputStyle = props.labelStyle = styles.input
            props.theme = ["big","overlay"]
            props.labelColor = props.borderColor = props.color = "white"
            props.labelColorFocus = "#FF3"
            return <RC.Input {... _.omit(props, ["onClick","children","hideArrow"])} key={n} />
          })
          }
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
