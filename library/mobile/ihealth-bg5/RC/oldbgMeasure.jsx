
IH.RC.BG5Control2 = React.createClass({
  // device={iHealth.BG5} deviceName="BG"
  mixins: [ReactMeteorData],
  getInitialState: function() {
    return {
      showHelp: false
    };
  },
  deviceName: "BG",
  getMeteorData: function() {
    return {
      deviceJson: Session.get('BG'),
      devices: Session.get("devices") || {}
    };
  },
  componentWillMount() {
    let self = this;
    if (!Meteor.isCordova && _.isUndefined(BgManagerCordova)) {
      console.warn('BgManagerCordova not found. Using stub.')
      BgManagerCordova = DevicesStub.BG5;
    };
  },
  finishCallback: function(res){
    console.log("@@ Finish Callback @@")
    console.log(res)
  },
  render: function() {
    var cRadius, headerSpace, isCancelled, isHidden, self;
    self = this;
    headerSpace = (_.isUndefined(this.props.addHeaderSpace) || this.props.addHeaderSpace) && (isHidden || isCancelled) ? ' nav-margin' : '';
    cRadius = (Meteor.Device.isPhone() ? 80 : 120);
    return <div className={"abs-full background device-back overflow "+'BG'+headerSpace}>
      <div className="center line-average unselect">
        { this.renderConnect() }
      </div>
    </div>
  },
  renderConnect() {
    var deviceInfo = this.data.devices['BG'] || "";
    var deviceStatus = (_.isString(deviceInfo) ? deviceInfo : "ready");
    var isHidden = !_.isObject(this.data.deviceJson);
    var isCancelled = _.isObject(this.data.deviceJson) && this.data.deviceJson.isCancelled;
    return <div>
      <div className="device-search-bar">
        { deviceStatus === "searching" ? <div className="dsb-loading"/> : null }
      </div>
      <RC.Animate transitionName="slide-up" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        { (isCancelled || isHidden) ? null :
          <DelayedLoader>
            <IH.RC.BG5Instructions setShowHelp={self.setShowHelp} />
          </DelayedLoader>
        }
      </RC.Animate>
      <RC.Animate transitionName="scale" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        { this.state.showHelp
          ? <DelayedLoader>
              <IH.RC.BG5Instructions setShowHelp={self.setShowHelp} />
          </DelayedLoader>
          : null }
      </RC.Animate>

      <IH.RC.BlurryBackground deviceStatus={deviceStatus} />

      <IH.RC.CenterMessage deviceStatus={deviceStatus} setShowHelp={this.setShowHelp} />


      <IH.RC.BatteryDisplay deviceInfo={deviceInfo} />
    </div>

  },
      // <IH.RC.RoundControl deviceStatus={deviceStatus} device={this.props.device} finishCallback={this.finishCallback} holdToConnect={this.props.holdToConnect} buttonHeld={this.props.buttonHeld} />
  setShowHelp: function(newValue) {
    this.setState({
      showHelp: newValue
    });
  },
  componentWillUnmount: function() {
    var devices;
    Session.set('BG', null);
    if (this.props.device.hasStarted) {
      this.props.device.stop();
    }
    devices = Session.get("devices");
    if (_.isObject(devices) && devices['BG'] === "searching") {
      devices['BG'] = null;
      Session.set("devices", devices);
    }
  }
});

IH.RC.MeasureBG = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    var bgSession, self;
    self = this;
    bgSession = Session.get("BG") || {};
    if (bgSession.highpressure && bgSession.lowpressure) {
      if (this.timeout === null) {
        this.timeout = Meteor.setTimeout(function() {
          var pcDecrease, pcPos, pressurePos;
          pressurePos = bgSession.pressure;
          pcDecrease = bgSession.perCent / bgSession.pressure;
          pcPos = bgSession.perCent;
          self.setState({
            spdClass: "transition-slow"
          });
          self.updateCircle(0);
          bgSession.perCent = 0;
          return self.interval = Meteor.setInterval(function() {
            bgSession.pressure = Math.max(--pressurePos, 0);
            if (!pressurePos) {
              Meteor.clearInterval(self.interval);
              self.setState({
                status: "displaying"
              });
              self.updateCircle(0);
              console.log("@@@@");
              console.log("@@@@");
              console.log(bgSession);
              console.log("@@@@");
              console.log("@@@@");
              Meteor.setTimeout((function() {
                console.log("AAAA");
                self.setState({
                  status: "finished"
                });
                return Session.set("BG", bgSession);
              }), 1000);
            }
            return Session.set("BG", bgSession);
          }, Math.max(1000 / pressurePos, 5));
        }, 250);
      }
    } else {
      this.updateCircle(bgSession.perCent);
    }
    return {
      BG: bgSession
    };
  },
  timeout: null,
  inactiveTimeout: null,
  interval: null,
  componentWillUnmount: function() {
    delete Session.keys["BG"];
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
      cur = Session.get("BG");
      cur.isCancelled = true;
      Session.set("BG", cur);
      Meteor.clearTimeout(self.inactiveTimeout);
      return Meteor.setTimeout((function() {
        Session.set("BG", null);
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
    cLine = ReactDOM.findDOMNode(this.refs.cLine);
    cFull = ReactDOM.findDOMNode(this.refs.cFull);
    svgMax = (Meteor.Device.isPhone() ? 1000 : 1500);
    svgVal = svgMax - (svgMax * perCent);
    if (cLine && cFull) {
      cFull.setAttribute("stroke-dashoffset", (this.state.status === "displaying" ? svgMax : 0));
      cLine.setAttribute("stroke-dashoffset", (isNaN(svgVal) ? svgMax : Math.round(svgVal)));
      return this.restartInactiveTimer();
    }
  },
  render: function() {
    var BG = this.data.BG;
    var cRadius = Meteor.Device.isPhone() ? 120 : 180;
    var deviceType = Meteor.Device.isPhone() ? " phone" : " tablet";
    return <div className={"abs-full bg-white scroll on-top-higher"+deviceType} onClick={this.restartInactiveTimer} id="measuring-bp">
        <span className="x black on-top" onClick={this.cancelMeasure} />
        {BG.errorID ? <IH.RC.Error msg={BG.msg} closeHandler={this.cancelMeasure} /> : null}
        { this.state.status === "finished" ? null :
          <svg className="svg-circle" width={cRadius*2} height={cRadius*2} viewPort={"0 0 "+cRadius+" "+cRadius} version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle ref="cFull" className={"full "+this.state.spdClass} r={cRadius-10} cx={cRadius} cy={cRadius} fill="transparent" transform={"rotate(-90 "+cRadius+" "+cRadius+")"}/>
            <circle ref="cLine" className={"line svg-brand2 "+this.state.spdClass} r={cRadius-10} cx={cRadius} cy={cRadius} fill="transparent" transform={"rotate(-90 "+cRadius+" "+cRadius+")"}/>
          </svg>
        }
        <div className={(this.state.status=="finished" ? "fin pop-in" : "table")+deviceType} id="pressure-display">
          <div className={(this.state.status=="displaying" ? " invis" : "")+(this.state.status=="finished" ? " fade-in" : " inside center")}>
            { this.state.status==="finished"
              ? <IH.RC.BGResultDisplay BG={BG}/>
              : <p className="thin processing-number padding-none brand2">
                {BG.pressure || 0}
                {!BG.pressure ? <span className="fa fa-cog spin-medium" /> : null}
              </p>
            }
          </div>
        </div>
      </div>
  }
});


//style={IH.RC.ifMobile(this.styles.scanqr) }
      // <DotMenu nDots={stages.length} dotSelected={this.state.dotSelected} onClick={self.slideTo} />
// var VerticalCenter = React.createClass({
//   styles: {
//     outer: {
//       height: '100%',
//       width: '100%',
//       display: 'flex',
//       'flexDirection': 'column',
//       'justifyContent': 'center',
//       'verticalAlign': 'middle'
//     },
//     inner: {}
//   },
//   render: function() {
//     return <div style={this.styles.outer}>
//       <div>
//         { this.props.children }
//       </div>
//     </div>
//   }
// });

// var MyVerticalAlign = React.createClass({
//   render() {
//     var style={
//       outer: {
//         height: '100%',
//         padding: 0,
//         margin: 0 ,
//         display: 'flex',
//         alignItems: 'center',
//         justifyConent: 'center'
//       }
//       // inner: {
//       //   maxWidth: '50%',
//       //   maxHeight: '50%'
//       // }
//
//     }
//
//     return <div style={style.outer}>
//       <div style={style.inner}>
//         {this.props.children}
//       </div>
//     </div>
//   }
// });
var DotMenu = React.createClass({
  styles: {
    dotsRoot: {
      zIndex: 1,
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: '5%'
    }
  },
  render: function() {
    var self = this;
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

// because of slide-up proportion sizing
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
      }, 1000);
    }
  },
  render: function() {
    return <div className="abs-full bg-white on-top-higher">
      { this.state.loadChild ? this.props.children : null }
    </div>
  }
});

IH.RC.BGZone = React.createClass({
  render() {

    let zoneRes = h.getBGZone(this.props.hiPressure, this.props.loPressure)
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

IH.RC.Error = React.createClass({
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
