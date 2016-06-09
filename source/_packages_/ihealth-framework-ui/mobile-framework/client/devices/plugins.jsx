
var debugLevel = 4
var debugL = _.partial(DevTools.consoleWithLevels, debugLevel);

let pluginNames = ["AmManagerCordova","BgManagerCordova","BpManagerCordova","HsManagerCordova"];

let pluginArgs = {
  BgManagerCordova: {
    setUnit: [1],
    startMeasure: [Session.get('mac')],
    connectDevice: [Session.get('mac')],
    setBottleMessage: ["024c565f4c5614322d1200a02f3485b6f314378bacd619011f72003608a9", 25, "2015-09-03 00:00:00"],
    setBottleId: [123456]
  },
  BpManagerCordova: {},
  HsManagerCordova: {},
  AmManagerCordova: {}
};

App.Plugins = React.createClass({
  getInitialState() {
    return {
      pluginOutput: '',
      pluginsDefined: [],
      pluginLabel: 'nopluginsloaded',
      deviceList: [],
      deviceSelected: null
    }
  },
  // hack to make RC.Select onChange work when options change
  componentWillUpdate(nextProps, nextState) {
    if(!_.isEmpty(nextState.deviceList)) {
      if ((this.state.deviceSelected === null) || (_.pluck(nextState.deviceList, 'address').indexOf(this.state.deviceSelected) < 0)) {
        this.setState({
          deviceSelected: nextState.deviceList[0].address
        });
      }
    }
  },
  componentWillMount() {
    let self = this;
    if (!Meteor.isCordova && (typeof(BgManagerCordova) === 'undefined')) {
      console.warn('BgManagerCordova not found. Using stub.')
      BgManagerCordova = DevicesStub.BG5;
    }
    if (!Meteor.isCordova && (typeof(AmManagerCordova) === 'undefined')) {
      console.warn('AmManagerCordova not found. Using stub.')
      AmManagerCordova = DevicesStub.AM3S;
    }
    let pluginsDefined = _.filter(pluginNames, function(p) { return !_.isUndefined(window[p])});
    if (_.isEmpty(pluginsDefined)) { console.error('no plugins loaded')} else {
      this.setState({
        pluginsDefined: pluginsDefined,
        pluginLabel: pluginsDefined[0]
      })
    };
  },
  discoveryCB(m) {
    let self = this
    // console.info(commandName + ' semicustom success: ' + m);
    // statusUpdatesCB(commandName + ' semicustom success: ' + m);
    var obj = JSON.parse(m);
    if (obj.msg == "discovery doing"){
      self.setState(function(ps, cp) {
        var deviceExists = _.indexOf(_.pluck(ps.deviceList, 'address'), obj.address);
        // console.log('deviceExists',deviceExists)
        if (deviceExists < 0) { return { deviceList: ps.deviceList.concat(obj) }}
      });
    }
  },
  render() {
    return <div>
        {
          !_.isEmpty(this.state.pluginsDefined)
          ? this.renderControls()
          : <div className="center"><h2>Loading plugin...</h2></div>
        }
    </div>
  },
  renderControls() {
    var self = this;
    let jsonStyle = {wordWrap: "break-word"}

    let plugin = window[this.state.pluginLabel];
    // console.log('plugin', plugin);

    let deviceCommands = DeviceRC.getPluginCommands(plugin);

    let statusUpdatesCB = function(commandName, m) {
      self.setState(function(ps, cp) {
        return {
          pluginOutput: m + "\r\n" + ps.pluginOutput
        }
      })
    }

    let itemProps = function(commandName) {
      let isActive = self.state.deviceSelected !== null || commandName.match("Discovery");
      let item = {
        active: {
          uiColor: 'brand3',
          uiClass: "check-circle-o",
          onClick: function() {
            debugL(4)(commandName + ' clicked');
            DeviceRC.pluginCall(
              self.state.deviceSelected,
              self.state.pluginLabel,
              commandName,
              pluginArgs[self.state.pluginLabel][commandName],
              (commandName ==='startDiscovery') ? self.discoveryCB : null,
              statusUpdatesCB.bind(null, commandName)
            )
          }
        },
        inactive: {
          uiClass: "circle-o",
          onClick: function() { alert('Device not connected. Pair the device and press connect.')}
        }
      }
      return isActive ? item.active : item.inactive
    }

    return <RC.List>
      <RC.Tabs theme="slider" bgColor="brand1" cursorColor="white" initialTab={this.state.pluginsDefined.indexOf(this.state.pluginLabel)}>
        { this.state.pluginsDefined.map(function(pluginName) {
          let iconMap = {
            BgManagerCordova: "hand-rock-o",
            BpManagerCordova: "hand-paper-o",
            HsManagerCordova: "hand-scissors-o"
          }
          let iconClass = iconMap[pluginName];
          return <RC.URL uiClass={iconClass} key={pluginName} onClick={function(){ self.setState({ pluginLabel: pluginName }); }} >{pluginName}</RC.URL>
        })}
      </RC.Tabs>
      <RC.Div theme="padding">
        { _.isEmpty(this.state.deviceList)
          ? <div className='center'><h3>Start discovery first</h3></div>
          : <RC.Select
              label="Devices"
              theme="stacked-label"
              options={_.pluck(this.state.deviceList,'address')}
              value={ this.state.deviceSelected }
              onChange={ function(e) { self.setState({ deviceSelected: e.target.value }); }}
            />
        }
      </RC.Div>
      <RC.Div theme="padding">
        <RC.Textarea rows='20' theme="stacked-label" name="PluginOutput" label="Plugin Output" readOnly>
          {self.state.pluginOutput}
        </RC.Textarea>
      </RC.Div>
      <AnimateCascade animationDuration={3000} >
        {deviceCommands.map(function(commandName, i){
          return <RC.ItemIcons key={self.state.pluginLabel+i} {... itemProps(commandName) }>
            { commandName }
          </RC.ItemIcons>
        })}
      </AnimateCascade>
    </RC.List>
  }
});
