"use strict"

IH.Device.BPResult =  class extends DevicePrivate.Result {
  _getPinLoc(y,x,zone) {
    let base, xRange, yRange

    const xMax = 120
    const yMax = 200

    y = Math.min(y,yMax)
    x = Math.min(x,xMax)

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
        xRange = 120, yRange = yMax
      break
    }
    return {
      left: `${x/xRange*base}%`,
      bottom: `${y/yRange*base}%`
    }
  }
  _getDateString() {
    return moment(this.props.result.MDate).format("MMM Do, YYYY, h:mm a")
  }
  renderResult() {
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

    return [
      mainData.map( (row,n) => {
        // First Set of Data
        return <div style={h.assignPseudos(this.styles.rowFirst,n,null,":colored")} key={n}>
          <p style={this.styles.colLeft}>
            <span style={this.styles.colTitle}>{row.title}</span>
            <span style={this.styles.colUnit}>{row.unit}</span>
          </p>
          <p style={this.styles.colRight}>{row.val}</p>
        </div>
      }),
      <div style={this.styles.title} key={0}>
        Your Result
      </div>,
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
      }),
      <div style={this.styles.jncContainer} key={1}>
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
      </div>]
  }
  baseStyles() {
    let styles = super.baseStyles()
    const fontSize = RC.Theme.font.size
    const JNC = RC.MQ.device > 1
    ? { width: 314, height: 314, padding: 0, margin: "0 auto" }
    : { width: "auto", height: 0, padding: "100% 0 0" }

    // ## Start Styles
    Object.assign(styles,{
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
    })

    return styles
  }
}

IH.Device.BPResult.propTypes = Object.assign({}, IH.Device.BPResult.propTypes, {
  result: React.PropTypes.object.isRequired
})
