
// account > change password
const reactiveFnAccountChangePassword = ({context,actions}, onData) => {
    const errorId = 'ERROR_ACCOUNT_CHANGEPWD';
    const error = context.LocalState.get(errorId);
    const wait = context.LocalState.get('WAIT_ACCOUNT');
    onData(null, {error,wait});
    
    return actions.clearErrors.bind(null,errorId);
};
EdminForce.Containers.AccountChangePassword = Composer.composeWithTracker(reactiveFnAccountChangePassword)(EdminForce.Components.AccountChangePassword);
