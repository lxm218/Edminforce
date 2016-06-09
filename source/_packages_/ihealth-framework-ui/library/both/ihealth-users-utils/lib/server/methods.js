/*************************************************************************
 * Copyright iHealth Lab, 2015
 *
 *************************************************************************
 *
 * @description
 * This is where many utility function will live with regards to handling
 * users information
 *
 * @author
 * Kris Hamoud
 *
 *************************************************************************/
Meteor.methods({
  /**
   * update a user's permissions
   *
   * @param {Object} targetUserId Id of user to update
   * @param {Array} roles User's new permissions
   * @param {String} group to update permissions for
   */
  updateRoles: function (targetUserId, roles, group) {
    var user = Meteor.users.findOne({_id:this.userId}, {fields:{roles:1}});
    Meteor.users.update({_id:targetUserId}, {$set:{roles:roles}});
    Roles.setUserRoles(targetUserId, roles, group)
  },

  /**
   * update a user's permissions
   *
   * @param {Object} targetUserId Id of user to update
   * @param {Array} roles User's new permissions
   * @param {String} group to update permissions for
   */
  updateActivity: function (targetUserId, activityLevel) {
    var user = Meteor.users.findOne({_id:this.userId}, {fields:{roles:1}});
    Meteor.users.update({_id:targetUserId}, {$set:{"profile.dailyActivity":activityLevel}});
  },

  /**
   * [submitForm description]
   * @param {String} userId is the _id of the user to be updated
   * @param {Object} formData is the object being used to update the profile
   * @return void
   * @description: get the form data and set the user profile to it
   */
  updateUserProfile:function(userId, formData){
    Meteor.users.update({_id:userId}, {$set: formData});
  }
})
