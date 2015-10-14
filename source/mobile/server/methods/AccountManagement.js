Meteor.methods({
  CheckEmail:function(email){
  	console.log(email);
    if (Accounts.findUserByEmail(email)) {
      console.log("Email Found");
      return true;
    } else {
      console.log("Email Not Found");
      return false;
    } 
  },
  SetUserName:function(userId, userName){
    console.log(userId, userName);
    return(Accounts.setUsername(userId, userName));
  },
  SetAlternateContact: function(userId, aContact){
    console.log(userId, aContact);
    Meteor.users.update(userId, { $set: { alterContact: aContact} });
  },
  SetEmergencyContact: function(userId, eContact){
    console.log(userId, eContact);
    Meteor.users.update(userId, { $set: { emergencyContact: eContact} });
  },

});