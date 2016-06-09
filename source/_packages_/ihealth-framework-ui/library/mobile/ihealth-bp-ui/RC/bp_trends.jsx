"use strict"

IH.Device.BPTrends = class extends RC.MeteorData {
  constructor(p) {
    super(p)
    this.state = {
      cond: "latest",
      bpHeight: 0,
      hrHeight: 0,
    }
    this.dtOpts = ["latest","day","week","month","year"]
    this.styles = this.getStyles()
  }
  getMeteorData() {
    let userId = this.props.userId || Meteor.userId()

    var measurements = [];
    var cond = { userId: userId, deviceType: "BP" };
    var opts = {
      sort: {MDate: -1},
      limit: this._MQ().points
    }

    if(this.state.cond === 'latest'){
      IH.DeviceSubs.subscribe('BPMeasurements',cond,opts);
    }else{
      IH.DeviceSubs.subscribe("BPMeasurementsByDateTime", this.state.cond, cond, opts.limit)
    }

    let isReady = IH.DeviceSubs.ready()

    if (isReady) {
      if (this.state.cond==="latest")
        measurements = IH.Coll.Measurements.find(cond, opts).fetch()
      else if (_.contains(this.dtOpts, this.state.cond)) {
        var tempName = `measurements-${this.state.cond}`
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
  componentWillUpdate(np,ns) {
    super.componentWillUpdate(np,ns)
    let bp = ReactDOM.findDOMNode(this.refs.bpCanvas)
    let hr = ReactDOM.findDOMNode(this.refs.hrCanvas)

    let bpHeight = bp ? bp.offsetHeight : 0
    let hrHeight = hr ? hr.offsetHeight : 0

    if (bpHeight>this.state.bpHeight || hrHeight>this.state.hrHeight)
      this.setState({
        bpHeight: Math.max(this.state.bpHeight, bpHeight),
        hrHeight: Math.max(this.state.hrHeight, hrHeight)
      })
  }
  _switchGraph(graphType) {
    this.setState({
      cond: graphType
    })
  }
  _MQ() {
    if (RC.MQ.device>=2)
      return {
        width: 210,
        points: 10
      }
    else if (RC.MQ.device>=1)
      return {
        width: 190,
        points: 8
      }
    else
      return {
        width: 170,
        points: 6
      }
  }
  renderGraph(){

    let self = this
    let bpRes = this.data.measurements
    let BPGraph, HRGraph

    if (bpRes.length) {

      const MQ = this._MQ()

      bpRes.reverse()
      if (bpRes.length==1) {
        bpRes.unshift(null)
        bpRes.push(null)
      } else if (bpRes.length==2)
        bpRes.unshift(null)

      let systolicArray = _.map(bpRes, function(bp){
        return _.isObject(bp) ? bp.HP : null
      })
      let diastolicArray = _.map(bpRes, function(bp){
        return _.isObject(bp) ? bp.LP : null
      })
      let heartrateArray = _.map(bpRes, function(bp){
        return _.isObject(bp) ? bp.HR : null
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
      // @@
      // @@
      // Start BP Graph
      // @@
      // @@
      let bpData = {
        labels: labelsArray,
        series: [systolicArray,diastolicArray]
      }
      var lastMth = ""
      let bpOpt = {
        lineSmooth: true,
        fullWidth: true,
        height: `${MQ.width}px`,
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
          scaleMinSpace: 25,
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
       * Start HR Graph
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
        height: `${MQ.width}px`,
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
          scaleMinSpace: 25,
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
          <RC.Chart className="bp" data={bpData} options={bpOpt} listener={h.ChartMixins.ColorBloodPressure(systolicArray,diastolicArray)} type="Line" />
        </div>
      HRGraph = <div style={{minHeight: this.state.hrHeight}} ref="hrCanvas">
        <RC.Chart className="heartrate" data={hrData} options={hrOpt} type="Line" />
      </div>
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
  render(){
    return <div>
      <RC.TabsSlider bgColor={IH.Device.Color.BP} forceClicked={_.indexOf(this.dtOpts, this.state.cond)} initialTab={0} activateOnClick={false} cursorColor="rgba(255,255,255,.58)">
        {
        this.dtOpts.map( (dt,n) => {
          return <RC.URL onMouseDown={this._switchGraph.bind(this,dt)} onTouchStart={this._switchGraph.bind(this,dt)} key={n}>{h.capitalize(dt)}</RC.URL>
        })
        }
      </RC.TabsSlider>
      {this.renderGraph()}
    </div>
  }
  getStyles() {
    const fontSize = RC.Theme.font.size
    return {
      area: {
        padding: "10px 0 0"
      },
      title: {
        fontSize: fontSize-2, textAlign: "center",
        padding: "10px 0 0",
      },
      titleInner: {
        display: "inline-block",
        height: 24, padding: "3px 15px 0",
        background: IH.Device.Color.alt,
        borderRadius: 12
      },
      graphArea: {
        height: this._MQ().width, overflow: "hidden"
      }
    }
  }
}

IH.Device.BPTrends.displayName = "IH.Device.BPTrends"
