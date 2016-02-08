"use strict"

// ##
// ##
// AM3S - Measure & Display
// ##
// ##

const resSubs = new SubsManager()

let limit = 10 // Per page
let findLimit
let measurements = []
let hasMore

IH.Device.AMHistory = class extends DevicePrivate.ConnectedTabs {
  constructor(p) {
    super(p)
    Object.assign(this.state, {
      init: false,
      result: null,
      isSwitching: false,
      page: 1,
      routeFinished: false
    })
    this.styles = this.getStyles()
  }
  getMeteorData() {
    let result = null
    let cond = {
      msg: this.state.tab ? "sleep" : "activity",
      deviceType: "AM"
    }
    let opts = {
      sort: { MDay: -1 },
      limit: limit*this.state.page+1
    }

    IH.Device.Subs.subscribe("AMMeasurements", cond, opts)
    resSubs.subscribe("AMResult", this.state.result)

    const isReady = IH.Device.Subs.ready()
    const isResReady = resSubs.ready()
    const user = Meteor.user() || {}

    if (isReady) {
      findLimit = limit*this.state.page
      opts.limit = findLimit

      hasMore = IH.Coll.Measurements.findOne(cond, { sort: {MDay: 1}, fields: {MDay: 1}})

      measurements = IH.Coll.Measurements.find(cond, opts).fetch()
      hasMore = measurements[measurements.length-1] && measurements[measurements.length-1].MDay!=hasMore.MDay
    }

    if (isResReady && this.state.result) {
      result = IH.Coll.Measurements.findOne(this.state.result)
    }

    return {
      isReady: isReady,
      isResReady: isResReady,
      m: measurements.slice(0,findLimit),
      hasMore: hasMore,
      profile: user.profile || {},
      result: result
    }
  }
  // @@
  // @@
  // Prep
  // @@
  // @@
  componentDidMount() {
    super.componentDidMount()
    Meteor.setTimeout( () => {
      if (this._isMounted)
        this.setState({ routeFinished: true })
    }, 350)

    this.token = IH.Dispatcher.App.register( (payload) => {
      switch(payload.action) {
        case "changeTab":
          this._closeResult()
        break
      }
    })
  }
  componentWillUnmount() {
    super.componentWillUnmount()

    if (IH.Dispatcher.App._callbacks[this.token])
      IH.Dispatcher.App.unregister(this.token)
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
  _showResult(id) {
    this.setState({
      result: id
    })
  }
  _closeResult() {
    if (this._isMounted) // Needed for Dispatcher catch
      this.setState({
        result: null
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
            return <IH.Device.AMListItem profile={this.data.profile} amVal={m} order={n} key={n} showResult={this._showResult.bind(this,m._id)} />
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

    return <div>
      <RC.Animate transitionName="zoom" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
        {
        this.state.result
        ? <IH.Device.AMResult isReady={this.data.isResReady} profile={this.data.profile} result={this.data.result} closeFunc={this._closeResult.bind(this)} style={this.styles.result} />
        : null
        }
      </RC.Animate>
      <RC.Loading isReady={this.state.routeFinished && isReady} style={this.styles.list} loadingStyle={this.styles.list}>
        {content}
      </RC.Loading>
    </div>
  }
  getStyles() {
    return {
      result: { top: RC.headerNavHeight() },
      list: Object.assign({}, RC.cssMixins.absFull, {
        top: RC.headerNavHeight(),
        overflowY: "auto", overflowX: "hidden", zIndex: 3,
      }),
      overlay: Object.assign({}, RC.cssMixins.absFull, {
        background: "rgba(255,255,255,.5)",
        zIndex: 10,
      })
    }
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

    let date = moment(amVal.MDay,"YYYYMMDD")
    let dateFormat = date.format("YYYY")==moment().format("YYYY")
      ? "MMM D" : "MMM D, YYYY"

    // Date
    if (amVal.lastValue) {
      lastVal = DbTools.renameKeys(DbTools.keyMap.am, amVal.lastValue)

      if (amVal.msg=="activity") {
        // Activity Data
        goal = amVal.goal || IH.Device.Defaults.AM.goal
        perCent = Math.round(lastVal.step/goal*100) || 0
        goalMsg = `Reached ${perCent}% of ${h.numberFormat(goal)}`

        content = <div style={styles.measurement}>
          <p style={styles.big}>{h.numberFormat(lastVal.step)}</p>
          <p style={styles.small}>{/* <RC.uiIcon uiClass="hand-rock-o" uiSize={9} itemStyle={styles.uiIcon} />*/}steps</p>

          <p style={styles.big}>{h.amCalculateCalories(profile, lastVal.calorie, lastVal.time)}</p>
          <p style={styles.small}>{/* <RC.uiIcon uiClass="hand-paper-o" uiSize={9} itemStyle={styles.uiIcon} />*/ }kcal</p>

          <p style={styles.big}>{h.amCalculateDistance(lastVal.stepsize, lastVal.step, profile.metricsUnit)}</p>
          <p style={styles.small}>{/* <RC.uiIcon uiClass="hand-scissors-o" uiSize={9} itemStyle={styles.uiIcon} />*/ }{h.amGetMetricsUnit(profile.metricsUnit)}</p>
        </div>
      } else {
        // Sleep Data
        const TS = lastVal.DS+lastVal.RS+lastVal.NS
        const duration = TS*5 // Sleep in minutes
        const hours = Math.floor(duration / 60) // Sleep in hours
        const mins = Math.round(60*(duration/60-hours)) // Remaining minutes

        perCent = Math.round((lastVal.DS+lastVal.RS)/TS*100) || 0
        goalMsg = `${hours} hours and ${mins} minutes`

        content = <div style={styles.measurement}>
          <p style={styles.big}>{perCent}</p>
          <p style={styles.small}>{/* <RC.uiIcon uiClass="hand-rock-o" uiSize={9} itemStyle={styles.uiIcon} /> */}% sleep efficiency</p>
        </div>
      }
    } else {
      perCent = 0
      goalMsg = "--"
      content = <div style={styles.measurement}>
        <span style={{color: "rgba(0,0,0,.35)"}}></span>
      </div>
    }

    return <IH.Device.ListItem zoneColor={IH.Device.Color.AM} perCent={perCent} onClick={this.props.showResult} order={this.props.order}>
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
  amVal: React.PropTypes.object.isRequired,
  showResult: React.PropTypes.func
})
