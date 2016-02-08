
if (Meteor.isClient) {

  let sampleBP = {
    MDate: new Date(),
    highpressure: 120,
    lowpressure: 80,
    heartrate: 60
  }

  let sampleBG = {
    MDate: new Date(),
    value: 122
  }

  TestsRoute = DefaultRoutes.group({
    prefix: "/tests",
    name: "Component Tests"
  })
  WelcomeComponent = React.createClass({
    render() {
      return <div>
        <h1>Hello, {this.props.name}</h1>
      </div>
    }
  });

  GreyBackground = React.createClass({
    propTypes: {
      content: React.PropTypes.object
    },
    render() {
      return <ColorBackground color='grey'{ ... this.props}/>
    }
  });

  ColorBackground = React.createClass({
    propTypes: {
      content: React.PropTypes.object,
      color: React.PropTypes.string
    },
    render() {
      let style = {position: 'absolute', width:'100%', height: '100%', background: this.props.color}
      return <div style={style}>
        <small>{this.props.color} Background</small>
        <br />
        {this.props.content}
      </div>
    }
  });

  /*
   * Tests Route Group
   */
  TestsRoute.route('/hello', {
    name: "Hello simple",
    action: function(p) { ReactLayout.render(GreyBackground, {
      content: <WelcomeComponent name={"Arunoda"} />
    })}
  })

  TestsRoute.route('/grey', {
    name: "Grey Background",
    action: function(p) { ReactLayout.render(GreyBackground, {name: "Arunoda"}) }
  })

  TestsRoute.route('/BPResultPure', {
    name: "BPResultPure",
    action: function(p) { ReactLayout.render(GreyBackground, {
      content: <IH.RC.BPResultPure bp={sampleBP} />
    })}
  })

  TestsRoute.route('/BPListItem', {
    name: "BPListItem",
    action: function(p) { ReactLayout.render(GreyBackground, {
      content: <IH.RC.BPListItem bp={sampleBP} n={0} />
    })}
  })

  TestsRoute.route('/BPListPure', {
    name: "BPListPure",
    action: function(p) { ReactLayout.render(GreyBackground, {
      content: <IH.RC.BPListPure measurements={ _.map(IH.RC.SampleBPMeasurements, (m) => DbTools.renameKeys (_.invert(DbTools.keyMap.bp), m)) } detailClickHandler={ function(msg) { console.log(msg)}} />
    })}
  })

  TestsRoute.route('/BPListResult', {
    name: "BPListResult",
    action: function(p) { ReactLayout.render(GreyBackground, {
      content: <IH.RC.BPListResult measurements={ _.map(IH.RC.SampleBPMeasurements, (m) => DbTools.renameKeys (_.invert(DbTools.keyMap.bp), m)) } />
    })}
  })

  TestsRoute.route('/BPGraphPure', {
    name: "BPGraphPure",
    action: function(p) { ReactLayout.render(GreyBackground, {
      content: <IH.RC.BPGraphPure measurements={ _.map(IH.RC.SampleBPMeasurements, (m) => DbTools.renameKeys (_.invert(DbTools.keyMap.bp), m)) } />
    })}
  })
  TestsRoute.route('/BPGraph', {
    name: "BPGraph",
    action: function(p) { ReactLayout.render(GreyBackground, {
      content: <IH.RC.BPGraph userId='yCvpLMADdYEGxRfyt' />
    })}
  })

  TestsRoute.route('/BPList', {
    name: "BPList",
    action: function(p) {
      Meteor.loginWithPassword('patient', 'test')
      ReactLayout.render(GreyBackground, {
      content: <IH.RC.BPList userId='yCvpLMADdYEGxRfyt' />
    })}
  })

  TestsRoute.route('/BPResult', {
    name: "BPResult",
    action: function(p) {
      Meteor.loginWithPassword('patient', 'test')
      // Meteor.subscribe("BPMeasurements");
      ReactLayout.render(GreyBackground, {
        content: <IH.RC.BPResult measureId='yb4vSBXeWA85bN4kR' />
      }
    )}
  })

  TestsRoute.route('/BGResult', {
    name: "BGResult",
    action: function(p) { ReactLayout.render(GreyBackground, {
      content: <DeviceRC.BGResult BG={sampleBG} />
    })}
  })

  TestsRoute.route('/AM3S', {
    name: "AM3S",
    action: function(p) {
      let address = 'testaddress';
      let obj = {
       "msg": "discovery doing",
       "name": "AM3S",
       "status": "connected",
       "IDPS": {
        "HardwareVersion": "1.0.0",
        "msg": "IDPS",
        address,
        "FirmwareVersion": "1.0.1"
       },
       "Picture": 1,
       "RealTimeMessage": {
        "Step": 0,
        "Calories": 0
       },
       "Battery": 20,
       "Clocktotal": 0,
       "SleepMessage": [],
       "UserMessage": {
        "TotalStep2": 34835,
        "Step": 50,
        "TotalStep3": 50185,
        "Gender": 1,
        "Weight": 20608,
        "Unit": 1,
        "TotalStep1": 4135,
        "Height": 175,
        "Age": 20
       },
       "Remind": [
        {
         "Switch": false,
         "Time": "00:00"
        }
       ],
       "UserId": 0
      }
      let updateDeviceDetails = (address, details) => {
        console.log(address + ' details updated: ' + JSON.stringify(details));
      }
      let pluginLabel = 'AmManagerCordova';
      if (!Meteor.isCordova && _.isUndefined(window[pluginLabel])) {
        console.warn(pluginLabel + ' not found. Using stub.')
        window.AmManagerCordova = DevicesStub.AM3S;
      };
      ReactLayout.render(ColorBackground, {
      color: 'black',
      content: <IH.RC.AM3S address={obj.address} obj={obj} updateDevice={updateDeviceDetails.bind(null, address)}/>
    })}
  })

  TestsRoute.route('/AM3SDevices', {
    name: "AM3S",
    action: function(p) {
      let address = 'testaddress';
      let obj = {
       address,
       "name" : "AM3S",
       'status': 'connected'
      }

      let updateDeviceDetails = (address, details) => {
        console.log(address + ' details updated: ' + JSON.stringify(details));
      }
      let pluginLabel = 'AmManagerCordova';
      if (!Meteor.isCordova && _.isUndefined(window[pluginLabel])) {
        console.warn(pluginLabel + ' not found. Using stub.')
        window.AmManagerCordova = DevicesStub.AM3S;
      };
      ReactLayout.render(GreyBackground, {
      content: <IH.RC.Devices address={obj.address} obj={obj} pluginLabel={pluginLabel} />
    })}
  })
}
