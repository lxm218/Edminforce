"use strict"

IH.EditCampaignStage3 = class extends IH.NewCampaignStage3 {
  _renderButtons() {
    return <div>
      <RC.Button theme={["inline","big"]} onClick={this._previous.bind(this)}>Prev</RC.Button>
      <RC.Button theme={["inline","big"]} onClick={this._submit.bind(this)}>Next</RC.Button> <br/><br/>
      <RC.Button theme={["inline","big"]} onClick={IH.Campaign.cancelEdit.bind(this)}>Cancel</RC.Button>
    </div>
  }
}

IH.EditCampaignStage3.displayName = "IH.EditCampaignStage3"

IH.EditCampaignStage3.propTypes = Object.assign({}, IH.EditCampaignStage3.propTypes, {
  submitHandler: React.PropTypes.func,
  campaign: React.PropTypes.object
})