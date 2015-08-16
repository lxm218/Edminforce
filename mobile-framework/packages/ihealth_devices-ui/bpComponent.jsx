
DeviceRC.MeasureBP = React.createClass({
  // Meteor Data
  mixins: [ReactMeteorData],
  getMeteorData() {
    var self = this
    var bpSession = Session.get("BP") || {}

    if (bpSession.highpressure && bpSession.lowpressure) {

      if (self.timeout===null) {
        // Measure Finished
        self.timeout = Meteor.setTimeout(function(){

          var pressurePos = bpSession.pressure
          var pcDecrease = bpSession.perCent/bpSession.pressure
          var pcPos = bpSession.perCent
          self.setState({spdClass: "transition-slow"})
          self.updateCircle(0)

          bpSession.perCent = 0

          self.interval = Meteor.setInterval(function(){
            bpSession.pressure = Math.max(--pressurePos, 0)
            // pcPos = Math.max(pcPos-pcDecrease, 0)
            // bpSession.perCent = pcPos

            if (!pressurePos) {
              // Animate return circle
              self.setState({status: "displaying"})
              self.updateCircle(0)

              // Switch state to finished
              Meteor.clearInterval(self.interval)
              self.timeout = Meteor.setTimeout(function(){
                self.setState({status: "finished"})
                Session.set("BP", bpSession)
              }, 1000)
            }

            Session.set("BP", bpSession)
          }, Math.max(1000/pressurePos,5))

        }, 250)
      }
    } else
      this.updateCircle(bpSession.perCent)

    let devices = Session.get("devices") || {}

    return {
      BP: bpSession,
    }
  },
  timeout: null,
  interval: null,
  componentWillUnmount() {
    delete Session.keys["BP"]
    if (this.props.device.hasStarted)
      this.props.device.stop()
  // States
  },
  getInitialState() {
    return {
      status: "processing",
      spdClass: "transition"
    }
  },
  updateCircle(perCent, slow) {
    var cLine = React.findDOMNode(this.refs.cLine)
    var cFull = React.findDOMNode(this.refs.cFull)

    var svgMax = Meteor.Device.isPhone() ? 1000 : 1500
    var svgVal = svgMax-(svgMax*perCent)

    if (cLine && cFull) {
      cFull.setAttribute("stroke-dashoffset", this.state.status=="displaying" ? svgMax : 0)
      cLine.setAttribute("stroke-dashoffset", isNaN(svgVal) ? svgMax : Math.round(svgVal))
    }
    // React.findDOMNode(this.refs.line)
  },
  openZone(z) {
    this.setState({bpZone: z})
  },
  closeZone() {
    var self = this
    $("#bp-zone").removeClass("pop-in").addClass("pop-out")
    Meteor.setTimeout(function(){
      self.setState({bpZone: null})
    },500)
  },
  cancelMeasure() {
    let self = this
    let cb = function(){
      self.props.device.hasStarted = false
      var cur = Session.get("BP")
      cur.isCancelled = true
      Session.set("BP", cur)

      Meteor.setTimeout(function(){
        delete Session.keys["BP"]
        self.setState({
          status: "processing",
          spdClass: "transition"
        })
        self.timeout = null
      }, 1500)
    }

    this.props.device.stop(cb)
  },
  render() {
    if (this.props.isHidden) return null
    var BP = this.data.BP

    var self = this
    var zones = ["very-low","low","middle","high","very-high","danger"]
    var bpRes = zones[0]
    if (BP.highpressure && BP.lowpressure) {
      if (BP.highpressure>180 && BP.lowpressure>110)
        bpRes = zones[5]
      else if (BP.highpressure>=160 && BP.lowpressure>=100)
        bpRes = zones[4]
      else if (BP.highpressure>=140 && BP.lowpressure>=90)
        bpRes = zones[3]
      else if (BP.highpressure>=120 && BP.lowpressure>=80)
        bpRes = zones[2]
      else if (BP.highpressure>=110 && BP.lowpressure>=70)
        bpRes = zones[1]
    }

    let cRadius = Meteor.Device.isPhone() ? 120 : 180

    return <div className={"fixed-full bg-white "+(this.props.isCancelled ? "exit" : "route")+"-from-bottom"} id="measuring-bp">
      <span className="x ba-brand2" onClick={this.cancelMeasure} />
      {
        _.isNumber(this.state.bpZone) ? <DeviceRC.BPZone bpZone={this.state.bpZone} closeHandler={this.closeZone} /> : ""
      }
      {
        this.state.status=="finished" ? "" :
        <svg className="svg-circle" width={cRadius*2} height={cRadius*2} viewPort={"0 0 "+cRadius+" "+cRadius} version="1.1" xmlns="http://www.w3.org/2000/svg">
          <circle ref="cFull" className={"full "+this.state.spdClass} r={cRadius-10} cx={cRadius} cy={cRadius} fill="transparent" transform={"rotate(-90 "+cRadius+" "+cRadius+")"}/>
          <circle ref="cLine" className={"line svg-brand2 "+this.state.spdClass} r={cRadius-10} cx={cRadius} cy={cRadius} fill="transparent" transform={"rotate(-90 "+cRadius+" "+cRadius+")"}/>
        </svg>
      }
      <div className={"table"+(this.state.status=="finished" ? " fin pop-in" : "")} id="pressure-display">
        <div className={"inside brand2"+(this.state.status=="displaying" ? " invis" : "")+(this.state.status=="finished" ? " fade-in" : " center")}>
				{
          this.state.status=="finished" ?
          <div className="line-average">
            <p className="bp-fin">
              <span className="super">Systolic</span>
              <span className="thin">{Math.round(BP.highpressure)}</span>
            </p>
            <p className="bp-fin">
              <span className="super">Diastolic</span>
              <span className="thin">{Math.round(BP.lowpressure)}</span>
            </p>
            <p className="heartrate thin center">
              {BP.heartrate}
            </p>
          </div> :
          <p className="thin processing-number padding-none">{BP.pressure || 0}</p>
        }
				</div>
      </div>
      {
        this.state.status=="finished" ?
        <div className="result-graph boxed bg-white clear">
        {
          zones.map(function(bar, n){
            return <p className={bar+" boxed"} key={n} onClick={self.openZone.bind(null,n)}>
              {bpRes==bar ? <span className="fa fa-2x fa-check"/> : null}
            </p>
          })
        }
        </div> : null
      }
    </div>
  }
})

DeviceRC.BPZone = React.createClass({
  render() {
    var zones = [{
      title: "Normal",
      content: "hello"
    },{
      title: "Normal",
      content: "hello"
    },{
      title: "Prehypertension",
      content: "hello"
    },{
      title: <span>High Blood Pressure<br />(Hypertension) Stage 1</span>,
      content: "hello"
    },{
      title: <span>High Blood Pressure<br />(Hypertension) Stage 2</span>,
      content: "hello"
    },{
      title: <span>Hypertensive Crisis<br />(Emergency care needed)</span>,
      content: "hello"
    }]

    var zone = zones[this.props.bpZone]

    return <div className="bg-brand pop-in abs-full" id="bp-zone">
      <div className="padding">
        <span className="x" onTouchTap={this.props.closeHandler} />
        <h1 className="thin master-tiny">{zone.title}</h1>
      </div>
    </div>
  }
})
