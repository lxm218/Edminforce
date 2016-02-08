"use strict"

DevicePrivate.ConnectedTabs = class extends RC.MeteorData {
  constructor(p) {
    super(p)
    this.state = {
      tab: 0
    }
  }
  getMeteorData() {
    return {}
  }
  componentWillMount() {
    super.componentWillMount()
    IH.Dispatcher.App.dispatch({ action: "changeTab", val: 0 }) // Dispatch before register
    this.token = IH.Dispatcher.App.register( (payload) => {
      switch(payload.action) {
        case "changeTab":
          if (this._isMounted && !isNaN(payload.val))
            this.setState({ tab: payload.val })
        break
      }
    })
  }
  componentDidMount() {
    this._isMounted = true
  }
  componentWillUnmount() {
    super.componentWillUnmount()
    this._isMounted = false
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
      bgColor: this.props.navBgColor,
      clickedBgColor: this.props.clickedNavBgColor || "#f7f7f7",
      clickedColor: this.props.navBgColor,
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
      error: null,
      isConnected: false,
      routeFinished: false,
      hnFinished: false,
      hnTitle: null,
      switchDevice: null
    }
  }
  componentWillMount() {
    super.componentWillMount()
    if (Meteor.isCordova)
      StatusBar.styleBlackTranslucent()

    // ####
    // Init Dispatcher
    // ####
    this.token = IH.Dispatcher.App.register( (payload) => {
      if (this._isMounted && payload.action=="changeTitle" && typeof payload.val==="string")
        this.setState({
          hnTitle: payload.val
        })
    })
  }
  componentDidMount() {
    super.componentDidMount()
    // ####
    // Add a very short delay for route animation
    // ####
    let hnWait = () => {
      Meteor.setTimeout( () => {
        // Wait more than the animation timeout())
        if (this._isMounted)
          this.setState({ hnFinished: true })
      }, 1000)
    }
    Meteor.setTimeout( () => {
      if (this._isMounted)
        this.setState({ routeFinished: true })
      hnWait()
    }, (this.props.bgImg || this.props.bgImgBlur) ? 350 : 0)
  }
  componentWillUnmount() {
    super.componentWillUnmount()
    IH.Dispatcher.App.unregister(this.token)

    if (Meteor.isCordova)
      StatusBar.styleDefault()
  }
  _switchDevice(url) {
    if (FlowRouter.current().params.control == "open")
      FlowRouter.Silent = true
    FlowRouter.go(url)
  }
  _closeError() {
    this.setState({
      error: null
    })
  }
  // @@
  // @@
  // Render
  // @@
  // @@
  renderError() {
    return <RC.Animate transitionName="zoom" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
      {
      this.state.error
      ? <DevicePrivate.Error errorMsg={this.state.error} closeFunc={this._closeError.bind(this)} />
      : null
      }
    </RC.Animate>
  }
  renderChildren() {
    if (typeof this.props.wrapChildren=="undefined" || this.props.wrapChildren)
      return <div style={this.css.get("styles").areaInner}>
        {this.props.children}
      </div>
    return this.props.children
  }
  renderFullNav() {
    const styles = this.css.get("styles")
    const deviceType = (this.state.switchDevice || this.props.deviceType).toLowerCase()
    const icons = ["BP","BG","AM","HS"]

    return [
      <div style={styles.deviceNav} key="devices">
        {
        icons.map( (icon,n) => {
          let url = FlowRouter.current().path
          url = url.split("/")
          url = url.filter(function(s){ return s.length })
          url[0] = icon.toLowerCase()
          url = url.slice(0,2)
          url = `/${url.join("/")}/open`

          let cssStates = [`:${icon}`]
          if (icon.toLowerCase()==deviceType) cssStates = cssStates.concat(":cur")

          return <figure onClick={this._switchDevice.bind(this,url)} style={h.assignPseudos(styles.icon, cssStates)} key={n} />
        })
        }
      </div>,
      <RC.URL href={`/${deviceType}/measure`} key={0}>Measure</RC.URL>,
      <RC.URL href={`/${deviceType}/history`} key={1}>History</RC.URL>,
      <RC.URL href={`/${deviceType}/trends`} key={2}>Trends</RC.URL>,
      <RC.URL href={`/${deviceType}/settings`} key={3}>Settings</RC.URL>,
    ]
  }
  render() {
    const styles = this.css.get("styles")
    const deviceType = this.state.switchDevice || this.props.deviceType
    const navBgColor = this.props.navBgColor===null ? "rgba(255,255,255,.1)" : IH.Device.Color[`${deviceType}Darker`]

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
    const headerNav = {
      title: _.isArray(this.props.title)
        ? <DeviceHeaderNavTabs labels={this.props.title} navBgColor={navBgColor} clickedNavBgColor={this.props.clickedNavBgColor} />
        : (this.state.hnTitle || this.props.title || null), // Some device mixins allow header nav title changes
      bgColor: navBgColor,
      color: "white",
      fullNavBgColor: IH.Device.Color[deviceType],
      fullNavColor: "white",
      absolute: !this.state.hnFinished,
      openFullNav: this.props.openFullNav,
      fullNavToggleFunc: function(fnState) {
        if (!fnState) {
          FlowRouter.Silent = true
          FlowRouter.setParams({control: null})
        }
      }
    }

    return <div style={styles.area}>
      <RC.HeaderNav {... headerNav}>
        {this.renderFullNav()}
      </RC.HeaderNav>
      {this.props.bgImgBlur ? <div style={backBlurStyle} /> : null}
      {this.props.bgImg ? <div style={backStyle} /> : null}
      {this.renderError()}
      {this.renderChildren()}
    </div>
  }
  // @@
  // @@
  // Styles
  // @@
  // @@
  baseStyles(np,ns) {
    const backStyle = {
      transition: "all 1s ease",
      backgroundPosition: "50%", backgroundSize: "cover",
      transform: "scale(1.2,1.2)",
      ":routed": {
        transform: "scale(1,1)",
      }
    }

    const back = typeof np.bgImg == "boolean"
      ? (np.bgImg && this.defaultBack ? this.defaultBack : null)
      : (np.bgImg || null)
    const blur = typeof np.bgImgBlur == "boolean"
      ? (np.bgImgBlur && this.defaultBlur ? this.defaultBlur : null)
      : (np.bgImgBlur || null)

    return {
      area: Object.assign({}, RC.cssMixins.absFull, {
        backgroundColor: !back ? this.color.get("hex") : "#141414",
        color: !back ? RC.Theme.color.text : "#fff",
      }),
      areaInner: Object.assign({}, RC.cssMixins.absFull, {
        top: RC.headerNavHeight(), bottom: 0, left: 0, right: 0,
        overflowY: "auto", overflowX: "hidden", zIndex: 3
      }),
      back: Object.assign({}, RC.cssMixins.absFull, backStyle, {
        zIndex: 1,
        visibility: "hidden", opacity: .1,
        backgroundImage: back ? `url(${back})` : "none",
        ":on": {
          visibility: "visible", opacity: 1
        }
      }),
      backBlur: Object.assign({}, RC.cssMixins.absFull, backStyle, {
        zIndex: 2,
        backgroundImage: blur ? `url(${blur})` : "none",
        opacity: .1,
        ":off": { opacity: 0 },
        ":on": { opacity: 1 }
      }),
      // Full Nav
      deviceNav: {
        position: "absolute", top: 34, left: 24
      },
      icon: {
        backgroundImage: "url(/packages/ihealth_devices-commons-ui/assets/devices-white.png)",
        backgroundSize: "70px 420px",
        display: "inline-block", width: 40, height: 40, margin: "0 5px 0 0",
        borderRadius: "50%", border: "solid 1px #FFF",
        ":BP": { backgroundPosition: "50% -16px" },
        ":BG": { backgroundPosition: "50% -366px" },
        ":AM": { backgroundPosition: "50% -156px" },
        ":HS": { backgroundPosition: "50% -226px" },
        ":PO": { backgroundPosition: "50% -86px" },
        ":cur": { backgroundColor: "rgba(0,0,0,.2)" },
      },
    }
  }
}

IH.Device.Layout.displayName = "IH.Device.Layout"
IH.Device.Layout.propTypes = Object.assign({}, IH.Device.Layout.propTypes, {
  title: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
  ]),
  deviceType: React.PropTypes.string.isRequired,
  openFullNav: React.PropTypes.bool
})
