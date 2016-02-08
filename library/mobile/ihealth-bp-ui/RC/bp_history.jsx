"use strict"

let measurements = [] // Persistent Load
let limit = 10 // Per page

IH.Device.BPHistory = class extends RC.MeteorData {
  constructor(p) {
    super(p)
    this.state = {
      page: 1,
      init: false,
      routeFinished: false
    }
    this.styles = this.getStyles()
  }
  getMeteorData() {
    const user = Meteor.user() || {}
    const findLimit = limit*this.state.page

    let cond = {
      userId: user._id,
      deviceType: "BP"
    }
    let opts = {
      sort: { MDate: -1 },
      limit: findLimit+1
    }

    IH.Device.Subs.subscribe("BPMeasurements", cond, opts)
    const isReady = IH.Device.Subs.ready()

    if (isReady)
      measurements = IH.Coll.Measurements.find(cond,opts).fetch()

    return {
      isReady: isReady,
      hasMore: measurements.length > findLimit,
      m: measurements.slice(0,findLimit),
      profile: user.profile || {} // Check if this is still needed
    }
  }
  componentDidMount() {
    this._isMounted = true
    Meteor.setTimeout( () => {
      if (this._isMounted)
        this.setState({ routeFinished: true })
    }, 350)
  }
  componentWillUpdate(np,ns) {
    super.componentWillUpdate(np,ns)
    if (!this.state.init && this.data.isReady)
      this.setState({init: true})
  }
  componentWillUnmount() {
    super.componentWillUnmount()
    this._isMounted = false
  }
  // @@
  // @@
  // Handlers
  // @@
  // @@
  _showResult(m) {
    this.setState({
      result: m
    })
  }
  _closeResult() {
    this.setState({
      result: null
    })
  }
  _loadMore() {
    if (this.data.isReady)
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
    return <div>
      <RC.Animate transitionName="zoom" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
      {
      this.state.result
      ? <IH.Device.BPResult result={this.state.result} closeFunc={this._closeResult.bind(this)} style={this.styles.result} />
      : null
      }
      </RC.Animate>
      <RC.Loading isReady={this.state.routeFinished && (this.data.isReady || this.state.init)} style={this.styles.list} loadingStyle={this.styles.list}>
      {
      this.data.m.map( (m,n) => {
        const showDay = n===0 || moment(m.MDate).diff( this.data.m[n-1].MDate, "days" )
        return <IH.Device.BPListItem onClick={this._showResult.bind(this,m)} bpVal={m} showDay={showDay} order={n} key={n} />
      })
      }
      {
      this.data.hasMore
      ? <DevicePrivate.LoadMore isReady={this.data.isReady} onClick={this._loadMore.bind(this)} deviceType="BP" />
      : null
      }
      </RC.Loading>
    </div>
  }
  getStyles() {
    return {
      result: { top: RC.headerNavHeight() },
      list: Object.assign({}, RC.cssMixins.absFull, {
        top: RC.headerNavHeight(),
        overflowY: "auto", overflowX: "hidden", zIndex: 3,
      })
    }
  }
}

// ## @@
// ## BP List Item
// ## @@

IH.Device.BPListItem = class extends React.Component {
  constructor(p) {
    super(p)

    const bigSize = RC.Theme.font.size+8
    const smallSize = RC.Theme.font.size-4

    this.styles = {
      big: Object.assign(RC.cssMixins.font("light"), {
        display: "inline-block", verticalAlign: "bottom", margin: "0 0 0 10px", padding: 0,
        fontSize: bigSize, lineHeight: `${bigSize}px`
      }),
      small: Object.assign(RC.cssMixins.font("light"), {
        position: "relative",
        display: "inline-block", verticalAlign: "bottom", margin: "0 0 0 3px", padding: 0,
        fontSize: smallSize, lineHeight: `${smallSize}px`
      })
    }
  }
  // @@
  // @@
  // Render
  // @@
  // @@
  render() {
    let styles = this.styles
    let bpVal = this.props.bpVal

    let date = moment(bpVal.MDate)
    let dateFormat = date.format("YYYY")==moment().format("YYYY")
      ? "MMM D" : "MMM D, YYYY"
    const dateHead = this.props.showDay
      ? date.format("ddd, MMM Do, YYYY")
      : null

    const options = ["green","yellow","orange","red","danger"]
    const zone = h.getBPZone(bpVal.HP,bpVal.LP)

    return <IH.Device.ListItem {... this.props} header={dateHead} zoneColor={IH.Device.Color[options[zone]]} theme="BP">
      <IH.Device.ListCircle theme={["left","small"]} uiClass="heartbeat" uiSize={18} />
      <IH.Device.ListArea time={`${h.getBPZoneName(zone,true)} - ${date.format("h:mm A")}`}>
        <p style={styles.big}>{`${bpVal.HP}/${bpVal.LP}`}</p>
        <p style={styles.small}>mmHg</p>
        <p style={styles.big}>{`${bpVal.HR}`}</p>
        <p style={styles.small}>beats/min</p>
      </IH.Device.ListArea>
    </IH.Device.ListItem>
  }
}

IH.Device.BPListItem.propTypes = Object.assign({}, IH.Device.BPListItem.propTypes, {
  bpVal: React.PropTypes.object.isRequired
})
