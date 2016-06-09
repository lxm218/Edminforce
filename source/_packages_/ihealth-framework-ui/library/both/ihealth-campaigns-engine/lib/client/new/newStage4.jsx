
IH.NewCampaignStage4 = class extends RC.CSS {
  constructor(p) {
    super(p)
    this.timeoutDuration = 600
  }

  componentDidMount() {
    if(!this.props.campaign.points) {
      this.props.campaign.points = 1000
    }
  }

  _isValid() {
    let isValid = !isNaN(this.props.campaign.points)
    if(!isValid) {
      let errorMessage = 'The points have to be a number'
      IH.Dispatcher.App.dispatch({type:"error", errorMessage: errorMessage})
    }
    return isValid
  }

  _previous() {
    this.props.submitHandler(-1)
  }

  _successMessage() {
    return 'You have sucessfully created a new campaign!'
  }

  _showSuccessToastr() {
    let text = this._successMessage()
    let newMsg = {
      bgColor: 'green',
      title: 'Success',
      text: text,
      timeoutDuration: 6000
    }
    IH.Dispatcher.App.dispatch({type:"AddToastr", payload: newMsg})
  }

  _submit() {
    let isValid = this._isValid()
    if(isValid) {
      let message = 'Submitting...You will be redirected to the campaign page'
      IH.Dispatcher.App.dispatch({type: "Freeze", payload: {message: message}})
      this.submitTime = new Date()
      this._hanldeSubmit()
    }
  }

  _submitSuccess(_id) {
    this._showSuccessToastr()
    this.timeoutDuration -= (new Date() - this.submitTime) //have the same timeout each time to make the page transition more smooth
    Meteor.setTimeout( () => {
      IH.Dispatcher.App.dispatch({type: "Unfreeze"})
      FlowRouter.go('/campaign/' + _id)
    }, this.timeoutDuration)
  }

  _hanldeSubmit() {
    let campaign = this.props.campaign
    campaign.status = 'created'
    campaign.qualifications = JSON.stringify(this.props.campaign.qualifications)
    IH.Coll.Campaigns.insert(campaign, (err, _id) => {
      if(!err) {
        this._submitSuccess(_id)
      }
    })
  }

  _editGroups() {
    this.props.submitHandler(-3)
  }

  _editDates() {
    this.props.submitHandler(-2)
  }

  _editGoal() {
    this.props.submitHandler(-1)
  }

  _changePoints() {
    Meteor.defer( () => {
      let points = parseInt(this.refs.points.getValue())
      this.props.campaign.points = points
    })
  }

  _renderTitle() {
    let name = this.props.campaign.name || 'Reward Page'
    return (
      <p style={{color: RC.Theme.color.gray}}>
        {name}
      </p>
    )
  }
  
  _renderTable() {
    let campaign = this.props.campaign
    let dateString = moment(campaign.startDate).calendar() + ' - ' + moment(campaign.endDate).calendar()
    let goal = campaign.goals ? campaign.goals.overall.description : ''
    let points = campaign.points || 1000
    let tableData = [{
      column1: 'Groups',
      column2: IH.Campaign.getGroups(campaign.qualifications.groups),
      column3: {
        text: <RC.Button onClick={this._editGroups.bind(this)}>Edit</RC.Button>
      }
    }, {
      column1: 'Time',
      column2: dateString,
      column3:  {
        text: <RC.Button onClick={this._editDates.bind(this)}>Edit</RC.Button>
      }
    },{
      column1: 'Goal',
      column2: goal,
      column3:  {
        text: <RC.Button onClick={this._editGoal.bind(this)}>Edit</RC.Button>
      }
    },{
      column1: 'Points',
      column2: {
        text: <RC.Input ref='points' onChange={this._changePoints.bind(this)} value={points} />
      }
    }]

    const tableHead = [{
      text: " ",
      bgColor: "#100"
    },{
      text: " ",
      bgColor: "#555",
      width: 425,
      align: "right"
    },{
      text: " ",
      bgColor: "#555",
      width: 270,
      align: "right"
    }]

    return <RC.TableAuto data={tableData} header={tableHead} />
  }

  _renderButtons() {
    return <div>
      <RC.Button theme={["inline","big"]} onClick={this._previous.bind(this)}>Prev</RC.Button>
      <RC.Button theme={["inline","big"]} onClick={this._submit.bind(this)}>Finish</RC.Button>
    </div>
  }

  render() {
    return <RC.Div theme={["padding-tb"]} center={true} relative={true}>
      {this._renderTitle()}
      {this._renderTable()}
      {this._renderButtons()}
    </RC.Div>
  }
}
IH.NewCampaignStage4.displayName = "IH.NewCampaignStage4"

IH.NewCampaignStage4.propTypes = Object.assign({}, IH.NewCampaignStage4.propTypes, {
  submitHandler: React.PropTypes.func,
  campaign: React.PropTypes.object
})