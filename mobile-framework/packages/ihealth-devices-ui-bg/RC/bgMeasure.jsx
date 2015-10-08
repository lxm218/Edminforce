
var ifMobile = function(styleObject) {
  var mqMobile = window.matchMedia( "(max-width: 500px)" ).matches;
  if (styleObject.mobile !== null && mqMobile) {
    return _.extend({}, styleObject.common, styleObject.mobile)
  } else {
    return styleObject.common || styleObject
  }
}

var cb = function(tag) {
  return function(a) {
  // console.log(tag, a)
  }
}

var getLocalPath = function (localPath) {
  return cordova.file.applicationDirectory.replace('file://', '').replace(/%20/g,' ') + 'www/application/' + localPath.substr(1);
};
//
// var id = function(a) {return a}
// Feedback.profiles = {
//   "forward": {
//     sound: (Meteor.isCordova ? getLocalPath : id)('/packages/ihealth_devices-ui-bg/assets/audio/click.mp3'),
//     vibrate: [500,50,500,50,100]
//   },
//   "backward": {
//     sound: (Meteor.isCordova ? getLocalPath : id)('/packages/ihealth_devices-ui-bg/assets/audio/alert-01.wav'),
//     vibrate: [500,50,500,50,100]
//   }
// }

var playAudio = function(soundName) {
  if(Meteor.isCordova) {
    var sone = new Media(getLocalPath('/packages/ihealth_devices-ui-bg/assets/audio/'+soundName),cb('success ' + getLocalPath('/assets/audio/'+soundName)), cb('fail ' + soundName), cb('status ', soundName))
  } else {
    var sone = new Audio('/packages/ihealth_devices-ui-bg/assets/audio/'+soundName,cb('success '+ soundName), cb('fail '+ soundName), cb('status '+ soundName))
  }
  sone.play()
}

DeviceRC.BG5Control = React.createClass({
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
      <RC.Animate transitionName="slide-up">
        { (isCancelled || isHidden) ? null :
          <DelayedLoader>
            <DeviceRC.BG5Instructions setShowHelp={self.setShowHelp} />
          </DelayedLoader>
        }
      </RC.Animate>
      <RC.Animate transitionName="scale">
        { this.state.showHelp
          ? <DelayedLoader>
              <DeviceRC.BG5Instructions setShowHelp={self.setShowHelp} />
          </DelayedLoader>
          : null }
      </RC.Animate>

      <DeviceRC.BlurryBackground deviceStatus={deviceStatus} />

      <DeviceRC.CenterMessage deviceStatus={deviceStatus} setShowHelp={this.setShowHelp} />


      <DeviceRC.BatteryDisplay deviceInfo={deviceInfo} />
    </div>

  },
      // <DeviceRC.RoundControl deviceStatus={deviceStatus} device={this.props.device} finishCallback={this.finishCallback} holdToConnect={this.props.holdToConnect} buttonHeld={this.props.buttonHeld} />
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

DeviceRC.MeasureBG = React.createClass({
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
    var BG = this.data.BG;
    var cRadius = Meteor.Device.isPhone() ? 120 : 180;
    var deviceType = Meteor.Device.isPhone() ? " phone" : " tablet";
    return <div className={"abs-full bg-white scroll on-top-higher"+deviceType} onClick={this.restartInactiveTimer} id="measuring-bp">
        <span className="x black on-top" onClick={this.cancelMeasure} />
        {BG.errorID ? <DeviceRC.Error msg={BG.msg} closeHandler={this.cancelMeasure} /> : null}
        { this.state.status === "finished" ? null :
          <svg className="svg-circle" width={cRadius*2} height={cRadius*2} viewPort={"0 0 "+cRadius+" "+cRadius} version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle ref="cFull" className={"full "+this.state.spdClass} r={cRadius-10} cx={cRadius} cy={cRadius} fill="transparent" transform={"rotate(-90 "+cRadius+" "+cRadius+")"}/>
            <circle ref="cLine" className={"line svg-brand2 "+this.state.spdClass} r={cRadius-10} cx={cRadius} cy={cRadius} fill="transparent" transform={"rotate(-90 "+cRadius+" "+cRadius+")"}/>
          </svg>
        }
        <div className={(this.state.status=="finished" ? "fin pop-in" : "table")+deviceType} id="pressure-display">
          <div className={(this.state.status=="displaying" ? " invis" : "")+(this.state.status=="finished" ? " fade-in" : " inside center")}>
            { this.state.status==="finished"
              ? <DeviceRC.BGResultDisplay BG={BG}/>
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

DeviceRC.BGResult = React.createClass({
  render: function() {
    var deviceType = Meteor.Device.isPhone() ? " phone" : " tablet";
    return <div className={"abs-full bg-white scroll on-top-higher"+deviceType}  id="measuring-bp">
      <span className="on-top x black disable-swipe" onClick={this.props.onClick} />
      <DeviceRC.BGResultDisplay BG={this.props.BG}/>
    </div>
  }
});
DeviceRC.BGResultDisplay = React.createClass({
  render: function() {
    return <div className="line-average">
      <div className="bp-fin center thick brand2">
        {moment(this.props.BG.date).format("MMM Do YYYY - h:mm a")}
      </div>
      <div className="bp-fin">
        <div className="clear">
          <p className="type thin">
            <small className="block thick">mmHg</small>
            Systolic
          </p>
          <p className="val thin">{Math.round(this.props.BG.highpressure)}</p>
        </div>
      </div>
      <div className="bp-fin">
        <div className="clear">
          <p className="type thin">
            <small className="block thick">mmHg</small>
            Diastolic
          </p>
          <p className="val thin">{Math.round(this.props.BG.lowpressure)}</p>
        </div>
      </div>
      <div className="bp-fin">
        <div className="clear">
          <p className="type thin">
            <small className="block thick">Beats Per Minute</small>
            Heart Rate
          </p>
          <p className="val thin">{this.props.BG.heartrate}</p>
        </div>
      </div>

      <DeviceRC.BGZone hiPressure={this.props.BG.highpressure} loPressure={this.props.BG.lowpressure} />
    </div>
  }
});

      // 'padding': '68% 0 4%',
DeviceRC.BG5Instructions = React.createClass({
  getInitialState: function() {
    return {
      stage: 'connect'
    };
  },
  stages: ['connect', 'strip', 'sample', 'result'],
  styles: {
    deviceHelp: {
      common: {
      'fontSize': '1.5em',
      'color': 'rgba(0, 0, 0, 0.55)',
      'height': '90%',
      'width': '90%',
      'maxWidth': '480px',
      'margin': '0 auto'
      },
      mobile: {
        'fontSize': '6vw',
      }
    },
    mid: {
      height: '50%'
    }
  },
  componentDidUpdate(prevProps, prevState) {
    if (_.indexOf(this.stages, this.state.stage) > _.indexOf(this.stages, prevState.stage)) {
      playAudio('click.mp3');
    } else {
      playAudio('alert-01.wav');
    }

  },
  close: function() {
    return this.props.setShowHelp(false);
  },
  slideTo: function(n) {
    console.log('slideto', n)
    this.refs.swiper.slideTo(n);
    return this.setState({
      stage: this.stages[n]
    });
  },
  updateDot: function(n) {
    return this.setState({
      stage: this.stages[n]
    });
  },
  render: function() {
    var self = this;
    var assetPath = function(f) { return '/packages/ihealth_devices-ui-bg/assets/' + f;}
    var indicator = {
      'connect': {
        'on': 'indicator1a_bt.png',
        'done': 'indicator1_bt_check.png'
      },
      'strip': {
        'dim': 'indicator2_strip_dim.png',
        'on': 'indicator2_strip.png',
        'done': 'indicator2_strip_check.png'
      },
      'sample': {
        'dim': 'indicator3_sample_dim.png',
        'on': 'indicator3_sample.png'
      }
    }
    var stages = {
      'connect': {
        image: assetPath('help1a_enablebt.png'),
        scanqr: assetPath('scan_qr_dim.png'),
        message: <span>Turn on the bluetooth & connect<br />the meter to your device</span>,
        indicators: _.map([indicator.connect.on, indicator.strip.dim, indicator.sample.dim], assetPath)
      },
      'strip': {
        image: assetPath('help2_strip.png'),
        scanqr: assetPath('scan_qr.png'),
        message: <span>Insert test strip</span>,
        indicators: _.map([indicator.connect.done, indicator.strip.on, indicator.sample.dim], assetPath)
      },
      'sample': {
        image: assetPath('help3_sample.png'),
        scanqr: assetPath('scan_qr.png'),
        message: <span>Obtain blood sample</span>,
        indicators: _.map([indicator.connect.done, indicator.strip.done, indicator.sample.on], assetPath)
      },
      'result': {
        image: assetPath('help5.png'),
        scanqr: assetPath('scan_qr.png'),
        message: <span onClick={this.close}>That's it! Click here to close.</span>,
        indicators: _.map([indicator.connect.done, indicator.strip.done, indicator.sample.on], assetPath)
      }
    }
    // function isHighDensity(){
    //     return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));
    // }
    //
    //
    // function isRetina(){
    //     return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)').matches)) || (window.devicePixelRatio && window.devicePixelRatio >= 2)) && /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
    // }
    return <div style={ifMobile(this.styles.deviceHelp) }>
      <StatusMenu onClick={self.slideTo} indicators={stages[self.state.stage].indicators}/>
      <div style={this.styles.mid}>
        <RC.Swipe ref="swiper" continuous={false} className="fade-in" callback={this.updateDot} >
          { _.map(stages, function(instruction, i) {
            return <HelpPaneOutline kind='warning' key={i} i={i} instruction={instruction} css={self.state.css}/>
          })}
        </RC.Swipe>
      </div>
      <QRControl  src={stages[this.state.stage].scanqr} />
    </div>
  }
});

//style={ifMobile(this.styles.scanqr) }
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

var HelpPaneOutline = React.createClass({
  styles: {
    'nothing': {},
    img: {
      common: {
        width: '300px',
        margin: '0 auto'
      },
      mobile: {
        height: '58%',
        width: '58%',
      }
    },

    caption: {
      fontSize: '1em',
      'marginTop': '10%',
      'marginBottom': '10%',
      color: 'rgb(64, 180, 231)'
    },
    thin: {
      'fontFamily': 'HelveticaNeue-Light, Roboto-Light, sans-serif-light, sans-serif',
      'fontWeight': 'normal',
      // 'marginTop': '-20%'
    },
    base: {
      'fontSize': '50px',
      color: '#0f0',
      ':hover': {
        background: tinycolor('#0074d9').lighten(20).toHexString()
      }
    },
    primary: {
      background: '#0074D9'
    },
    warning: {
      background: '#FF4136'
    },
    container: {
      background: '#e0e',
      color: 'green',
      textAlign: 'right'
    },
    container2: {
      padding: 20,
      color: '#00f',
      ':hover': {
        color: '#c00'
      }
    }
  },
  render() {
    return <RC.VerticalAlign>
      { this.renderInner()}
    </RC.VerticalAlign>
  },
  renderInner: function() {
    return <div className={ this.props.css === "out" ? "fade-out" : ""} >
        <figure style={this.styles.thin} >
          <div style={this.styles.caption} >
            {this.props.instruction.message}
          </div>
          <img style={ifMobile(this.styles.img) } src={this.props.instruction.image} />
        </figure>
      </div>
  }
});

//meteor add cordova:phonegap-plugin-barcodescanner@https://github.com/phonegap/phonegap-plugin-barcodescanner.git#74f33d5d14107915c357753684e9276eb37a3f66
// erwei ma = QR code in Chinese
var QRControl = React.createClass({
  style: {
    scanqr: {
      common: {
        zIndex: 1,
        maxWidth: '400px',
        margin: '0 auto',
        position: 'fixed',
        left: '0',
        right: '0',
        bottom: '5%'
      },
      mobile: {
        width: '85%'
      }
    },
  },
  runQR() {
    console.log('runQR')
    if(Meteor.isCordova){
      cordova.plugins.barcodeScanner.scan(
          function (result) {
              console.log ('result', result);
              alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
          },
          function (error) {
              alert("Scanning failed: " + error);
          }
      );
    }
  },
  render() {
    return <img style={ifMobile(this.style.scanqr)} src={this.props.src} onClick={this.runQR} />
  }
})

var StatusMenu = React.createClass({
  styles: {
    dotsRoot: {
      zIndex: 2,
      position: 'fixed',
      left: 0,
      right: 0,
      top: '8%'
    },
    img: {
      common: {
        display: 'inline-block',
        height: '100px',
        width: '100px',
        margin: '0 10px'
      },
      mobile: {
        height: '20%',
        width: '20%',
        margin: '0 2%'
      }
    }
  },
  render() {
    var self = this;
    return <div style={this.styles.dotsRoot}>
      {_.range(self.props.indicators.length).map(function(i) {
        return <img style={ifMobile(self.styles.img)} src={self.props.indicators[i]}  onClick={self.props.onClick.bind(null,i)} key={i}/>
      })}
    </div>
  }
});

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

DeviceRC.BGZone = React.createClass({
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
