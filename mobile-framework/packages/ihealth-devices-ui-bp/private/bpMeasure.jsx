
DeviceRC.BP5Control = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState: function() {
    return {
      showHelp: false
    };
  },
  deviceName: "BP",
  getMeteorData: function() {
    return {
      deviceJson: Session.get(this.deviceName),
      devices: Session.get("devices") || {}
    };
  },
  render: function() {
    var DeviceMeasure, cRadius, device, deviceClasses, deviceInfo, deviceStatus, headerSpace, isCancelled, isHidden, self, _ref;
    self = this;
    device = this.props.device;
    isHidden = !_.isObject(this.data.deviceJson);
    isCancelled = _.isObject(this.data.deviceJson) && this.data.deviceJson.isCancelled;
    headerSpace = (_.isUndefined(this.props.addHeaderSpace) || this.props.addHeaderSpace) && (isHidden || isCancelled) ? ' nav-margin' : '';
    deviceInfo = this.data.devices[this.deviceName] || "";
    deviceStatus = (_.isString(deviceInfo) ? deviceInfo : "ready");
    cRadius = (Meteor.Device.isPhone() ? 80 : 120);
    return <div className={"abs-full background device-back overflow "+this.deviceName+headerSpace}>
      { isCancelled || isHidden ? null :
          <DeviceRC.MeasureBP device={this.props.device} inactiveDuration={this.props.inactiveDuration} />
      }
      <div className="center line-average unselect">
          <div className="device-search-bar">
            { deviceStatus === "searching" ? <div className="dsb-loading"/> : null }
          </div>

          <RC.Animate transitionName="scale">
            { this.state.showHelp ? <DeviceRC.BP5Instructions setShowHelp={self.setShowHelp} /> : null }
          </RC.Animate>

          <DeviceRC.BlurryBackground deviceStatus={deviceStatus} />

          <DeviceRC.CenterMessage deviceStatus={deviceStatus} setShowHelp={this.setShowHelp} />

          <DeviceRC.RoundControl deviceStatus={deviceStatus} device={device} finishCallback={this.props.finishCallback} holdToConnect={this.props.holdToConnect} buttonHeld={this.props.buttonHeld} />

          <DeviceRC.BatteryDisplay deviceInfo={deviceInfo} />

        </div>
    </div>
  },
  setShowHelp: function(newValue) {
    this.setState({
      showHelp: newValue
    });
  },
  componentWillUnmount: function() {
    var devices;
    Session.set(this.deviceName, null);
    if (this.props.device.hasStarted) {
      this.props.device.stop();
    }
    devices = Session.get("devices");
    if (_.isObject(devices) && devices[this.deviceName] === "searching") {
      devices[this.deviceName] = null;
      Session.set("devices", devices);
    }
  }
});

DeviceRC.MeasureBP = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    var bpSession, self;
    self = this;
    bpSession = Session.get("BP") || {};
    if (bpSession.highpressure && bpSession.lowpressure) {
      if (this.timeout === null) {
        this.timeout = Meteor.setTimeout(function() {
          var pcDecrease, pcPos, pressurePos;
          pressurePos = bpSession.pressure;
          pcDecrease = bpSession.perCent / bpSession.pressure;
          pcPos = bpSession.perCent;
          self.setState({
            spdClass: "transition-slow"
          });
          self.updateCircle(0);
          bpSession.perCent = 0;
          return self.interval = Meteor.setInterval(function() {
            bpSession.pressure = Math.max(--pressurePos, 0);
            if (!pressurePos) {
              Meteor.clearInterval(self.interval);
              self.setState({
                status: "displaying"
              });
              self.updateCircle(0);
              console.log("@@@@");
              console.log("@@@@");
              console.log(bpSession);
              console.log("@@@@");
              console.log("@@@@");
              Meteor.setTimeout((function() {
                console.log("AAAA");
                self.setState({
                  status: "finished"
                });
                return Session.set("BP", bpSession);
              }), 1000);
            }
            return Session.set("BP", bpSession);
          }, Math.max(1000 / pressurePos, 5));
        }, 250);
      }
    } else {
      this.updateCircle(bpSession.perCent);
    }
    return {
      BP: bpSession
    };
  },
  timeout: null,
  inactiveTimeout: null,
  interval: null,
  componentWillUnmount: function() {
    delete Session.keys["BP"];
    if (this.props.device.hasStarted) {
      return this.props.device.stop();
    }
  },
  getInitialState: function() {
    return {
      status: "processing",
      spdClass: "transition"
    };
  },
  restartInactiveTimer: function() {
    var self;
    if (_.isNumber(this.props.inactiveDuration) && this.props.inactiveDuration > 1000) {
      self = this;
      Meteor.clearTimeout(this.inactiveTimeout);
      return this.inactiveTimeout = Meteor.setTimeout(function() {
        return self.cancelMeasure();
      }, this.props.inactiveDuration);
    }
  },
  cancelMeasure: function() {
    var cb, self;
    self = this;
    cb = function() {
      var cur;
      self.props.device.hasStarted = false;
      cur = Session.get("BP");
      cur.isCancelled = true;
      Session.set("BP", cur);
      Meteor.clearTimeout(self.inactiveTimeout);
      return Meteor.setTimeout((function() {
        Session.set("BP", null);
        self.setState({
          status: "processing",
          spdClass: "transition"
        });
        return self.timeout = null;
      }), 1500);
    };
    return this.props.device.stop(cb);
  },
  updateCircle: function(perCent, slow) {
    var cFull, cLine, svgMax, svgVal;
    cLine = React.findDOMNode(this.refs.cLine);
    cFull = React.findDOMNode(this.refs.cFull);
    svgMax = (Meteor.Device.isPhone() ? 1000 : 1500);
    svgVal = svgMax - (svgMax * perCent);
    if (cLine && cFull) {
      cFull.setAttribute("stroke-dashoffset", (this.state.status === "displaying" ? svgMax : 0));
      cLine.setAttribute("stroke-dashoffset", (isNaN(svgVal) ? svgMax : Math.round(svgVal)));
      return this.restartInactiveTimer();
    }
  },
  render: function() {
    var BP = this.data.BP;
    var cRadius = Meteor.Device.isPhone() ? 120 : 180;
    var deviceType = Meteor.Device.isPhone() ? " phone" : " tablet";
    return <RC.Animate transitionName="slide-up">
        <div className={"abs-full bg-white scroll on-top-higher"+deviceType} onClick={this.restartInactiveTimer} id="measuring-bp">
          <span className="x black on-top" onClick={this.cancelMeasure} />
          {BP.errorID ? <DeviceRC.Error msg={BP.msg} closeHandler={this.cancelMeasure} /> : null}
          { this.state.status === "finished" ? null :
            <svg className="svg-circle" width={cRadius*2} height={cRadius*2} viewPort={"0 0 "+cRadius+" "+cRadius} version="1.1" xmlns="http://www.w3.org/2000/svg">
              <circle ref="cFull" className={"full "+this.state.spdClass} r={cRadius-10} cx={cRadius} cy={cRadius} fill="transparent" transform={"rotate(-90 "+cRadius+" "+cRadius+")"}/>
              <circle ref="cLine" className={"line svg-brand2 "+this.state.spdClass} r={cRadius-10} cx={cRadius} cy={cRadius} fill="transparent" transform={"rotate(-90 "+cRadius+" "+cRadius+")"}/>
            </svg>
          }
          <div className={(this.state.status=="finished" ? "fin pop-in" : "table")+deviceType} id="pressure-display">
            <div className={(this.state.status=="displaying" ? " invis" : "")+(this.state.status=="finished" ? " fade-in" : " inside center")}>
              { this.state.status==="finished"
                ? <DeviceRC.BPResultDisplay BP={BP}/>
                : <p className="thin processing-number padding-none brand2">
                  {BP.pressure || 0}
                  {!BP.pressure ? <span className="fa fa-cog spin-medium" /> : null}
                </p>
              }
            </div>
          </div>
        </div>
    </RC.Animate>
  }
});

DeviceRC.BPResult = React.createClass({
  render: function() {
    var deviceType = Meteor.Device.isPhone() ? " phone" : " tablet";
    return <div className={"abs-full bg-white scroll on-top-higher"+deviceType}  id="measuring-bp">
      <span className="on-top x black disable-swipe" onClick={this.props.onClick} />
      <DeviceRC.BPResultDisplay BP={this.props.BP}/>
    </div>
  }
});
DeviceRC.BPResultDisplay = React.createClass({
  render: function() {
    return <div className="line-average">
      <div className="bp-fin center thick brand2">
        {moment(this.props.BP.date).format("MMM Do YYYY - h:mm a")}
      </div>
      <div className="bp-fin">
        <div className="clear">
          <p className="type thin">
            <small className="block thick">mmHg</small>
            Systolic
          </p>
          <p className="val thin">{Math.round(this.props.BP.highpressure)}</p>
        </div>
      </div>
      <div className="bp-fin">
        <div className="clear">
          <p className="type thin">
            <small className="block thick">mmHg</small>
            Diastolic
          </p>
          <p className="val thin">{Math.round(this.props.BP.lowpressure)}</p>
        </div>
      </div>
      <div className="bp-fin">
        <div className="clear">
          <p className="type thin">
            <small className="block thick">Beats Per Minute</small>
            Heart Rate
          </p>
          <p className="val thin">{this.props.BP.heartrate}</p>
        </div>
      </div>

      <DeviceRC.BPZone hiPressure={this.props.BP.highpressure} loPressure={this.props.BP.lowpressure} />
    </div>
  }
});

DeviceRC.BP5Instructions = React.createClass({
  getInitialState: function() {
    return {
      dotSelected: 0
    };
  },
  styles: {
    deviceHelp: {
      'fontSize': '2em',
      'color': 'rgba(0, 0, 0, 0.55)',
      'height': '90%',
      'width': '90%',
      'maxWidth': '480px',
      'padding': '68% 0 4%',
      'margin': '0 auto'
    }
  },
  close: function() {
    return this.props.setShowHelp(false);
  },
  slideTo: function(n) {
    this.refs.swiper.slideTo(n);
    return this.setState({
      dotSelected: n
    });
  },
  updateDot: function(n) {
    return this.setState({
      dotSelected: this.refs.swiper.getPos()
    });
  },
  render: function() {
    var self = this;
    let panes = [
      <span>Place the cuff at the same<br />level as your heart.</span>,
      <span>Leave one finger space<br />between the cuff and your arm.</span>,
      <span>Position the cuff 1/2&rdquo; (2cm)<br />above your elbow joint.</span>,
      <span className="smaller">Position the monitor in the middle of your<br /> arm aligned with your middle finger.</span>,
      <span onClick={this.close}>That's it! Click here to close.</span>
    ]
    return <DelayedLoader>
      <div style={this.styles.deviceHelp}>
        <span className="on-top x black disable-swipe" onClick={this.close} />
        <RC.Swipe ref="swiper" continuous={false} className="fade-in" callback={this.updateDot}>
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
        <DotMenu nDots={panes.length} dotSelected={this.state.dotSelected} onClick={self.slideTo} />
      </div>
    </DelayedLoader>
  }
})

var DotMenu = React.createClass({
  styles: {
    dotsRoot: {
      zIndex: 1,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: '2%'
    }
  },
  render: function() {
    var self = this;

    // { [...Array(this.props.nDots)].map((x, i) =>
    //   return renderDot(i)
    // )}
    return <div style={this.styles.dotsRoot} >
      {_.range(self.props.nDots).map(function(i) {
        return <span
          className={"dot transition"+(self.props.dotSelected === i ? " bg-brand2" : "")}
          key={i}
          onClick={self.props.onClick.bind(null,i)} />
      })}
    </div>
  }
});

var VerticalCenter = React.createClass({
  styles: {
    outer: {
      height: '100%',
      width: '100%',
      display: 'flex',
      'flexDirection': 'column',
      'justifyContent': 'center',
      'verticalAlign': 'middle'
    },
    inner: {}
  },
  render: function() {
    return <div style={this.styles.outer}>
      <div>
        { this.props.children }
      </div>
    </div>
  }
});

var DelayedLoader = React.createClass({
  getInitialState: function() {
    return {
      loadChild: false
    };
  },
  timeout: null,
  componentDidMount: function() {
    var self;
    if (!this.state.loadChild) {
      self = this;
      Meteor.clearTimeout(this.timeout);
      return this.timeout = Meteor.setTimeout(function() {
        return self.setState({
          loadChild: true
        });
      }, 400);
    }
  },
  render: function() {
    return <div className="abs-full bg-white on-top-higher">
      { this.state.loadChild ? this.props.children : null }
    </div>
  }
});

DeviceRC.BPZone = React.createClass({
  render() {

    let zoneRes = h.getBPZone(this.props.hiPressure, this.props.loPressure)
    if (!_.isNumber(zoneRes)) return <div />

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
      var yPos = this.props.hiPressure/200*100
      if (this.props.hiPressure<=120)
        yPos -= 20
      else if (this.props.hiPressure<=140)
        yPos -= 10

      // Diastolic
      var xPos = this.props.loPressure/140*100
      if (this.props.loPressure<=80)
        xPos -= 17
      else if (this.props.loPressure<=90)
        xPos -= 4
      else if (this.props.loPressure<=100)
        xPos += 9

      bubblePos.bottom = yPos+"%"
      bubblePos.left = xPos+"%"
    }

    return <div className="bp-fin">
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
    return <div className="fixed-full center bg-overlay" id="device-error">
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
