
Meteor.methods({

  "checkIfCloudUserExists": function(iHealthID) {
    return DataServer.userExists(iHealthID)
  },

  "registerNewCloudUser": function(UID, iHealthID, password, nickname) {
    DataServer.userRegister(UID, iHealthID, password, nickname);
    return true
  },

  "authorizeExistingCloudUser": function(UID, iHealthID, password) {
    DataServer.userAuthorize(UID, iHealthID, password);
    return true
  },

  "changeCloudUserPassword": function(UID, oldPassword, newPassword) {
    DataServer.userChangePassword(UID, oldPassword, newPassword);
    return true
  }


});