
let moveDistance = 35

IH.Device.Profile = class extends RC.CSSMeteorData {
  constructor(p) {
    super(p)
    this.watchStates = ["choices","init","msg"]
    this.state = {
      init: false,
      msg: null,
      choices: null,
      profile: _.object( _.keys(this.profileTmpl()).map( function(p){
        return [p, null]
      }))
    }
  }
  getMeteorData() {
    return {
      user: Meteor.user() || {} // If you're not logged in, you shouldn't be here.
    }
  }
  // @@@@
  // @@@@
  // Prep
  // @@@@
  // @@@@
  componentWillUpdate(np,ns) {
    super.componentWillUpdate(np,ns)
    if (!this.init) {
      // INIT
      let profile = this.getProfile()
      if (profile.height && profile.weight) {
        if (profile.htUnit && profile.height)
          profile.height = h.cmToFeet(profile.height)
        if (profile.wtUnit && profile.weight)
          profile.weight = h.kgToLbs(profile.weight)

        this.init = true
        this.setState({
          profile: profile
        })
      }
    }
  }
  getProfile() {
    let self = this
    let dataProfile = this.data.user.profile || {}

    let stateProfile = this.state.profile
    let allowedKeys = _.keys(this.profileTmpl())

    return _.object( allowedKeys.map(function(key){
      if (stateProfile[key] || _.isNumber(stateProfile[key]))
        return [key, stateProfile[key]]
      if (dataProfile[key] || _.isNumber(dataProfile[key]))
        return [key, dataProfile[key]]
      if (_.contains(["wtUnit","htUnit","metricsUnit"], key))
        return [key, 0]
      return [key, null]
    }))
  }
  profileTmpl() {
    let tmpl = {
      gender: ["Female","Male"],
      height: 1,
      weight: 1,
      activityLevel: 1,
      birthday: 1,
      activityLevel: ["Sedentary","Active","Very Active","Athlete"],
      wtUnit: ["kg","lbs"],
      htUnit: ["cm","feet"],
      metricsUnit: ["mile","km"],
    }
    if (!this.props.deviceProfileOnly) {
      tmpl.firstName = 1
      tmpl.lastName = 1
    }
    return tmpl
  }
  componentDidMount() {
    let self = this
    Meteor.setTimeout(function(){
      self.setState({ init: true })
    }, 400)
  }
  chooseGender() {
    if (!this.state.msg)
      this.setState({
        choices: {
          field: "gender",
          list: this.profileTmpl().gender
        }
      })
  }
  chooseLifestyle() {
    if (!this.state.msg)
      this.setState({
        choices: {
          field: "activityLevel",
          list: this.profileTmpl().activityLevel
        }
      })
  }
  chooseWtUnit() {
    if (!this.state.msg)
      this.setState({
        choices: {
          field: "wtUnit",
          list: this.profileTmpl().wtUnit
        }
      })
  }
  chooseHtUnit() {
    if (!this.state.msg)
      this.setState({
        choices: {
          field: "htUnit",
          list: this.profileTmpl().htUnit
        }
      })
  }
  chooseMetrics() {
    if (!this.state.msg)
      this.setState({
        choices: {
          field: "metricsUnit",
          list: this.profileTmpl().metricsUnit
        }
      })
  }
  chooseBDay() {
    if (!this.state.msg)
      this.setState({
        choices: {
          field: "birthday"
        }
      })
  }
  submitForm(e) {
    e.preventDefault()
    let profile = this.getProfile()
    let realHt, realWt

    let ssContext = IH.Schema.UserDeviceProfile.newContext()
    let userId = Meteor.userId()

    profile.firstName = this.refs.fName.getValue()
    profile.lastName = this.refs.lName.getValue()
    profile.height = realHt = this.refs.ht.getValue()
    profile.weight = realWt = this.refs.wt.getValue()

    if (profile.htUnit)
      profile.height = h.feetToCM(profile.height)
    if (profile.wtUnit)
      profile.weight = h.lbsToKg(profile.weight)

    profile.height = Number(profile.height)
    profile.weight = Number(profile.weight)

    if (ssContext.validate(profile)) {
      if (this.props.deviceProfileOnly)
        this.setState({ msg: true })
      else
        this.setState({ msg: "Your profile was updated." })

      let update = _.object( _.keys(profile).map( function(k){
        return [`profile.${k}`, profile[k]]
      }))
      Meteor.users.update(userId, {
        $set: update
      })

      this.onSuccess(profile, this.data.user.profile)
      /**
       * TODO : Create a more "proper" error handler
       */
     } else {
       let msg
       let reasons = _.object( ssContext._invalidKeys.map(function(s){
         return [s.name, s.type]
       }))

      if (!profile.height || reasons.height) {
         if (reasons.height=="maxNumber") msg = `Your height, ${realHt} ${profile.htUnit ? "feet" : "cm"} is too high.`
         else if (reasons.height=="minNumber") msg = `Your height, ${realHt} ${profile.htUnit ? "feet" : "cm"} is too low.`
         else msg = "Your height value was invalid."
      } else if (!profile.weight || reasons.weight) {
        if (reasons.weight=="maxNumber") msg = `Your weight, ${realWt} ${profile.wtUnit ? "kg" : "lbs"} is too high.`
        else if (reasons.weight=="minNumber") msg = `Your weight, ${realWt} ${profile.wtUnit ? "feet" : "cm"} is too low.`
        else msg = "Your weight value was invalid."
      } else
        msg = "Please fill the entire form correctly."
      this.setState({
        msg: msg
      })
    }
  }
  onSuccess(profile, dataProfile) {
    // Do Nothing (Overwritten by child class)
  }
  removeMsg() {
    this.setState({
      msg: false
    })
  }
  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@
  render() {
    let self = this
    let styles = this.css.get("styles")
    let profile = this.getProfile()
    let profileTmpl = this.profileTmpl()
    let fields = _.keys(profileTmpl)

    // ####
    // ####
    // Form Prep
    // ####
    // ####
    let form = [{
      label: "First Name", name: "firstName", ref: "fName",
      value: profile.firstName,
    },{
      label: "Last Name", name: "lastName", ref: "lName",
      value: profile.lastName,
    },{
      label: "Birthday", name: "birthday",
      disableFocus: true,
      onClick: this.chooseBDay.bind(this),
      value: profile.birthday ? `${moment(profile.birthday).format("YYYY/MM/DD")} (${moment().diff(moment(profile.birthday), "years")} yrs)` : "",
      hideArrow: true
    },{
      label: "Gender", name: "gender",
      value: profileTmpl.gender[_.isNumber(profile.gender) ? profile.gender : profile.gender],
      disableFocus: true,
      onClick: this.chooseGender.bind(this),
      style: {paddingRight: 19}
    },{
      label: "Height", name: "height", ref: "ht",
      // value: Math.round((profile.htUnit ? h.feetToCM(profile.height || 0) : profile.height || 0)*100)/100,
      value: Math.round((profile.height || 0)*100)/100,
      type: "number",
      style: { paddingRight: profile.htUnit ? 51 : 47 },
      children: <div onClick={this.chooseHtUnit.bind(this)} style={styles.unit}>
        {profileTmpl.htUnit[profile.htUnit || 0]}
        <span style={styles.arrow} />
      </div>
    },{
      label: "Weight", name: "weight", ref: "wt",
      // value: Math.round((profile.wtUnit ? h.lbsToKg(profile.weight || 0) : profile.weight || 0)*100)/100,
      value: Math.round((profile.weight || 0)*100)/100,
      type: "number",
      style: { paddingRight: profile.wtUnit ? 45 : 42 },
      children: <div onClick={this.chooseWtUnit.bind(this)} style={styles.unit}>
        {profileTmpl.wtUnit[profile.wtUnit || 0]}
        <span style={styles.arrow} />
      </div>
    },{
      label: "Lifestyle", name: "activityLevel",
      value: profileTmpl.activityLevel[_.isNumber(profile.activityLevel) ? profile.activityLevel : profile.activityLevel],
      disableFocus: true,
      onClick: this.chooseLifestyle.bind(this),
      style: {paddingRight: 19}
    },{
      label: "Metrics", name: "metricsUnit",
      value: profileTmpl.metricsUnit[_.isNumber(profile.metricsUnit) ? profile.metricsUnit : 0],
      disableFocus: true,
      onClick: this.chooseMetrics.bind(this),
      style: {paddingRight: 19}
    }]

    // ####
    // ####
    // Choices Prep
    // ####
    // ####
    let choices
    if (this.state.choices) {
      let changeHandler = function(val1, val2, val3){
        let value = self.state.choices.field=="birthday"
          ? moment(`${val1}-${val2}-${val3}`).toDate()
          : val1

        profile[self.state.choices.field] = value
        self.setState({
          profile: profile,
          choices: null
        })
      }

      if (this.state.choices.field=="birthday")
        choices = <RC.DatePicker date={profile.birthday} firstPage={profile.birthday || moment().subtract(20,"years").toDate()} minDate={moment().subtract(125,"years").toDate()} maxDate={new Date()} onChange={changeHandler} lineColor="rgba(0,0,0,.3)" disableClickState={true} theme="full" bgColor="edges" />
      else {
        let list = this.state.choices.list.map( function(label,n){
          return { label: label, value: n }
        })
        choices = <RC.RadioGroup
          theme={["right", "overlay"]}
          onChange={changeHandler}
          uiBgColor="white" uiColor="#222" color="white" borderColor="rgba(255,255,255,.25)"
          list={list} value={profile[self.state.choices.field]}
        />
      }
    }

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
          <RC.Button onClick={this.removeMsg.bind(this)} theme="circle" bgColor="white" color="#222">OK</RC.Button>
        </div>
      </div>
    } else if (this.state.msg)
      msg = <RC.Loading theme="absFull" />

    return <div style={styles.area}>
      <RC.Animate transitionName="fade" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
        {msg}
      </RC.Animate>
      <RC.Form color="white" style={styles.form} onSubmit={this.submitForm.bind(this)}>
        {
        !!this.props.children
        ?
        <div style={styles.children}>
          {this.props.children}
        </div>
        :
        null
        }
        <div style={styles.formInner}>
          {
          form.map( function(props, n){
            if (!_.contains(fields, props.name)) return null
            // props.inputStyle = props.labelStyle = styles.input
            props.theme = ["right","thin"]
            props.labelColor = props.borderColor = props.color = "white"
            props.labelColorFocus = "#FF3"
            props.placeholder = "--"
            return <div style={{position: "relative", margin: "15px 0 0", padding: 0}} onClick={props.onClick} key={n}>
              <RC.Input {... _.omit(props, ["onClick","children","hideArrow"])} />
              {props.children}
              {props.onClick && !props.hideArrow ? <span style={styles.arrow} /> : null}
            </div>
          })
          }
          <RC.Button bgColor="rgba(0,0,0,.5)" bgColorHover="#FFF" colorHover="#222">Save</RC.Button>
        </div>
      </RC.Form>
      <RC.BackDropArea bgColor="transparent" transitionName="fade-up" absolute={true} style={{padding: 0}}>
        {choices}
      </RC.BackDropArea>
    </div>
  }
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  baseStyles(np,ns) {
    return {
      // Form
      area: {
        textAlign: "center",
        width: "100%"
      },
      form: {
        opacity: ns.choices || !ns.init || ns.msg ? 0 : 1,
        transform: `translate(0, ${ns.init ? moveDistance*(!ns.choices ? 0 : -1) : moveDistance}px)`,
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
      unit: {
        position: "absolute", top: 0, bottom: 0, right: 0,
        padding: "3px 19px 0 0",
        fontSize: RC.Theme.font.size, lineHeight: `${RC.Theme.font.size+2}px`,
      },
      arrow: {
        position: "absolute", bottom: 13, right: 2, zIndex: 10,
        width: 0, height: 0,
        borderTop: "5px solid #FFF", borderRight: "5px solid transparent", borderLeft: "5px solid transparent",
      },

      // Msg
      msg: RC.cssMixins.absFull,
      msgInner: {
        height: 110, width: 250, margin: "-55px 0 0 -125px",
        position: "absolute", top: "50%", left: "50%",
        color: "#fff"
      }
    }
  }
}

IH.Device.Profile.displayName = "IH.Device.Profile"
