
IH.RC.TrendsAMSolo = class extends IH.RC.TrendsCommon {
  constructor(p) {
    super(p)
    this.backgroundColor = 'rgb(124,213,186)'
    this.styles = this.getStyles()
  }

  getMeteorData() {
    let subsOptions = {
      limit:null, 
      fromDate:null
    }
    let cond = this.state.cond
    if(cond === 'week') {
      subsOptions = {
        fromDate: (new Date()).addDays(-7),
        limit: 12
      }
    }
    if(cond === 'month') {
      subsOptions = {
        fromDate: (new Date()).addDays(-31),
        limit: 12
      }
    }
    if(cond === 'year') {
      subsOptions = {
        fromDate: (new Date()).addDays(-365),
        limit: 12
      }
    }

    let subs = Meteor.subscribe("Trends_Group_Activity", subsOptions)
    let activityData = IH.Coll.GroupTrendsClient && IH.Coll.GroupTrendsClient.find({dataType: "Activity"}).fetch()
    let profile = Meteor.user()

    return {
      isReady: true,
      activityData: activityData,
      profile: profile
    }
  }

  _renderDistance() {
    const measurements = this.data.activityData
    const profile = this.data.profile
    if (!measurements.length) return null
    // Create Data Set
    let dataArray = [measurements.map( (data) => { return data && data.distance })]

    const yMax = _.max(dataArray[0])
    // Vars
    let yLabel, yMaxLabel, spacingVal
    yLabel = 'km'
    spacingVal = 1
    yMaxLabel = yMax+.1

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
    const profile = this.data.profile
    if (!measurements.length) return null
    // Create Data Set
    let dataArray = [measurements.map( (data) => { return data && data.steps })]

    const yMax = _.max(dataArray[0])
    // Vars
    let yLabel, yMaxLabel, spacingVal
    yLabel = "steps"
    spacingVal = 500

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
    const profile = this.data.profile
    if (!measurements.length) return null
    // Create Data Set
    let dataArray = [measurements.map( function(data) {
      return h.amCalculateCalories(profile, data.calories, data.Date, false)
    })]
    dataArray.push( measurements.map( function(data) {
      return data.calories
    }) )

    const yMax = _.max(dataArray[0])
    // Vars
    let yLabel, yMaxLabel, spacingVal
    yLabel = "kcal"
    spacingVal = 500

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
          <div style={this.styles.titleSmall}><span style={this.styles.titleInner}>Calories Burned</span></div>
          <RC.Loading isReady={this.data.isReady} loadingStyle={this.styles.graphArea} style={this.styles.graphArea}>
            {this._renderCalories()}
          </RC.Loading>
          <div style={this.styles.titleSmall}><span style={this.styles.titleInner}>Steps Count</span></div>
          <RC.Loading isReady={this.data.isReady} loadingStyle={this.styles.graphArea} style={this.styles.graphArea}>
            {this._renderSteps()}
          </RC.Loading>
          <div style={this.styles.titleSmall}><span style={this.styles.titleInner}>Distance</span></div>
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

IH.RC.TrendsAMSolo.displayName = "IH.RC.TrendsAMSolo"
