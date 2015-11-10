
var debugLevel = 2
var debugL = _.partial(DevTools.consoleWithLevels, debugLevel);

var cb = function(tag) {
  return function(a) {
  // console.log(tag, a)
  }
}

let pluginLabel = "BgManagerCordova"

let pluginArgs = {
  BgManagerCordova: {
    setUnit: [1],
    setBottleMessage: ["024c565f4c5614322d1200a02f3485b6f314378bacd619011f72003608a9", 25, "2015-09-03 00:00:00"],
    setBottleId: [123456]
  },
  BpManagerCordova: {},
  HsManagerCordova: {}
};

IH.RC.BG5Mixin = {
  stages: ['connect', 'strip', 'sample', 'result','connect'],
  getInitialState() {
    return {
      pluginOutput: '',
      deviceList: {},
      deviceSelected: null,
      result: null
    }
  },
  componentWillMount() {
    if (!Meteor.isCordova && _.isUndefined(window[pluginLabel])) {
      console.warn(pluginLabel + ' not found. Using stub.')
      window.BgManagerCordova = DevicesStub.BG5;
    }
  },
  componentDidMount() {
    let self = this;
    self.startDiscovery();
  },
  isConnected(address) {
    return _.contains(this.stages, this.state.deviceList[address].status)
  },
  updateDeviceStatus(address, status) {
    console.info('updating ' + address + ' status to ' + status);
    let self = this
    self.setState(function(ps, cp) {
      let deviceList2 = _.clone(ps.deviceList);
      deviceList2[address].status = status;
      let newps = { deviceList: deviceList2 }
      return newps;
    })
  },
  updateDeviceDetails(address, details) {
    console.info('updating ' + address + ' details to ' + details);
    let self = this
    self.setState(function(ps, cp) {
      let deviceList2 = _.extend({}, ps.deviceList, details);
      // deviceList2[address].status = status;
      let newps = { deviceList: deviceList2 }
      return newps;
    })
  },
  startDiscovery() {
    let self = this
    h.BG5pluginCall(
      '',
      pluginLabel,
      'startDiscovery',
      null,
      function(m) {
        var obj = JSON.parse(m);
        if (obj.msg == "discovery doing"){
          // first set disconnect callback
          h.BG5pluginCall(
            obj.address,
            pluginLabel,
            'setDisconnectCallback',
            null,
            function(m2) {
              var obj = JSON.parse(m2);

              if (obj.msg === "disconnect"){
                console.log('disconnected', obj, self.state.deviceSelected)
                h.playAudio('alert-01.wav');
                self.updateDeviceStatus(obj.address, 'disconnected');
                if(self.state.deviceSelected === obj.address) {
                  console.log('reset deviceSelected')
                  self.setState({
                    deviceSelected: null
                  });
                }
              }
            }
          )

          h.playAudio('click.mp3');

          self.setState(function(ps, cp) {
            let obj2 = _.extend({}, _.omit(obj, 'address'), {status: 'connect'});
            let deviceList2 = _.clone(ps.deviceList);
            deviceList2[obj.address] = obj2;
            return { deviceList: deviceList2 }
          });

          // update battery and get offline data
          h.BG5pluginCall(
            obj.address,
            pluginLabel,
            'getBattery',
            null,
            function(m2) {
              var obj = JSON.parse(m2);

              if (obj.msg === "disconnect"){
                console.log('disconnected', obj)
                if(self.state.deviceSelected === address) {
                  console.log('reset deviceSelected')
                  newps.deviceSelected = null;
                  h.playAudio('alert-01.wav');
                }
                self.updateDeviceStatus(obj.address, 'disconnected');
              }
            }
          )

        }
      }
    )
  },
  connectDevice(address) {
    console.info('connect call' + address)
    let self = this;
    // self.setState({
    //   deviceSelected: address
    // });
    h.BG5pluginCall(
      address,
      pluginLabel,
      'connectDevice',
      null,
      function(m) {
        let obj = JSON.parse(m)
        self.setState({
          deviceSelected: obj.address
        });
      self.startMeasure(address);
      }
    )
  },
  startMeasure(address) {
    let self = this;
    // h.BG5pluginCall(
    //   address,
    //   pluginLabel,
    //   'stopMeasure',
    //   null,
    //   function(m2) {
    //     console.warn('stopMeasure works??', m2);
    //     }
    //   }
    // )
    h.BG5pluginCall(
      address,
      pluginLabel,
      'startMeasure',
      null,
      function(m2) {
        console.info('startMeasure', m2);
        var obj = JSON.parse(m2);
        var status;
        switch(obj.msg) {
          case 'strip in':
            status = 'strip';
            break;
          case 'get blood':
            status = 'sample';
            break;
          case 'value':
            status = 'result';
            self.setState({ result: obj})

            if (_.isFunction(self.props.finishCallback)) {
              // console.log("finishCallback: ", obj)
              var dataToDB = _.omit(obj, 'msg');
              dataToDB.MDate = new Date;
              dataToDB.name = self.state.deviceList[address].name;
              dataToDB.connectionId = Meteor.connection._lastSessionId
              if (Meteor.user()) dataToDB.userId = Meteor.user()._id;

              self.props.finishCallback(dataToDB);
            }
            break;
          case 'error':
            status = 'error';
            self.setState({ result: obj})
            if(obj.errorID === 3) alert('used strip. please start over.')
            else if(obj.errorID === 9) alert('strip removed. please start over.')
            else alert('unknown error: ' + obj)

          default:
            status = 'unknown status - ' + status
            console.warn(status);
        }
        if(_.contains(self.stages, status)) self.updateDeviceStatus(address, status);

      }
    )
  }
};

IH.RC.BG5 = React.createClass({
  // stages: ['connect', 'strip', 'sample', 'result','connect'],
  // stages saved in: this.state.deviceList[address].status
  // pluginOutput: '',
  // deviceList: {},
  // deviceSelected: null,
  // result: null
  mixins: [IH.RC.BG5Mixin],
  render() {
    let self = this;
    if(typeof(window[pluginLabel]) === 'undefined') {
      console.log('render1');
      return <div className="center"><h2>Loading plugin...</h2></div>
    } else if (self.state.result) {
      console.log('render2');
      // self.startMeasure(self.state.deviceSelected);
      return <IH.RC.BGResult BG={this.state.result} onClick={function() {
                // self.updateDeviceStatus(self.state.deviceSelected, 'connect');
                self.setState({result: null});
                }
              }/>
    } else {
      console.log('render3');

      // <RC.Animate transitionName="slide-up" transitionAppear={true} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
      // </RC.Animate>
      // && self.isConnected(self.state.deviceSelected)
      return <RC.List>
        <RC.Div theme="padding" style={{paddingBottom: '0px'}}>
           <div style={{fontSize: '11px', color: '#999', fontWeight: '700' }}><span style={{color: '#0082ec'}}>Device selected</span></div>
           <div style={{padding: '8px 0'}}>
             {
                (_.some(self.state.deviceList, function(obj, address) { return self.isConnected(address) }))
                  ? ( (self.state.deviceSelected )
                      ? self.state.deviceSelected
                      : <span style={{color: '#0082ec'}}>select a device</span>
                    )
                  : <span style={{color: '#0082ec'}}>connect a device</span>
             }
           </div>
        </RC.Div>
          {
            (self.state.deviceSelected )
            ? self.renderSteps()
            : self.renderSearch()
          }
      </RC.List>
    }
  },
  renderSteps() {
    let deviceObj = this.state.deviceList[this.state.deviceSelected];
    let nextStage = this.stages[this.stages.indexOf(deviceObj.status)+1];
    console.log('renderSteps', deviceObj)
    return <IH.RC.BG5Steps setShowHelp={self.setShowHelp} stage={nextStage} />
  },

  renderSearch() {
    var self = this;
    let jsonStyle = {wordWrap: "break-word"}

    let plugin = window[pluginLabel];
    // console.log('plugin', plugin);

    let deviceCommands = h.getPluginCommands(plugin);

    let statusUpdatesCB = function(commandName, m) {
      self.setState(function(ps, cp) {
        return {
          pluginOutput: m + "\r\n" + ps.pluginOutput
        }
      })
    };
    let itemProps = function(address) {
      let item = {
        active: {
          uiColor: 'brand3',
          uiClass: "check-circle-o",
          onClick: self.connectDevice.bind(null, address)
        },
        inactive: {
          uiColor: null,
          uiClass: "circle-o",
          onClick: alert.bind(null, "this device doesn't seem to be connected")
        }
      }
      return self.isConnected(address) ? item.active : item.inactive
      // && self.isConnected(self.state.deviceSelected)
    }
    return _.map(self.state.deviceList, function(obj, address) {
      return <RC.Item key={address} theme='icons' {... itemProps(address) }>
        { obj.name }
        -
        { address }
      </RC.Item>
    })
  }
})

IH.RC.BG5Steps = React.createClass({
  propTypes: {
    stage: React.PropTypes.string.isRequired // === BgManagerCordova
  },
  stages: ['connect', 'strip', 'sample', 'result'],
  styles: {
    deviceHelp: {
      common: {
        textAlign: 'center',
        'fontSize': '1.5em',
        'color': 'rgba(0, 0, 0, 0.55)',
        // 'height': '70%',
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
    if (_.indexOf(this.stages, this.props.stage) > _.indexOf(this.stages, prevProps.stage)) {
      h.playAudio('click.mp3');
    } else {
      h.playAudio('alert-01.wav');
    }
  },
  render: function() {
    var self = this;
    var assetPath = function(f) { return '/packages/ihealth_bg5/assets/' + f;}
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
        message: <span onClick={this.close}>Analyzing blood sample...</span>,
        indicators: _.map([indicator.connect.done, indicator.strip.done, indicator.sample.on], assetPath)
      }
    }
    console.log('stage', self.props.stage)
    if(_.contains(this.stages, self.props.stage)) {
      return <div style={h.ifMobile(this.styles.deviceHelp) }>
        <IH.RC.StatusMenu
          onClick={
            function(i) { alert('complete previous steps first'); }
          }
          indicators={stages[self.props.stage].indicators}/>
        <div style={this.styles.mid}>
          <IH.RC.HelpPaneOutline kind='warning' instruction={stages[self.props.stage]} />
        </div>
        <IH.RC.QRControl src={stages[this.props.stage].scanqr} />
      </div>
    } else {
      return <h2> no instructions for stage {self.props.stage} </h2>
    }
  }
});

h.getPluginCommands = function(pluginObj) {
  let getFunctions = function(objectName) { return Object.getOwnPropertyNames(objectName).filter(function (p) {
    return typeof objectName[p] === 'function';
  })};

  let deviceCommands1 = getFunctions(pluginObj);
  if (!_.isEmpty(deviceCommands1)) {
    deviceCommands = deviceCommands1 ;
  } else {
    deviceCommands = getFunctions(pluginObj.__proto__ || {});
  }
  // console.log('deviceCommands', deviceCommands);
  return deviceCommands;
}

IH.RC.BGResult = React.createClass({
  render: function() {
    var deviceType = Meteor.Device.isPhone() ? " phone" : " tablet";
    return <div className={"abs-full bg-white scroll on-top-higher"+deviceType}  id="measuring-bp">
      <span className="on-top x black disable-swipe" onClick={this.props.onClick} />
      <IH.RC.BGResultDisplay BG={this.props.BG}/>
    </div>
  }
});

IH.RC.BGResultDisplay = React.createClass({
  propTypes: {
    BG: React.PropTypes.object.isRequired
  },
  render: function() {
    let style = {
      circleInner: {
        borderRadius: '50%',
        color: '#58DAAA',
        border: '1em solid #50C79A',
        width: '40vw',
        height: '40vw',
        margin: '2em auto',
        // display: 'flex',  // not working iPhone 4
        // alignItems: 'center',
        // justifyContent: 'center',
      }
      // circleOuter: {borderRadius: '50%',
      // 	 color: '#58DAAA',
      // 	 border: '0.2em double #AAAAAA',
      // 	 width: '30vw',
      // 	 height: '30vw',
      // 	 margin: '0 auto',
      // 	 display: 'flex',
      // 	 alignItems: 'center',
      // 	 justifyContent: 'center'
      // }
    }
    return <div className="line-average">
      <div style={style.circleInner}>
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: '2em', marginTop: '0.4em', marginBottom: '-0.25em', marginRight: '0.1em'}}>{Math.round(this.props.BG.value)}</div>
          <small style={{fontSize: '1.5em', color: '#AAAAAA'}}>mg/dL</small>
        </div>
      </div>
      <div style={{fontSize: '1em', color: '#AAAAAA', padding: '1em'}} uiClass='hand-rock-o'>
        {moment(this.props.BG.date).format("MMM Do YYYY - h:mm a")}
      </div>
    </div>
  }
});
