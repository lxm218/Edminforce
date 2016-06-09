
Meteor.publish("BasicComponentDetails", function(){
  return [
    App.Coll.Components.find({},{
      fields: {name:1,category:1,platform:1,slug:1}
    }),
    App.Coll.Categories.find({},{
      fields: {name:1,weight:1}
    })]
})

Meteor.publish("SingleComponent", function(slug){
  return App.Coll.Components.find({ slug: slug })
})
