
IH.RC.EmployeeTrends = class extends RC.CSS {
  constructor(p) {
    super(p)
    this.criticalWidth = 1180
  }

  render() {
    var graphWidth = '100%'
    if(this.props.windowWidth < this.criticalWidth) {
      graphWidth = '100%'
    }
    let graphsContainerStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      width: '100%'
    }
    let graphStyle = {
      width: graphWidth,
      marginBottom: '2em'
    }
    let itemtyle = {
      width: '100%',
      backgroundColor: 'white',
      textAlign: 'center',
      color: 'rgba(1,1,1,0.7)'
    }
    return (
      <div>
        <div style={graphsContainerStyle}>
          <div style={graphStyle}>
            <div style={itemtyle}>
              <RC.Item>Blood Pressure & Heart Rate</RC.Item>
              <IH.Device.BPTrends userId={this.props.employee._id} />
            </div>
          </div><br/>
          <div style={graphStyle}>
            <div style={itemtyle}>
              <RC.Item>Activity</RC.Item>
              <IH.Device.AMTrends userId={this.props.employee._id} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

IH.RC.EmployeeTrends.displayName = "IH.RC.EmployeeTrends"

IH.RC.EmployeeTrends.propTypes = Object.assign({}, IH.RC.EmployeeTrends.propTypes, {
  employee: React.PropTypes.object,
  windowWidth: React.PropTypes.number
})
