
IH.RC.TrendsAM = class extends IH.RC.TrendsCommon {
  constructor(p) {
    super(p)
    this.backgroundColor = 'rgb(124,213,186)'
    this.styles = this.getStyles()
  }

  getMeteorData() {
    let subsOptions = {
      fromDate: null,
      limit: null
    }
    let cond = this.state.cond
    if(cond === 'week') {
      subsOptions = {
        fromDate: this.dateWeek,
        limit: 12
      }
    }
    if(cond === 'month') {
      subsOptions = {
        fromDate: this.dateMonth,
        limit: 12
      }
    }
    if(cond === 'year') {
      subsOptions = {
        fromDate: this.dateYear,
        limit: 12
      }
    }
    let subsActivity = Meteor.subscribe("Trends_Group_Activity", subsOptions)
    let activityData = IH.Coll.GroupTrendsClient && IH.Coll.GroupTrendsClient.find({dataType: "Activity"}, {sort: {Date: 1}}).fetch()
    let subsSleep = Meteor.subscribe("Trends_Group_Sleep", subsOptions)
    let sleepData = IH.Coll.GroupTrendsClient && IH.Coll.GroupTrendsClient.find({dataType: "Sleep"}, {sort: {Date: 1}}).fetch()

    console.log(sleepData.map( (item) => { return moment(item.Date).format('MM/DD') + ' ' + item.DS + ' ' + item.RS }))

    return {
      isReady: subsActivity.ready() && subsSleep.ready(),
      activityData: activityData,
      sleepData: sleepData
    }
  }

  _renderSleep() {
    const measurements = this.data.sleepData
    if (!measurements.length) return null
    // Create Data Set
    let dataArray = [measurements.map( (data) => { return data && parseFloat(data.DS * 5/60) })]
    dataArray.push(measurements.map( (data) => { return data && parseFloat(data.RS * 5/60) }))
    dataArray.push(measurements.map( (data) => { return data && parseFloat(data.NS * 5/60) }))

    // Vars
    let yLabel, yMaxLabel, spacingVal, yMax
    yLabel = 'hours'
    yMax = _.max( dataArray[0].map( function(num,index) {
      return num+dataArray[1][index]+dataArray[2][index]
    }))

    // Create X Label
    let labelsArray = measurements.map( function(data){ return data && data.Date })

    let graphData = {
      labels: labelsArray,
      series: dataArray
    }
    let graphOpts = this._commonOptionsAM(spacingVal, yLabel, yMax, yMaxLabel)
    graphOpts.stackBars = true

    return <RC.Chart className="Sleep" data={graphData} options={graphOpts} type="Bar" />
  }

  _renderDistance() {
    const measurements = this.data.activityData
    if (!measurements.length) return null
    // Create Data Set
    let dataArray = [measurements.map( (data) => { return data && data.distance })]

    // Vars
    let yLabel, yMaxLabel, spacingVal, yMax
    yLabel = 'km'
    yMaxLabel = yMax
    yMax = _.max(dataArray[0])

    // Create X Label
    let labelsArray = measurements.map( function(data){ return data && data.Date })

    let graphData = {
      labels: labelsArray,
      series: dataArray
    }
    let graphOpts = this._commonOptionsAM(spacingVal, yLabel, yMax, yMaxLabel)

    return <RC.Chart className="Distance" data={graphData} options={graphOpts} type="Bar" />
  }

  _renderSteps() {
    const measurements = this.data.activityData
    if (!measurements.length) return null
    // Create Data Set
    let dataArray = [measurements.map( (data) => { return data && data.steps })]

    // Vars
    let yLabel, yMaxLabel, spacingVal, yMax
    yLabel = "steps"
    spacingVal = 1000
    yMax = _.max(dataArray[0])

    // Create X Label
    let labelsArray = measurements.map( function(data){ return data && data.Date })

    let graphData = {
      labels: labelsArray,
      series: dataArray
    }
    let graphOpts = this._commonOptionsAM(spacingVal, yLabel, yMax, yMaxLabel)

    return <RC.Chart className="Steps" data={graphData} options={graphOpts} type="Bar" />
  }

  _renderCalories() {
    const measurements = this.data.activityData
    if (!measurements.length) return null
    // Create Data Set
    let dataArray = [measurements.map( (data) => { return data && data.calories })]

    // Vars
    let yLabel, yMaxLabel, spacingVal, yMax
    yLabel = "kcal"
    spacingVal = 100
    yMax = _.max(dataArray[0])

    // Create X Label
    let labelsArray = measurements.map( function(data){ return data && data.Date })

    let graphData = {
      labels: labelsArray,
      series: dataArray
    }
    let graphOpts = this._commonOptionsAM(spacingVal, yLabel, yMax, yMaxLabel)

    return <RC.Chart className="Calories" data={graphData} options={graphOpts} type="Bar" />
  }

  render() {
    let style = Object.assign(_.clone(this.styles.area), this.props.style)
    if(this.data.activityData) {
      return (
        <div style={style}>
          <div style={this.styles.top}>
            <div style={this.styles.title}><span style={this.styles.titleInner}>Activity</span></div>
            {this._renderTabSlider()}
          </div>
          <div style={this.styles.titleSmall}><span style={this.styles.titleInnerSmall}>Sleep Efficiency</span></div>
          <div style={this.styles.legend} key="legendSleep">
            <span style={h.assignPseudos(this.styles.legendCircle, ":one")} /><span style={this.styles.sleepLegendItem}>Deep</span>
            <span style={h.assignPseudos(this.styles.legendCircle, ":two")} /><span style={this.styles.sleepLegendItem}>Regular</span>
            <span style={h.assignPseudos(this.styles.legendCircle, ":three")} /><span style={this.styles.sleepLegendItem}>None</span>
          </div>
          <RC.Loading isReady={this.data.isReady} loadingStyle={this.styles.graphArea} style={this.styles.graphArea}>
            {this._renderSleep()}
          </RC.Loading>
          <div style={this.styles.titleSmall}><span style={this.styles.titleInnerSmall}>Calories Burned</span></div>
          <RC.Loading isReady={this.data.isReady} loadingStyle={this.styles.graphArea} style={this.styles.graphArea}>
            {this._renderCalories()}
          </RC.Loading>
          <div style={this.styles.titleSmall}><span style={this.styles.titleInnerSmall}>Steps Count</span></div>
          <RC.Loading isReady={this.data.isReady} loadingStyle={this.styles.graphArea} style={this.styles.graphArea}>
            {this._renderSteps()}
          </RC.Loading>
          <div style={this.styles.titleSmall}><span style={this.styles.titleInnerSmall}>Distance</span></div>
          <RC.Loading isReady={this.data.isReady} loadingStyle={this.styles.graphArea} style={this.styles.graphArea}>
            {this._renderDistance()}
          </RC.Loading>
        </div>
      )
    }
    else {
      return <div/>
    }
  }
}

IH.RC.TrendsAM.displayName = "IH.RC.TrendsAM"
