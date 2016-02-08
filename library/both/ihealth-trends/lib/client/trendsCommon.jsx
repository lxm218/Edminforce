
IH.RC.TrendsCommon = class extends RC.MeteorData {
  constructor(p) {
    super(p)
    this.state = {
      cond: "latest"
    }
    this.dtOpts = ["latest","week","month","year"]
    this.styles = this.getStyles()

    this._graphHeight = [210,190,170]
    this._graphPoints = [15,13,11]

    this.dateWeek = (new Date()).addDays(-7)
    this.dateMonth = (new Date()).addDays(-31)
    this.dateYear = (new Date()).addDays(-365)
  }

  _switchGraph(graphType) {
    this.setState({cond: graphType})
  }

  _MQ() {
    if (RC.MQ.device>=2) {
      return {
        width: 210,
        points: 10
      }
    }
    else if (RC.MQ.device>=1) {
      return {
        width: 190,
        points: 8
      }
    }
    else {
      return {
        width: 170,
        points: 6
      }
    }
  }

  _MQ2() {
    if (RC.MQ.device>=2) {
      return {
        height: this._graphHeight[0],
        points: this._graphPoints[0]
      }
    }
    else if (RC.MQ.device>=1) {
      return {
        height: this._graphHeight[1],
        points: this._graphPoints[1]
      }
    }
    else {
      return {
        height: this._graphHeight[2],
        points: this._graphPoints[2]
      }
    }
  }

  _interpolFuncX(arr, dateOnly, val, n) {
    this.lastMth = this.lastMth || ''
    if (val===null) return ""
    let indent = n!=(arr.length-1) ? "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" : ""
    let month = moment(val).format("MM/DD/YY")
    let time = moment(val).format("hh:mm")
    var label
    if(dateOnly) {
      label = month
    }
    else {
      label = this.lastMth.substr(0,3) != month.substr(0,3) || n === 0
        ? indent + time+"<br />" + indent+month
        : indent + time
    }
    this.lastMth = month
    return label
  }

  _interpolFuncY(arr, unit, val, n) {
    let maxVal = _.max(arr)
    let minVal = _.min(_.filter(arr, function(num){ return _.isNumber(num) }))
    return val >= maxVal && (val-maxVal>=2) && val>=(minVal+20)
      ? (val + "<br />" + unit) : val
  }

  _commonOptions() {
    return {
      lineSmooth: true,
      fullWidth: true,
      height: `${this._MQ().width}px`,
      axisX: {
        labelOffset: {
          x: -17
        }
      },
      axisY: {
        labelOffset: {
          x: 5,
          y: 10,
        },
        scaleMinSpace: 25
      }
    }
  }

  _commonOptionsAM(spacingVal, yLabel, yMax, yMaxLabel) {
    let options = {
      fullWidth: true,
      seriesBarDistance: 5,
      height: `${this._MQ2().height}px`,
      low: 0, // Must be divisable by $spacingVal
      axisX: {
        labelOffset: {
          x: 0
        },
        labelInterpolationFnc: function(val, n) {
          // return (!(n%2) && n!=measurements.length-2) || n==measurements.length-1
          // return !(n%2)
          //   ? moment(val).format("MM/DD/YY") : null
          return moment(val).format("MM/DD/YY")
        }
      },
      axisY: {
        labelOffset: {
          x: 5,
          y: 10,
        },
        labelInterpolationFnc: function(val, n) {
          let maxVal = yMax
          if (val > 0 && val < 1) {
            if ((val*10)%spacingVal)
              return null
          } else if (val%spacingVal) {
            maxVal = maxVal+spacingVal/2
            return null
          }
          return val>=maxVal
            ? `${yLabel}<br />${val}`
            : val
          // return val
        }
      }
    }
    if(yMaxLabel) {
      options.high = yMaxLabel
    }
    return options
  }

  getStyles() {
    const fontSize = RC.Theme.font.size
    let backgroundColor = this.backgroundColor || 'orange'
    return {
      area: {
        marginTop: '2em',
        borderStyle: 'solid',
        borderRadius: '0.5em',
        borderColor: 'white',
        backgroundColor: 'white'
      },
      title: {
        fontSize: (fontSize - 2), textAlign: "center",
        backgroundColor: backgroundColor,
        color: 'white'
      },
      titleInner: {
        display: "inline-block",
        height: 24, padding: "3px 15px 0",
        fontSize: '1.5em',
        margin: '1.5em',
        marginTop: '0.5em',
      },
      titleInnerSmall: {
        padding: '0.4em 1.5em',
        fontSize: '1.35em',
        borderRadius: '12em',
        backgroundColor: IH.Device.Color.alt
      },
      titleSmall: {
        fontSize: (fontSize - 2) * 0.8, textAlign: "center",
        padding: "2.5em 0 0.5em 0"
      },
      graphArea: {
        height: this._MQ().width, overflow: "hidden"
      },
      top: {
        margin: '-0.2em',
        borderTop: '1em solid',
        borderRadius: '0.5em',
        borderColor: backgroundColor
      },
      legend: {
        padding: "5px 0 0",
        textAlign: "center",
        fontSize: fontSize-4, lineHeight: `${fontSize-4}px`
      },
      legendItem: {
        display: "inline-block", padding: "0 8px 0 3px"
      },
      legendCircle: {
        borderRadius: "50%",
        display: "inline-block", margin: "0 3px -1px 8px",
        width: 10, height: 10,
        backgroundColor: "#DDD",
        ":one": { backgroundColor: "#660099" },
        ":two": { backgroundColor: "#FFCC00" },
        ":three": { backgroundColor: "#336699" }
      }
    }
  }

  _renderTabSlider() {
    let backgroundColor = this.backgroundColor || 'brand1'
    let style = {
      cursor: 'pointer'
    }

    return (
      <RC.TabsSlider style={style} color="white" bgColor={backgroundColor} forceClicked={_.indexOf(this.dtOpts, this.state.cond)} initialTab={0} activateOnClick={false} cursorColor="rgba(255,255,255,.58)">
        {
        this.dtOpts.map( (dt,n) => {
          let color = dt === this.state.cond ? 'white' : 'rgba(255,255,255,0.7)'
          return <RC.URL color={color} onMouseDown={this._switchGraph.bind(this,dt)} onTouchStart={this._switchGraph.bind(this,dt)} key={n}>
            {h.capitalize(dt)}
          </RC.URL>
        })
        }
      </RC.TabsSlider>
    )
  }

  _getMeasurement(measurements) {
    measurements.reverse()
    if(measurements.length == 1) {
      measurements.unshift(null)
      measurements.push(null)
    } 
    else if(measurements.length == 2) {
      measurements.unshift(null)
    }
    return measurements
  }

  _getSampleBPData() {
    let measurements = [{
      "_id":"PBQb8xXbBD88t2vWm",
      "arrhythmia":0,
      "LP":85,
      "HP":115,
      "deviceAddress":"8CDE521448F0",
      "deviceModel":"BP5",
      "HR":63,
      "finalPressure":136,
      "msg":"MeasureDone",
      "MDate":"2016-01-13T18:55:02.359Z",
      "userId":"L4JzWPZ5iaLu99L8C",
      "deviceType":"BP",
      "createdAt":"2016-01-13T18:55:02.388Z"}, 
    {"_id":"yEZWTJzfnYB58uLAd","deviceAddress":"8CDE5212386D","LP":93,"HP":143,"msg":"measure done","HR":73,"arrhythmia":0,"deviceModel":"BP5","MDate":"2016-01-13T02:51:43.840Z","userId":"L4JzWPZ5iaLu99L8C","deviceType":"BP","createdAt":"2016-01-13T02:51:28.147Z"}, {"_id":"sca9Kanra29ReM3TA","deviceAddress":"8CDE5212386D","LP":93,"HP":143,"msg":"measure done","HR":73,"arrhythmia":0,"deviceModel":"BP5","MDate":"2016-01-13T02:51:36.942Z","userId":"L4JzWPZ5iaLu99L8C","deviceType":"BP","createdAt":"2016-01-13T02:51:21.377Z"}, {"_id":"hnGjvJZcugYmFbc6d","deviceAddress":"8CDE5212386D","LP":93,"HP":143,"msg":"measure done","HR":73,"arrhythmia":0,"deviceModel":"BP5","MDate":"2016-01-13T02:51:34.479Z","userId":"L4JzWPZ5iaLu99L8C","deviceType":"BP","createdAt":"2016-01-13T02:51:18.811Z"}, {"_id":"mjK9a6mLTNNQdJnCK","deviceAddress":"8CDE5212386D","LP":93,"HP":143,"msg":"measure done","HR":73,"arrhythmia":0,"deviceModel":"BP5","MDate":"2016-01-13T02:51:31.210Z","userId":"L4JzWPZ5iaLu99L8C","deviceType":"BP","createdAt":"2016-01-13T02:51:15.529Z"}, {"_id":"dTXNTs5vbgJeavFfi","deviceAddress":"8CDE5212386D","LP":93,"HP":143,"msg":"measure done","HR":73,"arrhythmia":0,"deviceModel":"BP5","MDate":"2016-01-13T02:51:19.574Z","userId":"L4JzWPZ5iaLu99L8C","deviceType":"BP","createdAt":"2016-01-13T02:51:03.886Z"}, {"_id":"BRpyFH6uyns7yHFuE","deviceAddress":"8CDE5212386D","LP":77,"HP":119,"msg":"measure done","HR":73,"arrhythmia":0,"deviceModel":"BP5","MDate":"2016-01-13T01:19:16.812Z","userId":"L4JzWPZ5iaLu99L8C","deviceType":"BP","createdAt":"2016-01-13T01:19:01.753Z"}, {"_id":"Et553jg4Fz5w99nBp","deviceAddress":"8CDE5212386D","LP":77,"HP":119,"msg":"measure done","HR":73,"arrhythmia":0,"deviceModel":"BP5","MDate":"2016-01-13T01:19:14.752Z","userId":"L4JzWPZ5iaLu99L8C","deviceType":"BP","createdAt":"2016-01-13T01:18:59.744Z"}, {"_id":"7FidSh9AcJzioXgr3","deviceAddress":"8CDE5212386D","LP":77,"HP":119,"msg":"measure done","HR":73,"arrhythmia":0,"deviceModel":"BP5","MDate":"2016-01-13T01:19:10.515Z","userId":"L4JzWPZ5iaLu99L8C","deviceType":"BP","createdAt":"2016-01-13T01:18:55.493Z"}, {"_id":"6RG8NkwfKzQxRst8w","deviceAddress":"8CDE5212386D","LP":77,"HP":119,"msg":"measure done","HR":73,"arrhythmia":0,"deviceModel":"BP5","MDate":"2016-01-13T01:19:05.384Z","userId":"L4JzWPZ5iaLu99L8C","deviceType":"BP","createdAt":"2016-01-13T01:18:50.667Z"}]
    return measurements
  }

  _getSampleActivityData() {
    let activityData = [{"_id":"zRaindbcfFcCZY44a","lastValue":{"AMDate":"2015-11-23T23:32:00.000Z","dataID":"004D3203A5E31448321220880","AMstepSize":74,"AMcalorie":43,"Start":false,"AMstepNum":880,"Day":"20151123","deviceAddress":"004D3203A5E3","deviceModel":"AM3S"},"MDay":"20151123","MDate":"2015-11-23T22:35:26.533Z","deviceType":"AM","deviceModel":"AM3S","msg":"activity","userId":"L4JzWPZ5iaLu99L8C","createdAt":"2015-11-23T20:06:05.239Z","timezone":"-0800","lastEdited":"2015-11-23T22:35:26.533Z"}, 
    {"_id":"jCtEQf6ScktSLnX9E","lastValue":{"AMDate":"2015-11-23T06:55:00.000Z","dataID":"004D3203A5E314482614003291","AMstepSize":5,"AMcalorie":166,"Start":false,"AMstepNum":3291,"Day":"20151122","deviceAddress":"004D3203A5E3","deviceModel":"AM3S"},"MDay":"20151122","MDate":"2015-11-23T20:06:03.672Z","deviceType":"AM","deviceModel":"AM3S","msg":"activity","userId":"L4JzWPZ5iaLu99L8C","createdAt":"2015-11-22T07:32:41.178Z","timezone":"-0800","lastEdited":"2015-11-23T20:06:03.672Z"}, {"_id":"NgubrvbwwQ2bbxcJa","lastValue":{"AMDate":"2015-11-22T07:56:00.000Z","dataID":"004D3203A5E314481786602336","AMstepSize":3,"AMcalorie":121,"Start":false,"AMstepNum":2336,"Day":"20151121","deviceAddress":"004D3203A5E3","deviceModel":"AM3S"},"MDay":"20151121","MDate":"2015-11-22T07:32:37.420Z","deviceType":"AM","deviceModel":"AM3S","msg":"activity","userId":"L4JzWPZ5iaLu99L8C","createdAt":"2015-11-22T07:32:37.422Z","timezone":"-0800","lastEdited":"2015-11-22T07:32:37.420Z"}, {"_id":"tDQ3PmtRvGegRCquc","lastValue":{"AMDate":"2015-11-21T07:56:00.000Z","dataID":"004D3203A5E314480922602236","AMstepSize":3,"AMcalorie":112,"Start":false,"AMstepNum":2236,"Day":"20151120","deviceAddress":"004D3203A5E3","deviceModel":"AM3S"},"MDay":"20151120","MDate":"2015-11-22T07:32:36.122Z","deviceType":"AM","deviceModel":"AM3S","msg":"activity","userId":"L4JzWPZ5iaLu99L8C","createdAt":"2015-11-21T01:53:59.483Z","timezone":"-0800","lastEdited":"2015-11-22T07:32:36.122Z"}, {"_id":"X8BWtacsQjDFXtNgY","lastValue":{"AMDate":"2015-11-20T07:55:00.000Z","dataID":"004D3203A5E314480058003799","AMstepSize":3,"AMcalorie":193,"Start":false,"AMstepNum":3799,"Day":"20151119","deviceAddress":"004D3203A5E3","deviceModel":"AM3S"},"MDay":"20151119","MDate":"2015-11-21T01:53:59.086Z","deviceType":"AM","deviceModel":"AM3S","msg":"activity","userId":"L4JzWPZ5iaLu99L8C","createdAt":"2015-11-21T01:53:59.086Z","timezone":"-0800","lastEdited":"2015-11-21T01:53:59.086Z"}, {"_id":"Tt6jCFEMtDsCxmAfG","lastValue":{"AMDate":"2015-11-19T07:54:00.000Z","dataID":"004D3203A5E314479193401501","AMstepSize":3,"AMcalorie":74,"Start":false,"AMstepNum":1501,"Day":"20151118","deviceAddress":"004D3203A5E3","deviceModel":"AM3S"},"MDay":"20151118","MDate":"2015-11-21T01:53:58.581Z","deviceType":"AM","deviceModel":"AM3S","msg":"activity","userId":"L4JzWPZ5iaLu99L8C","createdAt":"2015-11-21T01:53:58.581Z","timezone":"-0800","lastEdited":"2015-11-21T01:53:58.581Z"}, {"_id":"MvPjiKFnrmtBJkBZn","lastValue":{"AMDate":"2015-11-18T07:59:00.000Z","dataID":"004D3203A5E314478332402486","AMstepSize":3,"AMcalorie":125,"Start":false,"AMstepNum":2486,"Day":"20151117","deviceAddress":"004D3203A5E3","deviceModel":"AM3S"},"MDay":"20151117","MDate":"2015-11-21T01:53:58.205Z","deviceType":"AM","deviceModel":"AM3S","msg":"activity","userId":"L4JzWPZ5iaLu99L8C","createdAt":"2015-11-21T01:53:58.205Z","timezone":"-0800","lastEdited":"2015-11-21T01:53:58.205Z"}, {"_id":"4XpL67FrtizRowrTi","lastValue":{"AMDate":"2015-11-16T22:03:00.000Z","dataID":"004D3203A5E314477110801861","AMstepSize":3,"AMcalorie":95,"Start":false,"AMstepNum":1861,"Day":"20151116","deviceAddress":"004D3203A5E3","deviceModel":"AM3S"},"MDay":"20151116","MDate":"2015-11-16T21:29:56.808Z","deviceType":"AM","deviceModel":"AM3S","msg":"activity","userId":"L4JzWPZ5iaLu99L8C","createdAt":"2015-11-16T21:29:51.040Z","timezone":"-0800","lastEdited":"2015-11-16T21:29:56.808Z"}, {"_id":"ysZ9AfFJnghHNmGkZ","lastValue":{"AMDate":"2015-11-16T07:56:00.000Z","dataID":"004D3203A5E314476602604384","AMstepSize":3,"AMcalorie":222,"Start":false,"AMstepNum":4384,"Day":"20151115","deviceAddress":"004D3203A5E3","deviceModel":"AM3S"},"MDay":"20151115","MDate":"2015-11-16T21:29:55.537Z","deviceType":"AM","deviceModel":"AM3S","msg":"activity","userId":"L4JzWPZ5iaLu99L8C","createdAt":"2015-11-16T21:29:50.317Z","timezone":"-0800","lastEdited":"2015-11-16T21:29:55.537Z"}, {"_id":"BZcQmGYb7HjGbFM8Q","lastValue":{"AMDate":"2015-11-15T07:57:00.000Z","dataID":"004D3203A5E314475739204254","AMstepSize":3,"AMcalorie":213,"Start":false,"AMstepNum":4254,"Day":"20151114","deviceAddress":"004D3203A5E3","deviceModel":"AM3S"},"MDay":"20151114","MDate":"2015-11-16T21:29:53.262Z","deviceType":"AM","deviceModel":"AM3S","msg":"activity","userId":"L4JzWPZ5iaLu99L8C","createdAt":"2015-11-16T21:29:49.599Z","timezone":"-0800","lastEdited":"2015-11-16T21:29:53.262Z"}, {"_id":"hdxmwWejNy2D82HXw","lastValue":{"AMDate":"2015-11-14T07:55:00.000Z","dataID":"004D3203A5E314474874005147","AMstepSize":3,"AMcalorie":253,"Start":false,"AMstepNum":5147,"Day":"20151113","deviceAddress":"004D3203A5E3","deviceModel":"AM3S"},"MDay":"20151113","MDate":"2015-11-16T21:29:52.505Z","deviceType":"AM","deviceModel":"AM3S","msg":"activity","userId":"L4JzWPZ5iaLu99L8C","createdAt":"2015-11-16T21:29:49.175Z","timezone":"-0800","lastEdited":"2015-11-16T21:29:52.505Z"}, {"_id":"qdhpMiqfdnr8fdszp","lastValue":{"AMDate":"2015-11-13T07:58:00.000Z","dataID":"004D3203A5E314474011806754","AMstepSize":3,"AMcalorie":338,"Start":false,"AMstepNum":6754,"Day":"20151112","deviceAddress":"004D3203A5E3","deviceModel":"AM3S"},"MDay":"20151112","MDate":"2015-11-16T21:29:51.230Z","deviceType":"AM","deviceModel":"AM3S","msg":"activity","userId":"L4JzWPZ5iaLu99L8C","createdAt":"2015-11-16T21:29:48.431Z","timezone":"-0800","lastEdited":"2015-11-16T21:29:51.230Z"}, {"_id":"PFGRvgPvzjxcKqwEn","lastValue":{"AMDate":"2015-11-12T07:56:00.000Z","dataID":"004D3203A5E314473146604153","AMstepSize":3,"AMcalorie":210,"Start":false,"AMstepNum":4153,"Day":"20151111"},"MDay":"20151111","MDate":"2015-11-12T23:20:05.666Z","deviceAddress":"004D3203A5E3","deviceType":"AM","deviceModel":"AM3S","msg":"activity","userId":"L4JzWPZ5iaLu99L8C","createdAt":"2015-11-12T23:20:05.666Z","timezone":"-0800","lastEdited":"2015-11-12T23:20:05.666Z"}, {"_id":"TYBWZZ5P5ByXcbinJ","lastValue":{"AMDate":"2015-11-11T07:58:00.000Z","dataID":"004D3203A5E314472283808618","AMstepSize":3,"AMcalorie":432,"Start":false,"AMstepNum":8618,"Day":"20151110"},"MDay":"20151110","MDate":"2015-11-12T23:20:04.938Z","deviceAddress":"004D3203A5E3","deviceType":"AM","deviceModel":"AM3S","msg":"activity","userId":"L4JzWPZ5iaLu99L8C","createdAt":"2015-11-12T23:20:04.938Z","timezone":"-0800","lastEdited":"2015-11-12T23:20:04.938Z"}, {"_id":"pymfqRGkHu9zLqx3y","lastValue":{"AMDate":"2015-11-10T07:58:00.000Z","dataID":"004D3203A5E314471419802557","AMstepSize":3,"AMcalorie":150,"Start":false,"AMstepNum":2557,"Day":"20151109"},"MDay":"20151109","MDate":"2015-11-12T23:20:04.270Z","deviceAddress":"004D3203A5E3","deviceType":"AM","deviceModel":"AM3S","msg":"activity","userId":"L4JzWPZ5iaLu99L8C","createdAt":"2015-11-12T23:20:04.271Z","timezone":"-0800","lastEdited":"2015-11-12T23:20:04.270Z"}]
    return activityData
  }

  _getSampleProfile() {
    let profile = {"firstName":"Jason","lastName":"Lee","AMgoal":"15000","gender":1,"height":180,"weight":185,"activityLevel":1,"birthday":"1985-08-14T07:00:00.000Z","wtUnit":0,"htUnit":0,"metricsUnit":0}
    return profile
  }

  _renderGraph() {
    return ''
  }

  title() {
    return ''
  }

  render() {
    return (
      <div style={this.styles.area}>
        <div style={this.styles.top}>
          <div style={this.styles.title}><span style={this.styles.titleInner}>{this.title}</span></div>
          {this._renderTabSlider()}
        </div>
        <br/>
        <RC.Loading isReady={this.data.isReady} loadingStyle={this.styles.graphArea} style={this.styles.graphArea}>
          {this._renderGraph()}
        </RC.Loading>
      </div>
    )
  }
}

IH.RC.TrendsCommon .displayName = "IH.RC.TrendsCommon "
