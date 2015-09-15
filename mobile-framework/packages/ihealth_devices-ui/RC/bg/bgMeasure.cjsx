# console.log 'Meteor.settings', Meteor.settings
# settings undefined
debugLevel = Meteor?.settings?.public?.debugLevels?.bgComponentcjsx || 1;
debugL = _.partial(DevTools.consoleWithLevels, debugLevel);
self = @

@DeviceRC.MeasureBG3A = React.createClass
  render: ->
    <div className="neat-component">
      Nothing here
      {<h1>A Component is I  </h1> if @props.showTitle}
      <hr />
      {<p key={n}>This new line has been printed {n} times</p> for n in [1..5]}
    </div>

@DeviceRC.MeasureBG = React.createClass
  mixins: [ReactMeteorData]
  timeout: null
  inactiveTimeout: null
  interval: null
  getMeteorData: ->
    bgSession = Session.get("BG") or {}
    console.log "checking bgSession: ", bgSession
    if bgSession.status is "finished"
      if @timeout is null

        # Measure Finished
        @timeout = Meteor.setTimeout(=>
          pressurePos = bgSession.pressure
          pcDecrease = bgSession.perCent / bgSession.pressure
          pcPos = bgSession.perCent
          @setState spdClass: "transition-slow"
          @updateCircle 0
          bgSession.perCent = 0
          @interval = Meteor.setInterval(=>
            bgSession.pressure = Math.max(--pressurePos, 0)

            # pcPos = Math.max(pcPos-pcDecrease, 0)
            # bgSession.perCent = pcPos
            unless pressurePos
              Meteor.clearInterval @interval

              # Animate return circle
              @setState status: "displaying"
              @updateCircle 0
              console.log "@@@@"
              console.log "@@@@"
              console.log bgSession
              console.log "@@@@"
              console.log "@@@@"

              # Switch state to finished
              Meteor.setTimeout (=>
                console.log "AAAA"
                @setState status: "finished"
                Session.set "BG", bgSession
              ), 1000
            Session.set "BG", bgSession
          , Math.max(1000 / pressurePos, 5))
        , 250)
    else
      console.log 'bgSession', bgSession
      @updateCircle bgSession.perCent

    BG: bgSession

  componentWillMount: ->
    # if typeof(self.BgManagerCordova) is "undefined"
    #   if typeof(DevicesStub) is "undefined"
    #     console.warn "BgManagerCordova is undefined, and DeviceStub is not available"
    #   else
    #     debugL(2) "Loading DevicesStub for BP"  if typeof (DevTools) isnt "undefined"
    #     self.BgManagerCordova = DevicesStub.BG5
    # if typeof iHealth.BG5 is 'undefined' and typeof iHealthBG5 isnt 'undefined'
    #   iHealth.BG5 = new iHealthBG5
  componentWillUnmount: ->
    delete Session.keys["BG"]
    if this.props.device.hasStarted
      this.props.device.stop()

  getInitialState: ->
    status: "processing",
    spdClass: "transition",

  restartInactiveTimer: ->
    if _.isNumber(@props.inactiveDuration) and @props.inactiveDuration > 1000
      Meteor.clearTimeout @inactiveTimeout
      @inactiveTimeout = Meteor.setTimeout(=>
        @cancelMeasure()
      , @props.inactiveDuration)

  updateCircle: (perCent, slow) ->
    cLine = React.findDOMNode(@refs.cLine)
    cFull = React.findDOMNode(@refs.cFull)
    svgMax = (if Meteor.Device.isPhone() then 1000 else 1500)
    svgVal = svgMax - (svgMax * perCent)
    if cLine and cFull
      cFull.setAttribute "stroke-dashoffset", (if @state.status is "displaying" then svgMax else 0)
      cLine.setAttribute "stroke-dashoffset", (if isNaN(svgVal) then svgMax else Math.round(svgVal))
      @restartInactiveTimer()

  cancelMeasure: ->
    cb = =>
      @props.device.hasStarted = false
      cur = Session.get("BG")
      cur.isCancelled = true
      Session.set "BG", cur
      Meteor.clearTimeout @inactiveTimeout
      Meteor.setTimeout (=>
        Session.set "BG", null
        @setState
          status: "processing"
          spdClass: "transition"

        @timeout = null
      ), 1500

    @props.device.stop cb

  # statics:
  #   getUserInfo: (username, cb) ->
  #     superagent.get "http://localhost:3000/api/users/" + username, (err, res) ->
  #       cb err, (if res then res.body else null)
  #
  # getInitialStateAsync: (cb) ->
  #   @type.getUserInfo(@props.username, cb)
  #
  # componentWillReceiveProps: (nextProps) ->
  #   if @props.username isnt nextProps.username
  #     @type.getUserInfo nextProps.username, ((err, info) ->
  #       throw err if err
  #       @setState info
  #     ).bind(this)

  render: ->
    if (this.props.isHidden) then return null
    BG = @data.BG
    cRadius = Meteor.Device.isPhone() ? 120 : 180
    <div className={"fixed-full bg-white scroll "+(if @props.isCancelled then 'exit' else 'route')+"-from-bottom"} onClick={this.restartInactiveTimer} id="measuring-bp">
      <span className="x black" onClick={this.cancelMeasure} />
      { if BG.errorID then <DeviceRC.Error msg={BG.msg} closeHandler={this.cancelMeasure} /> }
      {
        if this.state.status isnt "finished"
          <svg className="svg-circle" width={cRadius*2} height={cRadius*2} viewPort={"0 0 "+cRadius+" "+cRadius} version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle ref="cFull" className={"full "+this.state.spdClass} r={cRadius-10} cx={cRadius} cy={cRadius} fill="transparent" transform={"rotate(-90 "+cRadius+" "+cRadius+")"}/>
            <circle ref="cLine" className={"line svg-brand2 "+this.state.spdClass} r={cRadius-10} cx={cRadius} cy={cRadius} fill="transparent" transform={"rotate(-90 "+cRadius+" "+cRadius+")"}/>
          </svg>
      }
      <div className={if @state.status is 'finished' then 'fin pop-in' else 'table'} id="pressure-display">
        <div className={(if @state.status is 'displaying' then ' invis' else '')+(if @state.status is 'finished' then ' fade-in' else ' inside center')}>
          {
            if this.state.status is "finished"
              <div className="line-average">
                <div className="bp-fin center thick brand2">
                  {moment(BG.date).format("MMM Do YYYY - h:mm a")}
                </div>
                <div className="bp-fin">
                  <div className="clear">
                    <p className="type thin">
                      <small className="block thick">mmHg</small>
                      Systolic
                    </p>
                    <p className="val">{Math.round(BG.highpressure)}</p>
                  </div>
                </div>
                <div className="bp-fin">
                  <div className="clear">
                    <p className="type thin">
                      <small className="block thick">mmHg</small>
                      Diastolic
                    </p>
                    <p className="val">{Math.round(BG.lowpressure)}</p>
                  </div>
                </div>
                <div className="bp-fin">
                  <div className="clear">
                    <p className="type thin">
                      <small className="block thick">Beats Per Minute</small>
                      Heart Rate
                    </p>
                    <p className="val">{BG.heartrate}</p>
                  </div>
                </div>

                <DeviceRC.BGZone hiPressure={BG.highpressure} loPressure={BG.lowpressure} />
              </div>
            else
              <p className="thin processing-number padding-none brand2">
                {BG.pressure || 0}
                {unless BG.pressure then <span className="fa fa-cog spin-medium" /> }
              </p>
          }
				</div>
      </div>

    </div>
