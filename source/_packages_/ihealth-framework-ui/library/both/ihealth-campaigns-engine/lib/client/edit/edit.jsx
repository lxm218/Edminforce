
IH.EditCampaign = class extends RC.MeteorData {
  getMeteorData() {
    const id = this.props.id
    const subs = Meteor.subscribe('singleCampaign', id)
    const isReady = subs.ready()
    let campaign = IH.Coll.Campaigns.findOne(id)
    if(campaign) {
      campaign.qualifications = JSON.parse(campaign.qualifications)
    }

    return {
      isReady: isReady,
      campaign: campaign
    }
  }

  render() {
    let campaign = this.data.campaign
    if(this.data.isReady && campaign) {
      let props = {
        stages: [
          "EditCampaignStage1",
          "EditCampaignStage2",
          "EditCampaignStage3",
          "EditCampaignStage4",
        ],
        campaign: campaign,
        campaignOriginal: _.clone(campaign)
      }
      return <IH.CampaignCommon {...props} />
    }
    else {
      return <div />
    }
  }
}

IH.EditCampaign.displayName = "IH.EditCampaign"
