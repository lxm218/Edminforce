"use strict"

IH.NewCampaignStage3 = class extends RC.CSSMeteorData {
  constructor(p) {
    super(p)
    this.deviceArr = ['All', 'BP Monitors', 'BG Monitors', 'Activity Monitors', 'Weight Scales']
    this.state = {
      goalId: null,
      paramHash: {},
      deviceArr: this.deviceArr,
      windowWidth: window.innerWidth
    }
    this.setWindowWidth = () => {
      this.setState({windowWidth: window.innerWidth})
    }
    this.criticalWidth = 1050
  }

  getMeteorData() {
    let query = this._getQuery()
    let subs = Meteor.subscribe('predefinedGoalsTest', query)
    let goals = IH.Coll.PredefinedGoalsTest.find(query).fetch()
    goals.unshift({description: ''})

    return {
      isReady: subs.ready(),
      goals: goals
    }
  }

  componentDidMount() {
    super.componentDidMount && super.componentDidMount()
    window.addEventListener('resize', this.setWindowWidth)
    let goals = this.props.campaign.goals
    if(goals) {
      this.setState({goalId: goals.GID})
      let paramHash = {}
      paramHash[goals.GID] = goals.paramValue
      this.setState({paramHash: paramHash})  
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount && super.componentWillUnmount()
    window.removeEventListener('resize', this.setWindowWidth)
  }

  _getQuery() {
    let deviceArr = this.state.deviceArr
    let dataTypeArr = deviceArr.map( (device) => {
      switch(device) {
        case 'BP Monitors': {return 'bp'}
        case 'BG Monitors': {return 'bg'}
        case 'Activity Monitors': {return ['activity', 'sleep']}
        case 'Weight Scales': {return 'weight'}
      }
    })
    dataTypeArr = _.flatten(dataTypeArr)
    
    return {
      dataTypes: {
        '$in': dataTypeArr
      }
    }
  }

  _isValid()  {
    let goalId = this.state.goalId
    let goal = this._getGoal()
    let paramValue = this.state.paramHash[goalId]
    let validParam = paramValue && !isNaN(Number(paramValue))
    let isValid = !!goalId && (validParam || !goal.pre)
    if(!isValid) {
      var errorMessage
      if(!goalId) {
        errorMessage = 'Please select at least one goal'
      }
      else {
        errorMessage = 'Please type in a number on the input filed'
      }
      IH.Dispatcher.App.dispatch({type:"error", errorMessage: errorMessage})
    }
    return isValid
  }

  _previous() {
    this.props.submitHandler(-1)
  }

  _submit() {
    let isValid = this._isValid()
    this.props.submitHandler(1, isValid)
    this._updateCampaign()
  }

  _updateCampaign() {
    Meteor.defer( () => {
      const goal = this._getGoal()
      if(goal) {
        let goalId = this.state.goalId
        let param = this.state.paramHash[goal._id]
        let description = param ? (goal.pre + ' ' + param + ' ' + goal.post) : goal.description
        let duration =  Math.ceil((this.props.campaign.endDate - this.props.campaign.startDate) / (1000 * 3600 * 24))
        let goals = {
          GID: goalId,
          description: description,
          duration: duration
        }
        if(param && !isNaN(Number(param))) {
          goals.paramValue = Number(param)
        }
        this.props.campaign.goals = goals
      }
    })
  }

  _selectGoal(goal) {
    this.setState({goalId: goal._id})
    this._updateCampaign()
  }

  _getGoal() {
    let goalId = this.state.goalId
    let goal = _.find(this.data.goals, (val) => {
      return val._id==goalId
    })
    return goal
  }

  _handleParam(goal, e) {
    let paramHash = _.clone(this.state.paramHash)
    paramHash[goal._id] = e.target.value
    this.setState({paramHash: paramHash})
    this._updateCampaign()
  }

  _handleFilterClick(value, index) {
    let originalArr = _.clone(this.deviceArr)
    let currentArr = _.clone(this.state.deviceArr)
    if(index === -1) {
      if(value === 'All') {
        currentArr = originalArr
      }
      else {
        currentArr.push(value)
        if(originalArr.length === currentArr.length + 1) {
          currentArr.push('All')
        }
      }
    }
    else {
      if(value === 'All') {
        currentArr = []
      }
      else {
        currentArr.splice(index, 1)
        if(currentArr.indexOf('All') !== -1) {
          currentArr.splice(currentArr.indexOf('All'), 1)
        }
      }
    }
    this.setState({deviceArr: currentArr})
  }

  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@

  _renderFilter() {
    let originalArr = _.clone(this.deviceArr)
    let currentArr = _.clone(this.state.deviceArr)
    let checkboxList = originalArr.map( (value, n) => {
      let index = currentArr && currentArr.indexOf(value)
      return {
        label: value,
        ref: value,
        checked: index !== -1,
        onClick: this._handleFilterClick.bind(this, value, index)
      }
    })
    let options = [checkboxList]
    if(checkboxList.length > 6) {
      let leftList = _.clone(checkboxList).splice(0, Math.ceil(checkboxList.length / 2))
      let rightList = _.clone(checkboxList).splice(Math.ceil(checkboxList.length / 2))
      options = [leftList, rightList]
    }
    let style = {
      textAlign: 'left'
    }

    return (
      <div style={style}>
        <span>Filter by Data Types:</span><br/>
        <RC.CheckboxGroup key={Meteor.uuid()} options={options} labelColor="brand1" theme="smaller" />
      </div>
    )
  }

  _renderTitle() {
    return <p style={{color: RC.Theme.color.gray}}>What is the goal for this campaign?</p>
  }

  _renderSelectedGoal() {
    let cardStyle = {
      padding: '1em'
    }
    let inputStyle = {
      'display': 'inline-block',
      'width': '5em'
    }
    let formStyle = {
      'display': 'inline-block',
      'textAlign': 'center'
    }
    let goal = this._getGoal()
    var card
    if(goal && goal.pre) {
      let value = this.state.paramHash[goal._id] ? this.state.paramHash[goal._id] : ''
      card = (
        <RC.Card style={cardStyle}>
          {goal.pre} 
          <RC.Input style={inputStyle} formStyle={formStyle} value={value} onChange={this._handleParam.bind(this, goal)} /> 
          {goal.post}
        </RC.Card>
      )
    }
    else if(goal && goal.description) {
      card = (
        <RC.Card style={cardStyle}>
          {goal.description}
        </RC.Card>
      )
    }
    if(card) {
      return <div>
        <p style={{color: RC.Theme.color.gray}}>Enter your goal below:</p>
        {card}
      </div>
    }
  }

  _handleSelect(e) {
    let description = e.target.value
    let goalObj = this.data.goals.filter( (goal) => {
      return goal.description === description
    })[0]
    this.setState({goalId: goalObj._id})
    this._updateCampaign()
  }

  _renderGoals() {
    let goals = this.data.goals
    let options = goals.map( (goal, index) => {
      return {
        text: goal.description
      }
    })
    let selectedGoal = goals.filter( (goal) => {
      return goal._id === this.state.goalId
    })[0]
    let description = selectedGoal && selectedGoal.description

    return (
      <div style={{margin: "20px 0"}}>
        <p style={{color: RC.Theme.color.gray}}>Select a goal here: </p> <br />
          <RC.Loading isReady={this.data.isReady}>
            <RC.Select options={options} value={description} label="Goals" onChange={this._handleSelect.bind(this)} />
          </RC.Loading>
      </div>
    )
  }

  _renderButtons() {
    return <div>
      <RC.Button theme={["inline","big"]} onClick={this._previous.bind(this)}>Prev</RC.Button>
      <RC.Button theme={["inline","big"]} onClick={this._submit.bind(this)}>Next</RC.Button>
    </div>
  }

  render() {
    let filterStyle = {
      backgroundColor: 'rgba(1,1,1,0.1)',
      margin: '1em',
      marginRight: '3em'
    }
    let windowWidth = this.state.windowWidth
    let widthArr = ['20%', '70%']
    if(windowWidth < this.criticalWidth) {
      widthArr = ['100%', '100%']
      filterStyle['marginRight'] = '1em'
    }

    return <RC.Div theme={["padding-tb"]} center={true} relative={true}>
      {this._renderTitle()}<br/>
      <RC.Grid bgColor="white" theme={["paddingPx"]}>
        <RC.GridItem theme={["paddingPx"]} width={widthArr[0]} style={filterStyle}>
          {this._renderFilter()}
        </RC.GridItem>
        <RC.GridItem width={widthArr[1]}>
          {this._renderGoals()}<br/>
        </RC.GridItem>
      </RC.Grid><br/>
      {this._renderSelectedGoal()}<br/><br/>
      {this._renderButtons()}
    </RC.Div>
  }
}
IH.NewCampaignStage3.displayName = "IH.NewCampaignStage3"

IH.NewCampaignStage3.propTypes = Object.assign({}, IH.NewCampaignStage3.propTypes, {
  submitHandler: React.PropTypes.func,
  campaign: React.PropTypes.object
})

