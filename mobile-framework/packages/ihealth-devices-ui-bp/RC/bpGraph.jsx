
IH.RC.BPGraph = React.createClass({
  mixins: [ReactMeteorData],
  displayName: "BPList",

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
  componentWillUpdate(){
    let main = React.findDOMNode(this.refs.mainCanvas)
    let bp = React.findDOMNode(this.refs.bpCanvas)
    let hr = React.findDOMNode(this.refs.hrCanvas)

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
  getInitialState(){
    return {
      cond: "latest",
      mainHeight: 100,
      bpHeight: 0,
      hrHeight: 0,
    }
  },
  dtOpts: ["latest","day","week","month","year"],
  switchGraph(graphType){
    this.setState({
      cond: graphType
    })
  },
  findForceClicked(){
    return _.indexOf(this.dtOpts, this.state.cond)
  },
  renderTabs(){
    let self = this
    return <RC.Tabs theme="slider" bgColor="white" forceClicked={this.findForceClicked()} initialState={0} activateOnClick={false}>
      {
      this.dtOpts.map(function(dt,n){
        return <RC.URL onMouseDown={self.switchGraph.bind(null,dt)} onTouchStart={self.switchGraph.bind(null,dt)} key={n}>{h.capitalize(dt)}</RC.URL>
      })
      }
    </RC.Tabs>
  },
  renderGraph(){

    let self = this
    var bpRes = this.data.measurements
    var BPGraph = HRGraph = null

    if (bpRes.length) {
      bpRes.reverse()
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
        series: [ systolicArray, diastolicArray ]
      }
      var lastMth = ""
      let bpOpt = {
        lineSmooth: true,
        fullWidth: true,
        height: "170px",
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
      BPGraph = <div style={{minHeight: this.state.bpHeight}} ref="bpCanvas">
          <p className="bp-graph-title center margin-t metal">Blood Pressure</p>
          <RC.Chart className="bp" data={bpData} options={bpOpt} listener={h.ChartMixins.ColorBloodPressure(systolicArray,diastolicArray)} type="Line" />
        </div>
      HRGraph = <div style={{minHeight: this.state.hrHeight}} ref="hrCanvas">
        <p className="bp-graph-title center metal">Heartrate</p>
        <RC.Chart className="heartrate" data={hrData} options={hrOpt} type="Line" />
      </div>
    }
    return <RC.Loading className="bg-white" isReady={this.data.isReady}>
      {BPGraph}{HRGraph}
    </RC.Loading>
  },
  render(){

    // return <div style={h.assignClone({minHeight: this.state.mainHeight, background: "#fff"}, this.props.style)} ref="mainCanvas">
    return <RC.Div bgColor="white" ref="mainCanvas" style={{minHeight: this.state.mainHeight}}>
      {this.renderTabs()}
      {this.renderGraph()}
    </RC.Div>
  }
})
