
IH.RC.EmployeeCampaignList = class extends RC.CSSMeteorData {
  constructor(p) {
    super(p)
    this.itemsPerPage = 10
    this.state = {
      sortParams: {endDate: -1},
      currentPage: 1
    }
  }

  getMeteorData() {
    let campaignQuery = {
      groups: {
        $in: this.props.employee.groups
      }
    }
    let campaignsSubs = Meteor.subscribe('campaigns', campaignQuery, this.state.sortParams, this.itemsPerPage, this.state.currentPage)
    let campaigns = IH.Coll.CampaignsClient.find({}, {sort: this.state.sortParams}).fetch()
    let totalPages = Counts.get('campaignsCount') / this.itemsPerPage

    return {
      isReady: campaignsSubs.ready(),
      campaigns: campaigns,
      totalPages: totalPages
    }
  }

  _showCampaign(_id) {
    FlowRouter.go('/campaign/' + _id)
  }

  _handleTableHeadClick(field) {
    let sort = this.state.sortParams[field]
    let sortParams = {}
    sortParams[field] = sort ? (-1 * sort) : 1
    this.setState({sortParams: sortParams, currentPage: 1})
  }

  _getTableHead() {
    return [{
      text: "Campaign Name",
      width: "37.5%",
      onClick: this._handleTableHeadClick.bind(this, 'name'),
      sort: true
    },{
      text: "Start Date",
      width: 110,
      onClick: this._handleTableHeadClick.bind(this, 'startDate'),
      sort: true
    },{
      text: "End Date",
      width: 110,
      onClick: this._handleTableHeadClick.bind(this, 'endDate'),
      sort: true
    },{
      text: "Progress",
      onClick: this._handleTableHeadClick.bind(this, 'progress'),
      sort: true
    },{
      text: "Groups",
      onClick: this._handleTableHeadClick.bind(this, 'groups'),
      sort: true,
      ellipsis: true
    },{
      text: "Points",
      align: "right",
      onClick: this._handleTableHeadClick.bind(this, 'points'),
      sort: true
    }]
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

  _renderTable() {
    if(this.data.campaigns) {
      let tableData = this.data.campaigns.map( (row) => {
        return {
          name: row.name,
          startDate: row.startDate,
          endDate: row.endDate,
          progress: `${Math.round(row.progress * 100)}%`, //this._getProgress(row),
          groups: IH.Campaign.getGroups(row.groups),
          points: row.points,
          rowProps: {
            onClick: this._showCampaign.bind(this, row._id)
          }
        }
      })
      let sortParams = this.state.sortParams
      let name = 'endDate'
      let sort = 'asc'
      if(Object.keys(sortParams).length > 0) {
        name = Object.keys(sortParams)[0]
        sort = sortParams[name] === -1 ? 'desc' : 'asc'
      }
      const table = {
        headerBgColor: "gray",
        data: tableData,
        header: this._getTableHead(),
        sortBy: { name: name, sort: sort },
        isReady: this.data.isReady
      }

      return <RC.TableAuto {... table} />
    }
  }

  render() {
    return <div>
      {this._renderTable()}
      {this._renderPagination()}
    </div>    
  }
}

IH.RC.EmployeeCampaignList.displayName = "IH.RC.EmployeeCampaignList"

IH.RC.EmployeeCampaignList.propTypes = Object.assign({}, IH.RC.EmployeeCampaignList.propTypes, {
  employee: React.PropTypes.object
})
