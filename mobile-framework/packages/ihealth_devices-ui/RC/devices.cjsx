
allowedDevices = ["BP","BG"]

@DeviceRC.Prepare = React.createClass(
  mixins: [ ReactMeteorData ]
  getMeteorData: ->
    { deviceJson: if _.contains(allowedDevices, @props.deviceName) then Session.get(@props.deviceName) else null }
  componentWillUnmount: ->
    if _.contains(allowedDevices, @props.deviceName)
      Session.set @props.deviceName, null
      if @props.device.hasStarted
        @props.device.stop()
    return
  render: ->
    device = @props.device
    deviceName = if (@props.deviceName in allowedDevices) then @props.deviceName else null
    # let deviceKnown = deviceName && device
    deviceClasses =
      BP: DeviceRC.MeasureBP
      BG: DeviceRC.MeasureBG
    DeviceMeasure = deviceClasses[deviceName] or DeviceRC.NotFound
    isHidden = !_.isObject(@data.deviceJson)
    isCancelled = _.isObject(@data.deviceJson) and @data.deviceJson.isCancelled
    headerSpace = if (_.isUndefined(@props.addHeaderSpace) or @props.addHeaderSpace) and (isHidden or isCancelled) then ' nav-margin' else ''
    <div className={"abs-full background device-back overflow "+deviceName+headerSpace}>
      <DeviceMeasure device={device} isHidden={isHidden} isCancelled={isCancelled} inactiveDuration={@props.inactiveDuration} />
      <DeviceRC.PrepareMsg device={device} deviceName={deviceName} holdToConnect={@props.holdToConnect} finCallback={@props.finishCallback} />
    </div>
)

@DeviceRC.PrepareMsg = React.createClass(
  mixins: [ ReactMeteorData ]
  getMeteorData: ->
    devices: Session.get("devices") or {}

  openHelp: ->
    @refs.guide.open()

  connect: ->
    @props.device.connect() if @props.device.connect?

  disconnect: ->
    @props.device.disconnect()  if @props.device.disconnect?

  start: ->
    @props.device.start @props.finCallback  if @props.device.start?

  touchStart: ->
    @setState buttonHeld: true
    device = @props.device
    device.connect()  if @props.holdToConnect and not device.macId? and not device.name? and not device.isConnecting

  touchEnd: ->
    @setState buttonHeld: false
    device = @props.device
    device.stopConnecting() if @props.holdToConnect and device.isConnecting

  getInitialState: ->
    buttonHeld: false
    help: false

  componentWillUnmount: ->
    devices = Session.get "devices"
    if _.isObject(devices) and devices[@props.deviceName] is "searching"
      devices[@props.deviceName] = null
      Session.set "devices", devices

  render: ->
    if @props.device?
      @renderNormal()
    else
      @renderNoProp()

  renderNoProp: ->
    <h2> This component requires this.props.device </h2>

  renderNormal: ->
    device = @data.devices[@props.deviceName] or ""
    deviceStatus = (if _.isString(device) then device else "ready")
    blurBack = true
    showHelp = false
    switch deviceStatus
      when "searching"
        showHelp = true
        title = @props.searchTitle ? "Searching"
        desc = if @props.searchMsg?
            <p>{@props.searchMsg}</p>
          else <p>You must pair your device from your<br />settings before you can connect.</p>
        handler = @disconnect
      when "connected"
        blurBack = false
        title = @props.connectedTitle ? "Connected"
        desc = if @props.connectedMsg?
            <p>{@props.connectedMsg}</p>
          else <p>You are now connected with your device.</p>
        handler = null
      when "ready"
        blurBack = false
        showHelp = true
        title = @props.readyTitle ? "Device is Ready"
        desc = if @props.readyMsg
            <p>{@props.readyMsg}</p>
          else <p>Click the circle to start measuring.</p>
        handler = @start
      else
        showHelp = true
        title = @props.defaultTitle ? "Touch to Connect"
        desc = if @props.defaultMsg?
            <p>{@props.defaultMsg}</p>
          else <p>Click the circle to connect your device.</p>
        handler = if @props.holdToConnect then null else @connect
    cRadius = (if Meteor.Device.isPhone() then 80 else 120)
    faBatteryLevel = Math.round(device.battery/100*4) # 4-Math.round(100/device.battery)
    <div className="center line-average unselect">
        <div className="device-search-bar">
          { if deviceStatus is "searching" then <div className="dsb-loading"/> }
        </div>

        <DeviceRC.BP5Instructions ref="guide" />

        <div className={"abs-full device-back-blur background transition-slower"+(if blurBack then "" else " invis")} />
        <div className="device-text">
          <h3 className="title">{title}</h3>
          {desc}
          {if showHelp then <span className="device-help center round sub" onClick={@openHelp}>Help</span> }
        </div>

        <svg className={"round device-control"+( if @state.buttonHeld then " active" else "")} version="1.1" xmlns="http://www.w3.org/2000/svg" onClick={handler} onTouchStart={@touchStart} onTouchEnd={@touchEnd} />
        <figure className="device-plate">
          { unless !_.isObject(device) || isNaN(device.battery)
              <div className="battery">
                <p>
                {device.battery}% <span className={"fa fa-battery-"+faBatteryLevel }/>
                </p>
              </div>
          }
        </figure>
      </div>
)

@DeviceRC.NotFound = React.createClass
  render: ->
    <div/>
