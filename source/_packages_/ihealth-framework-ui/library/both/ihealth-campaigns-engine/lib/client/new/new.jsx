
IH.NewCampaign = class extends React.Component {
  render() {
    let props = {
      stages: [
        "NewCampaignStage1",
        "NewCampaignStage2",
        "NewCampaignStage3",
        "NewCampaignStage4",
      ],
      campaign: {}
    }
    return <IH.CampaignCommon {...props} />
  }
}

IH.NewCampaign.displayName = "IH.NewCampaign"
