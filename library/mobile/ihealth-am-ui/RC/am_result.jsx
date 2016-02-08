"use strict"

IH.Device.AMResult = class extends DevicePrivate.Result {
  _getDateString() {
    return moment(this.props.result.MDay,"YYYYMMDD").format("dddd, MMM Do, YYYY")
  }
  _getMainData() {
    const lastVal = DbTools.renameKeys(DbTools.keyMap.am, this.props.result.lastValue)

    // Activity
    if (this.props.result.msg=="activity")
      return [{
        val: h.numberFormat(lastVal.step),
        title: "Steps", unit: "Count"
      },{
        val: h.amCalculateCalories(this.props.profile, lastVal.calorie, lastVal.time),
        title: "Calories", unit: "kcal"
      },{
        val: h.amCalculateDistance(lastVal.stepsize, lastVal.step, this.props.profile.metricsUnit),
        title: "Distance", unit: h.amGetMetricsUnit(this.props.profile.metricsUnit)
      }]

    // Sleep
    return [{
      val: lastVal.DS*5,
      title: "Deep Sleep", unit: "Minutes"
    },{
      val: lastVal.RS*5,
      title: "Regular Sleep", unit: "Minutes"
    },{
      val: lastVal.NS*5,
      title: "No Sleep", unit: "Minutes"
    }]
  }
  renderLegend(goal) {
    if (this.props.result.msg=="activity") {
      if (goal)
        return <span style={this.styles.barGoal} key="legend">{`Daily Goal (${h.numberFormat(goal)} steps)`}</span>
    }

    return <div style={this.styles.sleepLegend} key="legend">
      <span style={h.assignPseudos(this.styles.sleepLegendCircle, ":deep")} /><span style={this.styles.sleepLegendItem}>Deep</span>
      <span style={h.assignPseudos(this.styles.sleepLegendCircle, ":regular")} /><span style={this.styles.sleepLegendItem}>Regular</span>
      <span style={h.assignPseudos(this.styles.sleepLegendCircle, ":none")} /><span style={this.styles.sleepLegendItem}>None</span>
    </div>
  }
  renderResult() {
    const lastVal = DbTools.renameKeys(DbTools.keyMap.am, this.props.result.lastValue)
    const mainData = this._getMainData()
    const isActivity = this.props.result.msg=="activity"

    let perCent, dataPoints, resultMsg, goal

    if (isActivity) {
      // Activity
      goal = this.props.result.goal || IH.Device.Defaults.AM.goal
      perCent = Math.round(lastVal.step/goal*100) || 0
      resultMsg = `Reached ${perCent}% of ${h.numberFormat(goal)} steps`

      dataPoints = _.sortBy(this.props.result.values, "time").reverse().map( (obj) => {
        const d = DbTools.renameKeys(DbTools.keyMap.am, obj)
        return {
          time: moment(d.time).format("HH:mm"),
          perCent: d.step/goal*100
        }
      })
    } else {
      // Sleep
      const TS = lastVal.DS+lastVal.RS+lastVal.NS
      const duration = TS*5 // Sleep in minutes
      const hours = Math.floor(duration / 60) // Sleep in hours
      const mins = Math.round(60*(duration/60-hours)) // Remaining minutes

      perCent = Math.round((lastVal.DS+lastVal.RS)/TS*100) || 0
      resultMsg = `${hours}h ${mins}m (${perCent}% Efficiency)`

      dataPoints = _.sortBy(this.props.result.values, "time").reverse().map( (obj) => {
        const d = DbTools.renameKeys(DbTools.keyMap.am, obj)
        return {
          time: moment(obj.time).format("HH:mm"),
          sleep: d.level
        }
      })
    }
    const maxLen = dataPoints.length

    return [
      this.renderDate(),
      mainData.map( (row,n) => {
        // First Set of Data
        return <div style={h.assignPseudos(this.styles.rowFirst,n,null,":colored")} key={n}>
          <p style={h.assignPseudos(this.styles.colLeft,isActivity)}>
            <span style={this.styles.colTitle}>{row.title}</span>
            <span style={this.styles.colUnit}>{row.unit}</span>
          </p>
          <p style={h.assignPseudos(this.styles.colRight,isActivity)}>{row.val}</p>
        </div>
      }),
      <div style={this.styles.title} key={0}>
        {resultMsg}
      </div>,
      this.renderLegend(goal),
      <div style={this.styles.graphArea} key={2}>
        {
        dataPoints.map( (data, n) => {
          const bar = isActivity ? <span style={this.styles.barProgress(data.perCent,(n%2)+1)} /> : <span style={this.styles.barProgress([34,67,100][data.sleep],data.sleep%3)} />
          return <div style={this.styles.bar} key={n}>
            {bar}
            {(!(n%8) && n >= 8) || n==0 ? <span style={this.styles.barLabel}>{data.time}</span> : null }
          </div>
        })
        }
      </div>
    ]
  }
  render() {
    return <RC.Loading isReady={this.props.isReady} loadingStyle={this.styles.area} style={this.styles.area}>
      {
      this.props.isReady
      ? this.renderResult()
      : null
      }
    </RC.Loading>
  }
  baseStyles() {
    let styles = super.baseStyles()
    styles.colLeft[":on"] = { width: 135 }
    styles.colRight[":on"] = { width: "auto" }

    const barHt = 180
    const barOverflow = barHt*.15 // 24px
    const barOffset = 50
    const smallSize = RC.Theme.font.size-3
    const fill = ["#ff9600", IH.Device.Color.AMrgba(.8), IH.Device.Color.AM]
    const legendFill = ["#ff9600", IH.Device.Color.AMrgba(.7), IH.Device.Color.AM] // Need more Contrast when its smaller

    styles.graphArea = {
      position: "relative", height: barHt, margin: `${barOverflow}px 0 0`, padding: `0 0 ${barOffset}px`,
      whiteSpace: "nowrap", overflowX: "scroll", overflowY: "hidden", direction: "rtl",
      boxSizing: "content-box"
    }
    styles.bar = {
      backgroundColor: IH.Device.Color.AMrgba(.15),
      position: "relative", display: "inline-block", width: 7, height: barHt
    }
    styles.barProgress = (pc,mod) => {
      return {
        backgroundColor: fill[mod],
        position: "absolute", bottom: 0, left: 0, right: 0, top: "auto",
        height: `${Math.min(barHt+barOverflow,pc)}%`, minHeight: 1
      }
    }
    styles.barLabel = {
      direction: "ltr",
      position: "absolute", bottom: -37, left: 0, right: 0,
      fontSize: smallSize,
      width: 50, marginRight: -19,
      transform: "rotate(90deg)",
    }
    styles.barGoal = {
      position: "absolute", left: 0, right: 0,
      marginTop: barOverflow, padding: 3,
      borderTop: "dashed 1px #CCC", color: "#AAA",
      textAlign: "center", fontSize: smallSize
    }
    styles.sleepLegend = {
      position: "absolute", left: 0, right: 0,
      padding: 4,
      color: "#AAA",
      textAlign: "center", fontSize: smallSize
    }
    styles.sleepLegendItem = {
      display: "inline-block", margin: "-1px 10px 0 0", verticalAlign: "middle",
    }
    styles.sleepLegendCircle = {
      display: "inline-block", margin: "-1px 5px 0 10px", verticalAlign: "middle",
      width: smallSize, height: smallSize, borderRadius: "50%",
      ":deep": { backgroundColor: legendFill[2] },
      ":regular": { backgroundColor: legendFill[1] },
      ":none": { backgroundColor: legendFill[0] },
    }

    return styles
  }
}

IH.Device.AMResult.propTypes = Object.assign({}, IH.Device.AMResult.propTypes, {
  result: React.PropTypes.object,
  profile: React.PropTypes.object
})
