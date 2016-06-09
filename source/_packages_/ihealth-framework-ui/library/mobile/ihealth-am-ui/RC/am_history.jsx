"use strict"

// ##
// ##
// AM3S - Measure & Display
// ##
// ##

let limit = 10 // Per page
let findLimit
let measurements = []
let hasMore

IH.Device.AMHistory = class extends DevicePrivate.ConnectedTabs {
  constructor(p) {
    super(p)
    this.styles = {
      overlay: Object.assign({}, RC.cssMixins.absFull, {
        background: "rgba(255,255,255,.5)",
        zIndex: 10,
      })
    }
    Object.assign(this.state, {
      init: false,
      isSwitching: false,
      page: 1
    })
  }
  getMeteorData() {
    let cond = {
      msg: this.state.tab ? "sleep" : "activity"
    }
    let opts = {
      sort: { MDay: -1 },
      limit: limit*this.state.page+1
    }

    IH.DeviceSubs.subscribe("AMMeasurements", cond, opts)

    let isReady = IH.DeviceSubs.ready()
    let user = Meteor.user() || {}

    cond.deviceType = "AM"

    if (isReady) {
      findLimit = limit*this.state.page
      opts.limit = findLimit

      hasMore = IH.Coll.Measurements.findOne(cond, { sort: {MDay: 1}})

      measurements = IH.Coll.Measurements.find(cond, opts).fetch()
      hasMore = measurements[measurements.length-1] && measurements[measurements.length-1].MDay!=hasMore.MDay
    }

    return {
      isReady: isReady,
      m: measurements.slice(0,findLimit),
      hasMore: hasMore,
      profile: user.profile || {}
    }
  }
  // @@
  // @@
  // Prep
  // @@
  // @@
  componentWillUnmount() {
    super.componentWillUnmount()
    this._isMounted = false
  }
  componentMount() {
    this._isMounted = true
  }
  componentWillUpdate(np,ns) {
    super.componentWillUpdate(np,ns)
    if (!this.state.init && this.data.isReady)
      this.setState({
        init: true
      })
  }
  componentDidUpdate(np,ns) {
    if (this.state.tab!==ns.tab && !this.state.isSwitching)
      this.setState({
        isSwitching: true
      })
    else if (this.state.isSwitching && this.data.isReady) {
      this.setState({
        isSwitching: false
      })
    }
  }
  _loadMore() {
    if (!this.state.isSwitching && this.data.isReady)
      this.setState({
        page: ++this.state.page
      })
  }
  // @@
  // @@
  // Render
  // @@
  // @@
  render() {
    const styles = this.styles
    const isReady = this.data.isReady || this.state.init

    let content

    if (isReady) {
      if (this.data.m.length) {
        content = <div style={{position: "relative"}}>
          {this.state.isSwitching ? <div style={styles.overlay} /> : null}
          {
          this.data.m.map( (m, n) => {
            return <IH.Device.AMListItem profile={this.data.profile} amVal={m} order={n} key={n} />
          })
          }
          {
          this.data.hasMore
          ? <DevicePrivate.LoadMore isReady={this.data.isReady} onClick={this._loadMore.bind(this)} deviceType="AM" />
          : null
          }
        </div>
      } else
        content = <div style={Object.assign({}, RC.cssMixins.absFull, {display: "flex", alignContent: "center"})}>
          <div style={{margin: "auto", textAlign: "center", fontSize: 14, color: "rgba(0,0,0,.4)"}}>
            <RC.uiIcon uiClass="cloud" uiSize={50} uiColor={IH.Device.Color.AM} theme="inlineBlock" />
            <div>No Data Found</div>
          </div>
        </div>
    }

    return <RC.Loading isReady={isReady}>
      {content}
    </RC.Loading>
  }
}
IH.Device.AMHistory.displayName = "IH.Device.AMHistory"
IH.Device.AMHistory.propTypes = {
  title: React.PropTypes.string,
}

// ##
// ##
// AM List Item
// ##
// ##

IH.Device.AMListItem = class extends React.Component {
  render() {
    let styles = this.styles()
    let amVal = this.props.amVal
    let profile = this.props.profile
    let lastVal, goal, goalMsg, perCent, content

    let date = moment(`${String(amVal.MDay).substr(0,4)}-${String(amVal.MDay).substr(4,2)}-${String(amVal.MDay).substr(6,2)}`)
    let dateFormat = date.format("YYYY")==moment().format("YYYY")
      ? "MMM D" : "MMM D, YYYY"

    // Date
    if (amVal.values) {
      if (amVal.msg=="activity") {
        // Activity
        lastVal = _.sortBy(amVal.values, "AMDate").reverse()[0] // Final Value
        goal = amVal.goal || IH.Device.Defaults.AM.goal
        perCent = Math.round(lastVal.AMstepNum/goal*100)
        goalMsg = `Reached ${perCent}% of ${h.numberFormat(goal)}`

        content = <div style={styles.measurement}>
          <p style={styles.big}>{h.numberFormat(lastVal.AMstepNum)}</p>
          <p style={styles.small}>{/* <RC.uiIcon uiClass="hand-rock-o" uiSize={9} itemStyle={styles.uiIcon} />*/}steps</p>

          <p style={styles.big}>{h.amCalculateCalories(profile, lastVal.AMcalorie, lastVal.AMDate)}</p>
          <p style={styles.small}>{/* <RC.uiIcon uiClass="hand-paper-o" uiSize={9} itemStyle={styles.uiIcon} />*/ }kcal</p>

          <p style={styles.big}>{h.amCalculateDistance(lastVal.AMstepSize, lastVal.AMstepNum, profile.metricsUnit)}</p>
          <p style={styles.small}>{/* <RC.uiIcon uiClass="hand-scissors-o" uiSize={9} itemStyle={styles.uiIcon} />*/ }{profile.metricsUnit ? "miles" : "km"}</p>
        </div>
      } else {
        // Sleep
        const sleepData = _.isArray(amVal.values[0]) ? _.flatten(amVal.values) : amVal.values
        let group = _.groupBy(sleepData, "SleepData")
        let deepSleep = group[2] ? group[2].length : 0
        let regSleep = group[1] ? group[1].length : 0
        let noSleep = group[0] ? group[0].length : 0
        let totalSleep = deepSleep+regSleep+noSleep

        let duration = totalSleep*5 // Sleep in minutes
        let hours = Math.floor(duration / 60) // Sleep in hours
        let mins = Math.round(60*(duration/60-hours)) // Remaining minutes

        perCent = Math.round((deepSleep+regSleep)/totalSleep*100)
        goalMsg = `${hours} hours and ${mins} minutes`
        content = <div style={styles.measurement}>
          <p style={styles.big}>{perCent}</p>
          <p style={styles.small}>{/* <RC.uiIcon uiClass="hand-rock-o" uiSize={9} itemStyle={styles.uiIcon} /> */}Sleep efficiency %</p>
        </div>
      }
    } else {
      perCent = 0
      goalMsg = "--"
      content = <div style={styles.measurement}>
        <span style={{color: "rgba(0,0,0,.35)"}}></span>
      </div>
    }

    return <IH.Device.ListItem zoneColor={IH.Device.Color.AM} perCent={perCent} order={this.props.order}>
      <IH.Device.ListBox val={date.format("dddd")} unit={date.format(dateFormat)} theme={["inline","left"]} />
      <IH.Device.ListArea time={goalMsg} theme="AM">
        {content}
      </IH.Device.ListArea>
    </IH.Device.ListItem>
  }
  // @@
  // @@
  // Styles, No Mixin
  // @@
  // @@
  styles() {
    let fontSize = RC.Theme.font.size
    let bigSize = fontSize+3
    let smallSize = fontSize-4
    return {
      measurement: Object.assign({}, RC.cssMixins.font("light"), {
        padding: "12px 0 0",
      }),
      block: {
        display: "inline-block", padding: 0, minWidth: 95
      },
      big: {
        display: "inline-block", verticalAlign: "bottom", margin: "0 0 0 10px", padding: 0,
        fontSize: bigSize, lineHeight: `${bigSize}px`
      },
      small: {
        position: "relative",
        display: "inline-block", verticalAlign: "bottom", margin: "0 0 0 3px", padding: 0,
        fontSize: smallSize, lineHeight: `${smallSize}px`
      },
      // uiIcon: {
      //   position: "absolute", left: -3, top: -5,
      // }
    }
  }
}

IH.Device.AMListItem.propTypes = Object.assign({}, IH.Device.AMListItem.propTypes, {
  amVal: React.PropTypes.object.isRequired
})
