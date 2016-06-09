"use strict"

IH.EditCampaignStage1 = class extends IH.NewCampaignStage1 {
  _renderButtons() {
    return <div>
      <RC.Button theme={["inline","big"]} onClick={this._submit.bind(this)}>Next</RC.Button> <br/><br/>
      <RC.Button theme={["inline","big"]} onClick={IH.Campaign.cancelEdit.bind(this)}>Cancel</RC.Button>
    </div>
  }
}

IH.EditCampaignStage1.displayName = "IH.EditCampaignStage1"

IH.EditCampaignStage1.propTypes = Object.assign({}, IH.EditCampaignStage1.propTypes, {
  submitHandler: React.PropTypes.func,
  campaign: React.PropTypes.object
})

