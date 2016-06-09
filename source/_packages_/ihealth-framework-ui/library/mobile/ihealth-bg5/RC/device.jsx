
var debugLevel = 3
var debugL = _.partial(DevTools.consoleWithLevels, debugLevel);

h.pluginValues = h.pluginValues || {};
h.pluginValues.BgManagerCordova = h.pluginValues.BgManagerCordova || {};
let bg = h.pluginValues.BgManagerCordova;

bg.startDiscovery = {
  success: 'Discovery',
  done: "DiscoveryDone",
}
bg.stopDiscovery = { done: "DiscoveryDone", };
bg.startMeasure = {
  stripIn: "StripIn",
  getBlood: "Blood",
  resultMsg: "Result",
  result: "result",
};
bg.connectDevice = { success: 'Connected', };
bg.getBattery = { success: 'getBattery', };
bg.setBottleId = { success: 'SetBottleID', };
bg.getBottleId = { success: 'BottleID', };
bg.setBottleMessage = { success: 'setBottleMessage', };
bg.getBottleMessage = { success: 'Code', };
bg.getOfflineData = {
  count: 'HistoryDataCount',
  data: 'HistoryData',
};
bg.getOfflineData = {
  resultList: 'ResultList',
  result: 'Result',
};
bg.deleteOfflineData = { success: 'DeleteOffLineData', };
bg.disConnectDevice = { success: 'DisConnectDevice', };
bg.setDisconnectCallback = { success: 'Disconnect', };
bg.holdLink = { success: 'HoldLink', };
bg.error = "Error";
bg.mac1 = "8CDE52425C58";

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
//
// IH.RC.CommandItem = React.createClass({
//   render() {
//     let commandName = this.props.commandName;
//     let self = this;
//     let item = {
//       theme: "icons"
//     };
//
//     if (self.props.isActive) {
//       item.uiColor = 'brand3';
//       item.uiClass = "check-circle-o";
//       item.onClick = function() {
//         debugL(4)(commandName + ' clicked');
//         self.props.action();
//       };
//     } else {
//       item.uiClass = "circle-o";
//       item.onClick = function() { alert('Device not connected. Pair the device and press connect.')};
//
//     }
//
//     return <RC.Item {... item }>
//       { commandName }
//     </RC.Item>
//   }
// });

var cb = function(tag) {
  return function(a) {
  // console.log(tag, a)
  }
}

h.BG5pluginCall = function(deviceSelected, pluginLabel, commandName, args, successCB0, statusUpdatesCB) {
  let plugin = window[pluginLabel];

  let platform = h.getPlatform("android") ? "android" : "ios";
  let secretkey = "public." + platform + "appsecret";
  let getsecret = (platform) => h.nk(Meteor.settings, secretkey)
  let appsecret  = getsecret(platform);
  if (!appsecret) {
    appsecret = '123456';
    console.error('appsecret need to be defined in the settings file');
  };

  console.log('bg using appsecret: ', appsecret, plugin);

  cb = function(msg) { console.log("msg: ", msg)};
  mac = '8CDE52425C58';
  secret = "c6f748410eb0809d3fd0082f1cf358ab";
  plugin.startDiscovery(cb, cb, secret, mac);
  // BgManagerCordova.connectDevice(cb, cb, secret, mac);
  let addDesc = function(desc, m0) {
    let r = m0 ? desc + ' - ' + m0 : desc
    return r;
  };

  let addTS = function(m0) {
    return (new Date).toLocaleTimeString() + ': ' + m0;
  };

  let consoleCB = function(desc, messageRaw) {
    let message = addTS(addDesc(desc,messageRaw));
    debugL(3)(message);
    if(statusUpdatesCB) statusUpdatesCB(message); // optional
  };

  var successCB = function(m) {
    consoleCB(commandName + ' success', m);
    if (successCB0) successCB0(m);
  };

  consoleCB(commandName + "...");

  var argsArray = [successCB, consoleCB.bind(null, commandName + ' failure'), appsecret, deviceSelected].concat(args || []);
  // (pluginLabel === 'BpManagerCordova')
  //   ? [deviceSelected, successCB, consoleCB.bind(null, commandName + ' failure')].concat(args || [])
  //   : [successCB, consoleCB.bind(null, commandName + ' failure'), '123456', deviceSelected].concat(args || [])
  debugL(2)(commandName + ' argsArray: ' + argsArray);
  plugin[commandName].apply(plugin, argsArray);
};

h.ifMobile = function(styleObject) {
  var mqMobile = window.matchMedia( "(max-width: 500px)" ).matches;
  if (styleObject.mobile !== null && mqMobile) {
    return _.extend({}, styleObject.common, styleObject.mobile)
  } else {
    return styleObject.common || styleObject
  }
}


let packageName = 'ihealth_bg5'


h.playAudio = function(soundName) {
  if(Meteor.isCordova) {
    var sone = new Media(getLocalPath('/packages/'+packageName+'/assets/audio/'+soundName),cb('success ' + getLocalPath('/assets/audio/'+soundName)), cb('fail ' + soundName), cb('status ', soundName))
  } else {
    var sone = new Audio('/packages/'+packageName+'/assets/audio/'+soundName,cb('success '+ soundName), cb('fail '+ soundName), cb('status '+ soundName))
  }
  sone.play()
}

      // 'padding': '68% 0 4%',
IH.RC.BG5Instructions = React.createClass({
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
      h.playAudio('click.mp3');
    } else {
      h.playAudio('alert-01.wav');
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
    return <div style={h.ifMobile(this.styles.deviceHelp) }>
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


IH.RC.HelpPaneOutline = React.createClass({
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
      'marginTop': '2%',
      'marginBottom': '3%',
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
          <img style={h.ifMobile(this.styles.img) } src={this.props.instruction.image} />
        </figure>
      </div>
  }
});

//meteor add cordova:phonegap-plugin-barcodescanner@https://github.com/phonegap/phonegap-plugin-barcodescanner.git#74f33d5d14107915c357753684e9276eb37a3f66
// erwei ma = QR code in Chinese
IH.RC.QRControl = React.createClass({
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
    return <img style={h.ifMobile(this.style.scanqr)} src={this.props.src} onClick={this.runQR} />
  }
})

IH.RC.StatusMenu = React.createClass({
  styles: {
    dotsRoot: {
      zIndex: 2,
      // position: 'fixed',
      left: 0,
      right: 0,
      // top: '8%'
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
        return <img style={h.ifMobile(self.styles.img)} src={self.props.indicators[i]}  onClick={self.props.onClick.bind(null,i)} key={i}/>
      })}
    </div>
  }
});
