"use strict"

IH.NewCampaignStage2 = class extends RC.CSS {

  _isValid()  {
    let startDate = this.props.campaign.startDate
    let endDate = this.props.campaign.endDate
    let isValid = endDate > startDate
    if(!isValid) {
      let errorMessage = 'Please select an End Date which is bigger than the Begin Date'
      IH.Dispatcher.App.dispatch({type:"error", errorMessage: errorMessage})
    }
    return isValid
  }

  _previous() {
    this.props.submitHandler(-1)
  }
  
  _submit() {
    this._calculateEnrollDates()
    let isValid = this._isValid()
    this.props.submitHandler(1, isValid)
  }

  _calculateEnrollDates() {
    this.props.campaign.enrollFrom = new Date(moment(new Date()).format('MM-DD-YYYY'))
    this.props.campaign.enrollBy = this.props.campaign.startDate.addDays(7)
  }
  
  _changeStartDate(y,m,d) {
    this.props.campaign.startDate = new Date(m + ' ' + d + ' ' + y)
  }
  
  _changeEndDate(y,m,d) {
    this.props.campaign.endDate = new Date(m + ' ' + d + ' ' + y)
  }

  componentDidMount() {
    this.props.campaign.startDate = this.props.campaign.startDate || new Date(moment(new Date()).format('MM-DD-YYYY'))
    this.props.campaign.endDate = this.props.campaign.endDate || new Date(moment(new Date()).format('MM-DD-YYYY'))
  }

  _renderDatePickers() {
    const datepicker1 = {
      date: this.props.campaign.startDate || new Date(moment(new Date()).format('MM-DD-YYYY')),
      maxWidth: 350, theme: "inline",
      maxDate: new Date(new Date().setYear(new Date().getFullYear() + 1)),
      onChange: this._changeStartDate.bind(this),
      lineColor: "rgba(0,0,0,.3)",
      firstPage: this.props.campaign.startDate || new Date(moment(new Date()).format('MM-DD-YYYY'))
    }
    const datepicker2 = {
      date: this.props.campaign.endDate || new Date(moment(new Date()).format('MM-DD-YYYY')),
      maxWidth: 350, theme: "inline",
      maxDate: new Date(new Date().setYear(new Date().getFullYear() + 1)),
      onChange: this._changeEndDate.bind(this),
      lineColor: "rgba(0,0,0,.3)",
      firstPage: this.props.campaign.endDate || new Date(moment(new Date()).format('MM-DD-YYYY'))
    }
    return <div>
      <p style={{color: RC.Theme.color.gray}}>
        When does this campaign start? How long does it last?
      </p>
      <div>
        <RC.DatePicker {... datepicker1} />
        <RC.DatePicker {... datepicker2} />
      </div>
    </div>
  }

  _renderButtons() {
    return <div>
      <RC.Button theme={["inline","big"]} onClick={this._previous.bind(this)}>Prev</RC.Button>
      <RC.Button theme={["inline","big"]} onClick={this._submit.bind(this)}>Next</RC.Button>
    </div>
  }

  render() {
    //console.log(this.props.campaign)
    return <RC.Div theme="padding-tb" center={true} relative={true}>
      {this._renderDatePickers()} 
      {this._renderButtons()}
    </RC.Div>
  }
}
IH.NewCampaignStage2.displayName = "IH.NewCampaignStage2"

IH.NewCampaignStage2.propTypes = Object.assign({}, IH.NewCampaignStage2.propTypes, {
  submitHandler: React.PropTypes.func,
  campaign: React.PropTypes.object
})
