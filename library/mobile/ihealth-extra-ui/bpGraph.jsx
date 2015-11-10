
IH.RC.BPGraphPure = React.createClass({
  propTypes: {
    measurements: React.PropTypes.array.isRequired
  },
  getInitialState(){
    return {
      mainHeight: 100,
      bpHeight: 0,
      hrHeight: 0,
    }
  },
  componentWillUpdate(){
    let main = ReactDOM.findDOMNode(this.refs.mainCanvas)
    let bp = ReactDOM.findDOMNode(this.refs.bpCanvas)
    let hr = ReactDOM.findDOMNode(this.refs.hrCanvas)

    let mainHeight = main ? main.offsetHeight : 0
    let bpHeight = bp ? bp.offsetHeight : 0
    let hrHeight = hr ? hr.offsetHeight : 0

    if (mainHeight>this.state.mainHeight || bpHeight>this.state.bpHeight || hrHeight>this.state.hrHeight)
      this.setState({
        mainHeight: Math.max(this.state.mainHeight, mainHeight),
        bpHeight: Math.max(this.state.bpHeight, bpHeight),
        hrHeight: Math.max(this.state.hrHeight, hrHeight)
      })
  },
  render(){
    let self = this;
    var bpRes = this.props.measurements

    bpRes.reverse()
    if (bpRes.length==1) {
      bpRes.unshift(null)
      bpRes.push(null)
    } else if (bpRes.length==2)
      bpRes.unshift(null)

    let highpressureArray = _.map(bpRes, function(bp){
      return _.isObject(bp) ? bp.highpressure : null
    })
    let lowpressureArray = _.map(bpRes, function(bp){
      return _.isObject(bp) ? bp.lowpressure : null
    })
    let heartrateArray = _.map(bpRes, function(bp){
      return _.isObject(bp) ? bp.heartrate : null
    })
    let labelsArray = _.map(bpRes, function(bp){
      return _.isObject(bp) ? bp.MDate : null
    })
    let interpolFunc = function(val, n) {
      if (val===null) return ""

      let indent = n!=(heartrateArray.length-1) ? "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" : ""
      let month = moment(val).format("MM/DD/YY")
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
      series: [ highpressureArray, lowpressureArray ]
    }
    var lastMth = ""
    let bpOpt = {
      lineSmooth: true,
      fullWidth: true,
      height: "170px",
      high: _.max(highpressureArray)+20,
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
          let maxVal = _.max(highpressureArray)
          let minVal = _.min(_.filter(highpressureArray, function(num){ return _.isNumber(num) }))
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
      height: "170px",
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
/*
? <div style={{padding: "30px 0 40px", textAlign: "center", color: "#bbb"}}>No Data Found</div>
*/
    return <RC.Div bgColor="white" ref="mainCanvas" style={{minHeight: this.state.mainHeight}}>
      <div style={{minHeight: this.state.bpHeight}} ref="bpCanvas">
          <p className="bp-graph-title center margin-t metal">Blood Pressure</p>
          <RC.Chart className="bp" data={bpData} options={bpOpt} listener={h.ChartMixins.ColorBloodPressure(highpressureArray,lowpressureArray)} type="Line" />
      </div>
      <div style={{minHeight: this.state.hrHeight}} ref="hrCanvas">
        <p className="bp-graph-title center metal">Heartrate</p>
        <RC.Chart className="heartrate" data={hrData} options={hrOpt} type="Line" />
      </div>
    </RC.Div>
  },

})

IH.RC.BPGraph = React.createClass({
  getInitialState(){
    return {
      cond: "latest"
    }
  },
  mixins: [ReactMeteorData],
  displayName: "BPList",
  findForceClicked(){
    return _.indexOf(this.dtOpts, this.state.cond)
  },
  switchGraph(graphType){
    this.setState({
      cond: graphType
    })
  },
  dtOpts: ["latest","day","week","month","year"],
  getMeteorData() {
    let userId = this.props.userId || Meteor.userId()

    var measurements = [];
    var cond = { userId: userId, deviceType: "BP" };
    var opts = {
      sort: {MDate: -1},
      limit: 7
    }

    if(this.state.cond === 'latest'){
      bp.graphSub.subscribe('BPMeasurements',cond,opts);
    }else{
      bp.graphSub.subscribe("BPMeasurementsByDateTime", this.state.cond, cond, opts.limit)
    }

    let isReady = bp.graphSub.ready()

    if (isReady) {
      if (this.state.cond==="latest")
        measurements = IH.Coll.Measurements.find(cond, opts).fetch()
      else if (_.contains(this.dtOpts, this.state.cond)) {
        var tempName = "measurements-" + this.state.cond;
        if(!IH.Coll[tempName]){
          IH.Coll[tempName] = new Mongo.Collection(tempName);
        };
        measurements = IH.Coll[tempName].find(cond, opts).fetch();
      }
    }

    return {
      isReady: isReady,
      measurements: measurements
    }
  },
  render(){
    let self = this;
    // return <div style={h.assignClone({minHeight: this.state.mainHeight, background: "#fff"}, this.props.style)} ref="mainCanvas">
    return <div>
       <RC.Tabs theme="slider" bgColor="white" forceClicked={self.findForceClicked()} initialTab={0} activateOnClick={false}>
        {
        this.dtOpts.map(function(dt,n){
          return <RC.URL onMouseDown={self.switchGraph.bind(null,dt)} onTouchStart={self.switchGraph.bind(null,dt)} key={n}>{h.capitalize(dt)}</RC.URL>
        })
        }
      </RC.Tabs>
      <RC.Loading className="bg-white" isReady={this.data.isReady}>
        <IH.RC.BPGraphPure measurements={_.map(this.data.measurements, (m) => DbTools.renameKeys (_.invert(DbTools.keyMap.bp), m))} />
      </RC.Loading>
    </div>
  }
})
