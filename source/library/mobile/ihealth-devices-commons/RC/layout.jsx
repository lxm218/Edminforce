
let sbHeight = 20

let DeviceHeaderNavTabs = React.createClass({
  displayName: "DeviceHeaderNavTabs",
  appName: "DeviceHeaderNavTabs",
  mixins: [IH.Mixins.TabContents],
  clickHandler(tab) {
    this.update(tab)
  },
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
      this.props.labels.map(function(name,n){
        return <RC.URL onClick={self.clickHandler.bind(null,n)} key={n}>{name}</RC.URL>
      })
      }
    </RC.Tabs>
  }
})

// ####
// ####
// App
// ####
// ####

IH.Device.Layout = React.createClass({
  displayName: "DeviceLayout",
  appName: "DeviceLayout",
  mixins: [RC.Mixins.CSS],

  propTypes: {
    title: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),
  },
  // @@@@
  // @@@@
  // Prep
  // @@@@
  // @@@@
  timeout: null,
  getInitialState() {
    return {
      routeFinished: false,
      hnFinished: false
    }
  },
  componentWillMount() {
    let self = this
    // Add a very short delay for route animation
    Meteor.setTimeout( function(){
      if (self.isMounted()) {
        self.setState({ routeFinished: true })

        Meteor.setTimeout( function(){
          // Wait more than the animation timeout
          if (self.isMounted())
            self.setState({ hnFinished: true })
        }, 1000)
      }
    }, 180)
  },
  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@
  render() {
    let styles = this.css.styles
    let deviceType = this.props.deviceType || "none"
    let titleComp = _.isArray(this.props.title)
      ? <DeviceHeaderNavTabs labels={this.props.title} navBgColor={this.props.navBgColor} clickedNavBgColor={this.props.clickedNavBgColor} />
      : (this.props.title || null)

    return <div style={styles.area}>
      <RC.HeaderNav title={titleComp} bgColor={this.props.navBgColor || "rgba(0,0,0,.12)"} fullNavBgColor={this.props.fullNavColor || IH.Device.Color[deviceType]} absolute={!this.state.hnFinished}>
        {this.props.fullNav}
      </RC.HeaderNav>
      {this.props.bgImgBlur ? <div style={styles.backBlur} /> : null}
      {this.props.bgImg ? <div style={styles.back} /> : null}
      <div style={styles.areaInner}>
        {this.props.children}
      </div>
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchProps: ["bgImg","bgImgBlur"],
  watchStates: ["routeFinished","isConnected"],
  baseStyles(np,ns) {

    let backStyle = {
      transition: "all 1s ease",
      backgroundPosition: "50%", backgroundSize: "cover",
      transform: ns.routeFinished ? "scale(1,1)" : "scale(1.2,1.2)",
    }

    return {
      area: h.assignClone( RC.cssMixins.absFull, {
        backgroundColor: !np.bgImg ? RC.Theme.color.bodyBg : "#141414",
        color: !np.bgImg ? RC.Theme.color.textColor : "#fff",
      }),
      areaInner: h.assignClone( RC.cssMixins.absFull, {
        top: RC.Theme.size.headerNavHeight+(RC.Theme.statusBar ? sbHeight : 0), bottom: 0, left: 0, right: 0,
        overflowY: "auto", overflowX: "hidden", zIndex: 3
      }),
      back: h.assignClone( [RC.cssMixins.absFull, backStyle], {
        zIndex: 1,
        visibility: ns.isConnected ? "visible" : "hidden",
        backgroundImage: `url(${np.bgImg})`,
        opacity: ns.routeFinished && ns.isConnected ? 1 : .15
      }),
      backBlur: h.assignClone( [RC.cssMixins.absFull, backStyle], {
        zIndex: 2,
        backgroundImage: `url(${np.bgImgBlur})`,
        opacity: ns.routeFinished && !ns.isConnected ? 1 : .15
      }),
    }
  }
})
