Meteor.startup(function() {
  if(!IH.Coll.AlertsTest.findOne()) {
    let alertsData = [{
      groups: 'Pre-Hypertension',
      reading: 'Low blood presure',
      measurement: '90/60 mmHg'
    }, {
      groups: 'Diabetic',
      reading: 'High blood glucose',
      measurement: '180 mg/dL'
    }, {
      groups: 'Overweight',
      reading: 'High blood pressure',
      measurement: '140/90 mmHg'
    }]

    _.each(_.range(30), () => {
      let doc = {}
      doc.name = faker.name.findName()
      let num = Math.random()
      if(num < 0.33) {
        Object.assign(doc, alertsData[0])
      }
      else if(num < 0.66) {
        Object.assign(doc, alertsData[1])
      }
      else {
        Object.assign(doc, alertsData[2])
      }
      IH.Coll.AlertsTest.insert(doc)
    })
  }
})

Meteor.methods({
  dismissAlert(id){
    IH.Coll.AlertsTest.update({_id:id}, {$set:{dismissed:true}});
  }
})
