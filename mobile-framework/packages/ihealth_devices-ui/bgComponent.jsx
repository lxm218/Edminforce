DeviceRC.MeasureBG = React.createClass({
  // Meteor Data
  mixins: [ReactMeteorData],
  getMeteorData() {
    var self = this
    var bgSession = Session.get("BG") || {}

    if (bgSession.highpressure && bgSession.lowpressure) {

      if (this.timeout===null) {
        // Measure Finished
        this.timeout = Meteor.setTimeout(function(){

          var pressurePos = bgSession.pressure
          var pcDecrease = bgSession.perCent/bgSession.pressure
          var pcPos = bgSession.perCent
          self.setState({spdClass: "transition-slow" })
          self.updateCircle(0)

          bgSession.perCent = 0

          self.interval = Meteor.setInterval(function(){
            bgSession.pressure = Math.max(--pressurePos, 0)
            // pcPos = Math.max(pcPos-pcDecrease, 0)
            // bgSession.perCent = pcPos

            if (!pressurePos) {
              Meteor.clearInterval(self.interval)

              // Animate return circle
              self.setState({status: "displaying"})
              self.updateCircle(0)

              console.log("@@@@")
              console.log("@@@@")
              console.log(bgSession)
              console.log("@@@@")
              console.log("@@@@")

              // Switch state to finished
              Meteor.setTimeout(function(){
                console.log("AAAA")
                self.setState({status: "finished"})
                Session.set("BG", bgSession)
              }, 1000)
            }

            Session.set("BG", bgSession)
          }, Math.max(1000/pressurePos,5))

        }, 250)
      }
    } else
      this.updateCircle(bgSession.perCent)

    // let devices = Session.get("devices") || {}

    return {
      BG: bgSession,
    }
  },
  timeout: null,
  inactiveTimeout: null,
  interval: null,
  componentWillUnmount() {
    delete Session.keys["BG"]
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
      var cur = Session.get("BG")
      cur.isCancelled = true
      Session.set("BG", cur)
      Meteor.clearTimeout(self.inactiveTimeout)

      Meteor.setTimeout(function(){
        Session.set("BG", null)
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
    let BG = this.data.BG

    // Render BG Error

    // Render BG Measuring


    let cRadius = Meteor.Device.isPhone() ? 120 : 180

    return <div className={"fixed-full bg-white scroll "+(this.props.isCancelled ? "exit" : "route")+"-from-bottom"} onClick={this.restartInactiveTimer} id="measuring-bp">
      <span className="x black" onClick={this.cancelMeasure} />
      {BG.errorID ? <DeviceRC.Error msg={BG.msg} closeHandler={this.cancelMeasure} /> : null}
      {
        this.state.status=="finished" ? null
        : <svg className="svg-circle" width={cRadius*2} height={cRadius*2} viewPort={"0 0 "+cRadius+" "+cRadius} version="1.1" xmlns="http://www.w3.org/2000/svg">
          <circle ref="cFull" className={"full "+this.state.spdClass} r={cRadius-10} cx={cRadius} cy={cRadius} fill="transparent" transform={"rotate(-90 "+cRadius+" "+cRadius+")"}/>
          <circle ref="cLine" className={"line svg-brand2 "+this.state.spdClass} r={cRadius-10} cx={cRadius} cy={cRadius} fill="transparent" transform={"rotate(-90 "+cRadius+" "+cRadius+")"}/>
        </svg>
      }
      <div className={this.state.status=="finished" ? "fin pop-in" : "table"} id="pressure-display">
        <div className={(this.state.status=="displaying" ? " invis" : "")+(this.state.status=="finished" ? " fade-in" : " inside center")}>
				{
          this.state.status=="finished" ?
          <div className="line-average">
            <div className="bp-fin center thick brand2">
              {moment(BG.date).format("MMM Do YYYY - h:mm a")}
            </div>
            <div className="bp-fin thin">
              <div className="clear">
                <p className="type">
                  <small className="block thick">mmHg</small>
                  Systolic
                </p>
                <p className="val">{Math.round(BG.highpressure)}</p>
              </div>
            </div>
            <div className="bp-fin thin">
              <div className="clear">
                <p className="type">
                  <small className="block thick">mmHg</small>
                  Diastolic
                </p>
                <p className="val">{Math.round(BG.lowpressure)}</p>
              </div>
            </div>
            <div className="bp-fin thin">
              <div className="clear">
                <p className="type">
                  <small className="block thick">Beats Per Minute</small>
                  Heart Rate
                </p>
                <p className="val">{BG.heartrate}</p>
              </div>
            </div>

            <DeviceRC.BGZone hiPressure={BG.highpressure} loPressure={BG.lowpressure} />
          </div> :
          <p className="thin processing-number padding-none brand2">
            {BG.pressure || 0}
            {!BG.pressure ? <span className="fa fa-cog spin-medium" /> : null}
          </p>
        }
				</div>
      </div>

    </div>
  }
})

DeviceRC.BGZone = React.createClass({
  getZone() {
    if (!this.props.hiPressure && !this.props.loPressure)
      return null
    // else if (this.props.hiPressure>180 || this.props.loPressure>110)
    //   return 4
    else if (this.props.hiPressure>=160 || this.props.loPressure>=100)
      return 3
    else if (this.props.hiPressure>=140 || this.props.loPressure>=90)
      return 2
    else if (this.props.hiPressure>=120 || this.props.loPressure>=80)
      return 1
    else
      return 0
  },
  render() {

    let zoneRes = this.getZone()
    if (!_.isNumber(zoneRes)) return <div />

    let zones = [{
      code: "norm",
      text: "Normal BG",
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

    return <div className="bp-fin">
      <div id="bp-chart">
        <div className="inner">
          <span className={"bubble round pos"+zoneRes}>{ zones[zoneRes] ? zones[zoneRes].text : "Unknown" }</span>
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
  }
})

DeviceRC.Error = React.createClass({
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

DeviceRC.BG5Instructions = React.createClass({
  getInitialState() {
    return {
      css: false,
      swipe: false,
      cur: 0,
    }
  },
  timeout: null,
  open() {
    this.setState({ css: "in" })
    if (!this.state.swipe) {
      let self = this

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
      swipe: false,
      css: false,
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
    if (!this.state.css) return <div />

    let self = this
    let panes = [
      <span>Place the cuff at the same<br />level as your heart.</span>,
      <span>Leave one finger space<br />between the cuff and your arm.</span>,
      <span>Position the cuff 1/2&rdquo; (2cm)<br />above your elbow joint.</span>,
      <span className="smaller">Position the monitor in the middle of your<br /> arm aligned with your middle finger.</span>,
      <span onClick={this.close}>That's it! Click here to close.</span>
    ]

    return <div className={"abs-full bg-white pop-"+this.state.css} id="bp5-instructions">
      <span className="on-top x black disable-swipe" onClick={this.close} />
      {
      !this.state.swipe ? null :
      <div>
        <RC.Swipe ref="swiper" continuous={false} className="fade-in" callback={this.updateCur}>
          {panes.map(function(p,n){
            return <div className="table" key={n}>
              <div className={"inside "+(self.state.css=="out" ? "fade-out" : "")}>
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

  }
})
