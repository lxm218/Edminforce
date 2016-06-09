
IH.NewCampaignStage1 = class extends RC.CSSMeteorData {
  constructor(p) {
    super(p)
    this.initialMin = 15
    this.initialMax = 100
    let selectedGroups = []
    let qualifications = this.props.campaign.qualifications
    if(qualifications) {
      if(qualifications.age) {
        this.initialMin = qualifications.age['$gte']
        this.initialMax = qualifications.age['$lte']
      }
      if(qualifications.groups) {
        selectedGroups = qualifications.groups
      }
    }
    this.state = {
      query: {
        age: {
          $gte: this.initialMin,
          $lte: this.initialMax
        }
      },
      selectedGroups: selectedGroups,
      name: this.props.campaign.name || ''
    }
  }

  getMeteorData() {
    let employeesSubs = Meteor.subscribe('employeesTest', {})
    let groupNames = Meteor.settings.public.groupNames
    let groupData = _.map(groupNames, (name) => {
      let employeesQuery = _.extend({groups: name}, this.state.query)
      let number = IH.Coll.EmployeesTest.find(employeesQuery).count()
      return {
        name: name,
        number: number
      }
    })
    groupData.unshift({
      name: 'Everyone',
      number: IH.Coll.EmployeesTest.find().count()
    })
    let query = { groups: {$in: this.state.selectedGroups} }
    _.extend(query, this.state.query)
    let qualifiedCount = IH.Coll.EmployeesTest.find(query).count()

    return {
      groups: groupData,
      isReady: employeesSubs.ready(),
      qualifiedCount: qualifiedCount
    }
  }

  _isValid() {
    let name = this.state.name
    let groups = this.state.selectedGroups
    let isValid = name && groups.length > 0
    if(!isValid) {
      var errorMessage
      if(!name) {
        errorMessage = 'Please enter the name of the campaign at the top of this page'
      }
      else {
        errorMessage = 'Please select at least 1 employee group'
      }
      IH.Dispatcher.App.dispatch({type:"error", errorMessage: errorMessage})
    }
    return isValid
  }

  _submit() {
    let isValid = this._isValid()
    this.props.submitHandler(1, isValid)
    let campaign = this.props.campaign
    campaign.qualifiedParticipants = this.data.qualifiedCount
  }

  _handleSelect(e) {
    let gender = e.target.value
    let query = _.clone(this.state.query)
    if(gender === 'Both') {
      delete query.gender
    }
    else {
      query.gender = gender
    }
    this.setState({query: query})
    this._updateCampaign()
  }

  _handleMinAgeChange() {
    Meteor.defer( () => {
      let query = _.clone(this.state.query)
      query.age['$gte'] = parseInt(this.refs.min.getValue()) || 1
      this.setState({query: query})
      this._updateCampaign()
    })
  }

  _handleMaxAgeChange() {
    Meteor.defer( () => {
      let query = _.clone(this.state.query)
      query.age['$lte'] = parseInt(this.refs.max.getValue()) || 100
      this.setState({query: query})
      this._updateCampaign()
    })
  }

  _handleTitleChange() {
    Meteor.defer( () => {
      let name = this.refs.title.getValue()
      this.props.campaign.name = name
      this.setState({name: name})
    })
  }

  _renderTitle() {
    let campaignName = this.props.campaign.name ? this.props.campaign.name : ''
    return <RC.Input placeholder="Campaign Title" color="brand1" theme="big" ref="title" value={campaignName} onChange={this._handleTitleChange.bind(this)} />
  }

  _renderAgeFilter() {
    let min = this.state.query.age['$gte'] || this.initialMin
    let max = this.state.query.age['$lte'] || this.initialMax
    let inputDivStyle = {
      width: '40%',
      display: 'inline-block',
      marginLeft: '5%'
    }
    let inputStyle = {
      width: '20%',
      display: 'inline-block',
      marginLeft: '5%',
      transform: 'translate(0, 0.75em)'
    }
    return (
      <div style={inputDivStyle}>
        <RC.Input ref="min" value={min} label='Min Age:' onChange={this._handleMinAgeChange.bind(this)} style={inputStyle} />
        <RC.Input ref="max" value={max} label='Max Age:' onChange={this._handleMaxAgeChange.bind(this)} style={inputStyle} />
      </div>
    )
  }

  _renderGenderFilter() {
    let gender = 'Both'
    let qualifications = this.props.campaign.qualifications
    if(qualifications && qualifications.gender) {
      gender = qualifications.gender
    }
    let selectProps = {
      name: 'gender',
      theme: 'stacked-label',
      options: ["Both", "Male", "Female"],
      value: gender,
      label: 'Gender',
      labelColor: 'brand3'
    }
    let selectStyle = {
      width: '40%',
      display: 'inline-block',
      bottom: '-1em'
    }
    return <RC.Select {...selectProps} style={selectStyle} onChange={this._handleSelect.bind(this)} />
  }

  _renderFilter() {
    let paragraphStyle = {
      color: RC.Theme.color.gray
    }
    return (
      <div>
        <p style={paragraphStyle}>Which employee groups can participate in this campaign?</p>
        {this._renderGenderFilter()}
        {this._renderAgeFilter()}
      </div>
    )
  }

  _handleRowClick(name) {
    //de-select ‘Everyone’ when any of the other group is de-selected, select ‘Everyone’ when all of the other group is selected
    let selectedGroups = _.clone(this.state.selectedGroups)
    if(selectedGroups.indexOf(name) === -1) {
      if(name === 'Everyone') {
        selectedGroups = this.data.groups.map((groupData) => { return groupData.name })
      }
      else {
        selectedGroups.push(name)
        if(this.data.groups.length === selectedGroups.length + 1) {
          selectedGroups.push('Everyone')
        }
      }
    }
    else {
      if(name === 'Everyone') {
        selectedGroups = []
      }
      else {
        selectedGroups.splice(selectedGroups.indexOf(name), 1)
        if(selectedGroups.indexOf('Everyone') !== -1) {
          selectedGroups.splice(selectedGroups.indexOf('Everyone'), 1)
        }
      }
    }
    this.setState({selectedGroups: selectedGroups})
    this._updateCampaign()
  }

  _updateCampaign() {
    Meteor.defer( () => {
      let campaign = this.props.campaign
      campaign.qualifications = Object.assign({groups: this.state.selectedGroups}, this.state.query)
      campaign.groups = this.state.selectedGroups
    })
  }

  _getCheckbox(group, index) {
    let checkboxStyle = {
      'transform': 'scale(1.5)',
      'WebkitTransform': 'scale(1.5)'
    }
    let selectedGroups = this.state.selectedGroups
    if(selectedGroups.indexOf(group.name) !== -1) {
      return <RC.Checkbox style={checkboxStyle} key={group.name + '1'} theme="right" ref={group.name} checked={true} /> 
    }
    else {
      return <RC.Checkbox style={checkboxStyle} key={group.name} theme="right" ref={group.name} />
    }            
  }

  _renderTable() {
    const tableData = this.data.groups.map( (group, index) => {
      group = _.clone(group)
      let name = group.name
      group.select = {
        text: this._getCheckbox(group, index),
        onClick: this._handleRowClick.bind(this, name)
      }
      group.name = {
        text: name,
        onClick: this._handleRowClick.bind(this, name)
      }
      group.number = {
        text: group.number,
        onClick: this._handleRowClick.bind(this, name)
      }
      return group
    })

    let qualifiedCount = this.data.qualifiedCount
    tableData.push({
      name: {
        text: 'Total Number of Qualified Participants',
        bgColor: 'brand2'
      },
      number: {
        text: qualifiedCount,
        bgColor: 'brand2'
      },
      select: {
        text: ' ',
        bgColor: 'brand2'
      }
    })
    
    const tableHead = [{
      text: "Employee Group",
      bgColor: "#555"
    },{
      text: "Population",
      bgColor: "#555",
      width: 175,
      align: "right"
    },{
      text: "Select",
      bgColor: "#555",
      width: 70,
      align: "right"
    }]
    return <RC.TableAuto data={tableData} header={tableHead} isReady={this.data.isReady} />
  }

  _renderButtons() {
    return <RC.Button theme={["inline","big"]} onClick={this._submit.bind(this)}>Next</RC.Button>
  }

  render() {
    return <RC.Div theme="padding-tb" center={true} relative={true}>
      {this._renderTitle()}
      {this._renderFilter()}
      {this._renderTable()}
      {this._renderButtons()}
    </RC.Div>
  }
}

IH.NewCampaignStage1.displayName = "IH.NewCampaignStage1"

IH.NewCampaignStage1.propTypes = Object.assign({}, IH.NewCampaignStage1.propTypes, {
  submitHandler: React.PropTypes.func,
  campaign: React.PropTypes.object
})

