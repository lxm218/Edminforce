"use strict"

IH.NewCampaignStage3 = class extends RC.CSSMeteorData {
  constructor(p) {
    super(p)
    this.state = {
      goalId: null,
      search: null,
      paramHash: {}
    }
  }

  getMeteorData() {
    Meteor.subscribe('predefinedGoalsTest')
    let goals = IH.Coll.PredefinedGoalsTest.find().fetch()
    goals.unshift({description: ''})

    return {
      goals: goals
    }
  }

  componentDidMount() {
    let subGoal = this.props.campaign.goals && this.props.campaign.goals.subGoals[0]
    if(subGoal) {
      this.setState({goalId: subGoal.GID})
      let paramHash = {}
      paramHash[subGoal.GID] = subGoal.paramValue
      this.setState({paramHash: paramHash})  
    }
  }

  // @@@@
  // @@@@
  // Private
  // @@@@
  // @@@@
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
        let subGoal = {
          GID: goalId,
          description: description
        }
        if(param && !isNaN(Number(param))) {
          subGoal.paramValue = Number(param)
        }
        let overall = {
          GID: '999999',
          paramValue: duration,
          description: description + ' for ' + duration + ' days.'
        }
        let goals = {
          overall: overall,
          subGoals: [subGoal]
        }
        this.props.campaign.goals = goals
      }
    })
  }

  _searchGoal(e) {
    const value = e.target.value.length > 2 ? e.target.value : null
    this.setState({search: value})
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

  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@
  _renderTitle() {
    return <p style={{color: RC.Theme.color.gray}}>What is the goal for this campaign?</p>
  }

  _renderSearch() {
    return <RC.Input placeholder="Search" onChange={this._searchGoal.bind(this)}/>
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

  _renderSearchResults() {
    let search = this.state.search
    let goalId = this.state.goalId
    if(search) {
      let goals = _.filter( this.data.goals, (goal) => {
        const regx = new RegExp(search.toLowerCase())
        return regx.test(goal.description.toLowerCase())
      })

      goals = goals.map( (goal,n) => {
        const props = {
          onClick: this._selectGoal.bind(this,goal),
          bgColor: goalId==goal._id ? "brand1" : "white",
          hoverBgColor: goalId==goal._id ? "brand1" : "fog",
          key: n
        }
        return <RC.Item {... props}>{goal.description}</RC.Item>
      })

      return (
        <div>
          {goals} <br /><br />
        </div>
      )
    }
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
        {this._renderSearchResults()} <br />
        <p style={{color: RC.Theme.color.gray}}>Select a goal here: </p> <br />
        <RC.Select options={options} value={description} label="Goals" onChange={this._handleSelect.bind(this)} />
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
    //console.log(this.props.campaign)
    return <RC.Div theme={["padding-tb"]} center={true} relative={true}>
      {this._renderTitle()}
      {this._renderSearch()}
      {this._renderGoals()} <br />
      {this._renderSelectedGoal()} <br /><br />
      {this._renderButtons()}
    </RC.Div>
  }
}
IH.NewCampaignStage3.displayName = "IH.NewCampaignStage3"

IH.NewCampaignStage3.propTypes = Object.assign({}, IH.NewCampaignStage3.propTypes, {
  submitHandler: React.PropTypes.func,
  campaign: React.PropTypes.object
})

