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
  }
});