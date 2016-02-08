"use strict"

IH.Device.AMTrends = class extends DevicePrivate.Graphs {
  constructor(p) {
    super(p)
    this._deviceType = "AM"
    this._dtOpts = ["latest","week","month","year"]
    this._graphPoints = [15,13,11]
  }
  getMeteorData() {
    IH.Subs.subscribe("userData", this.props.userId)
    const user = this.props.userId ? Meteor.users.findOne(this.props.userId) : Meteor.user()
    const userId = user._id
    const limit = this._MQ().points

    let activityData = []
    let sleepData = []

    const cond = { userId: userId, deviceType: "AM" }
    const opts = {
      limit: limit
    }

    if(this.state.cond === "latest") {
      IH.Device.Subs.subscribe("ActivityLatest",limit)
      IH.Device.Subs.subscribe("SleepLatest",limit)
    } else {
      IH.Device.Subs.subscribe("ActivityByDateTime", this.state.cond, cond, opts.limit)
      IH.Device.Subs.subscribe("SleepByDateTime", this.state.cond, cond, opts.limit)
    }

    let isReady = IH.Device.Subs.ready() && IH.Subs.ready()

    if (isReady) {
      const activityCond = Object.assign({}, cond, { msg: "activity" })
      const sleepCond = Object.assign({}, cond, { msg: "sleep" })

      if (this.state.cond==="latest") {
        activityData = IH.Coll.Measurements.find(activityCond, opts).fetch()
        sleepData = IH.Coll.Measurements.find(sleepCond, opts).fetch()
      } else if (_.contains(this._dtOpts, this.state.cond)) {
        const tempName = `measurements-${this.state.cond}`
        if (!IH.Coll[tempName])
          IH.Coll[tempName] = new Mongo.Collection(tempName)
        activityData = IH.Coll[tempName].find(activityCond, opts).fetch()
        sleepData = IH.Coll[tempName].find(sleepCond, opts).fetch()
      }
    }

    return {
      isReady: isReady,
      activityData: activityData,
      sleepData: sleepData,
      profile: user.profile || {}
    }
  }
  renderSingleGraph(type) {
    /**
     * Valid Types
     * [steps, calories, distance, sleep]
     */
    const measurements = type=="sleep"
      ? this.data.sleepData
      : this.data.activityData
    const profile = this.data.profile

    if (!measurements.length) return null

    const MQ = this._MQ()

    measurements.reverse()

    // Create Data Set
    let dataArray = [measurements.map( function(data){
      const lastVal = DbTools.renameKeys(DbTools.keyMap.am, data.lastValue)
      switch(type) {
        case "steps":
          return lastVal.step
        case "calories":
         return h.amCalculateCalories(profile, lastVal.calorie, lastVal.time, false)
        case "distance":
         return h.amCalculateDistance(lastVal.stepsize, lastVal.step, profile.metricsUnit)
        case "sleep":
         return lastVal.DS*5/60
        default:
          return null
      }
    })]

    if (type=="calories") {
      dataArray.push( measurements.map( function(data){
        const lastVal = DbTools.renameKeys(DbTools.keyMap.am, data.lastValue)
        return lastVal.calorie
      }) )
    } else if (type=="sleep") {
      dataArray.push( measurements.map( function(data){
        return h.nk(data, "lastValue.RS")*5/60
      }) )
      dataArray.push( measurements.map( function(data){
        return h.nk(data, "lastValue.NS")*5/60
      }) )
    }

    // Vars
    let yLabel, yMaxLabel, spacingVal, yMax
    switch(type) {
      case "steps":
        yLabel = "steps"
        yMax = _.max(dataArray[0])
        yMaxLabel = yMax+1000
        spacingVal = 500
      break
      case "calories":
        yLabel = "kcal"
        yMax = _.max( dataArray[0].map( function(num,index) {
          return num+dataArray[1][index]
        }))
        spacingVal = 500
      break
      case "distance":
        yLabel = h.amGetMetricsUnit(profile.metricsUnit)
        yMax = _.max(dataArray[0])
        spacingVal = 1
        yMaxLabel = yMax+1
      break
      case "sleep":
        yLabel = "hours"
        yMax = _.max( dataArray[0].map( function(num,index) {
          return num+dataArray[1][index]+dataArray[2][index]
        }))
      break
    }

    // if (!yMaxLabel)
    //   yMaxLabel = (Math.round(yMax/spacingVal/2)*spacingVal/2)
    //   yMaxLabel = yMaxLabel%spacingVal ? yMax+spacingVal/2 : yMax+spacingVal

    // Create X Label
    const labelsArray = measurements.map( function(data){
      const lastVal = DbTools.renameKeys(DbTools.keyMap.am, data.lastValue)
      return lastVal.time
    })

    let graphData = {
      labels: labelsArray,
      series: dataArray
    }

    let graphOpts = {
      fullWidth: true,
      seriesBarDistance: 5,
      height: `${MQ.height}px`,
      low: 0, // Must be divisable by $spacingVal
      axisX: {
        labelOffset: {
          x: dataArray[0].length===1 ? 0 : -6
        },
        labelInterpolationFnc: function(val, n) {
          return !(n%2) || (n===dataArray[0].length-1 && n < MQ.points-1)
            ? moment(val).format("MM/DD/YY") : null
        }
      },
      axisY: {
        labelOffset: {
          x: 5,
          y: 0,
        },
        labelInterpolationFnc: function(val, n) {
          let maxVal = yMax
          if (val > 0 && val < 1) {
            if ((val*10)%spacingVal)
              return null
          } else if (val%spacingVal) {
            maxVal = maxVal+spacingVal/2
            return null
          }

          return val>=maxVal
            ? `${yLabel}<br />${val}`
            : val
        }
      }
    }
    if (yMaxLabel)
      graphOpts.high = yMaxLabel
    if (_.contains(["calories","sleep"],type))
      graphOpts.stackBars = true

    // BPGraph = <RC.Chart className="bp" data={bpData} options={bpOpt} listener={h.ChartMixins.ColorBloodPressure(systolicArray,diastolicArray)} type="Bar" />
    return <RC.Chart className="AM" data={graphData} options={graphOpts} type="Bar" />
  }
  renderGraph(){
    const StepsGraph = this.renderSingleGraph("steps")
    const CaloriesGraph = this.renderSingleGraph("calories")
    const DistanceGraph = this.renderSingleGraph("distance")
    const SleepGraph = this.renderSingleGraph("sleep")

    return <div style={this.styles.area}>
      <div style={this.styles.title}><span style={this.styles.titleInner}>Steps Count</span></div>
      <RC.Loading isReady={!!StepsGraph} loadingStyle={this.styles.graphArea} style={this.styles.graphArea}>
        {StepsGraph}
      </RC.Loading>
      <div style={this.styles.title}><span style={this.styles.titleInner}>Sleep Efficiency</span></div>
      <div style={this.styles.legend} key="legendSleep">
        <span style={h.assignPseudos(this.styles.legendCircle, ":one")} /><span style={this.styles.sleepLegendItem}>Deep</span>
        <span style={h.assignPseudos(this.styles.legendCircle, ":two")} /><span style={this.styles.sleepLegendItem}>Regular</span>
        <span style={h.assignPseudos(this.styles.legendCircle, ":three")} /><span style={this.styles.sleepLegendItem}>None</span>
      </div>
      <RC.Loading isReady={!!SleepGraph} loadingStyle={this.styles.graphArea} style={this.styles.graphArea}>
        {SleepGraph}
      </RC.Loading>
      <div style={this.styles.title}><span style={this.styles.titleInner}>Calories Burned</span></div>
      <div style={this.styles.legend} key="legendCalories">
        <span style={h.assignPseudos(this.styles.legendCircle, ":one")} /><span style={this.styles.sleepLegendItem}>BMR</span>
        <span style={h.assignPseudos(this.styles.legendCircle, ":two")} /><span style={this.styles.sleepLegendItem}>Exercise</span>
      </div>
      <RC.Loading isReady={!!CaloriesGraph} loadingStyle={this.styles.graphArea} style={this.styles.graphArea}>
        {CaloriesGraph}
      </RC.Loading>
      <div style={this.styles.title}><span style={this.styles.titleInner}>Distance</span></div>
      <RC.Loading isReady={!!DistanceGraph} loadingStyle={this.styles.graphArea} style={this.styles.graphArea}>
        {DistanceGraph}
      </RC.Loading>
    </div>
  }
  getStyles() {
    const fontSize = RC.Theme.font.size

    let styles = super.getStyles()
    Object.assign( styles, {
      legend: {
        padding: "5px 0 0",
        textAlign: "center",
        fontSize: fontSize-4, lineHeight: `${fontSize-4}px`
      },
      legendItem: {
        display: "inline-block", padding: "0 8px 0 3px"
      },
      legendCircle: {
        borderRadius: "50%",
        display: "inline-block", margin: "0 3px -1px 8px",
        width: 10, height: 10,
        backgroundColor: "#DDD",
        ":one": { backgroundColor: "#664bc4" },
        ":two": { backgroundColor: "#eb43e2" },
        ":three": { backgroundColor: "#f6a33c" }
      }
    })

    return styles
  }
}

IH.Device.AMTrends.displayName = "IH.Device.AMTrends"
