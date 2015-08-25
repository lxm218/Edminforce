
Meteor.publish('getAllMembers', function(){
  return MembersColl.find()
})

MembersColl.allow({
  insert:function(){
    return true
  },
  update:function(){
    return true
  },
  remove:function(){
    return true
  }
})

Meteor.publish('getEx2TimeColl', function(){
  return Ex2TimeColl.find()
})

Ex2TimeColl.allow({
  insert:function(){
    return true
  },
  update:function(){
    return true
  },
  remove:function(){
    return true
  }
})

Meteor.methods({
  RemoveAllTime:function(){
    console.log("This message will be shown on server console. Called the meteor.method.")
    Ex2TimeColl.remove({})
  }
})
