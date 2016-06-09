"use strict"

let LISTENER

IH.Device.BP5Connect = class extends RC.CSS {
  constructor(p) {
    super(p)
    if (this.props.wasDisconnected) IH.Store.BP.reset()
    this.state = {
      obj: Immutable.Map(
        Object.assign(IH.Store.BP.getState(), {
          discovered: [],
          connectStage: 0,
          isHelp: false
        }
      ))
    }
  }
  // @@
  // @@
  // Prep
  // @@
  // @@
  componentWillMount() {
    super.componentWillMount()
    LISTENER = this._onCall.bind(this)
    IH.Store.BP.addListener("call", LISTENER)
  }
  componentWillUnmount() {
    super.componentWillUnmount()
    IH.Store.BP.removeListener("call", LISTENER)
  }
  _onCall(state) {
    if (this._isMounted)
      this.setStateObj(state)
  }
  // @@
  // @@
  // Private
  // @@
  // @@
  _startDiscovery() {
    const state = this.state.obj
    if (state.get("process")!="startDiscovery" && !state.get("connectStage")) {
      this.setStateObj({discovered: []})

      // Note, when "pushing" into an Array state, do NOT define a variable.
      // It will cause duplicate discovery issues.

      IH.Store.BP.API("startDiscovery", (res) => {
        if (res.address) {
          let discovered = _.filter( state.get("discovered"), (obj) => {
            return obj.address != res.address
          })
          discovered.push({
            name: res.name,
            address: res.address
          })
          if (this._isMounted)
            this.setStateObj({
              discovered: discovered
            })
        }
      })
    }
  }
  _stopDiscovery() {
    IH.Store.BP.API("stopDiscovery")
  }
  _connectDevice(macId) {
    this.setStateObj({ connectStage: 1 })
    Meteor.setTimeout( () => {
      this.setStateObj({ connectStage: 2 })
      IH.Store.BP.dispatch({
        action: "connect",
        macId: macId,
        success: () => {
          console.log("Connect Successful")
        },
        error: () => {
          console.log("error")
          this.setStateObj({
            connectStage: 0
          })
        }
      })
    }, 250)
  }
  _openHelp() {
    this.setStateObj({
      isHelp: true
    })
  }
  _closeHelp() {
    this.setStateObj({
      isHelp: false
    })
  }
  // @@
  // @@
  // Render
  // @@
  // @@
  render() {
    let cssStates
    const state = this.state.obj
    const styles = this.css.get("styles")
    const process = state.get("process")
    const isConnecting = !!process

    // ## Discovery
    const stage2 = {
      isOn: isConnecting && !state.get("connectStage"),
      isNext: state.get("connectStage"),
      process: process,
      startFunc: this._startDiscovery.bind(this),
      discovered: (state.get("discovered") || []).map( (o,n) => {
        return <p style={styles.discoveryItem} onClick={this._connectDevice.bind(this,o.address)} key={n}><strong>{o.name}: </strong>{o.address}</p>
      })
    }

    // ## Help Window
    const helpPanes = [{
      img: "/packages/ihealth_bp-ui/assets/help1.jpg",
      text: <span>For all wireless BP monitors, you<br />must first pair your device from<br />the Bluetooth settings page.</span>,
      fontSize: 18
    },{
      img: "/packages/ihealth_bp-ui/assets/help2.jpg",
      text: <span>If your phone still doesn't detect<br/>your device, try turning off and then<br/>turning on your bluetooth option.</span>,
      fontSize: 18
    },{
      img: "/packages/ihealth_bp-ui/assets/help3.jpg",
      text: <span>For all wired BP monitors, you must<br/>insert your phone to the dock.</span>
    }]

    return  <RC.Loading bgColor={IH.Device.Color.BP} isReady={state.get("connectStage") < 2} style={styles.area} loadingStyle={styles.initLoading}>
        <RC.Animate transitionName="zoom" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
          {
          state.get("isHelp")
          ? <DevicePrivate.Help panes={helpPanes} closeFunc={this._closeHelp.bind(this)} deviceType="BP" />
          : null
          }
        </RC.Animate>
        <div style={styles.area}>
        <DevicePrivate.ConnectStage1 isOn={!isConnecting} onClick={this._startDiscovery.bind(this)}>
          {
          this.props.wasDisconnected
          ?
          <span>You were disconnected.<br />Please re-connect.</span>
          :
          <span>You are not connected to an<br />iHealth Blood Pressure Monitor.</span>
          }
        </DevicePrivate.ConnectStage1>
        <DevicePrivate.ConnectStage2 {... stage2} />

        <DevicePrivate.HelpButton deviceType="BP" onClick={this._openHelp.bind(this)}>{"Help"}</DevicePrivate.HelpButton>
      </div>
    </RC.Loading>
  }
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  baseStyles(np,ns) {
    return DevicePrivate.ConnectBASE()
  }
}
