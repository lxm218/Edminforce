"use strict"

DevicePrivate.ConnectedTabs = class extends RC.MeteorData {
  constructor(p) {
    super(p)
    this.state = {tab: 0}
  }
  getMeteorData() {
    return {}
  }
  componentWillMount() {
    super.componentWillMount()
    IH.Dispatcher.App.dispatch({ action: "changeTab", val: 0 })
    this.token = IH.Dispatcher.App.register( (payload) => {
      if (payload.action=="changeTab" && !isNaN(payload.val))
        this.setState({ tab: payload.val })
    })
  }
  componentWillUnmount() {
    super.componentWillUnmount()
    IH.Dispatcher.App.unregister(this.token)
  }
}

// Not Exported
const DeviceHeaderNavTabs = class extends DevicePrivate.ConnectedTabs {
  _switchTabs(tab) {
    IH.Dispatcher.App.dispatch({ action: "changeTab", val: tab })
  }
  render() {
    let self = this
    let props = {
      theme: ["small","reverse"],
      bgColor: this.props.navBgColor || "#333",
      clickedBgColor: this.props.clickedNavBgColor || "#f7f7f7",
      clickedColor: this.props.navBgColor || "#333",
      forceClicked: this.state.tab
    }
    return <RC.Tabs {... props}>
      {
      this.props.labels.map( (name,n) => {
        return <RC.URL onClick={self._switchTabs.bind(null,n)} key={n}>{name}</RC.URL>
      })
      }
    </RC.Tabs>
  }
}
DeviceHeaderNavTabs.displayName = "DeviceHeaderNavTabs"

// ##
// ##
// App
// ##
// ##

IH.Device.Layout = class extends RC.CSS {
  constructor(p) {
    super(p)
    this.watchProps = ["bgImg","bgImgBlur"]
    this.timeout = null

    this.state = {
      isConnected: false,
      routeFinished: false,
      hnFinished: false,
      hnTitle: null
    }
  }
  componentWillMount() {
    super.componentWillMount()

    // ####
    // Add a very short delay for route animation
    // ####
    let hnWait = () => {
      Meteor.setTimeout( () => {
        // Wait more than the animation timeout())
        this.setState({ hnFinished: true })
      }, 1000)
    }
    Meteor.setTimeout( () => {
      this.setState({ routeFinished: true })
      hnWait()
    }, (this.props.bgImg || this.props.bgImgBlur) ? 300 : 0)

    // ####
    // Init Dispatcher
    // ####
    this.token = IH.Dispatcher.App.register( (payload) => {
      if (payload.action=="changeTitle" && typeof payload.val==="string")
        this.setState({
          hnTitle: payload.val
        })
    })
  }
  componentWillUnmount() {
    IH.Dispatcher.App.unregister(this.token)
  }
  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@
  renderChildren() {
    if (typeof this.props.wrapChildren=="undefined" || this.props.wrapChildren)
      return <div style={this.css.get("styles").areaInner}>
        {this.props.children}
      </div>
    return this.props.children
  }
  render() {
    const styles = this.css.get("styles")
    const deviceType = this.props.deviceType || "none"
    const titleComp = _.isArray(this.props.title)
      ? <DeviceHeaderNavTabs labels={this.props.title} navBgColor={this.props.navBgColor} clickedNavBgColor={this.props.clickedNavBgColor} />
      : (this.state.hnTitle || this.props.title || null) // Some device mixins allow header nav title changes

    let cssStates1 = [] // Don't do cssStates1 = cssStates2 = []
    let cssStates2 = []

    if (this.state.routeFinished) {
      cssStates1.push(":routed")
      cssStates2.push(":routed")

      if (this.state.isConnected)
        cssStates1.push(":on")
      else
        cssStates2.push(":on")
    }
    if (this.state.isConnected) {
      cssStates1.push(":on")
      cssStates2.push(":off")
    }

    const backStyle = h.assignPseudos(styles.back, cssStates1)
    const backBlurStyle = h.assignPseudos(styles.backBlur, cssStates2)

    return <div style={styles.area}>
      <RC.HeaderNav title={titleComp} bgColor={this.props.navBgColor || "rgba(255,255,255,.1)"} color="white" fullNavBgColor={this.props.fullNavColor || IH.Device.Color[deviceType]} absolute={!this.state.hnFinished}>
        {this.props.fullNav}
      </RC.HeaderNav>
      {this.props.bgImgBlur ? <div style={backBlurStyle} /> : null}
      {this.props.bgImg ? <div style={backStyle} /> : null}
      {this.renderChildren()}
    </div>
  }
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  baseStyles(np,ns) {
    const backStyle = {
      transition: "all 1s ease",
      backgroundPosition: "50%", backgroundSize: "cover",
      transform: "scale(1.2,1.2)",
      ":routed": {
        transform: "scale(1,1)",
      }
    }
    return {
      area: Object.assign({}, RC.cssMixins.absFull, {
        backgroundColor: !np.bgImg ? this.color.get("hex") : "#141414",
        color: !np.bgImg ? RC.Theme.color.text : "#fff",
      }),
      areaInner: Object.assign({}, RC.cssMixins.absFull, {
        top: RC.Theme.size.headerNavHeight(), bottom: 0, left: 0, right: 0,
        overflowY: "auto", overflowX: "hidden", zIndex: 3
      }),
      back: Object.assign({}, RC.cssMixins.absFull, backStyle, {
        zIndex: 1,
        visibility: "hidden", opacity: .1,
        backgroundImage: np.bgImg ? `url(${np.bgImg})` : "none",
        ":on": {
          visibility: "visible", opacity: 1
        }
      }),
      backBlur: Object.assign({}, RC.cssMixins.absFull, backStyle, {
        zIndex: 2,
        backgroundImage: np.bgImgBlur ? `url(${np.bgImgBlur})` : "none",
        opacity: .1,
        ":off": { opacity: 0 },
        ":on": { opacity: 1 }
      }),
    }
  }
}

IH.Device.Layout.displayName = "IH.Device.Layout"
IH.Device.Layout.propTypes = Object.assign({}, IH.Device.Layout.propTypes, {
  title: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
  ])
})
