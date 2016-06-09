"use strict"

IH.Device.BPResult =  class extends React.Component {
  componentWillMount() {
    this.styles = this.baseStyles()
  }
  _getPinLoc(y,x,zone) {
    let base, xRange, yRange
    switch(zone) {
      case 0:
        base = 40
        xRange = 80, yRange = 120
      break
      case 1:
        base = 55
        xRange = 90, yRange = 140
      break
      case 2:
        base = 70
        xRange = 100, yRange = 160
      break
      case 3:
        base = 85
        xRange = 110, yRange = 180
      break
      default:
        base = 100
        xRange = 120, yRange = 200
      break
    }
    return {
      left: `${x/xRange*base}%`,
      bottom: `${y/yRange*base}%`
    }
  }
  render() {
    const res = this.props.result
    const zone = h.getBPZone(res.HP,res.LP)
    const zoneName = h.getBPZoneName()
    const resZoneName = typeof zoneName[zone]!="string"
      ? [<span key={0}>{zoneName[zone][0]}</span>,<span style={this.styles.colUnit} key={1}>{zoneName[zone][1]}</span>]
      : zoneName[zone]

    const mainData = [{
      val: res.HP,
      title: "Systolic", unit: "mmHg"
    },{
      val: res.LP,
      title: "Diastolic", unit: "mmHg"
    },{
      val: res.HR,
      title: "Heart Rate", unit: "Beats/Min"
    }]
    const resultData = [{
      val: resZoneName,
      title: "BP Range"
    },{
      val: res.arrhythmia ? "Yes" : "No",
      title: "Arrhythmia"
    }]

    return <div style={this.styles.area}>
      <div style={this.styles.dateTitle}>
        {moment(res.MDate).format("MMM Do, YYYY, h:mm a")}
        <div style={this.styles.xContain} onClick={this.props.closeFunc} key={0}>
          <span style={this.styles.xTop} />
          <span style={this.styles.xBot} />
        </div>
      </div>
      {
      mainData.map( (row,n) => {
        // First Set of Data
        return <div style={h.assignPseudos(this.styles.rowFirst,n,null,":colored")} key={n}>
          <p style={this.styles.colLeft}>
            <span style={this.styles.colTitle}>{row.title}</span>
            <span style={this.styles.colUnit}>{row.unit}</span>
          </p>
          <p style={this.styles.colRight}>{row.val}</p>
        </div>
      })
      }
      <div style={this.styles.title}>
        Your Result
      </div>
      {
      resultData.map( (row,n) => {
        // Second Set of Data
        return <div style={h.assignPseudos(this.styles.rowSecond,n)} key={n}>
          <p style={Object.assign({}, this.styles.colLeft, this.styles.colTitle)}>
            {row.title}
          </p>
          <p style={Object.assign({}, this.styles.colRight, this.styles.colTitle)}>
            {row.val}
          </p>
        </div>
      })
      }
      <div style={this.styles.jncContainer}>
        <figure style={this.styles.jnc4}>
          <div style={Object.assign({}, this.styles.pinButton, this._getPinLoc(res.HP, res.LP, zone))}>
            <span style={h.assignPseudos(this.styles.pinCircle,`:range${zone}`)} />
            <span style={this.styles.pin} />
          </div>

          <span style={h.assignPseudos(this.styles.jncX,true)}>mmHg</span>
          <span style={h.assignPseudos(this.styles.jncY,true)}>mmHg</span>

          <div style={this.styles.jnc3}>
            <span style={h.assignPseudos(this.styles.jncX)}>110</span>
            <span style={h.assignPseudos(this.styles.jncY)}>180</span>
          </div>
          <div style={this.styles.jnc2}>
            <span style={h.assignPseudos(this.styles.jncX)}>100</span>
            <span style={h.assignPseudos(this.styles.jncY)}>160</span>
          </div>
          <div style={this.styles.jnc1}>
            <span style={h.assignPseudos(this.styles.jncX)}>90</span>
            <span style={h.assignPseudos(this.styles.jncY)}>140</span>
          </div>
          <div style={this.styles.jnc0}>
            <span style={h.assignPseudos(this.styles.jncX)}>80</span>
            <span style={h.assignPseudos(this.styles.jncY)}>120</span>
          </div>
        </figure>
      </div>
    </div>
  }
  baseStyles() {
    const row = {
      width: "100%", margin: "0 auto",
    }
    const col = {
      display: "inline-block", width: "50%"
    }
    const fontSize = RC.Theme.font.size
    const xLine = {
      position: "absolute", top: "50%", left: "50%",
      backgroundColor: "#FFF"
    }
    const title = Object.assign(RC.cssMixins.font("heavy"), {
      fontSize: fontSize-3, padding: 10,
      position: "relative",
    })
    const JNC = RC.MQ.device > 1
    ? { width: 314, height: 314, padding: 0, margin: "0 auto" }
    : { width: "auto", height: 0, padding: "100% 0 0" }

    let areaStyle = Object.assign({}, RC.cssMixins.absFull, RC.cssMixins.font("light"), {
      padding: "0 0 15px",
      overflowY: "auto", overflowX: "hidden", zIndex: 100,
      background: "#FFF", color: "#444"
    })

    if (typeof this.props.style=="object")
      Object.assign( areaStyle, this.props.style)

    // ## Start Styles
    return {
      area: areaStyle,
      // Title & Date
      title: Object.assign({}, title, {
        borderBottom: "solid 1px #e4e4e4",
      }),
      dateTitle: Object.assign({}, title, {
        background: IH.Device.Color.BP, color: "#FFF"
      }),
      // X
      xContain: {
        position: "absolute", zIndex: 100,
        top: -2, right: -3,
        transform: "rotate(45deg)",
        width: 40, height: 40
      },
      xTop: Object.assign({}, xLine, {
        height: 2, width: 14, margin: "-1px 0 0 -7px"
      }),
      xBot: Object.assign({}, xLine, {
        height: 14, width: 2, margin: "-7px 0 0 -1px"
      }),
      // Row
      rowFirst: Object.assign({}, row,{
        background: IH.Device.Color.BP, color: "#FFF",
        ":nth-child(1)": {
          borderTop: "solid 1px #FFF",
          padding: "15px 0 0"
        },
        ":nth-child(2)": {
          padding: "0 0 13px"
        },
        ":nth-child(3)": {
          borderTop: "solid 1px #FFF",
          padding: "7px 0 15px"
        }
      }),
      rowSecond: Object.assign({}, row,{
        padding: "5px 0 4px",
        ":nth-child(1)": {
          padding: "20px 0 4px"
        },
        // ":nth-child(2)": {
        //   padding: "5px 0 20px"
        // },
      }),
      // Col
      colLeft: Object.assign({}, col, {
        paddingTop: 0, paddingRight: 14, paddingBottom: 0, paddingLeft: 0,
        textAlign: "right"
      }),
      colRight: Object.assign({}, col, {
        paddingTop: 5, paddingRight: 0, paddingBottom: 5, paddingLeft: 14,
        textAlign: "left", fontSize: fontSize*3.2
      }),
      colTitle: {
        paddingTop: 0, paddingBottom: 0,
        fontSize: fontSize+2, lineHeight: `${fontSize+2}px`,
        verticalAlign: "top",
      },
      colUnit: {
        display: "block",
        fontSize: fontSize-3, lineHeight: `${fontSize}px`
      },
      // JNC
      jncContainer: {
        // TODO!!! : RC.MQ Media Queries
        margin: 35
      },
      jncX: {
        position: "absolute", height: 22, bottom: -25, right: 0,
        fontSize: fontSize-3, textAlign: "right",
        ":on": {
          right: -18
        }
      },
      jncY: {
        position: "absolute", width: 30, top: 0, left: -35,
        fontSize: fontSize-3, textAlign: "right",
        ":on": {
          width: 40, top: -19, left: -30
        }
      },
      jnc4: Object.assign({}, JNC,{
        position: "relative",
        backgroundColor: IH.Device.Color.danger
      }),
      jnc3: {
        position: "absolute", zIndex: 1,
        top: "15%", right: "15%", bottom: 0, left: 0,
        backgroundColor: IH.Device.Color.red
      },
      jnc2: {
        position: "absolute", zIndex: 2,
        top: "30%", right: "30%", bottom: 0, left: 0,
        backgroundColor: IH.Device.Color.orange
      },
      jnc1: {
        position: "absolute", zIndex: 3,
        top: "45%", right: "45%", bottom: 0, left: 0,
        backgroundColor: IH.Device.Color.yellow
      },
      jnc0: {
        position: "absolute", zIndex: 4,
        top: "60%", right: "60%", bottom: 0, left: 0,
        backgroundColor: IH.Device.Color.green
      },
      // Pin
      pinButton: {
        borderRadius: "50%",
        width: 28, height: 28, margin: "0 0 5px -15px",
        position: "absolute", zIndex: 10,
        background: "#FFF",
        boxShadow: "0 0 3px rgba(0,0,0,.15)"
      },
      pinCircle: {
        borderRadius: "50%",
        position: "absolute", left: 5, right: 5, top: 5, bottom: 5, zIndex: 2,
        ":range0": { backgroundColor: IH.Device.Color.green },
        ":range1": { backgroundColor: IH.Device.Color.yellow },
        ":range2": { backgroundColor: IH.Device.Color.orange },
        ":range3": { backgroundColor: IH.Device.Color.red },
        ":range4": { backgroundColor: IH.Device.Color.danger }
      },
      pin: {
        width: 0, height: 0, margin: "0 0 0 -6px",
	      borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "10px solid #FFF",
        position: "absolute", left: "50%", bottom: -6, zIndex: 1
      }
    }
  }
}

IH.Device.BPResult.propTypes = Object.assign({}, IH.Device.BPResult.propTypes, {
  result: React.PropTypes.object.isRequired
})
