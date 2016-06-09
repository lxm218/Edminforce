"use strict"

IH.EditCampaignStage2 = class extends IH.NewCampaignStage2 {
  _renderButtons() {
    return <div>
      <RC.Button theme={["inline","big"]} onClick={this._previous.bind(this)}>Prev</RC.Button>
      <RC.Button theme={["inline","big"]} onClick={this._submit.bind(this)}>Next</RC.Button> <br/><br/>
      <RC.Button theme={["inline","big"]} onClick={IH.Campaign.cancelEdit.bind(this)}>Cancel</RC.Button>
    </div>
  }
}

IH.EditCampaignStage2.displayName = "IH.EditCampaignStage2"

IH.EditCampaignStage2.propTypes = Object.assign({}, IH.EditCampaignStage2.propTypes, {
  submitHandler: React.PropTypes.func,
  campaign: React.PropTypes.object
})