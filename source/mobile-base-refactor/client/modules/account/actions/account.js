
EdminForce.Actions.Account = {
    // update user name
    updateUserName({LocalState}, userName) {
        LocalState.set('ERROR_ACCOUNT', null);
        Meteor.call('account.updateUserName', userName, function (err) {
            err && LocalState.set('ERROR_ACCOUNT', err.reason);
        });
    },


    // change user password
    changePassword({LocalState},currentPwd, newPwd, newPwdRepeat) {
        LocalState.set('ERROR_ACCOUNT_CHANGEPWD', null);
        if (newPwdRepeat != newPwd) {
            LocalState.set('ERROR_ACCOUNT_CHANGEPWD', 'Your passwords did not match, please try again.');
            return;
        }

        LocalState.set('WAIT_ACCOUNT', true);
        Accounts.changePassword(currentPwd,newPwd, function (err) {
            LocalState.set('WAIT_ACCOUNT', false);
            if (!err) {
                FlowRouter.go('/account');
                return;
            }
            LocalState.set('ERROR_ACCOUNT_CHANGEPWD', err.reason);
        });
    },


    // update phone number
    updatePhone({LocalState}, phone) {
        LocalState.set('ERROR_ACCOUNT_UPDATEPHONE', null);
        Meteor.call('account.updatePhone', phone, function (err) {
            err ? LocalState.set('ERROR_ACCOUNT_UPDATEPHONE', err.reason) : FlowRouter.go('/account');
        });
    },


    // update alternative contact
    updateAlternative({LocalState}, alterContact) {
        LocalState.set('ERROR_ACCOUNT_ALTERNATIVE', null);
        Meteor.call('account.updateAlternative', alterContact, function (err) {
            err ? LocalState.set('ERROR_ACCOUNT_ALTERNATIVE', err.reason) : FlowRouter.go('/account');
        });
    },

    // update emergency contact
    updateEmergency({LocalState}, emergencyContact) {
        LocalState.set('ERROR_ACCOUNT_EMERGENCY', null);
        Meteor.call('account.updateEmergency', emergencyContact, function (err) {
            err ? LocalState.set('ERROR_ACCOUNT_EMERGENCY', err.reason) : FlowRouter.go('/account');
        });
    },
    
    // save student
    upsertStudent({LocalState}, updatedStudent) {
        LocalState.set('ERROR_ACCOUNT_STUDENT', null);
        let student = {... _.omit(updatedStudent, ['gender','birthday'])};
        !student.status && (student.status='Active');
        student.profile = {
            gender: updatedStudent.gender,
            birthday: updatedStudent.birthday
        }
        Meteor.call('account.upsertStudent', student, function (err) {
            err ? LocalState.set('ERROR_ACCOUNT_STUDENT', err.reason) : FlowRouter.go('/account');
        });
    },

    clearErrors({LocalState}, errorName) {
        LocalState.set(errorName, null);
        LocalState.set('WAIT_ACCOUNT', false);
    }
};

EdminForce.Contexts.Account = {
    LocalState: new ReactiveDict(),
    SubManager: new SubsManager({
        // maximum number of cached subscriptions
        cacheLimit: 20,
        // expiration time in minutes
        expireIn: 30
    })
}

ReactDI.injectContext(EdminForce.Contexts.Account, EdminForce.Actions.Account);