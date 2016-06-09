// "use strict"

let fontSize = RC.Theme.font.size
let rowHeight = 66
let circleOffset = 6
let unitColor = "rgba(0,0,0,.3)"
let unitStyle = {
  display: "block",
  fontSize: fontSize-4, lineHeight: 1, color: unitColor
}

IH.Device.SummaryListItem = class extends React.Component {
  constructor(p) {
    super(p)
    this.styles = this.getStyles()
  }
  // @@
  // @@
  // Handler
  // @@
  // @@
  _goMeasure(e) {
    if (this.props.measureUrl) {
      e.stopPropagation()
      FlowRouter.go(this.props.measureUrl)
    }
  }
  _goList() {
    if (this.props.listUrl)
      FlowRouter.go(this.props.listUrl)
  }
  // @@
  // @@
  // Render
  // @@
  // @@
  render() {
    let measurement, score, scoreName
    let props = this.props

    if (this.props.order===0)
      props.style = {borderTop: "none"}

    const profile = this.props.profile
    const s = typeof this.props.summary==="object" ? this.props.summary : null
    const deviceType = s ? s.deviceType : this.props.summary
    const deviceColor = IH.Device.Color[deviceType] || "#333"

    if (s) {
      switch (deviceType) {
        case "BP":
          score = h.getBPZone(s.HP,s.LP)
          scoreName = h.getBPZoneName(score,true)
          measurement = [
            <span style={this.styles.big} key={0}>{s.HP}/{s.LP}</span>,
            <span style={this.styles.small} key={1}>mmHg</span>,
            <span style={this.styles.big} key={2}>{s.HR}</span>,
            <span style={this.styles.small} key={3}>beats/min</span>
          ]
        break
        case "BG":
          score = h.getBGZone(s.BG, s.beforeMeal)
          scoreName = h.getBGZoneName(score)
          if (score>=2) score = 3
          measurement = [
            <span style={this.styles.big} key={0}>{s.BG}</span>,
            <span style={this.styles.small} key={1}>{`mg/dl (${(s.beforeMeal ? "before" : "after")} ${s.mealType.toLowerCase()})`}</span>
          ]
        break
        case "AM":
          const lastVal = _.sortBy(s.values, "AMDate").reverse()[0] // Final Value
          const goal = s.goal || IH.Device.Defaults.AM.goal
          const pc = (isNaN(lastVal.AMstepNum) ? 0 : lastVal.AMstepNum)/goal

          score = h.getAMZone(pc)
          scoreName = `Reached ${pc*100}%`
          measurement = [
            <span style={this.styles.big} key={0}>{h.numberFormat(lastVal.AMstepNum)}</span>,
            <span style={this.styles.small} key={1}>steps</span>,
            <span style={this.styles.big} key={2}>{h.amCalculateCalories(profile, lastVal.AMcalorie, lastVal.AMDate)}</span>,
            <span style={this.styles.small} key={3}>kcal</span>,
            <span style={this.styles.big} key={4}>{h.amCalculateDistance(lastVal.AMstepSize, lastVal.AMstepNum, profile.metricsUnit)}</span>,
            <span style={this.styles.small} key={5}>{profile.metricsUnit ? "miles" : "km"}</span>
          ]
        break
        default:
          measurement = null
      }
    } else {
      measurement = <p style={Object.assign({},this.styles.measurement, {color: "rgba(0,0,0,.3)"})}>
        No measurements found.
      </p>
    }

    return <IH.Device.ListItem {... props} zoneColor="#FFF" onClick={this._goList.bind(this)} theme="summary">
      <div style={this.styles.score}><span style={h.assignPseudos(this.styles.dot,`:score${score}`)} />{scoreName}</div>
      <IH.Device.ListCircle theme="cornerIcon" circleStyle={{borderWidth: 1}} deviceColor={deviceColor} onClick={this._goMeasure.bind(this)}>
        <span style={h.assignPseudos(this.styles.icon,`:${deviceType}`)} />
      </IH.Device.ListCircle>
      <IH.Device.ListArea time={s ? moment(s.MDate).format("MM/DD/YY h:mm A") : null}>
        {measurement}
      </IH.Device.ListArea>
    </IH.Device.ListItem>
  }
  getStyles() {
    const bigSize = RC.Theme.font.size+3
    const smallSize = RC.Theme.font.size-4
    return {
      big: Object.assign(RC.cssMixins.font("light"), {
        display: "inline-block", verticalAlign: "bottom", margin: "0 0 0 10px", padding: 0,
        fontSize: bigSize, lineHeight: `${bigSize}px`
      }),
      small: Object.assign(RC.cssMixins.font("light"), {
        position: "relative",
        display: "inline-block", verticalAlign: "bottom", margin: "0 0 0 3px", padding: 0,
        fontSize: smallSize, lineHeight: `${smallSize}px`
      }),
      icon: Object.assign({}, RC.cssMixins.absFull, {
        backgroundImage: "url(/packages/ihealth_devices-commons-ui/assets/devices-reverse.png)",
        backgroundSize: "70px 350px",
        ":BP": {
          backgroundPosition: "50% -16px", backgroundColor: IH.Device.Color.BP
        },
        ":BG": {
          backgroundPosition: "50% -86px", backgroundColor: IH.Device.Color.BG
        },
        ":AM": {
          backgroundPosition: "50% -156px", backgroundColor: IH.Device.Color.AM
        },
        ":HS": {
          backgroundPosition: "50% -226px", backgroundColor: IH.Device.Color.HS
        },
        ":PO": {
          backgroundPosition: "50% -296px", backgroundColor: IH.Device.Color.PO
        },
      }),
      score: {
        position: "absolute", top: 5, left: 44, zIndex: 10,
        fontSize: smallSize, color: unitColor
      },
      dot: {
        width: 12, height: 12, margin: "1px 2px 0 0",
        borderRadius: "50%",
        display: "block", float: "left",
        ":score0": { backgroundColor: IH.Device.Color.green },
        ":score1": { backgroundColor: IH.Device.Color.yellow },
        ":score2": { backgroundColor: IH.Device.Color.orange },
        ":score3": { backgroundColor: IH.Device.Color.red },
        ":score4": { backgroundColor: IH.Device.Color.danger },
      }
    }
  }
}

IH.Device.SummaryListItem.displayName = "IH.Device.SummaryListItem"
IH.Device.SummaryListItem.propTypes = Object.assign({}, IH.Device.SummaryListItem.propTypes,{
  summary: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]).isRequired,
  options: React.PropTypes.array
})



IH.Device.ListItem = class extends RC.CSS {
  constructor(p) {
    super(p)
    this.watchProps = ["header","perCent"]
  }
  render() {
    let styles = this.css.get("styles")
    return <div {... this.props} style={styles.area}>
      {
      _.isNumber(this.props.perCent)
        ? [<span style={styles.pcLine} key={0} />, <span style={styles.perCent} key={1} />, <span style={styles.pcBase} key={2} />]
        : null
      }
      {this.props.header ? <div style={styles.header}>{this.props.header}</div> : null}
      {h.cloneElement(this.props.children, {zoneColor: this.props.zoneColor,theme: this.props.theme})}
    </div>
  }
  // @@
  // @@
  // Styles
  // @@
  // @@
  baseStyles(np,ns) {

    let hasPerCent = _.isNumber(np.perCent)
    let pcRight = hasPerCent ? Math.max(100-np.perCent, 0) : 100
    let tn = "all .4s ease"

    return {
      area: {
        display: "block",
        background: "#FFF",
        position: "relative",
        padding: hasPerCent ? "1px 0 0" : 0,
        margin: hasPerCent && np.order===0 ? "7px 0 0" : 0,
        borderTop: np.header ? `solid 26px ${IH.Device.Color.alt}` : (hasPerCent ? "none" : "solid 1px rgba(0,0,0,.1)"),
      },
      header: {
        display: "flex", alignItems: "center",
        background: IH.Device.Color.alt,
        position: "absolute", top: -26, left: 0, right: 0,
        height: 26, padding: "0 10px",
        fontSize: fontSize-2, lineHeight: 1
      },
      // Per Cent
      perCent: {
        transition: tn, opacity: .05,
        backgroundColor: np.zoneColor,
        position: "absolute", top: 0, left: 0, bottom: 0, zIndex: 1,
        right: `${pcRight}%`,
      },
      pcLine: {
        transition: tn,
        backgroundColor: np.zoneColor,
        position: "absolute", top: 0, left: 0, bottom: "auto", zIndex: 2,
        right: `${pcRight}%`,
        height: 1
      },
      pcBase: {
        backgroundColor: "rgba(0,0,0,.1)",
        position: "absolute", top: 0, left: 0, right: 0, bottom: "auto", zIndex: 1,
        height: 1
      }
    }
  }
}

IH.Device.LogItem = React.createClass({
  mixins: [RC.Mixins.CSS],
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
      line1: Object.assign({},line, {
        left: "25%",
      }),
      line2: Object.assign({},line, {
        left: "50%"
      }),
      line3: Object.assign({},line, {
        left: "75%"
      }),
    }
  }
})

IH.Device.ListCircle = class extends RC.CSS {
  constructor(p) {
    super(p)
    this.watchProps = ["zoneColor","deviceColor","value","uiClass"]
  }
  render() {
    let styles = this.css.get("styles")
    let content = null

    if (this.props.val) {
      content = <div style={styles.vo}>
        <div style={styles.vi}>
          <span style={styles.val}>{this.props.val || "--"}</span>
          <span style={styles.unit}>{this.props.unit}</span>
        </div>
      </div>
    } else if (this.props.uiClass) {
      let uiProps = _.pick(this.props, RC.uiKeys)
      if (!uiProps.uiColor) uiProps.uiColor = "white"
      if (!uiProps.uiSize) uiProps.uiSize = 16
      content = <RC.uiIcon {... uiProps} theme="absCenter" />
    } else if (this.props.children)
      content = this.props.children

    return <div {... this.props} style={styles.area}>
      <div style={styles.circle}>
        {content}
      </div>
    </div>
  }
  // @@
  // @@
  // Styles
  // @@
  // @@
  baseStyles(np,ns) {
    const zoneColor = np.deviceColor || np.zoneColor
    const isFullColor = !np.value && np.uiClass
    return {
      area: {
        position: "relative", zIndex: 2, width: "25%"
      },
      circle: {
        width: rowHeight-circleOffset, height: rowHeight-circleOffset, margin: "0 auto",
        borderRadius: "50%",
        position: "relative", overflow: "hidden",
        borderStyle: isFullColor ? "none" : "solid",
        borderWidth: isFullColor ? 0 : 4,
        borderColor: zoneColor || "transparent",
        background: isFullColor ? zoneColor : "none",
        textAlign: "center"
      },
      vo: RC.cssMixins.verticalAlignOuter,
      vi: RC.cssMixins.verticalAlignInner,
      val: Object.assign(RC.cssMixins.font("light"), {
        display: "block", fontSize: 20, lineHeight: "20px"
      }),
      unit: Object.assign({}, unitStyle, { // This assign() looks redundant, but it's necessary. Do NOT remove it. This will fix a multi-page bug.
        color: unitColor
      })
    }
  }
  themeStyles(np,ns) {
    const zoneColor = np.deviceColor || np.zoneColor
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
          width: rowHeight+10, margin: `${(rowHeight-circleOffset)/-2}px 0 0`,
          position: "absolute", left: 0, top: "50%"
        }
      },
      // Smaller Circle
      small: {
        area: {
          width: 58, margin: "-24px 0 0 3px"
        },
        circle: {
          width: 48, height: 48
        }
      },
      cornerIcon: {
        area: {
          width: 50,
          position: "absolute", left: 0, top: 5
        },
        circle: {
          width: 40, height: 40
        }
      }
    }
  }
}

IH.Device.ListBox = React.createClass({
  mixins: [RC.Mixins.CSS],
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
  watchProps: ["val","zoneColor"],
  baseStyles(np,ns) {
    let valStyle = { display: "block", fontSize: fontSize-2, lineHeight: "20px" }

    if (String(np.val).length<=4)
      valStyle = Object.assign(RC.cssMixins.font("light"), { fontSize: 20 })
    else if (typeof np.val==="undefined")
      valStyle = Object.assign({}, valStyle, {color: unitColor})

    return {
      area: {
        width: "25%",
        textAlign: "center", lineHeight: 1.2,
      },
      val: valStyle,
      unit: unitStyle
    }
  },
  themeStyles(np,ns) {
    return {
      inline: {
        area: {
          width: "auto", padding: 7,
          textAlign: "left"
        },
        val: Object.assign(RC.cssMixins.font("light"), {
          fontSize: RC.Theme.font.size+3,
          color: np.zoneColor
        }),
        unit: {
          textIndent: 1,
          color: np.zoneColor
        }
      },
      // Absolute Left
      left: {
        area: {
          position: "absolute", left: 0, top: 0,
        }
      },
    }
  }
})

IH.Device.ListArea = class extends RC.CSS {
  render() {
    const styles = this.css.get("styles")
    return <div {... this.props} style={styles.area}>
      <div style={styles.title}>
        {this.props.title}
        <span style={styles.time}>{this.props.time}</span>
      </div>
      {this.props.children}
    </div>
  }
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
        position: "absolute", top: -5, right: 0,
        fontSize: fontSize-4, color: unitColor
      }
    }
  }
  themeStyles() {
    return {
      summary: {
        area: {
          textAlign: "right",
          // minHeight:
          minHeight: 58, padding: "15px 10px 8px 0", margin: "0 0 0 auto"
        },
        time: {
          top: -10
        }
      },
      AM: {
        area: {
          textAlign: "right",
          margin: "0 0 0 auto", padding: "5px 5px 7px", minHeight: 61,
        },
        time: {
          top: 0
        }
      },
      BP: {
        area: {
          textAlign: "right",
          minHeight: 58, padding: "10px 10px 8px 0"
        }
      },
      // !!! @@ !!! @@ !!!
      // TODO!!! DO BG!!!!
      // !!! @@ !!! @@ !!!
      BG: {

      }
    }
  }
}
