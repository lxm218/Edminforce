"use strict"

let listener // Listener must be defined here if you want to remove on Unmount

// ##
// ##
// AM3S - Measure & Display
// ##
// ##

IH.Device.AM3SMeasure = class extends RC.MeteorData {
  constructor(p) {
    super(p)
    this.state = {
      isConnected: IH.Store.AM.isConnected
    }
    this.styles = {
      position: "relative", height: "100%", overflow: "hidden",
      display: "flex", alignItems: "center",
    }
  }
  // @@
  // @@
  // Meteor Data
  // @@
  // @@
  getMeteorData() {
    return {
      user: Meteor.user() || {} // If you're not logged in, you shouldn't be here.
    }
  }
  // @@
  // @@
  // Prep
  // @@
  // @@
  componentWillMount() {
    super.componentWillMount()
    listener = this.checkConnection.bind(this)
    IH.Store.AM.addListener("connection", listener)
    this._isMounted = true
  }
  componentWillUnmount() {
    super.componentWillUnmount()
    this._isMounted = false
    IH.Store.AM.removeListener("connection", listener)
  }
  checkConnection( isConnected ) {
    if (this._isMounted)
      this.setState({ isConnected: isConnected })
  }
  // @@
  // @@
  // Render
  // @@
  // @@
  render() {
    let content

    if (this.state.isConnected) {
      let testArr = ["gender","height","weight","activityLevel","wtUnit","htUnit","birthday","metricsUnit"]
      let userProfile = this.data.user.profile || {}
      let test = _.filter( _.keys(_.pick(userProfile, testArr)), function(t){
        return !!userProfile[t] || _.isNumber(userProfile[t])
      })

      if (!userProfile.firstName || !userProfile.lastName)
        content = <IH.Device.ProfileName />
      else if (!userProfile.AMgoal)
        content = <IH.Device.ProfileAMGoal />
      else if (test.length!==testArr.length)
        content = <IH.Device.AMProfile deviceProfileOnly={true}>
          In order to calculate accurate data, we need you to complete your profile.
        </IH.Device.AMProfile>
      else
        content = <IH.Device.AM3SDisplay />
    } else
      content = <IH.Device.AM3SConnect />

    return <div style={this.styles}>{content}</div>
  }
}
IH.Device.AM3SMeasure.displayName = "IH.Device.AM3SMeasure"
IH.Device.AM3SMeasure.propTypes = Object.assign({}, IH.Device.AM3SMeasure.propTypes, {
  title: React.PropTypes.string,
})


let measurement // Experimental

IH.Device.AM3SDisplay = React.createClass({
  displayName: "IH.Device.AM3SDisplay",
  appName: "AM3SDisplay",
  mixins: [ReactMeteorData, IH.Mixins.AM3S, RC.Mixins.CSS],

  getMeteorData() {
    let queryType = this.state.tab ? "sleep" : "activity"
    let user = Meteor.user() || {}
    let cond = {
      userId: user._id,
      deviceType: "AM",
      msg: queryType
    }
    let opts = {
      sort: { MDay: -1 }
    }

    let subs = Meteor.subscribe("AMLatest", queryType)
    let isReady = subs.ready()

    if (isReady && user._id)
      measurement = IH.Coll.Measurements.findOne( cond, opts )

    if (!measurement) {
      if (queryType=="activity") {
        // Activity Dummy Data
        measurement = {
          MDate: null,
          MDay: null,
          msg: "activity",
          values: [{
            AMDate: 1,
            AMcalorie: "--",
            AMstepNum: "--",
            AMstepSize: "--",
          }]
        }
      } else if (queryType=="sleep") {
        // Sleep Dummy Data
      }
    }

    return {
      isReady: isReady,
      m: measurement,
      isSleeping: queryType=="sleep",
      profile: user.profile || {}
    }
  },
  // @@@@
  // @@@@
  // Prep
  // @@@@
  // @@@@
  syncInterval: null,
  getInitialState() {
    return {
      tab: 0,
      isReady: false
    }
  },
  componentWillMount() {
    let self = this
    let syncData = (call, repeat) => {

      h.setStateIfMounted(this, { isSyncing: true })
      Meteor.setTimeout(function(){
        let callName = !call ? "getSleepMessage" : call
        let callback = function(err, res){
          if (callName=="getActivityMessage")
            h.setStateIfMounted(self, { isSyncing: false })
        }
        let errorCB = function(err, res){
          h.setStateIfMounted(self, { isSyncing: false })
        }

        if (!repeat)
          IH.Store.AM.API(callName, function(res){
            if (res && res.errorID==400)
              syncData(callName, true)
            else {
              h.amSync(res, IH.Store.AM.model, callback)
              if (!call)
                syncData("getActivityMessage")
            }
          }, errorCB)
        else
          IH.Store.AM.discoverBeforeCall(callName, function(res){
            h.amSync(res, IH.Store.AM.model, callback)
          }, errorCB)
      },1500)
    }

    syncData()
    this.syncInterval = Meteor.setInterval(function(){
      syncData()
    }, 300000)

    // Sync Time
    // this.timeInterval = Meteor.setInterval(function(){
    //   self.updateSyncTime()
    // }, 60000)
  },
  componentWillUnmount() {
    Meteor.clearInterval(this.syncInterval)
  },
  componentWillUpdate() {

    // HeaderNav Title Prep
    this.updateSyncTime()

    // Init Prep
    let self = this
    if (!this.state.isReady && this.data.isReady) {
      Meteor.setTimeout(function(){
        h.setStateIfMounted(self, { isReady: true })
      }, 500)
    }
  },
  updateSyncTime() {
    let hnTitle = null
    let amVal = this.data.m

    if (amVal && amVal.MDate) {
      hnTitle = moment(amVal.MDate).format("MM/DD/YY")==moment().format("MM/DD/YY")
      ? "Today" : moment(amVal.MDate).format("dddd")
    }

    if (hnTitle && hnTitle!=this.hnTitle)
      IH.Dispatcher.App.dispatch({ action: "changeTitle", val: hnTitle })
  },
  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@
  render() {

    let lastVal, content, goal, perCent, footerData, syncMsg
    let amVal = this.data.m
    let profile = this.data.profile
    let styles = this.css.styles

    if (amVal)
      lastVal = _.sortBy(amVal.values, "AMDate").reverse()[0]

    if (lastVal) {
      // Activity
      goal = amVal.goal || IH.Device.Defaults.AM.goal
      perCent = Math.round( (isNaN(lastVal.AMstepNum) ? 0 : lastVal.AMstepNum)/goal*100)

      footerData = [
        { data: h.numberFormat(lastVal.AMstepNum), label: "steps" },
        { data: h.amCalculateCalories(profile, lastVal.AMcalorie, lastVal.AMDate), label: "calories" },
        { data: h.amCalculateDistance(lastVal.AMstepSize, lastVal.AMstepNum, profile.metricsUnit), label: profile.metricsUnit ? "km" : "miles" }
      ]
    } else {
      goal = IH.Device.Defaults.AM.goal
      perCent = 0
    }

    // Sync Message
    if (this.state.isSyncing)
      syncMsg = "Syncing data..."
    else if (amVal.MDate)
      syncMsg = `Last synced ${h.timeAgo(amVal.MDate)}`
    else
      syncMsg = "No Data"

    return <RC.Loading bgColor={IH.Device.Color.AM} isReady={!!this.state.isReady} style={styles.area}>
      <span style={styles.date}>
        {syncMsg}
      </span>

      <RC.Animate transitionName="zoom" transitionAppear={true} transitionAppearTimeout={250} transitionEnterTimeout={250} transitionLeaveTimeout={250}>
        <DevicePrivate.Circle perCent={perCent} deviceType="AM" />

        <div style={styles.perCent}>
          <span style={styles.pcNum}>{`${perCent}%`}</span>
          <span style={styles.pcDesc}>of your daily goal</span>
        </div>
      </RC.Animate>

      <div style={styles.footer}>
        {
        (footerData || []).map(function(item, n){
          return <p style={styles.footerItem} key={n}>
            <span style={styles.footerBig}>{item.data}</span>
            <span style={styles.footerSmall}>{item.label}</span>
          </p>
        })
        }
      </div>
    </RC.Loading>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  baseStyles(np,ns) {

    let fontSize = RC.Theme.font.size

    return {

      area: {
        width: "100%"
      },

      // Date
      date: {
        opacity: .5,
        position: "absolute", left: 0, right: 0, top: 5, bottom: "auto",
        textAlign: "center", fontSize: fontSize-3
      },

      // Footer Data
      footer: {
        position: "absolute", top: "auto", left: 0, right: 0, bottom: 0,
        height: 50,
        display: "flex", alignItems: "center", textAlign: "center",
        boxShadow: "0 -1px rgba(0,0,0,.1)",
        background: "rgba(255,255,255,.1)",
      },
      footerItem: {
        width: "33.3333%", padding: "1px 0 0", lineHeight: 1
      },
      footerBig: {
        display: "block",
        fontSize: fontSize+1, color: "rgba(255,255,255,.95)"
      },
      footerSmall: {
        fontSize: fontSize-3, color: "rgba(255,255,255,.64)"
      },

      // Per Cent
      perCent: Object.assign(RC.cssMixins.font("light"), {
        position: "relative", zIndex: 10,
        textAlign: "center",
        width: "100%", padding: "0 0 64px"
      }),
      pcNum: {
        display: "block",
        textIndent: 2, letterSpacing: 2,
        fontSize: fontSize*4, color: "rgba(255,255,255,.95)"
      },
      pcDesc: {
        fontSize: fontSize, color: "rgba(255,255,255,.75)"
      }
    }
  },
})
