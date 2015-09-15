
IH.RC.BPGraph = React.createClass({
  mixins: [ReactMeteorData],
  displayName: "BPList",

  getMeteorData() {
    let userId = Meteor.userId()

    var measurements = []
    var cond = { userId: userId, deviceType: "BP" }
    var opts = {
      sort: {MDate: 1},
    }

    IH.Subs.subscribe("BPMeasurementsByDateTime", this.state.cond, userId, { sort: {MDate: 1} })
    let isReady = IH.Subs.ready()

    if (isReady) {
      if (this.state.cond=="latest")
        measurements = IH.Coll.Measurements.find(cond, opts).fetch()
      else if (_.contains(this.dtOpts, this.state.cond)) {
        let latest = IH.Coll.Measurements.findOne(cond, { sort: {MDate: -1}})
        cond.MDate = {
          $gte: moment(new Date(latest.MDate)).startOf(this.state.cond).toDate(),
          $lt: moment(new Date(latest.MDate)).endOf(this.state.cond).toDate(),
        }
        measurements = IH.Coll.Measurements.find(cond, opts).fetch()
      }
    }

    return {
      isReady: isReady,
      measurements: measurements
    }
  },
  getInitialState(){
    return {
      cond: "latest"
    }
  },
  dtOpts: ["latest","day","week","month","year"],
  renderTabs(){
    let self = this
    let switchGraph = function(graphSwitch){
      self.lastSwitch = self.state.cond
      self.setState({
        cond: graphSwitch
      })
    }
    return <RC.Tabs bgColor="light" forceClicked={_.indexOf(self.dtOpts, self.state.cond)} activateOnClick={false}>
      <RC.URL onClick={switchGraph.bind(null,"latest")}>Latest</RC.URL>
      <RC.URL onClick={switchGraph.bind(null,"day")}>Day</RC.URL>
      <RC.URL onClick={switchGraph.bind(null,"week")}>Week</RC.URL>
      <RC.URL onClick={switchGraph.bind(null,"month")}>Month</RC.URL>
      <RC.URL onClick={switchGraph.bind(null,"year")}>Year</RC.URL>
    </RC.Tabs>
  },
  renderGraph(){

    let self = this
    let maxDots = 8
    var bpRes = this.data.measurements

    if (this.state.cond=="latest")
      bpRes = bpRes.slice(0,maxDots)
    else if (bpRes.length>maxDots) {
      let divider = Math.round(bpRes.length/maxDots)
      bpRes = _.filter(bpRes, function(bp,n){
        return n%divider===0
      })
    }

    var BPGraph = HRGraph = null

    if (bpRes.length) {
      if (bpRes.length==1) {
        bpRes.unshift(null)
        bpRes.push(null)
      } else if (bpRes.length==2)
        bpRes.unshift(null)

      let systolicArray = _.map(bpRes, function(bp){
        return _.isObject(bp) ? bp.systolic : null
      })
      let diastolicArray = _.map(bpRes, function(bp){
        return _.isObject(bp) ? bp.diastolic : null
      })
      let heartrateArray = _.map(bpRes, function(bp){
        return _.isObject(bp) ? bp.heartRate : null
      })
      let labelsArray = _.map(bpRes, function(bp){
        return _.isObject(bp) ? bp.MDate : null
      })
      let interpolFunc = function(val, n) {
        if (val===null) return ""

        let indent = n!=(heartrateArray.length-1) ? "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" : ""
        let month = moment(val).format("MMM DD")
        let time = moment(val).format("hh:mm")
        let label = lastMth.substr(0,3)!=month.substr(0,3)
        || n===0
          ? indent+time+"<br />"+indent+month
          : indent+time
        lastMth = month
        return label
      }
      /**
       * @@@@
       * Start BP Graph
       * @@@@
       */
      let bpData = {
        labels: labelsArray,
        series: [ systolicArray, diastolicArray ]
      }
      var lastMth = ""
      let bpOpt = {
        lineSmooth: true,
        fullWidth: true,
        height: "180px",
        high: _.max(systolicArray)+20,
        axisX: {
          labelOffset: {
            x: -17
          },
          labelInterpolationFnc: interpolFunc
        },
        axisY: {
          labelOffset: {
            x: 5,
            y: 10,
          },
          scaleMinSpace: 20,
          labelInterpolationFnc: function(val, n) {
            let maxVal = _.max(systolicArray)
            let minVal = _.min(_.filter(systolicArray, function(num){ return _.isNumber(num) }))
            return val>=maxVal && (val-maxVal>=2) && val>=(minVal+20)
              ? val+"<br />mmHg" : val
          }
        }
      }
      /**
       * @@@@
       * Start BP Graph
       * @@@@
       */
      let hrData = {
        labels: labelsArray,
        series: [heartrateArray]
      }
      var lastMth = ""
      let hrOpt = {
        lineSmooth: true,
        showArea: true,
        showLine: false,
        fullWidth: true,
        height: "180px",
        high: _.max(heartrateArray)+20,
        axisX: {
          labelOffset: {
            x: -17
          },
          labelInterpolationFnc: interpolFunc
        },
        axisY: {
          labelOffset: {
            x: 5,
            y: 10,
          },
          scaleMinSpace: 20,
          labelInterpolationFnc: function(val, n) {
            let maxVal = _.max(heartrateArray)
            let minVal = _.min(_.filter(heartrateArray, function(num){ return _.isNumber(num) }))
            return val>=maxVal && (val-maxVal>=2) && val>=(minVal+20)
              ? val+"<br />bpm"
              : val
          }
        }
      }

      BPGraph = <div style={{minHeight: "215px"}}>
        <p className="bp-graph-title center margin-t metal">Blood Pressure</p>
        <RC.Chart className="bp" data={bpData} options={bpOpt} listener={h.ChartMixins.ColorBloodPressure(systolicArray,diastolicArray)} type="Line" />
      </div>
      HRGraph = <div style={{minHeight: "205px"}}>
        <p className="bp-graph-title center metal">Heartrate</p>
        <RC.Chart className="heartrate" data={hrData} options={hrOpt} type="Line" />
      </div>
    }
    return <RC.Loading className="bg-white" isReady={this.data.isReady}>
      {BPGraph}
      {HRGraph}
    </RC.Loading>
  },
  render(){

    if (this.props.children) {
      return <RC.List {... this.props}>
        {this.props.children}
        {this.renderTabs()}
        {this.renderGraph()}
      </RC.List>
    }
    return <div style={{ minHeight: "464px"}}>
      {this.renderTabs()}
      {this.renderGraph()}
    </div>
  }
})
