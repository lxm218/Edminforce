
IH.RC.BPList = React.createClass({
  mixins: [ReactMeteorData],
  displayName: "BPList",

  getMeteorData() {
    let userId = Meteor.userId()

    var measurements = []
    var cond = { userId: userId, deviceType: "BP" }
    var opts = {
      sort: {MDate: -1},
      limit: 15
    }

    let sub = Meteor.subscribe("BPMeasurements", cond, opts)
    let isReady = sub.ready()

    if (isReady)
      measurements = IH.Coll.Measurements.find(cond, opts).fetch()

    return {
      isReady: isReady,
      measurements: measurements,
    }
  },
  renderMeasurements(){

    let self = this
    let colors = [
      "green",
      "yellow",
      "orange",
      "red"
    ]

    return <RC.Loading isReady={this.data.isReady}>
      {
      this.data.measurements.map(function(bp,n){

        let res = h.getBPZone(bp.systolic, bp.diastolic)
        let color = res!=null && colors[res] ? colors[res] : null
        let measureTime = moment(bp.MDate).format("h:mm A")

        let openBP = function() {
          alert("This feature is not done")
        }
        let setInactive = function() {
          _.map(self.refs, function(r,k){
            if (k=="dc"+n)
              r.toggleActive()
            else if (r.state.isActive)
              r.setInactive()
          })
        }
        let setActive = function() {
          _.map(self.refs, function(r,k){
            if (k=="dc"+n)
              r.setActive()
            else if (r.state.isActive)
              r.setInactive()
          })
        }

        return <RC.Card theme="double-right" ref={"dc"+n} className="bp-card" uiBrand={color} key={n}>

          <RC.Item className="bp-item thin" data-time={measureTime} onClick={setActive}>

            <div className="inline-block bp-res">
              <p className={"inline-block single "+color}>
                {bp.systolic}/{bp.diastolic}
              </p>
              <p className="inline-block double">
                <RC.uiIcon uiClass="heart-o" className="one" />
                <span className="two">mmHg</span>
              </p>
            </div>

            <div className="inline-block hr-res">
              <p className="inline-block single">
                {bp.heartRate}
              </p>
              <p className="inline-block double">
                <RC.uiIcon uiClass="stethoscope" className="one" />
                <span className="two">bpm</span>
              </p>
            </div>
          </RC.Item>

          <RC.Item className={"double-back"+(color ? " bg-"+color : "")}>
            <strong className="date-middle">{moment(bp.MDate).format("MMM D, YYYY")} {measureTime}</strong>
            <p className="buttons-right">
              <RC.uiIcon uiClass="eye" onClick={openBP} />
              <RC.uiIcon uiClass="close" onClick={setInactive}/>
            </p>
          </RC.Item>

        </RC.Card>
      })
      }
    </RC.Loading>
  },
  render(){

    if (this.props.children) {
      return <RC.List {... this.props}>
        {this.props.children}
        {this.renderMeasurements()}
      </RC.List>
    }
    return this.renderMeasurements()
  }
})
