
IH.RC.TrendsBPSolo = class extends IH.RC.TrendsCommon {
  constructor(p) {
    super(p)
    this.backgroundColor = 'rgb(234,120,130)'
    this.styles = this.getStyles()
  }

  getMeteorData() {
    let measurements = this._getMeasurement(_.clone(this._getSampleBPData()))
    return {
      isReady: true,
      measurements: measurements
    }
  }

  render() {
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
      let labelsArray = _.map(bpRes, function(bp){
        return _.isObject(bp) ? bp.MDate : null
      })

      let bpData = {
        labels: labelsArray,
        series: [systolicArray,diastolicArray]
      }
      let bpOpt = {
        high: _.max(systolicArray)+20
      }
      bpOpt = Object.assign(bpOpt, this._commonOptions())
      bpOpt['axisX'].labelInterpolationFnc = this._interpolFuncX.bind(this, systolicArray)
      bpOpt['axisY'].labelInterpolationFnc = this._interpolFuncY.bind(this, systolicArray, 'mmHg')

      let hrData = {
        labels: labelsArray,
        series: [heartrateArray]
      }
      let hrOpt = {
        showArea: true,
        showLine: false,
        high: _.max(heartrateArray)+20
      }
      hrOpt = Object.assign(hrOpt, this._commonOptions())
      hrOpt['axisX'].labelInterpolationFnc = this._interpolFuncX.bind(null, heartrateArray)
      hrOpt['axisY'].labelInterpolationFnc = this._interpolFuncY.bind(null, heartrateArray, 'bpm')
      let style = Object.assign(_.clone(this.styles.area), this.props.style)

      let listener = function() {
        var customLabels = []
        let labelDisplayed = [false, false]
        return {
          draw: function(data) {
            if(data.type === 'label' && data.y === 180) {
              let text = data.text + ''
              text = text.replace(new RegExp('&nbsp;', 'g'), '')
              if(text === '06:51' && !labelDisplayed[0]) {
                labelDisplayed[0] = true
                data.group.elem('text', {
                  x: data.x + 10,
                  y: data.y,
                  transform: 'rotate(-90, ' + data.x + ', ' + data.y + ')'
                }, 'ct-label').text('dinner')
              }
              else if(text === '05:19' && !labelDisplayed[1]) {
                labelDisplayed[1] = true
                data.group.elem('text', {
                  x: data.x + 10,
                  y: data.y,
                  transform: 'rotate(-90, ' + data.x + ', ' + data.y + ')'
                }, 'ct-label').text('breakfast')
              }
            }
          }
        }
      }

      return (
        <div style={style}>
          <div style={this.styles.top}>
            <div style={this.styles.title}><span style={this.styles.titleInner}>Blood Pressure & Heart Rate</span></div>
            {this._renderTabSlider()}
          </div>
          <div style={this.styles.titleSmall}><span style={this.styles.titleInner}>Blood Pressure</span></div>
          <RC.Loading isReady={this.data.isReady} loadingStyle={this.styles.graphArea} style={this.styles.graphArea}>
            {this.data.measurements && this.data.measurements.length > 0 ?
              <RC.Chart className="bp" data={bpData} options={bpOpt} listener={h.ChartMixins.ColorBloodPressure(systolicArray,diastolicArray)} type="Line" />
              : <div> </div>
            }
          </RC.Loading>
          <div style={this.styles.titleSmall}><span style={this.styles.titleInner}>Heart Rate</span></div>
          <RC.Loading isReady={this.data.isReady} loadingStyle={this.styles.graphArea} style={this.styles.graphArea}>
            {this.data.measurements && this.data.measurements.length > 0 ?
              <RC.Chart className="heartrate" data={hrData} options={hrOpt} type="Line" listener={listener()} />
              : <div> </div>
            }
          </RC.Loading>
        </div>
      )
    }
  }
}

IH.RC.TrendsBPSolo.displayName = "IH.RC.TrendsBPSolo"

IH.RC.TrendsBPSolo.propTypes = Object.assign({}, IH.RC.TrendsBPSolo.propTypes, {
  style: React.PropTypes.object
})
