"use strict"

IH.EditCampaignStage4 = class extends IH.NewCampaignStage4 {
  _renderButtons() {
    return <div>
      <RC.Button theme={["inline","big"]} onClick={this._previous.bind(this)}>Prev</RC.Button>
      <RC.Button theme={["inline","big"]} onClick={this._submit.bind(this)}>Finish</RC.Button> <br/><br/>
      <RC.Button theme={["inline","big"]} onClick={IH.Campaign.cancelEdit.bind(this)}>Cancel</RC.Button>
    </div>
  }

  _successMessage() {
    return 'You have sucessfully edited the campaign!'
  }

  _hanldeSubmit() {
    let campaign = this.props.campaign
    campaign.qualifications = JSON.stringify(this.props.campaign.qualifications);
    let _id = campaign._id
    let updateObj = {
      '$set': campaign
    }
    IH.Coll.Campaigns.update({_id: _id}, updateObj, (err, result) => {
      if(!err) {
        this._submitSuccess(_id)
      }
    })
  }
}

IH.EditCampaignStage4.displayName = "IH.EditCampaignStage4"

IH.EditCampaignStage4.propTypes = Object.assign({}, IH.EditCampaignStage4.propTypes, {
  submitHandler: React.PropTypes.func,
  campaign: React.PropTypes.object
})