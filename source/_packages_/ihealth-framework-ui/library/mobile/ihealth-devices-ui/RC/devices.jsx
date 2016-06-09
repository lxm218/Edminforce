
DeviceRC.Prepare = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState: function() {
    return {
      showHelp: false
    };
  },
  getMeteorData: function() {
    return {
      deviceJson: Session.get(this.props.deviceName),
      devices: Session.get("devices") || {}
    };
  },

  render: function() {
    var DeviceMeasure, cRadius, device, deviceClasses, deviceInfo, deviceName, deviceStatus, headerSpace, isCancelled, isHidden, self, _ref;
    self = this;
    device = this.props.device;
    deviceName = this.props.deviceName;
    isHidden = !_.isObject(this.data.deviceJson);
    isCancelled = _.isObject(this.data.deviceJson) && this.data.deviceJson.isCancelled;
    headerSpace = (_.isUndefined(this.props.addHeaderSpace) || this.props.addHeaderSpace) && (isHidden || isCancelled) ? ' nav-margin' : '';
    deviceInfo = this.data.devices[deviceName] || "";
    deviceStatus = (_.isString(deviceInfo) ? deviceInfo : "ready");
    cRadius = (Meteor.Device.isPhone() ? 80 : 120);
    return <div className={"absFull background device-back overflow "+deviceName+headerSpace}>
      { isCancelled || isHidden ? null :
          this.props.children
      }
      <div className="center line-average unselect">
          <div className="device-search-bar">
            { deviceStatus === "searching" ? <div className="dsb-loading"/> : null }
          </div>

          <RC.Animate transitionName="zoom" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
            { this.state.showHelp ? <DeviceRC.BP5Instructions setShowHelp={self.setShowHelp} /> : null }
          </RC.Animate>

          <BlurryBackground deviceStatus={deviceStatus} />

          <CenterMessage deviceStatus={deviceStatus} setShowHelp={this.setShowHelp} />

          <RoundControl deviceStatus={deviceStatus} device={device} finishCallback={this.props.finishCallback} holdToConnect={this.props.holdToConnect} buttonHeld={this.props.buttonHeld} />

          <BatteryDisplay deviceInfo={deviceInfo} />

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
    Session.set(this.props.deviceName, null);
    if (this.props.device.hasStarted) {
      this.props.device.stop();
    }
    devices = Session.get("devices");
    if (_.isObject(devices) && devices[this.props.deviceName] === "searching") {
      devices[this.props.deviceName] = null;
      Session.set("devices", devices);
    }
  }
});

DeviceRC.RoundControl = React.createClass({
  getInitialState: function() {
    return {
      buttonHeld: false,
      help: false
    };
  },
  render: function() {
    var self = this;
    var handler = function () {
      switch (self.props.deviceStatus) {
        case "searching":
          self.props.device.disconnect();
          break;
        case "connected":
          break;
        case "ready":
          self.props.device.start(self.props.finishCallback);
          break;
        default:
          self.props.holdToConnect ? null : self.props.device.connect();
      }
    }
    return <svg
      className={"round device-control"+( this.props.buttonHeld ? " active" : "")}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handler}
      onTouchStart={self.touchStart}
      onTouchEnd={self.touchEnd} />
  },
  touchStart: function() {
    var device;
    this.setState({
      buttonHeld: true
    });
    device = this.props.device;
    if (this.props.holdToConnect && !(device.macId != null) && !(device.name != null) && !device.isConnecting) {
      device.connect();
    }
  },
  touchEnd: function() {
    this.setState({
      buttonHeld: false
    });
    if (this.props.holdToConnect && this.props.device.isConnecting) {
      this.props.device.stopConnecting();
    }
  }
});

DeviceRC.CenterMessage = Radium(React.createClass({
  styles: {
    helpButton: {
      background: 'rgba(0,0,0,.2)',
      display: 'block',
      margin: '5px auto',
      width: '70px',
      height: '70px',
      padding: '23px 0 0',
      borderRadius: '50%'
    }
  },
  getInitialState: function() {
    return {
      showHelpButton: false
    };
  },
  showHelpTrue: function() {
    this.props.setShowHelp(true);
  },
  render: function() {
    switch (this.props.deviceStatus) {
      case "searching":
        var showHelpButton = true;
        var title = this.props.searchTitle ? this.props.searchTitle : "Searching";
        var desc = this.props.searchMsg
          ? <p>{this.props.searchMsg}</p>
          : <p>You must pair your device from your<br />settings before you can connect.</p>
        break;
      case "connected":
        var title = this.props.connectedTitle ? this.props.connectedTitle : "Connected";
        var desc = this.props.connectedMsg
          ? <p>{this.props.connectedMsg}</p>
          : <p>You are now connected with your device.</p>
        break;
      case "ready":
        var showHelpButton = true;
        var title = this.props.readyTitle ? this.props.readyTitle : "Device is Ready";
        var desc = this.props.readyMsg
          ? <p>{this.props.readyMsg}</p>
          : <p>Click the circle to start measuring.</p>
        break;
      default:
        var showHelpButton = true;
        var title = this.props.defaultTitle ? this.props.defaultTitle : "Touch to Connect";
        var desc = this.props.defaultMsg
          ? <p>{this.props.defaultMsg}</p>
          : <p>Click the circle to connect your device.</p>
    }
    return <div className="device-text">
      <h3 className="title">{title}</h3>
      {desc}
      {showHelpButton ? <span style={this.styles.helpButton} onClick={this.showHelpTrue}>Help</span> : null}
    </div>
  }
}));

// className="devices-device-help center round sub"
DeviceRC.BatteryDisplay = React.createClass({
  render: function() {
    var faBatteryLevel = Math.round(this.props.deviceInfo.battery / 100 * 4);
    return <figure className="device-plate">
      { this.props.deviceInfo.battery
          ? <div className="battery">
              <p>
              {this.props.deviceInfo.battery}% <span className={"fa fa-battery-"+faBatteryLevel }/>
              </p>
            </div>
          : null
      }
    </figure>
  }
});

DeviceRC.BlurryBackground = React.createClass({
  render: function() {
    var notblurBack = this.props.deviceStatus === "connected" || this.props.deviceStatus === "ready";
    return <div className={"absFull device-back-blur background transition-slower" + (notblurBack ? " invis" : "")} />

  }
});

DeviceRC.NotFound = React.createClass({
  render: function() {
    return <div/>
  }
});
