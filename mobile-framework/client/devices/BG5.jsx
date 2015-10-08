
var debugLevel = 2
var debugL = _.partial(DevTools.consoleWithLevels, debugLevel);

App.BG5 = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      BG: Session.get("BG") || {},
      devices: Session.get("devices") || {},
      isPluginLoaded: Session.get('isPluginLoaded'),
      deviceCommands: Session.get('deviceCommands') || []
    }
  },
  componentWillMount() {

    if(typeof(iHealth) === 'undefined') iHealth = {}
    if(typeof(iHealth.BG5)==='undefined') {
      iHealth.BG5 = new iHealthBG5()
    }

    var deviceCommands = [];
    var delayedAdd = function(arr, functionName) {
      var n = arr.length;
      var times = []
      var totalTime = 2500;
      var eachTime = totalTime/n;
      // for(i=0;i++; i<n) {
      //   times.push(i*eachTime);
      //   console.log('delayedAdd times', times)
      // }
      arr.forEach(function(v, k) { Meteor.setTimeout(function() { functionName(v); }, k * eachTime) });
    };

    Session.set('deviceCommands', deviceCommands);

    var getPluginCommands = function(pluginObj) {
      var getFunctions = function(objectName) { return Object.getOwnPropertyNames(objectName).filter(function (p) {
        return typeof objectName[p] === 'function';
      })};
      var deviceCommands1 = getFunctions(pluginObj);
      var deviceCommands2 = getFunctions(pluginObj.__proto__ || {});
      deviceCommands = deviceCommands1.concat(deviceCommands2);
      delayedAdd(deviceCommands, function(v) {
        debugL(4)('delayedAdd', v);
        var curr = Session.get('deviceCommands');
        if (typeof(curr.push)==='function') {
          curr.push(v)
          Session.set('deviceCommands', curr);
        };
      });
      console.log('deviceCommands', deviceCommands);
    }
    if (!Meteor.isCordova) {
      BgManagerCordova = DevicesStub.BG5;
      getPluginCommands(iHealth.BG5);
      Session.set('isPluginLoaded', true);
    } else {
      if (!(typeof(BgManagerCordova) === "undefined")) {
        getPluginCommands(iHealth.BG5);
        Session.set('isPluginLoaded', true);
      } else {
        var timerCheckPlugin = Meteor.setInterval(function(){
          if (!(typeof(BgManagerCordova) === "undefined")) {
            Meteor.clearInterval(timerCheckPlugin)
            console.log('stop timerCheckPlugin')
            getPluginCommands(iHealth.BG5);
            Session.set('isPluginLoaded', true);
          }}, 200)
      };
    };
  },
  componentWillUnmount() {
    delete Session.keys["BG"]
    // var devices = Session.get("devices") || {}
    // devices.BG = null
    // Session.set("devices", devices)
  },
  renderLoading() {
    return <div className="center"><h2>Loading plugin...</h2></div>
  },
  render() {
    return <div>
        {
          this.data.isPluginLoaded
          ? this.renderControls()
          : this.renderLoading()
        }
    </div>
  },
  commandItem(commandName, n) {
    item = {};
    item.theme = "icons";

    let deviceName = "BG"
    let device = this.data.devices[deviceName] || ""
    let deviceState = _.isString(device) ? device : "ready"
    if (deviceState === "connected" || deviceState === "ready" || commandName === "connect") {
      item.uiClass = "check-circle-o";
      item.onClick = function() { iHealth.BG5[commandName]() };
      item.uiColor = 'brand3';
    } else {
      item.uiClass = "circle-o";
      item.onClick = function() { alert(deviceName + ' not connected. Pair the device and press connect.')};
    }

    return <RC.Item {... item } key={n}>
      { commandName }
    </RC.Item>
  },
  renderControls() {
    var self = this;
    let jsonStyle = {wordWrap: "break-word"}
    return <RC.List>
      <RC.Animate transitionName="slide-up" transitionAppear={true}>
      <RC.Item theme="divider" key='20'>BG5 Cordova Plugin</RC.Item>
      <RC.Item theme="text-wrap" key='21'>
        <p>Commands available on BG5 plugin.</p>
      </RC.Item>
      <RC.Item theme="divider" key='22'>Plugin Output</RC.Item>
      <RC.Item theme="text-wrap" key='23'>
        <p className="bigger-medium"><strong>Session.get("Devices")</strong> Raw JSON</p>
        <p className="tiny" style={jsonStyle}>{JSON.stringify(this.data.devices)}</p>
      </RC.Item>
      <RC.Item theme="text-wrap" key='24'>
        <p className="bigger-medium"><strong>Session.get("BG")</strong> Raw JSON</p>
        <p className="tiny" style={jsonStyle}>{JSON.stringify(this.data.BG)}</p>
      </RC.Item>
      {this.data.deviceCommands.map(function(commandName){
        return self.commandItem(commandName);
      })}
      </RC.Animate>
    </RC.List>
  }
});


App.Animate = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      msgs: Session.get("msgs") || []
    }
  },
  renderMsg(){
    return <div>

      <RC.Animate transitionName="scale">
        <h2>scale</h2>
        {
        this.data.msgs.map( function(m,n){
          return <h1>{m}</h1>
        })
        }
      </RC.Animate>
      <RC.Animate transitionName="pop">
        <h2>pop</h2>
        {
        this.data.msgs.map( function(m,n){
          return <h1>{m}</h1>
        })
        }
      </RC.Animate>
      <RC.Animate transitionName="corner">
        <h2>corner</h2>
        {
        this.data.msgs.map( function(m,n){
          return <h1>{m}</h1>
        })
        }
      </RC.Animate>
      <RC.Animate transitionName="slide-up">
        <h2>slide-up</h2>
        {
        this.data.msgs.map( function(m,n){
          return <h1>{m}</h1>
        })
        }
      </RC.Animate>
    </div>
  },
  render(){
    return <RC.Form>
      {this.renderMsg()}
    </RC.Form>
  }
});
