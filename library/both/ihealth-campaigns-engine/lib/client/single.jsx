"use strict"

IH.SingleCampaign = class extends RC.MeteorData {
  getMeteorData() {
    const id = this.props.id
    var campaign, subs
    if(id) {
      subs = Meteor.subscribe('singleCampaign', id)
      campaign = IH.Coll.Campaigns.findOne({_id: id})
    }

    return {
      isReady: subs.ready(),
      campaign: campaign
    }
  }

  _renderTitle() {
    let name = this.data.campaign.name || 'Reward Page'
    let style = {
      color: RC.Theme.color.gray,
      fontSize: '2em'
    }
    return (
      <p style={style}>
        {name}
      </p>
    )
  }

  _edit() {
    FlowRouter.go('/campaign/edit/' + this.data.campaign._id)
  }

  _renderTable() {
    let style = {
      width: '70%',
      transform: 'translate(20%, 0)'
    }
    let campaign = this.data.campaign
    let dateString = moment(campaign.startDate).calendar() + ' - ' + moment(campaign.endDate).calendar()
    let goal = campaign.goals ? campaign.goals.description : ''
    let points = campaign.points
    let tableData = [{
      column1: 'Groups',
      column2: IH.Campaign.getGroups(JSON.parse(campaign.qualifications).groups)
    }, {
      column1: 'Time',
      column2: dateString
    },{
      column1: 'Goal',
      column2: goal
    },{
      column1: 'Points',
      column2: {
        text: <RC.Item>{points}</RC.Item>
      }
    }]

    const tableHead = [{
      text: " ",
      bgColor: "#100"
    },{
      text: " ",
      bgColor: "#555",
      width: 625,
      align: "right"
    }]

    return <RC.TableAuto style={style} data={tableData} header={tableHead} />
  }

  render() {
    if(this.data.isReady) {
      return <RC.Div theme={["padding-tb"]} center={true} relative={true}>
        {this._renderTitle()}
        {this._renderTable()}
        <RC.Button theme={["inline","big"]} onClick={this._edit.bind(this)}>Edit</RC.Button>
      </RC.Div>
    }
    else {
      return <div />
    }
  }
}

IH.SingleCampaign.displayName = "IH.SingleCampaign"
