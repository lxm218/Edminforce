"use strict"

IH.Device.BPTrends = class extends DevicePrivate.Graphs {
  constructor(p) {
    super(p)
    this._deviceType = "BP"
    this._dtOpts = ["latest","day","week","month","year"]
  }
  getMeteorData() {
    let userId = this.props.userId || Meteor.userId()

    let measurements = []
    let cond = { userId: userId, deviceType: "BP" }
    let opts = {
      sort: {MDate: -1},
      limit: this._MQ().points
    }

    if(this.state.cond === 'latest')
      IH.Device.Subs.subscribe('BPMeasurements',cond,opts)
    else
      IH.Device.Subs.subscribe("BPMeasurementsByDateTime", this.state.cond, cond, opts.limit)

    let isReady = IH.Device.Subs.ready()

    if (isReady) {
      if (this.state.cond==="latest")
        measurements = IH.Coll.Measurements.find(cond, opts).fetch()
      else if (_.contains(this._dtOpts, this.state.cond)) {
        let tempName = `measurements-${this.state.cond}`
        if (!IH.Coll[tempName])
          IH.Coll[tempName] = new Mongo.Collection(tempName)
        measurements = IH.Coll[tempName].find(cond, opts).fetch()
      }
    }

    return {
      isReady: isReady,
      measurements: measurements
    }
  }
  renderGraph(){
    let bpRes = this.data.measurements
    let BPGraph, HRGraph

    if (bpRes.length) {

      const MQ = this._MQ()
      let bpLastMth = ""
      let hrLastMth = ""

      bpRes.reverse()
      if (bpRes.length==1) {
        bpRes.unshift(null)
        bpRes.push(null)
      } else if (bpRes.length==2)
        bpRes.unshift(null)

      const systolicArray = _.map(bpRes, function(bp){
        return typeof bp=="object" && bp!==null ? bp.HP : null
      })
      const diastolicArray = _.map(bpRes, function(bp){
        return typeof bp=="object" && bp!==null ? bp.LP : null
      })
      const heartrateArray = _.map(bpRes, function(bp){
        return typeof bp=="object" && bp!==null ? bp.HR : null
      })
      const labelsArray = _.map(bpRes, function(bp){
        return typeof bp=="object" && bp!==null ? bp.MDate : null
      })
      // @@
      // @@
      // Start BP Graph
      // @@
      // @@
      let spacingVal = 20 // Keep it 20, if you change it, you have to change a lot of the variables below
      let bpMax = _.max(systolicArray)
      let bpLabelMax = (Math.round(bpMax/10)*10)
      bpLabelMax = bpLabelMax%20 ? bpLabelMax+10 : bpLabelMax+20
      let bpData = {
        labels: labelsArray,
        series: [systolicArray,diastolicArray]
      }
      let bpOpt = {
        lineSmooth: true,
        fullWidth: true,
        height: `${MQ.height}px`,
        high: bpLabelMax,
        low: 60, // Must be divisable by $spacingVal
        axisX: {
          labelOffset: {
            x: -24
          },
          labelInterpolationFnc: function(val, n) {
            if (val===null) return ""

            let indent = n!=(bpRes.length-1) ? "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" : ""
            let month = moment(val).format("MM/DD/YY")
            let time = moment(val).format("hh:mm")
            let label = bpLastMth.substr(0,3)!=month.substr(0,3)
              || n===0 || n===bpRes.length-1
              ? `${indent}${time}<br />${indent}${month}`
              : indent+time
            bpLastMth = month
            return label
          }
        },
        axisY: {
          labelOffset: {
            x: 5,
            y: 0,
          },
          scaleMinSpace: spacingVal,
          seriesBarDistance: spacingVal,
          labelInterpolationFnc: function(val, n) {
            if (val%spacingVal) return null
            let maxVal = bpMax + spacingVal/2
            return val>=maxVal
              ? `mmHg<br />${val}`
              : val
          }
        }
      }
      /**
       * @@@@
       * Start HR Graph
       * @@@@
       */
      let hrData = {
        labels: labelsArray,
        series: [heartrateArray]
      }
      let hrMax = _.max(heartrateArray)
      let hrOpt = {
        lineSmooth: true,
        showArea: true,
        showLine: false,
        fullWidth: true,
        height: `${MQ.height}px`,
        high: _.max(heartrateArray)+spacingVal,
        low: 40, // Must be divisable by $spacingVal
        axisX: {
          labelOffset: {
            x: -24
          },
          labelInterpolationFnc: function(val, n) {
            if (val===null) return ""

            let indent = n!=(bpRes.length-1) ? "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" : ""
            let month = moment(val).format("MM/DD/YY")
            let time = moment(val).format("hh:mm")
            let label = hrLastMth.substr(0,3)!=month.substr(0,3)
              || n===0 || n===bpRes.length-1
              ? `${indent}${time}<br />${indent}${month}`
              : indent+time
            hrLastMth = month
            return label
          }
        },
        axisY: {
          labelOffset: {
            x: 5,
            y: 0,
          },
          scaleMinSpace: spacingVal,
          seriesBarDistance: spacingVal,
          labelInterpolationFnc: function(val, n) {
            if (val%spacingVal) return null
            let maxVal = hrMax + spacingVal/2

            return val>=maxVal
              ? `bpm<br />${val}`
              : val
          }
        }
      }

      BPGraph = <RC.Chart className="bp" data={bpData} options={bpOpt} listener={h.ChartMixins.ColorBloodPressure(systolicArray,diastolicArray)} type="Line" />
      HRGraph = <RC.Chart className="heartrate" data={hrData} options={hrOpt} type="Line" />
    }

    return <div style={this.styles.area}>
      <div style={this.styles.title}><span style={this.styles.titleInner}>Blood Pressure</span></div>
      <RC.Loading isReady={!!BPGraph} loadingStyle={this.styles.graphArea} style={this.styles.graphArea}>
        {BPGraph}
      </RC.Loading>
      <div style={this.styles.title}><span style={this.styles.titleInner}>Heart Rate</span></div>
      <RC.Loading isReady={!!HRGraph} loadingStyle={this.styles.graphArea} style={this.styles.graphArea}>
        {HRGraph}
      </RC.Loading>
    </div>
  }
}

IH.Device.BPTrends.displayName = "IH.Device.BPTrends"
