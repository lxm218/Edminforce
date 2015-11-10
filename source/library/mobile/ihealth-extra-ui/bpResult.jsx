
IH.RC.BPResult = React.createClass({
  propTypes: {
    measureId: React.PropTypes.string.isRequired
  },
  mixins: [ReactMeteorData],
  getMeteorData() {

    let dataId = h.getDataID(this.props.measureId)

    Meteor.subscribe("BPMeasurements", { deviceType: "BP" }, { });
    let bpFind = IH.Coll.Measurements.findOne(dataId) || {};
    let deviceResultKeys = ['heartrate', 'highpressure', 'lowpressure', 'date'];

    let bpObj = {}
    _.map(deviceResultKeys, (resultKey) => bpObj[resultKey] = bpFind[DbTools.keyMap.bp[resultKey]])
    console.log('bpObj', bpObj)
    // bpObj = {
    //   heartrate: bpFind.heartRate,
    //   highpressure: bpFind.systolic,
    //   lowpressure: bpFind.diastolic,
    //   date: bpFind.MDate
    // }

    return {
      result: bpObj
    }
  },
  render() {
    return this.data.result
      ? <IH.RC.BPResultPure bp={this.data.result} />
      : null
  }
})

IH.RC.BPResultPure = React.createClass({
  propTypes: {
    bp: React.PropTypes.object.isRequired
  },
  render() {
    if (_.isUndefined(this.props.bp)) {
      console.error("'bp' needs to be provided to IH.RC.BPResultPure")
    } else {
      let BP=this.props.bp;
      console.log('BPResultPure ok: ' + JSON.stringify(BP));
      let zoneRes = h.getBPZone(BP.highpressure, BP.lowpressure)
      return <RC.Loading>
        {
          _.isNumber(zoneRes)
          ? this.renderResult(BP, zoneRes)
          : <div>zoneRes {JSON.stringify(zoneRes)}</div>
        }
        </RC.Loading>
    }
  },
  renderResult(BP, zoneRes) {
    let zones = [{
      code: "norm",
      text: "Normal BP",
      labelY: 120,
      labelX: 80,
    },{
      code: "mid",
      text: "Pre-Hypertension",
      labelY: 140,
      labelX: 90,
    },{
      code: "hi",
      text: "Hypertension Stage 1",
      labelY: 160,
      labelX: 100,
    },{
      code: "vh",
      text: "Hypertension Stage 2",
      labelY: "Systolic (mmHg)",
      labelX: "Diastolic (mmHg)",
    }]

    var bubblePos = {}
    if (zones[zoneRes]) {
      // Systolic
      var yPos = BP.highpressure/200*100
      if (BP.highpressure<=120)
        yPos -= 20
      else if (BP.highpressure<=140)
        yPos -= 10

      // Diastolic
      var xPos = BP.lowpressure/140*100
      if (BP.lowpressure<=80)
        xPos -= 17
      else if (BP.lowpressure<=90)
        xPos -= 4
      else if (BP.lowpressure<=100)
        xPos += 9

      bubblePos.bottom = yPos+"%"
      bubblePos.left = xPos+"%"
    }

    return <div className="line-average" onClick={this.props.onClick}>
      <div className="bp-fin center thick brand2">
        {moment(BP.MDate).format("MMM Do YYYY - h:mm a")}
      </div>
      <div className="bp-fin thin">
        <div className="clear">
          <p className="type">
            <small className="block thick">mmHg</small>
            Systolic
          </p>
          <p className="val">{Math.round(BP.highpressure)}</p>
        </div>
      </div>
      <div className="bp-fin thin">
        <div className="clear">
          <p className="type">
            <small className="block thick">mmHg</small>
            Diastolic
          </p>
          <p className="val">{Math.round(BP.lowpressure)}</p>
        </div>
      </div>
      <div className="bp-fin thin">
        <div className="clear">
          <p className="type">
            <small className="block thick">Beats Per Minute</small>
            Heart Rate
          </p>
          <p className="val">{BP.heartrate}</p>
        </div>
      </div>

      <div className="bp-fin">
        <div id="bp-chart">
          <div className="inner">
            <span className="bubble round" style={bubblePos}>{ zones[zoneRes] ? zones[zoneRes].text : "Unknown" }</span>
            {
            zones.map( function(z,n){
              return <div className={z.code+" zone zone"+n} key={n}>
                <span className="labelX">{z.labelX}</span>
                <span className="labelY">{z.labelY}</span>
              </div>
            })
            }
          </div>
        </div>
      </div>

    </div>
  }
});
