"use strict"

const md = 50
const tn = "all .2s ease"
const fadedTextOpacity = .55

DevicePrivate.ConnectBASE = function() {
  return {
    area: {
      width: "100%", margin: "0 0 25px",
      textAlign: "center",
      fontSize: RC.Theme.font.size+3, color: "#FFF"
    },
    initLoading: {
      width: "100%", margin: "-25px 0 0"
    },
  }
}

DevicePrivate.InnerTMPL = function() {
  return {
    transition: tn,
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    display: "flex", alignItems: "center", overflowX: "hidden", overflowY: "auto",
    zIndex: -1, opacity: 0,
    transform: `translate(0,${md}px)`,
    ":on": {
      zIndex: 10, opacity: 1,
      transform: `translate(0,0)`,
    },
    ":next": {
      transform: `translate(0,${md*-1}px)`,
    }
  }
}

DevicePrivate.ConnectStage1 = class extends React.Component {
  componentWillMount() {
    this.style = Object.assign(RC.cssMixins.font("light"), {
      position: "relative",
      transition: tn,
      zIndex: -1, opacity: 0, transform: `translate(0, ${md*-1}px)`,
      ":on": {
        zIndex: 10, opacity: 1, transform: "translate(0,0)"
      }
    })
  }
  render() {
    return <div {... this.props} style={h.assignPseudos(this.style, this.props.isOn)}>
      <p style={{opacity: fadedTextOpacity}}>
        {this.props.children}
      </p>
      <p>Touch here to connect</p>
    </div>
  }
}

DevicePrivate.ConnectStage2 = class extends React.Component {
  componentWillMount() {
    this.styles = {
      discovery: DevicePrivate.InnerTMPL(),
      discoveryInner: {
        width: 270, margin: "0 auto", padding: "0 0 25px",
      },
      discoveryTitle: Object.assign(RC.cssMixins.font("bold"),{
        padding: "15px 0", margin: "0 15px",
        position: "relative"
      }),
      discoveryLine: {
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 2,
        background: "rgba(0,0,0,.2)"
      },
      discoveryList: Object.assign(RC.cssMixins.font("light"), {
        padding: "10px 15px 0"
      }),
      discoveryItem: Object.assign({},RC.cssMixins.ellipsis, {
        padding: 7,
      }),
    }
  }
  render() {
    let discoveryTitle, discoveryDesc
    let cssStates = []
    let discovered = this.props.discovered || []

    if (this.props.isOn) cssStates.push(":on")
    if (this.props.isNext) cssStates.push(":next")

    if (discovered.length) {
      discoveryTitle = `Found ${discovered.length} Device${discovered.length===1 ? "" : "s"}`
      discoveryDesc = <span>Select a device to connect.<br /></span>
    } else if (this.props.process=="stopDiscovery") {
      discoveryTitle = "No Devices Found"
      discoveryDesc = null
    } else {
      discoveryTitle = "Searching..."
      discoveryDesc = <span>Scanning for devices.<br /></span>
    }

    const isWorking = typeof this.props.isWorking=="undefined"
      ? this.props.process=="startDiscovery"
      : this.props.isWorking

    return <div {... this.props} style={h.assignPseudos(this.styles.discovery,cssStates)}>
      <div style={this.styles.discoveryInner}>
        <p className={isWorking ? "loading-line" : null} style={this.styles.discoveryTitle}>
          {discoveryTitle}
          <span style={this.styles.discoveryLine} />
        </p>
        <div style={this.styles.discoveryList}>
          <p style={{opacity: .4, padding: "0 0 20px"}}>
            {this.props.message || discoveryDesc}
            {
            this.props.process=="stopDiscovery" && (typeof this.props.isFinished=="undefined" || this.props.isFinished)
            ? <span onClick={this.props.startFunc}>Touch to search again.</span>
            : null
            }
          </p>
          {discovered}
        </div>
      </div>
    </div>
  }
}
