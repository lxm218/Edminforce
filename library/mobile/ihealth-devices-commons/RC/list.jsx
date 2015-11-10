
let fontSize = RC.Theme.font.size
let rowHeight = 66
let circleOffset = 6
let unitColor = "rgba(0,0,0,.3)"
let unitStyle = {
  display: "block",
  fontSize: fontSize-4, lineHeight: 1, color: unitColor
}

IH.Device.SummaryListItem = React.createClass({
  mixins: [RC.Mixins.PureRender],
  propTypes: {
    summary: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]).isRequired,
    options: React.PropTypes.array
  },
  // @@@@
  // @@@@
  // Handler
  // @@@@
  // @@@@
  goMeasure(e) {
    if (this.props.measureUrl) {
      e.stopPropagation()
      FlowRouter.go(this.props.measureUrl)
    }
  },
  goList() {
    if (this.props.listUrl)
      FlowRouter.go(this.props.listUrl)
  },
  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@
  render() {
    let measurement
    let s = typeof this.props.summary==="object" ? this.props.summary : null
    let deviceType = s ? s.deviceType : this.props.summary
    let deviceColor = h.getDeviceColor(deviceType)
    let deviceColorDarker = h.getDeviceColor(`${deviceType}Darker`)

    let fontSize = RC.Theme.font.size
    // let styles = {
    //   measurement: h.assignClone( RC.cssMixins.font("light"), {
    //     padding: 0,
    //   }),
    //   big: {
    //     fontSize: fontSize*1.7
    //   },
    //   small: {
    //     fontSize: fontSize-3
    //   }
    // }
    let styles = {
      measurement: h.assignClone( RC.cssMixins.font("light"), {
        padding: "7px 0 0",
      }),
      block: {
        display: "inline-block", padding: 0, minWidth: 95
      },
      big: {
        display: "inline-block", verticalAlign: "bottom",
        fontSize: fontSize*1.7, lineHeight: `${fontSize*1.8}px`
      },
      small: {
        display: "inline-block", verticalAlign: "bottom",
        fontSize: fontSize-4, lineHeight: `${fontSize-4}px`, margin: "0 0 3px 3px"
      }
    }

    if (s) {
      switch (deviceType) {
        case "BP":
          measurement = <p style={styles.measurement}>
            <span style={styles.big}>{s.HP}/{s.LP}</span> <span style={styles.small}>mmHg</span>
          </p>
        break
        case "BG":
          measurement = <p style={styles.measurement}>
            <span style={styles.big}>{s.BG}</span> <span style={styles.small}>mg/dl</span>
          </p>
        break
        default:
          measurement = null
      }
    } else {
      measurement = <p style={h.assignClone(styles.measurement, {color: "rgba(0,0,0,.3)"})}>
        No measurements found.
      </p>
    }

    return <IH.Device.ListItem zoneColor={"blue"} alt={this.props.order%2} flex={true} style={{padding:"4px 8px"}} onClick={this.goList}>
      <IH.Device.ListCircle uiClass={deviceType} deviceColor={deviceColor} theme="inline" onClick={this.goMeasure} />
      <IH.Device.ListArea time={s ? moment(s.MDate).format("MM/DD/YY h:mm A") : null} theme="right">
        {measurement}
      </IH.Device.ListArea>
    </IH.Device.ListItem>
  },
})






IH.Device.ListItem = React.createClass({
  mixins: [RC.Mixins.PureRender, RC.Mixins.CSS],
  render() {
    let styles = this.css.styles
    return <div {... this.props} style={styles.area}>
      {this.props.header ? <div style={styles.header}>{this.props.header}</div> : null}
      {h.cloneElement(this.props.children, {zoneColor: this.props.zoneColor})}
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchProps: ["alt","flex","header"],
  baseStyles(np,ns) {
    return {
      area: {
        display: np.flex ? "flex" : "block", alignItems: "center",
        background: np.alt ? "#F7F7F7" : "#FFF",
        position: "relative", minHeight: rowHeight+(np.header ? 32 : 0),
        padding: 0,
        borderTop: np.header ? `solid 32px ${RC.Theme.color.fog}` : "none",
      },
      header: {
        display: "flex", alignItems: "center",
        background: RC.Theme.color.fog, color: RC.Theme.color.metal,
        position: "absolute", top: -32, left: 0, right: 0,
        height: 32, padding: "0 14px",
        fontSize: fontSize-2
      }
    }
  }
})

IH.Device.LogItem = React.createClass({
  mixins: [RC.Mixins.PureRender, RC.Mixins.CSS],
  render() {
    let styles = this.css.styles

    return <div {... this.props} style={styles.area}>
      {h.cloneElement(this.props.children, {zoneColor: this.props.zoneColor})}
      <span style={styles.line1} key={0} />
      <span style={styles.line2} key={1} />
      <span style={styles.line3} key={2} />
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchProps: ["alt"],
  baseStyles(np,ns) {

    // let resolution =
    // if (window.matchMedia("(min-width: 400px)").matches) {
    //   /* the viewport is at least 400 pixels wide */
    // } else {
    //   /* the viewport is less than 400 pixels wide */
    // }
    let line = {
      width: 1,
      position: "absolute", top: 0, bottom: 0, zIndex: 5,
      background: "rgba(0,0,0,.04)"
    }

    return {
      area: {
        display: "flex", alignItems: "center",
        background: np.alt ? "#F7F7F7" : "#FFF",
        position: "relative", height: rowHeight, padding: 0,
      },
      line1: h.assignClone(line, {
        left: "25%",
      }),
      line2: h.assignClone(line, {
        left: "50%"
      }),
      line3: h.assignClone(line, {
        left: "75%"
      }),
    }
  }
})

IH.Device.ListCircle = React.createClass({
  mixins: [RC.Mixins.PureRender, RC.Mixins.CSS],
  render() {
    let styles = this.css.styles
    let content = null

    if (this.props.val)
      content = <div style={styles.vo}>
        <div style={styles.vi}>
          <span style={styles.val}>{this.props.val || "--"}</span>
          <span style={styles.unit}>{this.props.unit}</span>
        </div>
      </div>
    else if (this.props.uiClass) {
      let uiProps = _.pick(this.props, RC.uiKeys)
      if (!uiProps.uiColor) uiProps.uiColor = "white"
      if (!uiProps.uiSize) uiProps.uiSize = 16
      content = <RC.uiIcon {... uiProps} theme="absCenter" />
    }

    return <div {... this.props} style={styles.area}>
      <div style={styles.circle}>
        {content}
      </div>
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchProps: ["zoneColor","deviceColor","value","uiClass"],
  baseStyles(np,ns) {
    let zoneColor = np.deviceColor || np.zoneColor
    let isFullColor = !np.value && np.uiClass
    return {
      area: {
        position: "relative", zIndex: 2, width: "25%",
      },
      circle: {
        width: rowHeight-circleOffset, height: rowHeight-circleOffset, margin: "0 auto",
        borderRadius: "50%",
        border: isFullColor ? "none" : `solid 4px ${zoneColor}`,
        background: isFullColor ? zoneColor : "none",
        textAlign: "center"
      },
      vo: RC.cssMixins.verticalAlignOuter,
      vi: RC.cssMixins.verticalAlignInner,
      val: h.assignClone([RC.cssMixins.font("light")], {
        display: "block", fontSize: 20, lineHeight: "20px"
      }),
      unit: unitStyle
    }
  },
  themeStyles(np,ns) {
    return {
      // Flex Align
      inline: {
        area: {
          width: "auto", padding: "0 2px"
        },
        circle: {
          position: "relative", margin: 0,
        }
      },
      // Absolute Left
      left: {
        area: {
          width: rowHeight+10,
          position: "absolute", left: 0, top: circleOffset/2,
        }
      },
      // Smaller Text
      smaller: {
        val: {
          fontSize: 19,
        },
        unit: {
          fontSize: RC.Theme.font.size-5
        }
      }
    }
  }
})

IH.Device.ListBox = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  render() {
    let styles = this.css.styles
    return <div style={styles.area}>
      <span style={styles.val}>{this.props.val || "--"}</span>
      <span style={styles.unit}>{this.props.unit}</span>
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchProps: ["val"],
  baseStyles(np,ns) {
    let valStyle = { display: "block", fontSize: fontSize-2, lineHeight: "20px" }
    let lbUnit = unitStyle

    if (String(np.val).length<=4)
      valStyle = h.assignClone( RC.cssMixins.font("light"), { fontSize: 20 })
    else if (typeof np.val==="undefined")
      Object.assign( valStyle, {color: unitColor})

    return {
      area: {
        width: "25%",
        textAlign: "center", lineHeight: 1.2,
      },
      val: valStyle,
      unit: lbUnit
    }
  }
})

IH.Device.ListArea = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  render() {
    let styles = this.css.styles

    return <div {... this.props} style={styles.area}>
      <div style={styles.title}>
        {this.props.title}
        <span style={styles.time}>{this.props.time}</span>
      </div>
      {this.props.children}
    </div>
  },
  baseStyles() {
    let fontSize = RC.Theme.font.size
    return {
      area: {
        minWidth: 180, minHeight: rowHeight+2,
        margin: `0 0 0 ${rowHeight+10}px`, padding: "11px 10px 10px 0"
      },
      title: {
        position: "relative", height: fontSize+1,
        fontSize: fontSize-2
      },
      time: {
        position: "absolute", top: 1, right: 0,
        fontSize: fontSize-4, color: unitColor
      }
    }
  },
  themeStyles() {
    return {
      right: {
        area: {
          textAlign: "right",
          margin: "0 0 0 auto", padding: 5, minHeight: 0,
        }
      }
    }
  }
})
