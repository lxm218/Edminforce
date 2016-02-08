
IH.RC.TrendsBP = class extends IH.RC.TrendsCommon {
  constructor(p) {
    super(p)
    this.backgroundColor = 'rgb(234,120,130)'
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
    let subs = Meteor.subscribe("Trends_Group_BP", subsOptions)
    let measurements = IH.Coll.GroupTrendsClient && IH.Coll.GroupTrendsClient.find({dataType: "BP"}, {sort: {Date: 1}}).fetch()

    return {
      isReady: subs.ready(),
      measurements: measurements
    }
  }

  _renderHeader() {
    return (
      <div style={this.styles.top}>
        <div style={this.styles.title}><span style={this.styles.titleInner}>Blood Pressure & Heart Rate</span></div>
        {this._renderTabSlider()}
      </div>
    )
  }

  render() {
    let style = Object.assign(_.clone(this.styles.area), this.props.style)
    let bpRes = this.data.measurements
    if (bpRes.length) {
      let systolicArray = _.map(bpRes, function(bp){
        return _.isObject(bp) ? bp.HP : null
      })
      let diastolicArray = _.map(bpRes, function(bp){
        return _.isObject(bp) ? bp.LP : null
      })
      let heartrateArray = _.map(bpRes, function(bp){
        return _.isObject(bp) ? bp.HR : null
      })
      // let systolicArray = bpRes.filter( (bp) => {return bp && bp.HP}).map( (bp) => {return bp.HP})
      // let diastolicArray = bpRes.filter( (bp) => {return bp && bp.LP}).map( (bp) => {return bp.LP})
      // let heartrateArray = bpRes.filter( (bp) => {return bp && bp.HR}).map( (bp) => {return bp.HR})
      let labelsArray = _.map(bpRes, function(bp){
        return _.isObject(bp) ? bp.Date : null
      })

      let bpData = {
        labels: labelsArray,
        series: [systolicArray,diastolicArray]
      }
      let bpOpt = {
        high: _.max(systolicArray)+20
      }
      bpOpt = Object.assign(bpOpt, this._commonOptions())
      bpOpt['axisX'].labelInterpolationFnc = this._interpolFuncX.bind(this, systolicArray, true)
      bpOpt['axisY'].labelInterpolationFnc = this._interpolFuncY.bind(this, systolicArray, 'mmHg')

      let hrData = {
        labels: labelsArray,
        series: [heartrateArray]
      }
      let hrOpt = {
        showArea: true,
        showLine: false,
        high: _.max(heartrateArray)
      }
      hrOpt = Object.assign(hrOpt, this._commonOptions())
      hrOpt['axisX'].labelInterpolationFnc = this._interpolFuncX.bind(null, heartrateArray, true)
      hrOpt['axisY'].labelInterpolationFnc = this._interpolFuncY.bind(null, heartrateArray, 'bpm')

      return (
        <div style={style}>
          {this._renderHeader()}
          <div style={this.styles.titleSmall}><span style={this.styles.titleInnerSmall}>Blood Pressure</span></div>
          <RC.Loading isReady={this.data.isReady} loadingStyle={this.styles.graphArea} style={this.styles.graphArea}>
            {this.data.measurements && this.data.measurements.length > 0 ?
              <RC.Chart className="bp" data={bpData} options={bpOpt} listener={h.ChartMixins.ColorBloodPressure(systolicArray,diastolicArray)} type="Line" />
              : <div> </div>
            }
          </RC.Loading>
          <div style={this.styles.titleSmall}><span style={this.styles.titleInnerSmall}>Heart Rate</span></div>
          <RC.Loading isReady={this.data.isReady} loadingStyle={this.styles.graphArea} style={this.styles.graphArea}>
            {this.data.measurements && this.data.measurements.length > 0 ?
              <RC.Chart className="heartrate" data={hrData} options={hrOpt} type="Line" />
              : <div> </div>
            }
          </RC.Loading>
        </div>
      )
    }
    else {
      return (
        <div style={style}>
          {this._renderHeader()}
          <div style={this.styles.titleSmall}><span style={this.styles.titleInnerSmall}>Blood Pressure</span></div>
          <RC.Loading isReady={false} loadingStyle={this.styles.graphArea} style={this.styles.graphArea}>
          </RC.Loading>
          <div style={this.styles.titleSmall}><span style={this.styles.titleInnerSmall}>Heart Rate</span></div>
          <RC.Loading isReady={false} loadingStyle={this.styles.graphArea} style={this.styles.graphArea}>
          </RC.Loading>
        </div>
      )
    }
  }
}

IH.RC.TrendsBP.displayName = "IH.RC.TrendsBP"

IH.RC.TrendsBP.propTypes = Object.assign({}, IH.RC.TrendsBP.propTypes, {
  style: React.PropTypes.object
})
