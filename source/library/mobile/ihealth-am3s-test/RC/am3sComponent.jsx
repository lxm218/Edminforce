
var debugLevel = 2
var debugL = _.partial(DevTools.consoleWithLevels, debugLevel);

let tryParse = (m) => {
  try {
    return JSON.parse(m);
  } catch(err) {
    console.log('error parsing ' + m + ': ' + err);
  }
}
let isConnected = (device) => {
  return (!_.isUndefined(device.status) && device.status !== 'disconnected')
}

let fsmLogging = (fsmName, event, from, to) => {
  let eventColor = 'color: blue; background-color: rgba(128,0,255,0.3);';
  let stateColor = 'color: green; background-color: rgba(255,255,0,0.3);';
  console.info('%cfsm ' + fsmName + ' event: ' + event, eventColor );
  console.info('%cfsm ' + fsmName + ' state: ' + to, stateColor );
};

DeviceRC.DevicesMixin = {
  getInitialState() {
    return {
      state: null,
      pluginOutput: '',
      deviceList: {},
      deviceSelected: null,
      result: null
    }
  },
  updateDeviceDetails(address, details) {
    // console.info('updating ' + address + ' details to ' + JSON.stringify(details));
    let self = this
    self.setState(function(ps, cp) {
      let deviceList2 = _.clone(ps.deviceList);
      // , details);
      deviceList2[address] = _.extend({}, deviceList2[address] || {}, details);
      let newps = { deviceList: deviceList2 }
      return newps;
    })
  },
  plugin(pluginCommand, address, callback) {
    let self = this;
    IH.RC.pluginCall(
      address,
      self.props.pluginLabel,
      pluginCommand,
      null,
      callback
    )
  },
  componentDidMount() { this.fsm.gosearching_devices() },
  componentWillMount() {
    let self = this;
    if (!Meteor.isCordova && _.isUndefined(window[self.props.pluginLabel])) {
      console.warn(self.props.pluginLabel + ' not found. Using stub.')
      window.AmManagerCordova = DevicesStub.AM3S;
    };

    let pluginHandlers = {
      handleDiscovery: (m) => {
        let obj = tryParse(m);
        if (obj.msg === "discovery doing" && obj.name.substring(0,2) === 'AM') {

          // if connect required
          // self.plugin('connectDevice', obj.address, pluginHandlers.handleConnect );
          // else
          // pluginHandlers.handleConnect(m);

          self.setState(function(ps, cp) {
            let obj2 = _.extend({}, _.omit(obj, 'address'), {status: 'discovered'});
            let deviceList2 = _.clone(ps.deviceList);
            deviceList2[obj.address] = obj2;
            return { deviceList: deviceList2 }
          });

          self.checkConnectedList();
        }
      }
    };

    self.fsm = StateMachine.create({
      initial: 'uninitialized',
      events: [
        { name: 'gosearching_devices',  from: ['uninitialized','check_bluetooth','device_disconnected'], to: 'searching_devices' },
        { name: 'gocheck_bluetooth',  from: 'searching_devices',  to: 'check_bluetooth' },
        { name: 'gocheck_amdevice',  from: ['searching_devices', 'yes_devices'],  to: 'check_amdevice' },
        { name: 'goyes_devices',  from: ['searching_devices', 'check_bluetooth', 'check_amdevice', 'yes_devices'],  to: 'yes_devices' },
        { name: 'goyes_devices_am',  from: ['searching_devices', 'check_bluetooth', 'check_amdevice', 'yes_devices', 'yes_devices_am'],  to: 'yes_devices_am' },
      ],
      callbacks: {
        onenterstate: (event, from, to) => {
          fsmLogging('devices', event, from, to);
          self.setState({ state: to });
        },
        onentersearching_devices: (event, from, to) => {
          let self = this;
          if (from === 'uninitialized') {
            self.plugin('startDiscovery', '', pluginHandlers.handleDiscovery);
          };
          Meteor.setTimeout(()=> {
            if(_.size(self.state.deviceList) === 0) {
              self.fsm.gocheck_bluetooth();
            }
          }, 10000);
        },
        oncheck_bluetooth: () => console.warn('are you sure your bluetooth is on?'),
        onalldevices_disconnected: () => {
          console.warn('all your device have been disconnected');
          Meteor.setTimeout(()=>{self.fsm.gosearching_devices()}, 10000);
        },
        // ongodevices_listed: () => self.startDiscovery(),
        not_connected: () => console.log('not_connected')
      }
    });
  },
  checkConnectedList() {
    let self = this;
    // console.log('checkConnectedList ' + JSON.stringify(self.state.deviceList));
    let connectedList = _.filter(self.state.deviceList, (device) => { return device.status !== 'disconnected' });
    let am3sList = _.filter(connectedList, (device) => { return device.name === 'AM3S' && device.status !== 'disconnected' });
    if (am3sList.length > 0) {
      self.fsm.goyes_devices_am();
    } else if (am3sList.length > 0) {
      console.warn('check your AM device is not in sleep mode');
      self.fsm.goyes_devices();
    } else if(connectedList.length > 0) {
      console.warn('check your phone bluetooth is on');
      self.fsm.gocheck_bluetooth();
    }
  },

};

IH.RC.Devices = React.createClass({
  propTypes: {
    pluginLabel: React.PropTypes.string.isRequired // === BgManagerCordova
  },
  mixins: [DeviceRC.DevicesMixin],
  render() {
    let self = this;
    if(typeof(window[self.props.pluginLabel]) === 'undefined') {
      console.log('render1');
      return <div className="center"><h2>Loading plugin...</h2></div>
    } else {
      return <RC.List style={{backgroundColor: 'black'}}>
        <div style={{display: 'flex', flexWrap: 'wrap', margin: '3%', backgroundColor: 'black'}}>
          { _.map(self.state.deviceList,
            (obj, address) => {
              // console.log('AM3S update: ' + JSON.stringify(obj, null, ' ') )
              return <IH.RC.AM3S key={address} theme='icons' obj={obj} address={address} updateDevice={self.updateDeviceDetails.bind(null, address)} />
            }
          )}
        </div>
      </RC.List>
    }
  }
})

DeviceRC.AM3SMixin = {
  // stages: ['connect', 'strip', 'sample', 'result','connect'],
  getInitialState() {
    return {
      state: null,
      pluginOutput: '',
      // deviceSelected: null,
      result: null
    }
  },
  pluginLabel: 'AmManagerCordova',
  plugin(pluginCommand, address, args) {
    console.log('plugin call ' + pluginCommand);
    let self = this;
    return new Promise((resolve, reject) => {
      IH.RC.pluginCall(
        address,
        self.pluginLabel,
        pluginCommand,
        args,
        (m) => resolve(m)
      )
    });
  },
  togglePicture() {
    let self = this;
    let newValue = self.props.Picture ^ 1;
    self.props.updateDevice({Picture: newValue})
    // wait till plugin more stable
    // self.plugin('setPicture', self.props.address, newValue)
    //   .then(JSON.parse)
    //   .catch((err) => console.warn('setPicture: not a valid JSON'))
    //   .then((obj) => { if (true) {
    //     console.log('setPicture', obj)
    //     // self.props.updateDevice({ status: 'disconnected'})
    //     // self.fsm.godevice_disconnected();
    //     // DeviceRC.playAudio('alert-01.wav')
    //   }})
  },
  connectDevice() {
    let self = this;

    self.plugin('connectDevice', self.props.address)
      .then(JSON.parse)
      .catch((err) => console.warn('connectDevice: not a valid JSON' + err))
      .then((obj) => {
        console.info('connect call' + JSON.stringify(obj) );
        self.props.updateDevice({ status: 'connected'});
        DeviceRC.playAudio('click.mp3');
        self.fsm.godevice_connected();
        console.log('set disconnect CB on ' + obj.address);
        self.plugin('setDisconnectCallback', obj.address)
          .then(JSON.parse)
          .catch((err) => console.warn('setDisconnectCallback: not a valid JSON'))
          .then((obj) => { if (obj.msg === "disconnect") {
            console.log('disconnected', obj, self.state.deviceSelected)
            self.props.updateDevice({ status: 'disconnected'})
            self.fsm.godevice_disconnected();
            DeviceRC.playAudio('alert-01.wav')
          }})
      })
  },
  getDeviceInfo(){
    let self=this;
    let infoMap = {
      'IDPS': 'IDPS',
      'Picture': 'picture',
      // 'HourType': 'getHourType',
      'RealTimeMessage': 'realtime',
      'Battery': 'battery',
      'Clocktotal': 'alarmlock number',
      'SleepMessage': 'sleep',
      'UserMessage': 'user info',
      // 'ActivityMessage': 'activity',
      'Remind': 'remindInfo',
      'UserId': 'user id'
    };

    let keys = Object.keys(infoMap)
    let getInfo = (infoName) => {
      return new Promise((resolve, reject) => {
        console.log('getting info - ' + infoName)
        self.plugin('get'+ infoName, self.props.address)
        .then((x)=>{console.log('got info msg' + x); return x;})
        .then(JSON.parse)
        .catch((err) => console.warn(infoName + ': not a valid JSON' + err))
        .then((obj) => {
          console.log('got info - ' + infoName + JSON.stringify(obj))
          if(obj.msg === infoMap[infoName]) {
            let res;
            if(_.has(obj,'value')) {
              res = obj.value;
            } else {
              res = obj;
            }
            console.log(infoName + ' result: ' + JSON.stringify({ [infoName]: res}));
            self.props.updateDevice({ [infoName]: res});
            resolve(res);
          }
        })
      })
    };

    _.reduce(keys, (chain, key) => chain.then(()=>getInfo(key)), Promise.resolve());
  },
  // componentDidMount() { this.fsm.gostart_connecting() },
  componentWillMount() {
    let self = this;
    self.fsm = StateMachine.create({
      initial: 'start_connecting',
      events: [
        { name: 'gostart_connecting', from: ['devices_listed'], to: 'start_connecting' },
        { name: 'godevice_connected', from: ['start_connecting', 'devices_listed'], to: 'device_connected' },
        { name: 'goinfo_obtained', from: ['device_connected','info_obtained'], to: 'info_obtained' },
        { name: 'godevice_disconnected', from: 'device_connected', to: 'device_disconnected' },
      ],
      callbacks: {
        onenterstate: (event, from, to) => {
          fsmLogging(self.props.address, event, from, to);
          self.setState({ state: to });
        }
        // ongodevices_listed: () => self.startDiscovery(),
      }
    });
  }
};

IH.RC.AM3S = React.createClass({
  // propTypes: {
  //   pluginLabel: React.PropTypes.string.isRequired // === BgManagerCordova
  // },
  mixins: [DeviceRC.AM3SMixin],
  render() {
    var self = this;
    let obj = self.props.obj;
    let address = self.props.address;

    let pluginObj = window[self.pluginLabel];
    let nextStep = () => {
      console.log('nextState', self.state.state)
      switch(self.state.state) {
        case 'start_connecting':
          self.connectDevice();
          break;
        case 'device_connected':
          self.getDeviceInfo();
          break;
        case 'info_obtained':
          self.togglePicture();
          break;
      }
    }
    return <div style={{display: 'flex', flexDirection: 'column', width: '45%', fontFamily: 'Helvetica Neue, sans-serif',  position: 'relative', color: '#40cbd6'}}>

    <div>
      <div style={{display: 'flex'}}>
        <div className="shape" style={{width: '50%'}} onClick={nextStep}>
          <div id="w1_face">
            <AM3S.Picture Picture={obj.Picture} togglePicture={self.togglePicture} />
            <div id="w1_strap_t1"></div>
            <h5 id="disp_steps" style={{textAlign: 'center'}}>{obj.RealTimeMessage ? obj.RealTimeMessage.Step : null}</h5>
            <AM3S.Battery Battery={obj.Battery} />
            <div id="w1_strap_b1"></div>
          </div>
        </div>

        <div>
          {_.map(_.omit(obj, ['msg', 'name', 'status', 'Clocktotal','Picture', 'Battery']), (info, infoName) => {
            if(typeof(AM3S[infoName]) !== 'undefined' ) {
              if(infoName === 'RealTimeMessage') console.log('realtime' + JSON.stringify(info))
              let props = {
                [infoName]: info
              }
              let Component = AM3S[infoName];
              return <div key={infoName}><Component {...props} /></div>
            } else {
              return <div key={infoName}><div>{infoName} - {info}</div> <br/></div>
            }
          })}
        </div>
      </div>
      <div style={{color: '#40cbd6'}}>
        <b>Address:</b>
        <br />
        {address} - {obj.status} - {self.state}
      </div>
    </div>
  </div>
  }
})
AM3S = {};
let packageName = 'ihealth_am3s';
AM3S.Picture = React.createClass({
  propTypes: {
    Picture: React.PropTypes.number
  },
  getDefaultProps: () => {
    Picture: 1
  },
  render() {
    let self = this;
    let style = {
      position: 'absolute',
      height: '65%',
      top: '6%',
      left: '25%',
      zIndex: 4
    };
    return (this.props.Picture === 1)
      ? <img src={'/packages/'+packageName+'/assets/am3s_footsteps_left.png'} style={style} onClick={self.props.togglePicture} />
    : <img src={'/packages/'+packageName+'/assets/am3s_frog_left.png'}  style={style} onClick={self.props.togglePicture} />
  }
});

AM3S.Battery = React.createClass({
  propTypes: {
    Battery: React.PropTypes.object.isRequired
  },
  render() {
    let style = {
      position: 'absolute',
      top: '79%',
      left: '39%',
      zIndex: 4,
      fontSize: '12px'
    };
    let faBatteryLevel = Math.round(this.props.Battery / 100 * 4);
    return <div style={style} >
      <span className={"fa fa-battery-"+faBatteryLevel }/> {this.props.Battery}%
    </div>
  }
});

AM3S.HourType = React.createClass({
  propTypes: {
    HourType: React.PropTypes.number.isRequired
  },
  render() {
    let label;
    switch(this.props.HourType) {
      case 0:
        label = '12 hours';
        break;
      case 1:
        label = '24 hours';
        break;
      case 2:
        label = '12 hours (non-EU)';
        break;
      case 3:
        label = '12 hours (EU)';
        break;
      case 4:
        label = '24 hours (non-EU)';
        break;
      case 5:
        label = '24 hours (EU)';
        break;
    }
    return <div>
      Time Format: { label }
    </div>
  }
});


AM3S.Remind = React.createClass({
  propTypes: {
    Remind: React.PropTypes.array.isRequired
  },
  render() {
    let dummyFormat = 'YYYYMMDD ';
    let dummyDate = moment().format(dummyFormat);
    return <div>
      Alarms:
      {_.map(this.props.Remind, function(alarm) {return <div>{moment(dummyDate + alarm.Time, dummyFormat + 'HH:mm').format('h:mma')} - {alarm.Switch ? 'ON' : 'OFF'}</div>})}
    </div>
  }
});

AM3S.ActivityMessage = React.createClass({
  propTypes: {
    ActivityMessage: React.PropTypes.array.isRequired
  },
  render() {
    return <div>
      Workouts:
      {_.map(this.props.ActivityMessage,
        (workout) =>
        <div>{moment(workout.AMDate, 'YYYY-M-DD H:mm:s').format('MMM D h:mma')}: {workout.AMstepNum} steps / {workout.AMcalorie} cal</div>
      )}
    </div>
  }
});

AM3S.RealTimeMessage = React.createClass({
  propTypes: {
    RealTimeMessage: React.PropTypes.object.isRequired
  },
  render() {
    let rt = this.props.RealTimeMessage
    return <div>
      Realtime: {rt.Step} steps / {rt.Calories} calories
    </div>
  }
});

AM3S.IDPS = React.createClass({
  propTypes: {
    IDPS: React.PropTypes.object.isRequired
  },
  render() {
    let vs = this.props.IDPS
    return <div>
      Hardware: {vs.HardwareVersion}<br/>
      Software: {vs.FirmwareVersion}
    </div>
  }
});

AM3S.SleepMessage = React.createClass({
  propTypes: {
    SleepMessage: React.PropTypes.object.isRequired
  },
  render() {
    let sm = this.props.SleepMessage
    return <div>
      SleepMessage:
      { (sm.length === 0) ? ' no sleep record' : _.map(sm, (sm_single) => <div>{sm_single}</div>)}
    </div>
  }
});


AM3S.UserMessage = React.createClass({
  propTypes: {
    UserMessage : React.PropTypes.object.isRequired
  },
  render() {
    let um = this.props.UserMessage
    return <div>
      User Daily Goal : {um.TotalStep1} steps <br/>
      Gender: {(um.Gender === 1) ? 'male' : 'female'} <br/>
      Weight: {um.Weight} - {um.Unit} units <br/>
      Height: {um.Height} <br/>
      Age: {um.Age} <br/>
    </div>
  }
});
