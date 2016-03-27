
// account > change password
const reactiveFnAccountChangePassword = ({context,actions}, onData) => {
    const error = context.LocalState.get('ERROR_ACCOUNT_CHANGEPWD');
    const wait = context.LocalState.get('WAIT_ACCOUNT');
    onData(null, {error,wait});
    return actions.clearErrors.bind(null,'ERROR_ACCOUNT_CHANGEPWD');
};
EdminForce.Containers.AccountChangePassword = Composer.composeWithTracker(reactiveFnAccountChangePassword)(EdminForce.Components.AccountChangePassword);
