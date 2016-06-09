IH.Campaign = {
  getGroups: function(groups) {
    if(groups) {
      if(groups.indexOf('Everyone') !== -1) {
        return 'Everyone'
      }
      else {
        return groups.join(', ')
      }
    }
  },

  cancelEdit: function() {
   let campaignId = this.props.campaign._id
    let redirect = function() {
      FlowRouter.go('/campaign/' + campaignId)
    }
    if(!_.isEqual(this.props.campaignOriginal, this.props.campaign)) {
      IH.Dispatcher.App.dispatch({
        type: "Confirm",
        payload: {
          message: 'Are you sure you want to cancel the editing?',
          callback: redirect
        }
      })
    }
    else {
      redirect()
    }
  }
}

