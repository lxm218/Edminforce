
IH.RC.MeasureBP = React.createClass({
  // Meteor Data
  mixins: [ReactMeteorData],
  getMeteorData() {
    var self = this
    var bpSession = Session.get("BP") || {}

    if (bpSession.highpressure && bpSession.lowpressure) {

      if (this.timeout===null) {
        // Measure Finished
        this.timeout = Meteor.setTimeout(function(){

          var pressurePos = bpSession.pressure
          var pcDecrease = bpSession.perCent/bpSession.pressure
          var pcPos = bpSession.perCent
          self.setState({spdClass: "transition-slow" })
          self.updateCircle(0)

          bpSession.perCent = 0

          self.interval = Meteor.setInterval(function(){
            bpSession.pressure = Math.max(--pressurePos, 0)
            // pcPos = Math.max(pcPos-pcDecrease, 0)
            // bpSession.perCent = pcPos

            if (!pressurePos) {
              Meteor.clearInterval(self.interval)

              // Animate return circle
              self.setState({status: "displaying"})
              self.updateCircle(0)

              console.log("@@@@")
              console.log("@@@@")
              console.log(bpSession)
              console.log("@@@@")
              console.log("@@@@")

              // Switch state to finished
              Meteor.setTimeout(function(){
                console.log("AAAA")
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

    // let devices = Session.get("devices") || {}

    return {
      BP: bpSession,
    }
  },
  timeout: null,
  inactiveTimeout: null,
  interval: null,
  componentWillUnmount() {
    delete Session.keys["BP"]
    if (this.props.device.hasStarted)
      this.props.device.stop()
  },
  getInitialState() {
    return {
      status: "processing",
      spdClass: "transition",
    }
  },
  restartInactiveTimer() {
    if (_.isNumber(this.props.inactiveDuration) && this.props.inactiveDuration>1000) {
      let self = this

      Meteor.clearTimeout(this.inactiveTimeout)
      this.inactiveTimeout = Meteor.setTimeout(function(){
        self.cancelMeasure()
      },this.props.inactiveDuration)
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
      this.restartInactiveTimer()
    }
  },
  cancelMeasure() {
    let self = this
    let cb = function(){
      self.props.device.hasStarted = false
      Meteor.clearTimeout(self.inactiveTimeout)
      Session.set("BP", null)
    }
    this.props.device.stop(cb)
  },
  render() {
    let BP = this.data.BP

    // Render BP Error

    // Render BP Measuring


    let cRadius = Meteor.Device.isPhone() ? 120 : 180
    var style = {
      svg: {
        margin: '-'+cRadius+'px 0 0 -'+cRadius+'px',
        width: cRadius*2+'px',
        height: cRadius*2+'px',
      }
    }

    return <div className={"abs-full bg-white scroll"} onClick={this.restartInactiveTimer} id="measuring-bp">
      <span className="x black" onClick={this.cancelMeasure} />
      {BP.errorID ? <IH.RC.BPError msg={BP.msg} closeHandler={this.cancelMeasure} /> : null}
      {
        this.state.status=="finished" ? null :
        <svg style={style.svg} className="svg-circle" width={cRadius*2} height={cRadius*2} viewPort={"0 0 "+cRadius+" "+cRadius} version="1.1" xmlns="http://www.w3.org/2000/svg">
          <circle ref="cFull" className={"full "+this.state.spdClass} r={cRadius-10} cx={cRadius} cy={cRadius} fill="transparent" transform={"rotate(-90 "+cRadius+" "+cRadius+")"}/>
          <circle ref="cLine" className={"line svg-brand2 "+this.state.spdClass} r={cRadius-10} cx={cRadius} cy={cRadius} fill="transparent" transform={"rotate(-90 "+cRadius+" "+cRadius+")"}/>
        </svg>
      }
      <div className={this.state.status=="finished" ? "fin pop-in" : "table"} id="pressure-display">
        <div className={(this.state.status=="displaying" ? " invis" : "")+(this.state.status=="finished" ? " fade-in" : " inside center")}>
				{
        this.state.status=="finished"
        ?
        <IH.RC.BPResult result={BP} />
        :
        <p className="thin processing-number padding-none brand2">
          {BP.pressure || 0}
          {!BP.pressure ? <span className="fa fa-cog spin-medium" /> : null}
        </p>
        }
				</div>
      </div>

    </div>
  }
})

IH.RC.BPResult = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {

    var bpObj

    if (this.props.id) {

      let dataId = h.getDataID(this.props.id)

      // Rely on subscription from outside this component
      let bpFind = IH.Coll.Measurements.findOne(dataId) || {}
      bpObj = {
        heartrate: bpFind.heartRate,
        highpressure: bpFind.systolic,
        lowpressure: bpFind.diastolic,
        date: bpFind.MDate
      }
    }

    return {
      result: bpObj || {}
    }
  },
  getInitialState() {
    return {
      result: this.props.result
    }
  },
  render() {

    let BP = this.state.result || this.data.result || {}
    if (!BP) return null

    let zoneRes = h.getBPZone(BP.highpressure, BP.lowpressure)

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

    return <RC.Loading>
      {
        _.isNumber(zoneRes)
        ?
      <div className="line-average">
        <div className="bp-fin center thick brand2">
          {moment(BP.date).format("MMM Do YYYY - h:mm a")}
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
      :
      null
      }
      </RC.Loading>
  }
})

IH.RC.BPError = React.createClass({
  getInitialState() {
    return { buttonHeld: false }
  },
  touchStart() {
    this.setState({ buttonHeld: true })
  },
  touchEnd() {
    this.setState({ buttonHeld: false })
  },
  render() {
    return <div className="abs-full center bg-overlay" id="device-error">
      <div className="table">
        <div className="inside">

          <h1 className="thin">ERROR</h1>
          <p className="bigger">{this.props.msg}</p>
          <span
            className={"round unselect sub"+(this.state.buttonHeld ? " active" : "")}
            onClick={this.props.closeHandler} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd}
          >Close</span>

        </div>
      </div>
    </div>
  }
})

IH.RC.BP5Instructions = React.createClass({
  getInitialState() {
    return {
      open: false,
      swipe: false,
      cur: 0,
    }
  },
  timeout: null,
  open() {
    if (!this.state.swipe) {
      let self = this

      this.setState({
        open: true
      })

      Meteor.clearTimeout(this.timeout)
      this.timeout = Meteor.setTimeout( function(){
        self.setState({ swipe: true })
      },400)
    }
  },
  close() {
    // Disabled because of iPad Mini Issue
    // let self = this
    // this.setState({ css: "out", swipe: true })
    // this.timeout = Meteor.setTimeout( function(){
    //   self.setState({
    //     swipe: false,
    //     css: false,
    //     cur: 0
    //   })
    // },500)

    this.setState({
      open: false,
      swipe: false,
      cur: 0
    })
  },
  slideTo(n) {
    this.refs.swiper.slideTo(n)
    this.setState({ cur: n })
  },
  updateCur(n) {
    this.setState({ cur: this.refs.swiper.getPos() })
  },
  render() {

    let self = this
    let panes = [
      <span>Place the cuff at the same<br />level as your heart.</span>,
      <span>Leave one finger space<br />between the cuff and your arm.</span>,
      <span>Position the cuff 1/2&rdquo; (2cm)<br />above your elbow joint.</span>,
      <span className="smaller">Position the monitor in the middle of your<br /> arm aligned with your middle finger.</span>,
      <span onClick={this.close}>That's it! Click here to close.</span>
    ]

    return <RC.Animate transitionName="zoom">
      {
      this.state.open
      ?
      <div className="abs-full bg-white" id="bp5-instructions">
        <span className="on-top x black disable-swipe" onClick={this.close} />
        {
        !this.state.swipe ? null :
        <div>
          <RC.Swipe ref="swiper" continuous={false} className="fade-in" callback={this.updateCur}>
            {panes.map(function(p,n){
              return <div className="table" key={n}>
                <div className="inside">
                  <figure className={"thin bp5-help guide"+n}>
                    {p}
                  </figure>
                </div>
              </div>
            })}
          </RC.Swipe>

          <div className="dots-root center">
            {panes.map(function(p,n){
              return <span className={"dot transition"+(self.state.cur==n ? " bg-brand2" : "")} key={n} onClick={self.slideTo.bind(null, n)} />
            })}
          </div>
        </div>
        }
      </div>
      :
      null
      }
    </RC.Animate>
  }
})
