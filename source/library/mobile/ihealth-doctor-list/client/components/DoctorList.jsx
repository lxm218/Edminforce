IH.RC.DoctorList = React.createClass({
  mixins:[ReactMeteorData],
  getMeteorData() {
    let self = this;
    self.subs = Meteor.subscribe("userData");
    let userId = Meteor.userId()
    let isReady = self.subs.ready()

    var channels = [];

    if (isReady) {
      console.log('ready');
    }

    return {
      isReady: isReady,
    }
  },
})
