
App.BP = React.createClass({
  render() {
    let finishBP = function(res) {
      console.log("BP Finished", res)
      // var newDoc = DbTools.addType(DbTools.renameKeys(DbTools.keyMap.bp, res))
      // var docid = IH.Coll.Measurements.insert(res)
      // console.log('measurement inserted', docid )
    }

    return <IH.RC.BP5 addHeaderSpace={true} device={iHealth.BP5} finishCallback={finishBP} />
  }

});

App.BG = React.createClass({
  render() {
    let finishBG = function(res) {
      console.log("BG Finished", res)
      var newDoc = DbTools.addType(DbTools.renameKeys(DbTools.keyMap.bg, res))

      if(Meteor.user()) {
        var docid = IH.Coll.Measurements.insert(newDoc)
        console.log('measurement inserted', docid )
      } else {
        console.log('user must be logged in to save to DB. doc not saved: ', docid )
      }
    }

    return <IH.RC.BG5 finishCallback={finishBG} />
  }
});

App.AM3S = React.createClass({
  render() {
    let finishCallback = function(res) {
      console.log("AM Finished", res)
      // var newDoc = DbTools.addType(DbTools.renameKeys(DbTools.keyMap.am, res))
      //
      // if(Meteor.user()) {
      //   var docid = IH.Coll.Measurements.insert(newDoc)
      //   console.log('measurement inserted', docid )
      // } else {
      //   console.log('user must be logged in to save to DB. doc not saved: ', docid )
      // }
    }

    return <IH.RC.Devices pluginLabel='AmManagerCordova' finishCallback={finishCallback} />
  }
});
