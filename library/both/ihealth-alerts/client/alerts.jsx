
IH.Alerts = class extends RC.CSSMeteorData {
  constructor(p) {
    super(p)
    this.itemsPerPage = 10
    this.state = {
      sortParams: {name: 1},
      currentPage: 1
    }
  }

  getMeteorData() {
    let subs = Meteor.subscribe('alertsTest', {dismissed: {$ne:true}}, this.state.sortParams, this.itemsPerPage, this.state.currentPage)
    let alerts = IH.Coll.AlertsTest.find({dismissed: {$ne:true}}, {sort: this.state.sortParams}).fetch()
    let totalPages = Counts.get('alertsTestCount') / this.itemsPerPage
    alerts.forEach((alert)=>{
      alert.color = "red"
    })
    return {
      isReady: subs.ready(),
      alerts: alerts,
      totalPages: totalPages
    }
  }

  _dismissAlert(id){
    Meteor.call("dismissAlert", id);
  }

  _handleTableHeadClick(field) {
    let sort = this.state.sortParams[field]
    let sortParams = {}
    sortParams[field] = sort ? (-1 * sort) : 1
    this.setState({sortParams: sortParams, currentPage: 1})
  }

  _renderPagination() {
    const pagination = {
      total: this.data.totalPages,
      cur: this.state.currentPage,
      onChange: (val) => {
        this.setState({currentPage: parseInt(val)})
      }
    }
    return <RC.Pagination {... pagination} />
  }


  renderTableRows() {
    const buttonStyle = {
      margin: '-0.5em'
    }
    const alerts = this.data.alerts;
    return alerts.map((alert)=>{
      const rand = Math.random();
      const colorStyle = {
        height: '1em',
        width: '1em',
        backgroundColor: rand > 0.5 ? "#FF4136" : "#FFDC00",
        borderRadius: '2px'
      }
      return (
        <RC.TR key={alert._id} >
          <RC.TD><div style={colorStyle}></div></RC.TD>
          <RC.TD>{alert.name}</RC.TD>
          <RC.TD>{alert.groups}</RC.TD>
          <RC.TD>{alert.reading}</RC.TD>
          <RC.TD>{alert.measurement}</RC.TD>
          <RC.TD><RC.Button style={buttonStyle}>Message</RC.Button></RC.TD>
          <RC.TD style="cursor:pointer;" onClick={this._dismissAlert.bind(this, alert._id)}>&#10006;</RC.TD>

        </RC.TR>
      )
    })
  }

  render() {
    return (
      <div>
        <RC.Table>
            <RC.THead >
              <RC.TR>
                <RC.TH></RC.TH>
                <RC.TH onClick={this._handleTableHeadClick.bind(this, "name")}>Name</RC.TH>
                <RC.TH onClick={this._handleTableHeadClick.bind(this, "groups")}>Conditions</RC.TH>
                <RC.TH onClick={this._handleTableHeadClick.bind(this, "reading")}>Reading</RC.TH>
                <RC.TH onClick={this._handleTableHeadClick.bind(this, "measurement")}>Measurement</RC.TH>
                <RC.TH>Message</RC.TH>
                <RC.TH>Dismiss</RC.TH>
              </RC.TR>
            </RC.THead>

            <RC.TBody>
              {this.renderTableRows()}
            </RC.TBody>
          </RC.Table>
        {this._renderPagination()}
      </div>
    )
  }
}

IH.Alerts.displayName = "IH.Alerts"
