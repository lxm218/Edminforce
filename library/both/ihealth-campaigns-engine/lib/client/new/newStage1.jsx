
IH.NewCampaignStage1 = class extends RC.CSSMeteorData {
  constructor(p) {
    super(p)
    this.initialMin = 15
    this.initialMax = 100
    let selectedGroups = []
    let campaign = this.props.campaign
    let qualifications = this.props.campaign.qualifications
    if(qualifications) {
      if(qualifications.age) {
        this.initialMin = qualifications.age['min']
        this.initialMax = qualifications.age['max']
      }
      if(qualifications.groups) {
        selectedGroups = qualifications.groups
      }
    }
    this.state = {
      minAge: campaign.minAge || this.initialMin,
      maxAge: campaign.maxAge || this.initialMax,
      gender: campaign.gender || 'Both',
      employeeQuery: {},
      selectedGroups: selectedGroups,
      name: this.props.campaign.name || '',
      windowWidth: window.innerWidth
    }
    this.setWindowWidth = () => {
      this.setState({windowWidth: window.innerWidth})
    }
    this.criticalWidth = 920
    this.today = new Date()
  }

  getMeteorData() {
    let employeeQuery = this.state.employeeQuery
    let employeesSubs = Meteor.subscribe('employeesTest', employeeQuery)
    let groupNames = Meteor.settings.public.groupNames
    let groupData = _.map(groupNames, (name) => {
      let query = Object.assign({'profile.groups': name}, employeeQuery)
      let number = Meteor.users.find(query).count()
      return {
        name: name,
        number: number
      }
    })
    groupData.unshift({
      name: 'Everyone',
      number: Meteor.users.find(employeeQuery).count()
    })
    let query = { 'profile.groups': {$in: this.state.selectedGroups} }
    Object.assign(query, employeeQuery)
    let qualifiedCount = Meteor.users.find(query).count()

    return {
      groups: groupData,
      isReady: employeesSubs.ready(),
      qualifiedCount: qualifiedCount
    }
  }

  componentDidMount() {
    super.componentDidMount && super.componentDidMount()
    window.addEventListener('resize', this.setWindowWidth)
    this._updateCampaign()
  }

  componentWillUnmount() {
    super.componentWillUnmount && super.componentWillUnmount()
    window.removeEventListener('resize', this.setWindowWidth)
  }

  _calculateDate(age) {
    return new Date(this.today - age * 31556952000)
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
    this.setState({gender: gender})
    this._updateCampaign()
  }

  _handleMinAgeChange() {
    Meteor.defer( () => {
      let minAge = parseInt(this.refs.min.getValue()) || 1
      this.setState({minAge: minAge})
      this._updateCampaign()
    })
  }

  _handleMaxAgeChange() {
    Meteor.defer( () => {
      let maxAge = parseInt(this.refs.max.getValue()) || 100
      this.setState({maxAge: maxAge})
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
    let inputStyle = {
      width: '20%',
      display: 'inline-block',
      marginLeft: '5%',
      transform: 'translate(0, 0.75em)'
    }
    return (
      <div>
        <RC.Input key="min" ref="min" value={this.state.minAge} label="Min Age:" labelColor="brand2" onChange={this._handleMinAgeChange.bind(this)} style={inputStyle} />
        <RC.Input key="max" ref="max" value={this.state.maxAge} label="Max Age:" labelColor="brand2" onChange={this._handleMaxAgeChange.bind(this)} style={inputStyle} />
      </div>
    )
  }

  _renderGenderFilter() {
    let selectProps = {
      name: 'gender',
      theme: 'stacked-label',
      options: ["Both", "Male", "Female"],
      value: this.state.gender,
      label: 'Gender',
      labelColor: 'brand2'
    }
    let selectStyle = {
      bottom: '-1em'
    }
    return <RC.Select {...selectProps} style={selectStyle} onChange={this._handleSelect.bind(this)} />
  }

  _renderFilters() {
    let paragraphStyle = {
      color: RC.Theme.color.gray
    }
    let windowWidth = this.state.windowWidth
    let widthArr = ['50%', '50%']
    if(windowWidth < this.criticalWidth) {
      widthArr = ['100%', '100%']
    }

    return (
      <div>
        <p style={paragraphStyle}>Which employee groups can participate in this campaign?</p>
        <RC.Grid theme={["paddingPx"]}>
          <RC.GridItem theme={["paddingPx"]} width={widthArr[0]}>
             {this._renderGenderFilter()}
          </RC.GridItem>
          <RC.GridItem width={widthArr[1]}>
            {this._renderAgeFilter()}
          </RC.GridItem>
        </RC.Grid>
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
      let employeeQuery = {'profile.roleTest': 'employee'}
      if(this.state.gender !== 'Both') {
        employeeQuery['profile.gender'] = this.state.gender
      }
      if(this.state.minAge && this.state.maxAge) {
        employeeQuery['$and'] = [
          {'profile.dob': {'$lte': this._calculateDate(this.state.minAge)}},
          {'profile.dob': {'$gte': this._calculateDate(this.state.maxAge)}}
        ]
      }
      this.setState({employeeQuery: employeeQuery})
      let campaign = this.props.campaign
      campaign.qualifications = Object.assign({groups: this.state.selectedGroups}, employeeQuery)
      campaign.groups = this.state.selectedGroups
      campaign.minAge = this.state.minAge
      campaign.maxAge = this.state.maxAge
      campaign.gender = this.state.gender
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
      {this._renderFilters()}
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

