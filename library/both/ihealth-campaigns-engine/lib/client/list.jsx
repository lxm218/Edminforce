"use strict"

IH.ListCampaigns = class extends RC.CSSMeteorData {
  constructor(p) {
    super(p)
    this.itemsPerPage = 10
    this.statusList = ["created", "enrollStarted", "started", "ended"]
    this.state = {
      statusList: this.statusList,
      groupList: null,
      sortParams: {endDate: -1},
      lastSearchTime: new Date(),
      search: '',
      currentPage: 1,
      showStartDate: false,
      showEndDate: false,
      startDate: '',
      endDate: ''
    }
  }

  getMeteorData() {
    let campaignQuery = this._getCampaignQuery()
    let campaignsSubs = Meteor.subscribe('campaigns', campaignQuery, this.state.sortParams, this.itemsPerPage, this.state.currentPage)
    let campaigns = IH.Coll.CampaignsClient.find({}, {sort: this.state.sortParams}).fetch()
    let totalPages = Counts.get('campaignsCount') / this.itemsPerPage

    let groupList = _.clone(Meteor.settings.public.groupNames)
    groupList.unshift('Everyone')

    return {
      isReady: campaignsSubs.ready(),
      campaigns: campaigns,
      totalPages: totalPages,
      groupList: groupList
    }
  }

  _getCampaignQuery() {
    let query = {
      status: {
        $in: this.state.statusList
      },
      groups: {
        $in: this.state.groupList || this.data.groupList
      },
      name: {
        $regex: this.state.search,
        '$options' : 'i'
      }
    }

    if(this.state.startDate) {
      query['startDate'] = {'$gte': this.state.startDate}
    }
    if(this.state.endDate) {
      query['endDate'] = {'$lte': this.state.endDate}
    }

    return query
  }

  _getStatusLabel(str) {
    switch(str) {
      case 'created':
        return 'Upcoming'
      case 'enrollStarted':
        return 'Enrollmont Started'
      case 'started':
        return 'Running'
      case 'ended':
        return 'Finished'
    }
  }

  _searchCampaign(e) {
    //use defer to get the most recent value from the input
    Meteor.defer( () => {
      let value = this.refs.search.getValue()
      value = value.length > 2 ? value : ''
      if(value !== this.state.search) {
        //have a 1 second interval between each mongo query on the search
        let currentTime = new Date()
        let timeDifference = currentTime - this.state.lastSearchTime
        if(timeDifference > 1000) {
          this.setState({
            search: value,
            lastSearchTime: currentTime
          })
        }
        else {
          Meteor.setTimeout( () => {
            this._searchCampaign(e)
          }, timeDifference)
        }
      }
    })
  }

  _handleStatusFilterChange(label, e, val) {
    //make sure val is a boolean (sometimes it is something else)
    if(typeof val === 'boolean') {
      let statusList = _.clone(this.state.statusList)
      if (val)
        statusList.push(label)
      else {
        statusList.splice(statusList.indexOf(label), 1)
      }
      this.setState({statusList: statusList})
    }
  }

  _handleGroupFilterChange(label, e, val) {
    if(typeof val === 'boolean') {
      //use _.clone so that shouldComponentUpdate can be triggered correctly
      let groupList = _.clone(this.state.groupList || this.data.groupList)
      if(val) {
        if(label === 'Everyone') {
          groupList = this.data.groupList
        }
        else {
          groupList.push(label)
          if(this.data.groupList.length === groupList.length + 1) {
            groupList.unshift('Everyone')
          }
        }
      }
      else {
        if(label === 'Everyone') {
          groupList = []
        }
        else {
          groupList.splice(groupList.indexOf(label), 1)
          if(groupList.indexOf('Everyone') !== -1) {
            groupList.splice(groupList.indexOf('Everyone'), 1)
          }
        }
      }
      this.setState({groupList: groupList})
    }
  }

  _renderGroupFilter() {
    let labels = this.data.groupList
    let checkboxList = labels.map( (label, index) => {
      let checked = !this.state.groupList || this.state.groupList.indexOf(label) !== -1
      return {
        label: label,
        ref: label,
        checked: checked,
        onClick: this._handleGroupFilterChange.bind(this, label)
      }
    })
    let leftList = _.clone(checkboxList).splice(0, Math.ceil(checkboxList.length / 2))
    let rightList = _.clone(checkboxList).splice(Math.ceil(checkboxList.length / 2))
    return <RC.CheckboxGroup key={Meteor.uuid()} options={[leftList, rightList]} label="Groups" labelColor="brand1" theme="smaller" />
  }

  _renderStatusFilter() {
    const statusFilter = this.statusList.map( (label, index) => {
      return {
        label: this._getStatusLabel(label),
        ref: label,
        checked: true,
        onClick: this._handleStatusFilterChange.bind(this,label)
      }
    })
    return <RC.CheckboxGroup options={statusFilter} label="Campaign Status" labelColor="brand1" theme="smaller" />
  }

  _renderDateFilter() {
    let style = {
      paddingRight: '1em'
    }
    let inputStyle = {
      display: 'inline-block'
    }
    let labelStyle = {
      fontSize: '0.9em'
    }
    let spanStyle = {
      fontSize: '0.9em',
      display: 'inline-block',
      cursor: 'pointer'
    }
    let startDate = this._formatDate(this.state.startDate)
    let endDate = this._formatDate(this.state.endDate)
    let removeStartDate = () => {this.setState({startDate: ''})}
    let removeEndDate = () => {this.setState({endDate: ''})}

    return (
      <div style={style}>
        <RC.CheckboxGroup key={Meteor.uuid()} options={[]} label="Select a Date Range" labelColor="brand1" theme="smaller" />
        <RC.Input style={inputStyle} theme="left" value={startDate} label="Begin Date" labelColor="brand2" formStyle={labelStyle} labelStyle={labelStyle} onClick={this._showStartDate.bind(this)} />
        {startDate ? <span style={spanStyle} onClick={removeStartDate.bind(this)}>X</span> : ''}
        <RC.Input style={inputStyle} theme="left" value={endDate} label="End Date" labelColor="brand2" formStyle={labelStyle} labelStyle={labelStyle} onClick={this._showEndDate.bind(this)} />
        {endDate ? <span style={spanStyle} onClick={removeEndDate.bind(this)}>X</span> : ''}
      </div>
    )
  }

  _renderTextFilter() {
    return <RC.Input label="Filter By Words" placeholder="Keywords ..." theme="smaller" labelColor="brand1" ref="search" onChange={this._searchCampaign.bind(this)} />
  }

  _formatDate(dateObj) {
    return dateObj ? moment(dateObj).format('MM/DD/YYYY') : ''
  }

  _handleTableHeadClick(field) {
    let sort = this.state.sortParams[field]
    let sortParams = {}
    sortParams[field] = sort ? (-1 * sort) : 1
    this.setState({sortParams: sortParams, currentPage: 1})
  }

  _getTableHead() {
    let widthArr = ['32%', '9%', '9%', '38%', '3%', '7%', '7%']
    let tableHead = [{
      text: "Campaign Name",
      onClick: this._handleTableHeadClick.bind(this, 'name')
    },{
      text: "Start Date",
      onClick: this._handleTableHeadClick.bind(this, 'startDate')
    },{
      text: "End Date",
      onClick: this._handleTableHeadClick.bind(this, 'endDate')
    },{
      text: "Groups",
      onClick: this._handleTableHeadClick.bind(this, 'groups')
    },{
      text: "Qualified Participants",
      onClick: this._handleTableHeadClick.bind(this, 'qualifiedParticipants')
    },{
      text: "Points",
      onClick: this._handleTableHeadClick.bind(this, 'points')
    },{
      text: "Progress",
      onClick: this._handleTableHeadClick.bind(this, 'progress')
    }]
    tableHead.forEach( (item, index) => {
      Object.assign(item, {sort: true, width: widthArr[index], align: "left"})
    })
    return tableHead
  }

  _showCampaign(_id) {
    FlowRouter.go('/campaign/' + _id)
  }

  _changeStartDate(y,m,d) {
    let startDate = new Date(m + ' ' + d + ' ' + y)
    this.setState({startDate: startDate})
    this._hideBackDrop()
  }

  _changeEndDate(y,m,d) {
    let endDate = new Date(m + ' ' + d + ' ' + y)
    this.setState({endDate: endDate})
    this._hideBackDrop()
  }

  _showStartDate() {
    this.setState({showStartDate: true})
  }

  _showEndDate() {
    this.setState({showEndDate: true})
  }

  _hideBackDrop() {
    this.setState({showStartDate: false, showEndDate: false})
  }

  _renderBackDrop() {
    if(this.state.showStartDate || this.state.showEndDate) {
      var onChange, currentDate
      if(this.state.showStartDate) {
        onChange = this._changeStartDate.bind(this)
        currentDate = this.state.startDate
      }
      else {
        onChange = this._changeEndDate.bind(this)
        currentDate = this.state.endDate
      }
      const datepicker = {
        date: currentDate || new Date(moment(new Date()).format('MM-DD-YYYY')),
        maxWidth: 350, theme: "inline",
        minDate: new Date(new Date().setYear(new Date().getFullYear() - 5)),
        maxDate: new Date(new Date().setYear(new Date().getFullYear() + 2)),
        onChange: onChange,
        lineColor: "rgba(0,0,0,.3)",
        firstPage: currentDate || new Date(moment(new Date()).format('MM-DD-YYYY'))
      }
      let style = {
        backgroundColor: 'white'
      }

      return (
        <RC.BackDropArea bgColor="backdrop" onClick={this._hideBackDrop.bind(this)}>
          <RC.Div style={style}>
            <RC.DatePicker {... datepicker} />
          </RC.Div>
        </RC.BackDropArea>
      )
    }
  }

  _renderAddButton() {
    let style = {
      width: '20%'
    }
    let redirect = () => {
      FlowRouter.go('/campaign/new')
    }
    return <RC.Button style={style} bgColor="brand1" bgColorHover="dark" onClick={redirect}>Add A Campaign</RC.Button>
  }

  _renderTable() {
    let tableData = this.data.campaigns.map( (row) => {
      return {
        name: row.name,
        startDate: row.startDate,
        endDate: row.endDate,
        groups: IH.Campaign.getGroups(row.groups),
        qualifiedParticipants: row.qualifiedParticipants,
        points: row.points,
        progress: {
          text: <progress value={Math.round(row.progress * 100)} max="100" />
        },
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

  _renderFilters() {
    return (
      <RC.Grid title="Search" titleBgColor="brand2" bgColor="white" theme={["paddingPx"]}>
        <RC.GridItem theme="paddingPx-r" width="100%">
          {this._renderTextFilter()}
        </RC.GridItem>
        <RC.GridItem theme="paddingPx-r" width="25%">
          {this._renderStatusFilter()}
        </RC.GridItem>
        <RC.GridItem theme="paddingPx-l" width="25%">
          {this._renderDateFilter()}
        </RC.GridItem>
        <RC.GridItem theme="paddingPx-l" width="50%">
          {this._renderGroupFilter()}
        </RC.GridItem>
      </RC.Grid>
    )
  }

  render() {
    return <div>
      {this._renderFilters()}
      {this._renderAddButton()}
      {this._renderTable()}
      {this._renderPagination()}
      {this._renderBackDrop()}
    </div>
  }
}
IH.ListCampaigns.displayName = "IH.ListCampaigns"
