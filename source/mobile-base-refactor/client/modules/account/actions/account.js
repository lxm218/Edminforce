
EdminForce.Actions.Account = {
    // update user name
    updateUserName({LocalState}, userName) {
        LocalState.set('ERROR_ACCOUNT', null);
        Meteor.call('account.updateUserName', userName, function (err) {
            err && LocalState.set('ERROR_ACCOUNT', err.message);
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

    clearErrors({LocalState}, errorName) {
        LocalState.set(errorName, null);
        LocalState.set('WAIT_ACCOUNT', false);
    }
};

EdminForce.Contexts.Account = {
    LocalState: new ReactiveDict()
}

ReactDI.injectContext(EdminForce.Contexts.Account, EdminForce.Actions.Account);